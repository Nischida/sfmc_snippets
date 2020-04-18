<script runat=server>
Platform.Load("Core","1.1.1");
 try {

var rootFolderName = 'INT_Assets';
var coreSubFolderName = '_Core Assets';
var devSubFolderName = '_Dev Assets';
var prodSubFolderName = '_Prod Assets';


var authBase = 'https://mc1q10jrzwsds3bcgk0jjz2s8h80.auth.marketingcloudapis.com/';
var url = authBase +'v2/token';
var contentType = 'application/json';
var clientId = 'uafzm4wvdyc7digq683cv3ys';
var clientSecret = 'W2aU6GMZ8BIBfRxs1JLG1ryn';
var grant_type = 'client_credentials';

var payload = {
  "client_id": clientId,
  "client_secret": clientSecret,
  "grant_type": grant_type
  };

var authPayload = Platform.Function.Stringify(payload);

var accessTokenResult = HTTP.Post(url, contentType, authPayload);
var statusCode = accessTokenResult["StatusCode"];

var response = accessTokenResult["Response"][0];
var accessToken = Platform.Function.ParseJSON(response).access_token;   

var restBase = "https://mc1q10jrzwsds3bcgk0jjz2s8h80.rest.marketingcloudapis.com/";   
var contentType = "application/json";
var headerNames = ["Authorization"];
var headerValues = ["Bearer " + accessToken];   

//Create Folder Endpoint
var url = restBase + "asset/v1/content/categories";

//Get Parent Folder ID
var categoryResult = HTTP.Get(url, headerNames, headerValues);
var response = Platform.Function.ParseJSON(categoryResult.Content);
var parentID = response.items[0].id;

//Create Root Folder
var asset = {
    "Name" : rootFolderName,
    "ParentId" : parentID
}   

var payload = Platform.Function.Stringify(asset);
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);

//Get Root Folder ID
var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:rootFolderName});
var rootID = result[0].ID


//Create Core SubFolder
var asset = {
    "Name" : coreSubFolderName,
    "ParentId" : rootID
}   

var payload = Platform.Function.Stringify(asset);
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);


var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:coreSubFolderName});
var coreSubFolderID = result[0].ID


//Create Dev SubFolder
var asset = {
    "Name" : devSubFolderName,
    "ParentId" : rootID
}   

var payload = Platform.Function.Stringify(asset);
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);

var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:devSubFolderName});
var devSubFolderID = result[0].ID


//Create Prod SubFolder
var asset = {
    "Name" : prodSubFolderName,
    "ParentId" : rootID
}   

var payload = Platform.Function.Stringify(asset);
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);


var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:prodSubFolderName});
var prodSubFolderID = result[0].ID



//Create Content Blocks Endpoint
var url = restBase + "asset/v1/content/assets";


//Create Core Assets

// Create Email Control
var asset = {
"category": {
	"id": coreSubFolderID,
  "name": coreSubFolderName
		},
"assetType": {
	"id": 220,
	"name": "codesnippetblock"
	},
 "content": "\%\%[\n/*\n**Controls Email Name Variables for lookups**\nNeeds to be set as it appears in the SDC_Email_Catalog and corresponding Content Data Extensions\n\n**Controls Prod/STG Content DE Selection**\n@is_stg == '' (pulls from Prod DEs)\n@is_stg == 'N' (pulls from Prod DEs)\n@is_stg == 'Y' (pulls from STG DEs)\n\n**Controls Prod/Dev AMPScript blocks for LanguageContentLookup and INT_Dictionary**\n@is_dev == '' (pulls from Prod AMPScript blocks)\n@is_dev == 'N' (pulls from Prod AMPScript blocks)\n@is_dev == 'Y' (pulls from STG AMPScript blocks)\n\n**Controls Prod/Dev AMPScript blocks for Footer**\n@is_footerDev == '' (pulls from Prod AMPScript blocks)\n@is_footerDev == 'N' (pulls from Prod AMPScript blocks)\n@is_footerDev == 'Y' (pulls from STG AMPScript blocks)\n*/\n\nset @emailname = ''\nset @is_stg = 'Y'\nset @is_dev = 'N'\nset @is_footerDev = 'N'\n]\%\%",
"description": "AMPScript for INT Email Control",
"name": "INT_EmailControl"
}


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);



//Create Core PKG
var asset = {
"category": {
    "id": coreSubFolderID,
    "name": coreSubFolderName
    },
"assetType": {
  "id": 220,
  "name": "codesnippetblock"
  },
 "content": "<!--This block acts a a package for the LanguageContentLookup and INT_Dictionary AMPScript\nWith the addition of the @is_dev variable, we can now toggle between the Development and Production blocks from the Email Control AMPScript block rather than needing to adjust the ContentBlockById Function.\n\nThis block should be set as a Reference Content Block.-->\n\n\%\%[\n/*Set Dev and Prod Content Block IDs*/\nset @devContent = '';\nset @devDictionary = '';\n\nset @prodContent = '';\nset @prodDictionary = '';\n\nif @is_dev == 'Y' then\n]\%\%\n\n<!--LanguageContentLookup Block-->\n\%\%=ContentBlockById(@devContent)=\%\%\n<!--INT_Dictionary Block-->\n\%\%=ContentBlockById(@devDictionary)=\%\%\n\n\%\%[elseif @is_dev == 'N' or @is_dev == '' then]\%\%\n\n<!--LanguageContentLookup Block-->\n\%\%=ContentBlockById(@prodContent)=\%\%\n<!--INT_Dictionary Block-->\n\%\%=ContentBlockById(@prodDictionary)=\%\%\n\n\%\%[endif]\%\%",
"description": "AMPScript for INT Core Package",
"name": "INT_AMPScript_Core_PKG"
}


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);



//Create Footer Core PKG
var asset = {
"category": {
  "id": coreSubFolderID,
  "name": coreSubFolderName
    },
"assetType": {
  "id": 220,
  "name": "codesnippetblock"
  },
 "content": "\%\%[\nset @footerDev = '';\nset @footerProd = '';\n\nif @is_footerDev == 'Y' then\n]\%\%\n\nDevelopment Footer\n\%\%=ContentBlockById(@footerDev)=\%\%\n\n\%\%[elseif @is_footerDev == 'N' or @is_footerDev == '' then]\%\%\n\n<!--Production Footer-->\n\%\%=ContentBlockById(@footerProd)=\%\%\n\n\%\%[endif]\%\%",
"description": "AMPScript for INT Footer Package",
"name": "INT_AMPScript_Footer_PKG"
}


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);


//Create PROD Assets

// Create Content Lookups PROD
var asset = {
"category": {
  "id": prodSubFolderID,
  "name": prodSubFolderName
    },
"assetType": {
  "id": 220,
  "name": "codesnippetblock"
  },
 "content": "\%\%[/* Set Data Extension Names *\/\r\nset @catalogDE = 'INT_EmailCatalog'\r\nset @sendLogDE = 'INT_SendLog'\r\n\r\nset @errorLogDE = 'INT_ErrorLog'\r\nset @noLangErrorDE = 'INT_NoLangErrorLog'\r\n\r\nset @emailSendLimitingDE = 'INT_EmailSendLimiting'\r\nset @globalSendLimitingDE = 'INT_GlobalSendLimiting'\r\nset @sendLimitingLogDE = 'INT_SendLimitingLog'\r\n\r\n\r\n\/* Start of Language Preference Identification*\/\r\n\r\n\/*Preference Center DE*\/\r\nset @lang_region = Lookup('Preference Center DE','language_preference','email_address',emailaddr)\r\n\r\n\r\n\/*Locale from Main data table*\/\r\nif EMPTY(@lang_region) then\r\nset @lang_region = Lookup('sdc_prod_main_data_table','locale','contact_key',_SubscriberKey)\r\nendif\r\n\r\n\r\n\r\n\/*Locale from Leads data table*\/\r\nif EMPTY(@lang_region) then\r\nset @lead_rows = LookupOrderedRows('sdc_prod_leads_table',1,'lead_date DESC','contact_key',_SubscriberKey)\r\n  if RowCount(@lead_rows) > 0 then\r\n   set @lang_region = Field(Row(@lead_rows, 1), 'locale')\r\n  endif\r\nendif\r\n\r\n\r\n\r\n\/*If no lang_region can be found RaiseError and Log*\/\r\nif EMPTY(@lang_region) then\r\nset @errorMSG = Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey)\r\n\r\nInsertDE(@noLangErrorDE,'EmailAddress',emailaddr,'SendDate', Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG,'SubscriberKey',_subscriberkey)\r\n\r\nRaiseError(Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey),1,0,0,1)\r\nendif\r\n\r\n\/* End of Language Preference Identification*\/\r\n\r\n\r\n\r\n\r\nset @today = Now()\r\n\r\n\/****Start Email Exclusion Limiting****\/\r\nset @emailExcludeRows = LookupRows(@emailSendLimitingDE,'emailname',@emailname)\r\nset @emailExcludeRowCount = RowCount(@emailExcludeRows)\r\n\r\nif @emailExcludeRowCount == 0 then\r\nelse\r\n\r\n  for @e = 1 to @emailExcludeRowCount do\r\n  set @emailExcludeRow = Row(@emailExcludeRows, @e)\r\n  set @lang_regionExclude = Field(@emailExcludeRow,'lang_regionExclusions')\r\n  set @ongoing = Field(@emailExcludeRow,'ongoing')\r\n  \r\n  if @today >= Field(@emailExcludeRow,'StartDate') and @today <= Field(@emailExcludeRow,'EndDate') then\r\n    set @emailExcludeActive = 1\r\n  elseif @ongoing == 1 then\r\n    set @emailExcludeActive = 1\r\n  else\r\n    set @emailExcludeActive = 0\r\n  endif\r\n\r\n    if IndexOf(@lang_regionExclude,@lang_region) > 0 and @emailExcludeActive == 1 then\r\n\r\n      set @emailMSG = Concat('Email Lang_Region Exclusion: ',@lang_regionExclude)\r\n\r\n       InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@emailMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\r\n\r\n       RaiseError(Concat('Email -- Regions excluded in this send: ', @lang_regionExclude),1,0,0,1)\r\n    endif\r\n  next @e\r\nendif\r\n\r\n\/****Start Global Exclusion Limiting****\/\r\n\r\nset @globalRows = LookupRows(@globalSendLimitingDE,'LookupValue','1')\r\nset @globalCount = RowCount(@globalRows)\r\n\r\nif @globalCount == 0 then\r\nelse\r\n\r\nfor @g = 1 to @globalCount do\r\n  set @globalRow = Row(@globalRows, @d)\r\n  set @dOngoing = Field(@globalRow,'ongoing')\r\n  \r\nif @today >= Field(@globalRow,'StartDate') and @today <= Field(@globalRow,'EndDate') then\r\n  set @globalActive = 1\r\nelseif  @gOngoing == 1 then\r\n  set @globalActive = 1\r\nelse\r\n  set @globalActive = 0\r\nendif\r\n\r\n\r\n  \/*Pulls list of Lang_Regions to exclude from global sends *\/\r\n  set @globalLang_Region = Field(@globalRow,'lang_regionExclusions')\r\n\r\n  if IndexOf(@globalLang_Region,@lang_region) >= 1 and @globalActive == 1 then\r\n  set @globalMSG = Concat('Global Lang_Region Exclusion: ',@globalLang_Region)\r\n\r\n  InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@disMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\r\n\r\n     RaiseError(Concat('Global -- Regions excluded in this send: ', @globalLang_Region),1,0,0,1)\r\n  endif\r\n\r\nnext @g\r\nendif\r\n\r\n\r\n\r\n\r\n\/* Error -- Not in SDC Email Catalog *\/\r\nif RowCount(LookupRows(@catalogDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\r\nset @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the Email Catalog data extension.')\r\n\r\n InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\r\n\r\nRaiseError(@errorMSG,1,0,0,1)\r\nendif\r\n\r\n\r\n\/*Lookup Data Extensions, StreamName and JourneyName in SDC Email catalog*\/\r\nset @prodDE = Lookup(@catalogDE, 'prodDE', 'emailname', @emailname,'lang_region',@lang_region)\r\nset @stgDE = Lookup(@catalogDE, 'stgDE', 'emailname', @emailname,'lang_region',@lang_region)\r\n\r\n\r\n\r\n\/* Error -- Not STG and Nothing in prodDE *\/\r\nif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\r\n\r\n set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@prodDE,'  data extension.')\r\n \r\nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',\r\n_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\r\nRaiseError(@errorMSG,1,0,0,1)\r\n\r\n\r\n\/* Start Find Correct DE for Content *\/\r\n\r\n\/* Error -- is STG and Nothing in stgDE*\/\r\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\r\n\r\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@stgDE,'  data extension.')\r\n  \r\n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\r\n\r\n  RaiseError(@errorMSG,1,0,0,1)\r\n\r\n\r\n\/* No Error -- is STG and has records in stgDE *\/\r\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\r\n\r\nset @deName = @stgDE\r\n\r\n\r\n\/* No Error -- Empty STG and has records in prodDE*\/\r\nelseif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\r\n\r\n set @deName = @prodDE\r\n\r\n\r\n \/* No Error - is not STG and Records in prodDE*\/\r\nelseif @is_stg == 'N' and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\r\n\r\n set @deName = @prodDE\r\n\r\nendif\r\n\r\n\/* End Find Correct DE for Content *\/\r\n\r\n\r\n\r\n\/* Error -- Ensure that there is a content row to pull from when @deName is set*\/\r\nif RowCount(LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\r\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' has no records in ',@deName)\r\n\r\n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\r\n\r\n  RaiseError(@errorMSG,1,0,0,1)\r\nendif\r\n\r\n\r\n\/*\r\nNo Error -- If no errors are found, look up values in the correct DE, log send. If there are errors Raise\/Log Error Message\r\n*\/\r\n\r\n\/* Start Content Lookups *\/\r\nif Empty(@errorMSG) then\r\n set @contentRow = LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)\r\n set @row = Row(@contentRow, 1)\r\n  set @emailname = Field(@row, 'emailname')\r\n\r\n  set @subject = Field(@row, 'subject')\r\n  set @preheader = Field(@row, 'preheader')\r\n\r\n  set @headline_1 = Field(@row, 'headline_1')\r\n  set @subheadline_1 = Field(@row, 'subheadline_1')\r\n  set @copy_1 = Field(@row, 'copy_1')\r\n  set @cta_1 = Field(@row, 'cta_1')\r\n  set @imgsrc_1 = Field(@row, 'imgsrc_1')\r\n  set @alttext_1 = Field(@row, 'alttext_1')\r\n  \r\n  set @headline_2 = Field(@row, 'headline_2')\r\n  set @subheadline_2 = Field(@row, 'subheadline_2')\r\n  set @copy_2 = Field(@row, 'copy_2')\r\n  set @cta_2 = Field(@row, 'cta_2')\r\n  set @imgsrc_2 = Field(@row, 'imgsrc_2')\r\n  set @alttext_2 = Field(@row, 'alttext_2')\r\n\r\n  set @headline_3 = Field(@row, 'headline_3')\r\n  set @subheadline_3 = Field(@row, 'subheadline_3')\r\n  set @copy_3 = Field(@row, 'copy_3')\r\n  set @cta_3 = Field(@row, 'cta_3')\r\n  set @imgsrc_3 = Field(@row, 'imgsrc_3')\r\n  set @alttext_3 = Field(@row, 'alttext_3')\r\n\r\n  set @headline_4 = Field(@row, 'headline_4')\r\n  set @subheadline_4 = Field(@row, 'subheadline_4')\r\n  set @copy_4 = Field(@row, 'copy_4')\r\n  set @cta_4 = Field(@row, 'cta_4')\r\n  set @imgsrc_4 = Field(@row, 'imgsrc_4')\r\n  set @alttext_4 = Field(@row, 'alttext_4')\r\n  \r\n  set @headline_5 = Field(@row, 'headline_5')\r\n  set @subheadline_5 = Field(@row, 'subheadline_5')\r\n  set @copy_5 = Field(@row, 'copy_5')\r\n  set @cta_5 = Field(@row, 'cta_5')\r\n  set @imgsrc_5 = Field(@row, 'imgsrc_5') \r\n  set @alttext_5 = Field(@row, 'alttext_5') \r\n\r\n  set @headline_6 = Field(@row, 'headline_6')\r\n  set @subheadline_6 = Field(@row, 'subheadline_6')\r\n  set @copy_6 = Field(@row, 'copy_6')\r\n  set @cta_6 = Field(@row, 'cta_6')\r\n  set @imgsrc_6 = Field(@row, 'imgsrc_6')\r\n  set @alttext_6 = Field(@row, 'alttext_6')\r\n\r\n  set @headline_7 = Field(@row, 'headline_7')\r\n  set @subheadline_7 = Field(@row, 'subheadline_7')\r\n  set @copy_7 = Field(@row, 'copy_7')\r\n  set @cta_7 = Field(@row, 'cta_7')\r\n  set @imgsrc_7 = Field(@row, 'imgsrc_7')\r\n  set @alttext_7 = Field(@row, 'alttext_7')\r\n\r\n  set @headline_8 = Field(@row, 'headline_8')\r\n  set @subheadline_8 = Field(@row, 'subheadline_8')\r\n  set @copy_8 = Field(@row, 'copy_8')\r\n  set @cta_8 = Field(@row, 'cta_8')\r\n  set @imgsrc_8 = Field(@row, 'imgsrc_8')\r\n  set @alttext_8 = Field(@row, 'alttext_8')\r\n\r\n  set @headline_9 = Field(@row, 'headline_9')\r\n  set @subheadline_9 = Field(@row, 'subheadline_9')\r\n  set @copy_9 = Field(@row, 'copy_9')\r\n  set @cta_9 = Field(@row, 'cta_9')\r\n  set @imgsrc_9 = Field(@row, 'imgsrc_9')\r\n  set @alttext_9 = Field(@row, 'alttext_9')\r\n\r\n  set @headline_10 = Field(@row, 'headline_10')\r\n  set @subheadline_10 = Field(@row, 'subheadline_10')\r\n  set @copy_10 = Field(@row, 'copy_10')\r\n  set @cta_10 = Field(@row, 'cta_10')\r\n  set @imgsrc_10 = Field(@row, 'imgsrc_10')\r\n  set @alttext_10 = Field(@row, 'alttext_10')\r\n\r\n  set @headline_11 = Field(@row, 'headline_11')\r\n  set @subheadline_11 = Field(@row, 'subheadline_11')\r\n  set @copy_11 = Field(@row, 'copy_11')\r\n  set @cta_11 = Field(@row, 'cta_11')\r\n  set @imgsrc_11 = Field(@row, 'imgsrc_11')\r\n  set @alttext_11 = Field(@row, 'alttext_11')\r\n\r\n  set @headline_12 = Field(@row, 'headline_12')\r\n  set @subheadline_12 = Field(@row, 'subheadline_12')\r\n  set @copy_12 = Field(@row, 'copy_12')\r\n  set @cta_12 = Field(@row, 'cta_12')\r\n  set @imgsrc_12 = Field(@row, 'imgsrc_12')\r\n  set @alttext_12 = Field(@row, 'alttext_12')\r\n\r\n  set @headline_13 = Field(@row, 'headline_13')\r\n  set @subheadline_13 = Field(@row, 'subheadline_13')\r\n  set @copy_13 = Field(@row, 'copy_13')\r\n  set @cta_13 = Field(@row, 'cta_13')\r\n  set @imgsrc_13 = Field(@row, 'imgsrc_13')\r\n  set @alttext_13 = Field(@row, 'alttext_13')\r\n\r\n  set @headline_14 = Field(@row, 'headline_14')\r\n  set @subheadline_14 = Field(@row, 'subheadline_14')\r\n  set @copy_14 = Field(@row, 'copy_14')\r\n  set @cta_14 = Field(@row, 'cta_14')\r\n  set @imgsrc_14 = Field(@row, 'imgsrc_14')\r\n  set @alttext_14 = Field(@row, 'alttext_14')\r\n\r\n  set @headline_15 = Field(@row, 'headline_15')\r\n  set @subheadline_15 = Field(@row, 'subheadline_15')\r\n  set @copy_15 = Field(@row, 'copy_15')\r\n  set @cta_15 = Field(@row, 'cta_15')\r\n  set @imgsrc_15 = Field(@row, 'imgsrc_15')\r\n  set @alttext_15 = Field(@row, 'alttext_15')\r\n\r\n  set @headline_16 = Field(@row, 'headline_16')\r\n  set @subheadline_16 = Field(@row, 'subheadline_16')\r\n  set @copy_16 = Field(@row, 'copy_16')\r\n  set @cta_16 = Field(@row, 'cta_16')\r\n  set @imgsrc_16 = Field(@row, 'imgsrc_16')\r\n  set @alttext_16 = Field(@row, 'alttext_16')\r\n\r\n  set @headline_17 = Field(@row, 'headline_17')\r\n  set @subheadline_17 = Field(@row, 'subheadline_17')\r\n  set @copy_17 = Field(@row, 'copy_17')\r\n  set @cta_17 = Field(@row, 'cta_17')\r\n  set @imgsrc_17 = Field(@row, 'imgsrc_17')\r\n  set @alttext_17 = Field(@row, 'alttext_17')\r\n\r\n  set @headline_18 = Field(@row, 'headline_18')\r\n  set @subheadline_18 = Field(@row, 'subheadline_18')\r\n  set @copy_18 = Field(@row, 'copy_18')\r\n  set @cta_18 = Field(@row, 'cta_18')\r\n  set @imgsrc_18 = Field(@row, 'imgsrc_18')\r\n  set @alttext_18 = Field(@row, 'alttext_18')\r\n\r\n  set @headline_19 = Field(@row, 'headline_19')\r\n  set @subheadline_19 = Field(@row, 'subheadline_19')\r\n  set @copy_19 = Field(@row, 'copy_19')\r\n  set @cta_19 = Field(@row, 'cta_19')\r\n  set @imgsrc_19 = Field(@row, 'imgsrc_19')\r\n  set @alttext_19 = Field(@row, 'alttext_19')\r\n\r\n  set @headline_20 = Field(@row, 'headline_20')\r\n  set @subheadline_20 = Field(@row, 'subheadline_20')\r\n  set @copy_20 = Field(@row, 'copy_20')\r\n  set @cta_20 = Field(@row, 'cta_20')\r\n  set @imgsrc_20 = Field(@row, 'imgsrc_20')\r\n  set @alttext_20 = Field(@row, 'alttext_20')\r\n\r\n  set @headline_21 = Field(@row, 'headline_21')\r\n  set @subheadline_21 = Field(@row, 'subheadline_21')\r\n  set @copy_21 = Field(@row, 'copy_21')\r\n  set @cta_21 = Field(@row, 'cta_21')\r\n  set @imgsrc_21 = Field(@row, 'imgsrc_21')\r\n  set @alttext_21 = Field(@row, 'alttext_21')\r\n\r\n  set @headline_22 = Field(@row, 'headline_22')\r\n  set @subheadline_22 = Field(@row, 'subheadline_22')\r\n  set @copy_22 = Field(@row, 'copy_22')\r\n  set @cta_22 = Field(@row, 'cta_22')\r\n  set @imgsrc_22 = Field(@row, 'imgsrc_22')\r\n  set @alttext_22 = Field(@row, 'alttext_22')\r\n\r\n  set @headline_23 = Field(@row, 'headline_23')\r\n  set @subheadline_23 = Field(@row, 'subheadline_23')\r\n  set @copy_23 = Field(@row, 'copy_23')\r\n  set @cta_23 = Field(@row, 'cta_23')\r\n  set @imgsrc_23 = Field(@row, 'imgsrc_23')\r\n  set @alttext_23 = Field(@row, 'alttext_23')\r\n\r\n  set @headline_24 = Field(@row, 'headline_24')\r\n  set @subheadline_24 = Field(@row, 'subheadline_24')\r\n  set @copy_24 = Field(@row, 'copy_24')\r\n  set @cta_24 = Field(@row, 'cta_24')\r\n  set @imgsrc_24 = Field(@row, 'imgsrc_24')\r\n  set @alttext_24 = Field(@row, 'alttext_24')\r\n\r\n  set @headline_25 = Field(@row, 'headline_25')\r\n  set @subheadline_25 = Field(@row, 'subheadline_25')\r\n  set @copy_25 = Field(@row, 'copy_25')\r\n  set @cta_25 = Field(@row, 'cta_25')\r\n  set @imgsrc_25 = Field(@row, 'imgsrc_25')\r\n  set @alttext_25 = Field(@row, 'alttext_25')\r\n\r\n\r\n\/* No Error - Log send to SDC_INT_SendLog DE *\/ \r\nInsertDE(@sendLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\r\n\r\nelse\r\n\r\n\/*Log error to@errorLogDEDE and Stop Send*\/  \r\nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\r\n\r\nRaiseError(@errorMSG,1,0,0,1)\r\nendif\r\n\r\n\/*\r\nTo add additional sections copy a section and change _x to the next number\r\n*\]\%\%",
"description": "AMPScript for INT Content Lookup",
"name": "INT_ContentLookup_PROD"
}


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);


//Create Dictionary Lookups PROD
var asset = {
"category": {
  "id": prodSubFolderID,
  "name": prodSubFolderName
    },
"assetType": {
  "id": 220,
  "name": "codesnippetblock"
  },
 "content": "\%\%[\nset @dictionaryDE = 'INT_Dictionary'\n\n/* International Dictionary Lookups */\n\n  /* @com sets the domain routing for global links */\n  set @comCheck = Lookup(@INT_Dictionary,@lang_region, \"Phrase\", \"com\")\n  if not empty(@comCheck) then \n    set @Phrase = @comCheck\n  else\n  set @com = Lookup(@INT_Dictionary,\"en-US\",\"Phrase\",\"com\")\n  endif\n\n  set @ValueCheck = Lookup(@INT_Dictionary,@lang_region, \"Phrase\", \"Phrase\")\n  if not empty(@ValueCheck) then \n    set @Phrase = @ValueCheck\n  else\n  set @Phrase = Lookup(@INT_Dictionary,\"en-US\",\"Phrase\",\"Phrase\")\n  endif\n  \n\n/*Social Links*/\n/*Facebook*/\nset @socialLink_FacebookCheck = Lookup(@INT_Dictionary,@lang_region, \"Phrase\", \"socialLink_Facebook\")\nif not empty(@socialLink_FacebookCheck) then \n  set @socialLink_Facebook = @socialLink_FacebookCheck\nelse\n set @socialLink_Facebook = Lookup(@INT_Dictionary,\"en-US\",\"Phrase\",\"socialLink_Facebook\")\nendif\n\n\n/* define global links */\nset @path = Concat(@baseURL,@com,\"urlPath\")\n\n]\%\%",
"description": "AMPScript for INT Dictionary",
"name": "INT_Dictionary_PROD"
}


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);



// Create Content Lookups DEV
var asset = {
"category": {
  "id": devSubFolderID,
  "name": devSubFolderName
    },
"assetType": {
  "id": 220,
  "name": "codesnippetblock"
  },
 "content": "\%\%[/* Set Data Extension Names *\/\r\nset @catalogDE = 'INT_EmailCatalog'\r\nset @sendLogDE = 'INT_SendLog'\r\n\r\nset @errorLogDE = 'INT_ErrorLog'\r\nset @noLangErrorDE = 'INT_NoLangErrorLog'\r\n\r\nset @emailSendLimitingDE = 'INT_EmailSendLimiting'\r\nset @globalSendLimitingDE = 'INT_GlobalSendLimiting'\r\nset @sendLimitingLogDE = 'INT_SendLimitingLog'\r\n\r\n\r\n\/* Start of Language Preference Identification*\/\r\n\r\n\/*Preference Center DE*\/\r\nset @lang_region = Lookup('Preference Center DE','language_preference','email_address',emailaddr)\r\n\r\n\r\n\/*Locale from Main data table*\/\r\nif EMPTY(@lang_region) then\r\nset @lang_region = Lookup('sdc_prod_main_data_table','locale','contact_key',_SubscriberKey)\r\nendif\r\n\r\n\r\n\r\n\/*Locale from Leads data table*\/\r\nif EMPTY(@lang_region) then\r\nset @lead_rows = LookupOrderedRows('sdc_prod_leads_table',1,'lead_date DESC','contact_key',_SubscriberKey)\r\n  if RowCount(@lead_rows) > 0 then\r\n   set @lang_region = Field(Row(@lead_rows, 1), 'locale')\r\n  endif\r\nendif\r\n\r\n\r\n\r\n\/*If no lang_region can be found RaiseError and Log*\/\r\nif EMPTY(@lang_region) then\r\nset @errorMSG = Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey)\r\n\r\nInsertDE(@noLangErrorDE,'EmailAddress',emailaddr,'SendDate', Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG,'SubscriberKey',_subscriberkey)\r\n\r\nRaiseError(Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey),1,0,0,1)\r\nendif\r\n\r\n\/* End of Language Preference Identification*\/\r\n\r\n\r\n\r\n\r\nset @today = Now()\r\n\r\n\/****Start Email Exclusion Limiting****\/\r\nset @emailExcludeRows = LookupRows(@emailSendLimitingDE,'emailname',@emailname)\r\nset @emailExcludeRowCount = RowCount(@emailExcludeRows)\r\n\r\nif @emailExcludeRowCount == 0 then\r\nelse\r\n\r\n  for @e = 1 to @emailExcludeRowCount do\r\n  set @emailExcludeRow = Row(@emailExcludeRows, @e)\r\n  set @lang_regionExclude = Field(@emailExcludeRow,'lang_regionExclusions')\r\n  set @ongoing = Field(@emailExcludeRow,'ongoing')\r\n  \r\n  if @today >= Field(@emailExcludeRow,'StartDate') and @today <= Field(@emailExcludeRow,'EndDate') then\r\n    set @emailExcludeActive = 1\r\n  elseif @ongoing == 1 then\r\n    set @emailExcludeActive = 1\r\n  else\r\n    set @emailExcludeActive = 0\r\n  endif\r\n\r\n    if IndexOf(@lang_regionExclude,@lang_region) > 0 and @emailExcludeActive == 1 then\r\n\r\n      set @emailMSG = Concat('Email Lang_Region Exclusion: ',@lang_regionExclude)\r\n\r\n       InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@emailMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\r\n\r\n       RaiseError(Concat('Email -- Regions excluded in this send: ', @lang_regionExclude),1,0,0,1)\r\n    endif\r\n  next @e\r\nendif\r\n\r\n\/****Start Global Exclusion Limiting****\/\r\n\r\nset @globalRows = LookupRows(@globalSendLimitingDE,'LookupValue','1')\r\nset @globalCount = RowCount(@globalRows)\r\n\r\nif @globalCount == 0 then\r\nelse\r\n\r\nfor @g = 1 to @globalCount do\r\n  set @globalRow = Row(@globalRows, @d)\r\n  set @dOngoing = Field(@globalRow,'ongoing')\r\n  \r\nif @today >= Field(@globalRow,'StartDate') and @today <= Field(@globalRow,'EndDate') then\r\n  set @globalActive = 1\r\nelseif  @gOngoing == 1 then\r\n  set @globalActive = 1\r\nelse\r\n  set @globalActive = 0\r\nendif\r\n\r\n\r\n  \/*Pulls list of Lang_Regions to exclude from global sends *\/\r\n  set @globalLang_Region = Field(@globalRow,'lang_regionExclusions')\r\n\r\n  if IndexOf(@globalLang_Region,@lang_region) >= 1 and @globalActive == 1 then\r\n  set @globalMSG = Concat('Global Lang_Region Exclusion: ',@globalLang_Region)\r\n\r\n  InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@disMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\r\n\r\n     RaiseError(Concat('Global -- Regions excluded in this send: ', @globalLang_Region),1,0,0,1)\r\n  endif\r\n\r\nnext @g\r\nendif\r\n\r\n\r\n\r\n\r\n\/* Error -- Not in SDC Email Catalog *\/\r\nif RowCount(LookupRows(@catalogDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\r\nset @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the Email Catalog data extension.')\r\n\r\n InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\r\n\r\nRaiseError(@errorMSG,1,0,0,1)\r\nendif\r\n\r\n\r\n\/*Lookup Data Extensions, StreamName and JourneyName in SDC Email catalog*\/\r\nset @prodDE = Lookup(@catalogDE, 'prodDE', 'emailname', @emailname,'lang_region',@lang_region)\r\nset @stgDE = Lookup(@catalogDE, 'stgDE', 'emailname', @emailname,'lang_region',@lang_region)\r\n\r\n\r\n\r\n\/* Error -- Not STG and Nothing in prodDE *\/\r\nif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\r\n\r\n set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@prodDE,'  data extension.')\r\n \r\nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',\r\n_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\r\nRaiseError(@errorMSG,1,0,0,1)\r\n\r\n\r\n\/* Start Find Correct DE for Content *\/\r\n\r\n\/* Error -- is STG and Nothing in stgDE*\/\r\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\r\n\r\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@stgDE,'  data extension.')\r\n  \r\n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\r\n\r\n  RaiseError(@errorMSG,1,0,0,1)\r\n\r\n\r\n\/* No Error -- is STG and has records in stgDE *\/\r\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\r\n\r\nset @deName = @stgDE\r\n\r\n\r\n\/* No Error -- Empty STG and has records in prodDE*\/\r\nelseif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\r\n\r\n set @deName = @prodDE\r\n\r\n\r\n \/* No Error - is not STG and Records in prodDE*\/\r\nelseif @is_stg == 'N' and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\r\n\r\n set @deName = @prodDE\r\n\r\nendif\r\n\r\n\/* End Find Correct DE for Content *\/\r\n\r\n\r\n\r\n\/* Error -- Ensure that there is a content row to pull from when @deName is set*\/\r\nif RowCount(LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\r\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' has no records in ',@deName)\r\n\r\n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\r\n\r\n  RaiseError(@errorMSG,1,0,0,1)\r\nendif\r\n\r\n\r\n\/*\r\nNo Error -- If no errors are found, look up values in the correct DE, log send. If there are errors Raise\/Log Error Message\r\n*\/\r\n\r\n\/* Start Content Lookups *\/\r\nif Empty(@errorMSG) then\r\n set @contentRow = LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)\r\n set @row = Row(@contentRow, 1)\r\n  set @emailname = Field(@row, 'emailname')\r\n\r\n  set @subject = Field(@row, 'subject')\r\n  set @preheader = Field(@row, 'preheader')\r\n\r\n  set @headline_1 = Field(@row, 'headline_1')\r\n  set @subheadline_1 = Field(@row, 'subheadline_1')\r\n  set @copy_1 = Field(@row, 'copy_1')\r\n  set @cta_1 = Field(@row, 'cta_1')\r\n  set @imgsrc_1 = Field(@row, 'imgsrc_1')\r\n  set @alttext_1 = Field(@row, 'alttext_1')\r\n  \r\n  set @headline_2 = Field(@row, 'headline_2')\r\n  set @subheadline_2 = Field(@row, 'subheadline_2')\r\n  set @copy_2 = Field(@row, 'copy_2')\r\n  set @cta_2 = Field(@row, 'cta_2')\r\n  set @imgsrc_2 = Field(@row, 'imgsrc_2')\r\n  set @alttext_2 = Field(@row, 'alttext_2')\r\n\r\n  set @headline_3 = Field(@row, 'headline_3')\r\n  set @subheadline_3 = Field(@row, 'subheadline_3')\r\n  set @copy_3 = Field(@row, 'copy_3')\r\n  set @cta_3 = Field(@row, 'cta_3')\r\n  set @imgsrc_3 = Field(@row, 'imgsrc_3')\r\n  set @alttext_3 = Field(@row, 'alttext_3')\r\n\r\n  set @headline_4 = Field(@row, 'headline_4')\r\n  set @subheadline_4 = Field(@row, 'subheadline_4')\r\n  set @copy_4 = Field(@row, 'copy_4')\r\n  set @cta_4 = Field(@row, 'cta_4')\r\n  set @imgsrc_4 = Field(@row, 'imgsrc_4')\r\n  set @alttext_4 = Field(@row, 'alttext_4')\r\n  \r\n  set @headline_5 = Field(@row, 'headline_5')\r\n  set @subheadline_5 = Field(@row, 'subheadline_5')\r\n  set @copy_5 = Field(@row, 'copy_5')\r\n  set @cta_5 = Field(@row, 'cta_5')\r\n  set @imgsrc_5 = Field(@row, 'imgsrc_5') \r\n  set @alttext_5 = Field(@row, 'alttext_5') \r\n\r\n  set @headline_6 = Field(@row, 'headline_6')\r\n  set @subheadline_6 = Field(@row, 'subheadline_6')\r\n  set @copy_6 = Field(@row, 'copy_6')\r\n  set @cta_6 = Field(@row, 'cta_6')\r\n  set @imgsrc_6 = Field(@row, 'imgsrc_6')\r\n  set @alttext_6 = Field(@row, 'alttext_6')\r\n\r\n  set @headline_7 = Field(@row, 'headline_7')\r\n  set @subheadline_7 = Field(@row, 'subheadline_7')\r\n  set @copy_7 = Field(@row, 'copy_7')\r\n  set @cta_7 = Field(@row, 'cta_7')\r\n  set @imgsrc_7 = Field(@row, 'imgsrc_7')\r\n  set @alttext_7 = Field(@row, 'alttext_7')\r\n\r\n  set @headline_8 = Field(@row, 'headline_8')\r\n  set @subheadline_8 = Field(@row, 'subheadline_8')\r\n  set @copy_8 = Field(@row, 'copy_8')\r\n  set @cta_8 = Field(@row, 'cta_8')\r\n  set @imgsrc_8 = Field(@row, 'imgsrc_8')\r\n  set @alttext_8 = Field(@row, 'alttext_8')\r\n\r\n  set @headline_9 = Field(@row, 'headline_9')\r\n  set @subheadline_9 = Field(@row, 'subheadline_9')\r\n  set @copy_9 = Field(@row, 'copy_9')\r\n  set @cta_9 = Field(@row, 'cta_9')\r\n  set @imgsrc_9 = Field(@row, 'imgsrc_9')\r\n  set @alttext_9 = Field(@row, 'alttext_9')\r\n\r\n  set @headline_10 = Field(@row, 'headline_10')\r\n  set @subheadline_10 = Field(@row, 'subheadline_10')\r\n  set @copy_10 = Field(@row, 'copy_10')\r\n  set @cta_10 = Field(@row, 'cta_10')\r\n  set @imgsrc_10 = Field(@row, 'imgsrc_10')\r\n  set @alttext_10 = Field(@row, 'alttext_10')\r\n\r\n  set @headline_11 = Field(@row, 'headline_11')\r\n  set @subheadline_11 = Field(@row, 'subheadline_11')\r\n  set @copy_11 = Field(@row, 'copy_11')\r\n  set @cta_11 = Field(@row, 'cta_11')\r\n  set @imgsrc_11 = Field(@row, 'imgsrc_11')\r\n  set @alttext_11 = Field(@row, 'alttext_11')\r\n\r\n  set @headline_12 = Field(@row, 'headline_12')\r\n  set @subheadline_12 = Field(@row, 'subheadline_12')\r\n  set @copy_12 = Field(@row, 'copy_12')\r\n  set @cta_12 = Field(@row, 'cta_12')\r\n  set @imgsrc_12 = Field(@row, 'imgsrc_12')\r\n  set @alttext_12 = Field(@row, 'alttext_12')\r\n\r\n  set @headline_13 = Field(@row, 'headline_13')\r\n  set @subheadline_13 = Field(@row, 'subheadline_13')\r\n  set @copy_13 = Field(@row, 'copy_13')\r\n  set @cta_13 = Field(@row, 'cta_13')\r\n  set @imgsrc_13 = Field(@row, 'imgsrc_13')\r\n  set @alttext_13 = Field(@row, 'alttext_13')\r\n\r\n  set @headline_14 = Field(@row, 'headline_14')\r\n  set @subheadline_14 = Field(@row, 'subheadline_14')\r\n  set @copy_14 = Field(@row, 'copy_14')\r\n  set @cta_14 = Field(@row, 'cta_14')\r\n  set @imgsrc_14 = Field(@row, 'imgsrc_14')\r\n  set @alttext_14 = Field(@row, 'alttext_14')\r\n\r\n  set @headline_15 = Field(@row, 'headline_15')\r\n  set @subheadline_15 = Field(@row, 'subheadline_15')\r\n  set @copy_15 = Field(@row, 'copy_15')\r\n  set @cta_15 = Field(@row, 'cta_15')\r\n  set @imgsrc_15 = Field(@row, 'imgsrc_15')\r\n  set @alttext_15 = Field(@row, 'alttext_15')\r\n\r\n  set @headline_16 = Field(@row, 'headline_16')\r\n  set @subheadline_16 = Field(@row, 'subheadline_16')\r\n  set @copy_16 = Field(@row, 'copy_16')\r\n  set @cta_16 = Field(@row, 'cta_16')\r\n  set @imgsrc_16 = Field(@row, 'imgsrc_16')\r\n  set @alttext_16 = Field(@row, 'alttext_16')\r\n\r\n  set @headline_17 = Field(@row, 'headline_17')\r\n  set @subheadline_17 = Field(@row, 'subheadline_17')\r\n  set @copy_17 = Field(@row, 'copy_17')\r\n  set @cta_17 = Field(@row, 'cta_17')\r\n  set @imgsrc_17 = Field(@row, 'imgsrc_17')\r\n  set @alttext_17 = Field(@row, 'alttext_17')\r\n\r\n  set @headline_18 = Field(@row, 'headline_18')\r\n  set @subheadline_18 = Field(@row, 'subheadline_18')\r\n  set @copy_18 = Field(@row, 'copy_18')\r\n  set @cta_18 = Field(@row, 'cta_18')\r\n  set @imgsrc_18 = Field(@row, 'imgsrc_18')\r\n  set @alttext_18 = Field(@row, 'alttext_18')\r\n\r\n  set @headline_19 = Field(@row, 'headline_19')\r\n  set @subheadline_19 = Field(@row, 'subheadline_19')\r\n  set @copy_19 = Field(@row, 'copy_19')\r\n  set @cta_19 = Field(@row, 'cta_19')\r\n  set @imgsrc_19 = Field(@row, 'imgsrc_19')\r\n  set @alttext_19 = Field(@row, 'alttext_19')\r\n\r\n  set @headline_20 = Field(@row, 'headline_20')\r\n  set @subheadline_20 = Field(@row, 'subheadline_20')\r\n  set @copy_20 = Field(@row, 'copy_20')\r\n  set @cta_20 = Field(@row, 'cta_20')\r\n  set @imgsrc_20 = Field(@row, 'imgsrc_20')\r\n  set @alttext_20 = Field(@row, 'alttext_20')\r\n\r\n  set @headline_21 = Field(@row, 'headline_21')\r\n  set @subheadline_21 = Field(@row, 'subheadline_21')\r\n  set @copy_21 = Field(@row, 'copy_21')\r\n  set @cta_21 = Field(@row, 'cta_21')\r\n  set @imgsrc_21 = Field(@row, 'imgsrc_21')\r\n  set @alttext_21 = Field(@row, 'alttext_21')\r\n\r\n  set @headline_22 = Field(@row, 'headline_22')\r\n  set @subheadline_22 = Field(@row, 'subheadline_22')\r\n  set @copy_22 = Field(@row, 'copy_22')\r\n  set @cta_22 = Field(@row, 'cta_22')\r\n  set @imgsrc_22 = Field(@row, 'imgsrc_22')\r\n  set @alttext_22 = Field(@row, 'alttext_22')\r\n\r\n  set @headline_23 = Field(@row, 'headline_23')\r\n  set @subheadline_23 = Field(@row, 'subheadline_23')\r\n  set @copy_23 = Field(@row, 'copy_23')\r\n  set @cta_23 = Field(@row, 'cta_23')\r\n  set @imgsrc_23 = Field(@row, 'imgsrc_23')\r\n  set @alttext_23 = Field(@row, 'alttext_23')\r\n\r\n  set @headline_24 = Field(@row, 'headline_24')\r\n  set @subheadline_24 = Field(@row, 'subheadline_24')\r\n  set @copy_24 = Field(@row, 'copy_24')\r\n  set @cta_24 = Field(@row, 'cta_24')\r\n  set @imgsrc_24 = Field(@row, 'imgsrc_24')\r\n  set @alttext_24 = Field(@row, 'alttext_24')\r\n\r\n  set @headline_25 = Field(@row, 'headline_25')\r\n  set @subheadline_25 = Field(@row, 'subheadline_25')\r\n  set @copy_25 = Field(@row, 'copy_25')\r\n  set @cta_25 = Field(@row, 'cta_25')\r\n  set @imgsrc_25 = Field(@row, 'imgsrc_25')\r\n  set @alttext_25 = Field(@row, 'alttext_25')\r\n\r\n\r\n\/* No Error - Log send to SDC_INT_SendLog DE *\/ \r\nInsertDE(@sendLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\r\n\r\nelse\r\n\r\n\/*Log error to@errorLogDEDE and Stop Send*\/  \r\nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\r\n\r\nRaiseError(@errorMSG,1,0,0,1)\r\nendif\r\n\r\n\/*\r\nTo add additional sections copy a section and change _x to the next number\r\n*\]\%\%",
"description": "AMPScript for INT Content Lookup",
"name": "INT_ContentLookup_DEV"
}


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);


//Create Dictionary Lookups DEV
var asset = {
"category": {
  "id": devSubFolderID,
  "name": devSubFolderName
    },
"assetType": {
  "id": 220,
  "name": "codesnippetblock"
  },
 "content": "\%\%[\nset @dictionaryDE = 'INT_Dictionary'\n\n/* International Dictionary Lookups */\n\n  /* @com sets the domain routing for global links */\n  set @comCheck = Lookup(@INT_Dictionary,@lang_region, \"Phrase\", \"com\")\n  if not empty(@comCheck) then \n    set @Phrase = @comCheck\n  else\n  set @com = Lookup(@INT_Dictionary,\"en-US\",\"Phrase\",\"com\")\n  endif\n\n  set @ValueCheck = Lookup(@INT_Dictionary,@lang_region, \"Phrase\", \"Phrase\")\n  if not empty(@ValueCheck) then \n    set @Phrase = @ValueCheck\n  else\n  set @Phrase = Lookup(@INT_Dictionary,\"en-US\",\"Phrase\",\"Phrase\")\n  endif\n  \n\n/*Social Links*/\n/*Facebook*/\nset @socialLink_FacebookCheck = Lookup(@INT_Dictionary,@lang_region, \"Phrase\", \"socialLink_Facebook\")\nif not empty(@socialLink_FacebookCheck) then \n  set @socialLink_Facebook = @socialLink_FacebookCheck\nelse\n set @socialLink_Facebook = Lookup(@INT_Dictionary,\"en-US\",\"Phrase\",\"socialLink_Facebook\")\nendif\n\n\n/* define global links */\nset @path = Concat(@baseURL,@com,\"urlPath\")\n\n]\%\%",
"description": "AMPScript for INT Dictionary",
"name": "INT_Dictionary_DEV"
}


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);






 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>