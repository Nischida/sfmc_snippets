//For list of all assets, view the ReadMe.md file

<script runat=server>
Platform.Load("Core","1.1.1");

 try {
// Temporary Testing Var; Remove this and the appending to folder/data extension names
var attempt = '_x';


//API Authentication; update: authBase, restBase, clientID, clientSecret vars with details from the SFMC Installed PKG
var authBase = 'https://mc1q10jrzwsds3bcgk0jjz2s8h80.auth.marketingcloudapis.com/';
var restBase = "https://mc1q10jrzwsds3bcgk0jjz2s8h80.rest.marketingcloudapis.com/";   
var clientId = 'uafzm4wvdyc7digq683cv3ys';
var clientSecret = 'W2aU6GMZ8BIBfRxs1JLG1ryn';


//List any supported languages within the array ['es-US','fr-CA']. This will add Fields to the INT_Dictionary Data Extension.
var supportedLanguages = ['en-US','zh-HK'];

//This fills in the description of all assets with brand specific details.
var descriptionCopy = ' for TLI Internationalization.';

//This sets the name of the initial Content Data Extensions
var streamName = 'TLI';


//Content Builder Folder Names
var rootFolderName = 'INT_Assets';
var codeBlockSubFolderName = 'INT_CodeBlocks';
var coreSubFolderName = 'Core Assets';
var devSubFolderName = 'Dev Assets';
var prodSubFolderName = 'Prod Assets';
var optSubFolderName = 'Optional Assets';

//Data Extension Asset Folder Names   
var parentFolderName = 'INT_DataExtensions' + attempt;
var supportingFolderName = 'Supporting Data Extensions' + attempt;
var logsFolderName = 'Logs' + attempt;
var dictionaryFolderName = 'Dictionary' + attempt;
var catalogFolderName = 'Catalog' + attempt;
var limitingFolderName = 'Send Limiting' + attempt;

var contentFolderName = 'Content Data Extensions' + attempt;
var contentSubFolderName = streamName + attempt;
var contentPRODFolderName = '_PROD' + attempt;
var contentSTGFolderName = '_STG' + attempt;
var rcContentFolderName = 'Reusable Content Data Extensions' + attempt;
var rcContentSubFolderName = 'Reusable Content' + attempt;


//Content Block Asset Names
var ampscriptEmailControlContentBlock = "INT_EmailControl";
var ampscriptCoreContentBlock = "INT_AMPScript_Core_PKG";
var ampscriptFooterContentBlock = "INT_AMPScript_Footer_PKG";
var ampscriptPRODContentContentBlock = "INT_ContentLookup_PROD";
var ampscriptPRODDictionaryContentBlock = "INT_Dictionary_PROD";
var ampscriptDEVContentContentBlock = "INT_ContentLookup_DEV";
var ampscriptDEVDictionaryContentBlock = "INT_Dictionary_DEV";
var ampscriptRCContentBlock = "INT_ReusableContent_Code";

var assetArray = ["INT_EmailControl","INT_AMPScript_Core_PKG","INT_AMPScript_Footer_PKG","INT_ContentLookup_PROD","INT_Dictionary_PROD","INT_ContentLookup_DEV","INT_Dictionary_DEV"];


//Data Extension Names; DO NOT RENAME - These are used in the AMPScript Code Snippets
var catalogDE = 'INT_EmailCatalog' + attempt;
var contentBlockCatalogDE = 'INT_AMPScriptCatalog' + attempt;
var sendLogDE = 'INT_SendLog' + attempt;
var errorLogDE = 'INT_ErrorLog' + attempt;
var noLangErrorDE = 'INT_NoLangErrorLog' + attempt;
var emailSendLimitingDE = 'INT_EmailSendLimiting' + attempt;
var globalSendLimitingDE = 'INT_GlobalSendLimiting' + attempt;
var sendLimitingLogDE = 'INT_SendLimitingLog' + attempt;
var dictionaryDE = 'INT_Dictionary' + attempt;


//Set Auth URL, and authHeaders
var url = authBase +'v2/token';
var contentType = 'application/json';
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

//Set Headers for RestAPI
var headerNames = ["Authorization"];
var headerValues = ["Bearer " + accessToken];   


//Assets Folder Endpoint
var url = restBase + "asset/v1/content/categories";

//Get Parent Folder ID
var categoryResult = HTTP.Get(url, headerNames, headerValues);
var response = Platform.Function.ParseJSON(categoryResult.Content);
var parentID = response.items[0].id;

//Create Root Folder
var asset = {
    "Name" : rootFolderName,
    "ParentId" : parentID
};   

var payload = Platform.Function.Stringify(asset);
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);

//Get Root Folder ID
var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:rootFolderName});
var rootID = result[0].ID


//Create CodeBlocks SubFolder
var asset = {
    "Name" : codeBlockSubFolderName,
    "ParentId" : rootID
};   

var payload = Platform.Function.Stringify(asset);
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);


var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:codeBlockSubFolderName});
var codeBlockSubFolderID = result[0].ID



//Create Core SubFolder
var asset = {
    "Name" : coreSubFolderName,
    "ParentId" : codeBlockSubFolderID
};   

var payload = Platform.Function.Stringify(asset);
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);


var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:coreSubFolderName});
var coreSubFolderID = result[0].ID


//Create Dev SubFolder
var asset = {
    "Name" : devSubFolderName,
    "ParentId" : codeBlockSubFolderID
};   

var payload = Platform.Function.Stringify(asset);
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);

var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:devSubFolderName});
var devSubFolderID = result[0].ID


//Create Prod SubFolder
var asset = {
    "Name" : prodSubFolderName,
    "ParentId" : codeBlockSubFolderID
};   

var payload = Platform.Function.Stringify(asset);
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);


var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:prodSubFolderName});
var prodSubFolderID = result[0].ID


//Create Optional Blocks SubFolder
var asset = {
    "Name" : optSubFolderName,
    "ParentId" : codeBlockSubFolderID
};   

var payload = Platform.Function.Stringify(asset);
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);


var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:optSubFolderName});
var optSubFolderID = result[0].ID



//Content Builder Assets Endpoint
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
 "content": "\%\%[\n/*\n**Controls Email Name Variables for lookups**\nNeeds to be set as it appears in the Email_Catalog and corresponding Content Data Extensions\n\n**Controls Prod/STG Content DE Selection**\n@is_stg == '' (pulls from Prod DEs)\n@is_stg == 'N' (pulls from Prod DEs)\n@is_stg == 'Y' (pulls from STG DEs)\n\n**Controls Prod/Dev AMPScript blocks for LanguageContentLookup and INT_Dictionary**\n@is_dev == '' (pulls from Prod AMPScript blocks)\n@is_dev == 'N' (pulls from Prod AMPScript blocks)\n@is_dev == 'Y' (pulls from STG AMPScript blocks)\n\n**Controls Prod/Dev AMPScript blocks for Footer**\n@is_footerDev == '' (pulls from Prod AMPScript blocks)\n@is_footerDev == 'N' (pulls from Prod AMPScript blocks)\n@is_footerDev == 'Y' (pulls from STG AMPScript blocks)\n*/\n\n/*Set ContentBlockID for core PKG*/\nset @INT_AMPScript_Core_PKG = Lookup('INT_AMPScriptCatalog','ID','AssetName','INT_AMPScript_Core_PKG')\n\n\nset @emailname = 'TLI_TestEmail'\nset @is_stg = 'N'\nset @is_dev = 'N'\nset @is_footerDev = 'N'\n]\%\%",
"description": "AMPScript for INT Email Control",
"name": ampscriptEmailControlContentBlock
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
 "content": "<!--\nThis block acts a a package for the LanguageContentLookup and INT_Dictionary AMPScript. With the addition of the @is_dev variable, we can now toggle between the Development and Production blocks from the Email Control AMPScript block rather than needing to adjust the ContentBlockById Function.\n\nThis block should be set as a Reference Content Block in all emails.\n-->\n\n\%\%[\n\n/* Set Dev and Prod Content Block IDs From INT_AMPScriptCatalog */\nset @devContent = Lookup('INT_AMPScriptCatalog','ID','AssetName','INT_ContentLookup_DEV')\nset @devDictionary = Lookup('INT_AMPScriptCatalog','ID','AssetName','INT_Dictionary_DEV')\nset @prodContent = Lookup('INT_AMPScriptCatalog','ID','AssetName','INT_ContentLookup_PROD')\nset @prodDictionary = Lookup('INT_AMPScriptCatalog','ID','AssetName','INT_Dictionary_PROD')\n\nif @is_dev == 'Y' then\n]\%\%\n\n<!--DEV LanguageContentLookup Block-->\n\%\%=ContentBlockById(@devContent)=\%\%\n<!--DEV INT_Dictionary Block-->\n\%\%=ContentBlockById(@devDictionary)=\%\%\n\n\%\%[elseif @is_dev == 'N' or @is_dev == '' then]\%\%\n\n<!--PROD LanguageContentLookup Block-->\n\%\%=ContentBlockById(@prodContent)=\%\%\n<!--PROD INT_Dictionary Block-->\n\%\%=ContentBlockById(@prodDictionary)=\%\%\n\n\%\%[endif]\%\%",
"description": "AMPScript for INT Core Package",
"name": ampscriptCoreContentBlock
};

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
 "content": "\%\%[\n/* Set Dev and Prod Content Block IDs From INT_AMPScriptCatalog */\nset @footerDev = Lookup('INT_AMPScriptCatalog','ID','AssetName','')\nset @footerProd = Lookup('INT_AMPScriptCatalog','ID','AssetName','')\n\nif @is_footerDev == 'Y' then\n]\%\%\n\n<!--Development Footer-->\n\%\%=ContentBlockById(@footerDev)=\%\%\n\n\%\%[elseif @is_footerDev == 'N' or @is_footerDev == '' then]\%\%\n\n<!--Production Footer-->\n\%\%=ContentBlockById(@footerProd)=\%\%\n\n\%\%[endif]\%\%",
"description": "AMPScript for INT Footer Package",
"name": ampscriptFooterContentBlock
};


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
 "content": "\%\%[\n/* Set Data Extension Names */\nset @catalogDE = 'INT_EmailCatalog'\nset @sendLogDE = 'INT_SendLog'\n\nset @errorLogDE = 'INT_ErrorLog'\nset @noLangErrorDE = 'INT_NoLangErrorLog'\n\nset @emailSendLimitingDE = 'INT_EmailSendLimiting'\nset @globalSendLimitingDE = 'INT_GlobalSendLimiting'\nset @sendLimitingLogDE = 'INT_SendLimitingLog'\n\nset @preferenceCenterDE = ''\n\n\n/* Start of Language Preference Identification*/\n\nif Empty(@preferenceCenterDE) then\nset @lang_region = 'en-US'\nelse\n/*\nPreference Center DE\nset @lang_region = Lookup('@preferenceCenterDE','language_preference','email_address',emailaddr)\n*/\nendif\n\n\n/*If no lang_region can be found RaiseError and Log*/\nif EMPTY(@lang_region) then\nset @errorMSG = Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey)\n\nInsertDE(@noLangErrorDE,'EmailAddress',emailaddr,'SendDate', Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG,'SubscriberKey',_subscriberkey)\n\nRaiseError(Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey),1,0,0,1)\nendif\n\n/* End of Language Preference Identification*/\n\n\nset @today = Now()\n\n/****Start Email Exclusion Limiting****/\nset @emailExcludeRows = LookupRows(@emailSendLimitingDE,'emailname',@emailname)\nset @emailExcludeRowCount = RowCount(@emailExcludeRows)\n\nif @emailExcludeRowCount == 0 then\nelse\n\n  for @e = 1 to @emailExcludeRowCount do\n  set @emailExcludeRow = Row(@emailExcludeRows, @e)\n  set @lang_regionExclude = Field(@emailExcludeRow,'lang_regionExclusions')\n  set @ongoing = Field(@emailExcludeRow,'ongoing')\n  \n  if @today >= Field(@emailExcludeRow,'StartDate') and @today <= Field(@emailExcludeRow,'EndDate') then\n    set @emailExcludeActive = 1\n  elseif @ongoing == 1 then\n    set @emailExcludeActive = 1\n  else\n    set @emailExcludeActive = 0\n  endif\n\n    if IndexOf(@lang_regionExclude,@lang_region) > 0 and @emailExcludeActive == 1 then\n\n      set @emailMSG = Concat('Email Lang_Region Exclusion: ',@lang_regionExclude)\n\n       InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@emailMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\n       RaiseError(Concat('Email -- Regions excluded in this send: ', @lang_regionExclude),1,0,0,1)\n    endif\n  next @e\nendif\n\n/****Start Global Exclusion Limiting****/\n\nset @globalRows = LookupRows(@globalSendLimitingDE,'LookupValue','1')\nset @globalCount = RowCount(@globalRows)\n\nif @globalCount == 0 then\nelse\n\nfor @g = 1 to @globalCount do\n  set @globalRow = Row(@globalRows, @d)\n  set @dOngoing = Field(@globalRow,'ongoing')\n  \nif @today >= Field(@globalRow,'StartDate') and @today <= Field(@globalRow,'EndDate') then\n  set @globalActive = 1\nelseif  @gOngoing == 1 then\n  set @globalActive = 1\nelse\n  set @globalActive = 0\nendif\n\n\n  /*Pulls list of Lang_Regions to exclude from global sends */\n  set @globalLang_Region = Field(@globalRow,'lang_regionExclusions')\n\n  if IndexOf(@globalLang_Region,@lang_region) >= 1 and @globalActive == 1 then\n  set @globalMSG = Concat('Global Lang_Region Exclusion: ',@globalLang_Region)\n\n  InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@disMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\n     RaiseError(Concat('Global -- Regions excluded in this send: ', @globalLang_Region),1,0,0,1)\n  endif\n\nnext @g\nendif\n\n\n/* Error -- Not in Email Catalog */\nif RowCount(LookupRows(@catalogDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\nset @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the Email Catalog data extension.')\n\n InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\nRaiseError(@errorMSG,1,0,0,1)\nendif\n\n\n/*Lookup Data Extensions, StreamName and JourneyName in Email catalog*/\nset @prodDE = Lookup(@catalogDE, 'prodDE', 'emailname', @emailname,'lang_region',@lang_region)\nset @stgDE = Lookup(@catalogDE, 'stgDE', 'emailname', @emailname,'lang_region',@lang_region)\n\n\n\n/* Error -- Not STG and Nothing in prodDE */\nif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n\n set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@prodDE,'  data extension.')\n \nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',\n_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\nRaiseError(@errorMSG,1,0,0,1)\n\n\n/* Start Find Correct DE for Content */\n\n/* Error -- is STG and Nothing in stgDE*/\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@stgDE,'  data extension.')\n  \n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\n  RaiseError(@errorMSG,1,0,0,1)\n\n\n/* No Error -- is STG and has records in stgDE */\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\nset @deName = @stgDE\n\n\n/* No Error -- Empty STG and has records in prodDE*/\nelseif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\n set @deName = @prodDE\n\n\n /* No Error - is not STG and Records in prodDE*/\nelseif @is_stg == 'N' and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\n set @deName = @prodDE\n\nendif\n\n/* End Find Correct DE for Content */\n\n\n\n/* Error -- Ensure that there is a content row to pull from when @deName is set*/\nif RowCount(LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' has no records in ',@deName)\n\n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\n  RaiseError(@errorMSG,1,0,0,1)\nendif\n\n\n/*\nNo Error -- If no errors are found, look up values in the correct DE, log send. If there are errors Raise/Log Error Message\n*/\n\n/* Start Content Lookups */\nif Empty(@errorMSG) then\n set @contentRow = LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)\n set @row = Row(@contentRow, 1)\n  set @emailname = Field(@row, 'emailname')\n\n  set @subject = Field(@row, 'subject')\n  set @preheader = Field(@row, 'preheader')\n\n  set @headline_1 = Field(@row, 'headline_1')\n  set @subheadline_1 = Field(@row, 'subheadline_1')\n  set @copy_1 = Field(@row, 'copy_1')\n  set @cta_1 = Field(@row, 'cta_1')\n  set @imgsrc_1 = Field(@row, 'imgsrc_1')\n  set @alttext_1 = Field(@row, 'alttext_1')\n  \n  set @headline_2 = Field(@row, 'headline_2')\n  set @subheadline_2 = Field(@row, 'subheadline_2')\n  set @copy_2 = Field(@row, 'copy_2')\n  set @cta_2 = Field(@row, 'cta_2')\n  set @imgsrc_2 = Field(@row, 'imgsrc_2')\n  set @alttext_2 = Field(@row, 'alttext_2')\n\n  set @headline_3 = Field(@row, 'headline_3')\n  set @subheadline_3 = Field(@row, 'subheadline_3')\n  set @copy_3 = Field(@row, 'copy_3')\n  set @cta_3 = Field(@row, 'cta_3')\n  set @imgsrc_3 = Field(@row, 'imgsrc_3')\n  set @alttext_3 = Field(@row, 'alttext_3')\n\n  set @headline_4 = Field(@row, 'headline_4')\n  set @subheadline_4 = Field(@row, 'subheadline_4')\n  set @copy_4 = Field(@row, 'copy_4')\n  set @cta_4 = Field(@row, 'cta_4')\n  set @imgsrc_4 = Field(@row, 'imgsrc_4')\n  set @alttext_4 = Field(@row, 'alttext_4')\n  \n\n\n/* No Error - Log send to_INT_SendLog DE */ \nInsertDE(@sendLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\nelse\n\n/*Log error to@errorLogDEDE and Stop Send*/  \nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\nRaiseError(@errorMSG,1,0,0,1)\nendif\n\n/*\nTo add additional sections copy a section and change _x to the next number\n*]\%\%\n\n\n<!-- PreHeader Control -->\%\%[if Not Empty(@preheader) then]\%\%<div style=\"display: none; max-height: 0px; overflow: hidden;\">\%\%=TreatAsContent(@preheader)=\%\%</div><!-- Insert &zwnj;&nbsp; hack after hidden preview text --><div style=\"display: none; max-height: 0px; overflow: hidden;\">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>\n\%\%[endif]\%\%",
"description": "AMPScript for INT Content Lookup",
"name": ampscriptPRODContentContentBlock
};

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
 "content": "\%\%[\nset @dictionaryDE = 'INT_Dictionary'\n\n/* International Dictionary Lookups */\n\n/* @com sets the domain routing for global links */\n  \n  set @comCheck = Lookup(@dictionaryDE,@lang_region, \"Phrase\", \"com\")\n  if not empty(@comCheck) then \n    set @Phrase = @comCheck\n  else\n  set @com = Lookup(@dictionaryDE,\"en-US\",\"Phrase\",\"com\")\n  endif\n  \n  \n/*\n  set @PhraseCheck = Lookup(@dictionaryDE,@lang_region, \"Phrase\", \"Phrase\")\n  if not empty(@PhraseCheck) then \n    set @Phrase = @PhraseCheck\n  else\n  set @Phrase = Lookup(@dictionaryDE,\"en-US\",\"Phrase\",\"Phrase\")\n  endif\n*/\n\n\nset @baseURL = 'https://TrendlineInteractive.com/'\n\n/* define global links */\nset @path = Concat(@baseURL,@com,\"urlPath\")\n\n]\%\%",
"description": "AMPScript for INT Dictionary",
"name": ampscriptPRODDictionaryContentBlock
};


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
 "content": "\%\%[\n/* Set Data Extension Names */\nset @catalogDE = 'INT_EmailCatalog'\nset @sendLogDE = 'INT_SendLog'\n\nset @errorLogDE = 'INT_ErrorLog'\nset @noLangErrorDE = 'INT_NoLangErrorLog'\n\nset @emailSendLimitingDE = 'INT_EmailSendLimiting'\nset @globalSendLimitingDE = 'INT_GlobalSendLimiting'\nset @sendLimitingLogDE = 'INT_SendLimitingLog'\n\nset @preferenceCenterDE = ''\n\n\n/* Start of Language Preference Identification*/\n\nif Empty(@preferenceCenterDE) then\nset @lang_region = 'en-US'\nelse\n/*\nPreference Center DE\nset @lang_region = Lookup('@preferenceCenterDE','language_preference','email_address',emailaddr)\n*/\nendif\n\n\n/*If no lang_region can be found RaiseError and Log*/\nif EMPTY(@lang_region) then\nset @errorMSG = Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey)\n\nInsertDE(@noLangErrorDE,'EmailAddress',emailaddr,'SendDate', Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG,'SubscriberKey',_subscriberkey)\n\nRaiseError(Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey),1,0,0,1)\nendif\n\n/* End of Language Preference Identification*/\n\n\nset @today = Now()\n\n/****Start Email Exclusion Limiting****/\nset @emailExcludeRows = LookupRows(@emailSendLimitingDE,'emailname',@emailname)\nset @emailExcludeRowCount = RowCount(@emailExcludeRows)\n\nif @emailExcludeRowCount == 0 then\nelse\n\n  for @e = 1 to @emailExcludeRowCount do\n  set @emailExcludeRow = Row(@emailExcludeRows, @e)\n  set @lang_regionExclude = Field(@emailExcludeRow,'lang_regionExclusions')\n  set @ongoing = Field(@emailExcludeRow,'ongoing')\n  \n  if @today >= Field(@emailExcludeRow,'StartDate') and @today <= Field(@emailExcludeRow,'EndDate') then\n    set @emailExcludeActive = 1\n  elseif @ongoing == 1 then\n    set @emailExcludeActive = 1\n  else\n    set @emailExcludeActive = 0\n  endif\n\n    if IndexOf(@lang_regionExclude,@lang_region) > 0 and @emailExcludeActive == 1 then\n\n      set @emailMSG = Concat('Email Lang_Region Exclusion: ',@lang_regionExclude)\n\n       InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@emailMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\n       RaiseError(Concat('Email -- Regions excluded in this send: ', @lang_regionExclude),1,0,0,1)\n    endif\n  next @e\nendif\n\n/****Start Global Exclusion Limiting****/\n\nset @globalRows = LookupRows(@globalSendLimitingDE,'LookupValue','1')\nset @globalCount = RowCount(@globalRows)\n\nif @globalCount == 0 then\nelse\n\nfor @g = 1 to @globalCount do\n  set @globalRow = Row(@globalRows, @d)\n  set @dOngoing = Field(@globalRow,'ongoing')\n  \nif @today >= Field(@globalRow,'StartDate') and @today <= Field(@globalRow,'EndDate') then\n  set @globalActive = 1\nelseif  @gOngoing == 1 then\n  set @globalActive = 1\nelse\n  set @globalActive = 0\nendif\n\n\n  /*Pulls list of Lang_Regions to exclude from global sends */\n  set @globalLang_Region = Field(@globalRow,'lang_regionExclusions')\n\n  if IndexOf(@globalLang_Region,@lang_region) >= 1 and @globalActive == 1 then\n  set @globalMSG = Concat('Global Lang_Region Exclusion: ',@globalLang_Region)\n\n  InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@disMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\n     RaiseError(Concat('Global -- Regions excluded in this send: ', @globalLang_Region),1,0,0,1)\n  endif\n\nnext @g\nendif\n\n\n/* Error -- Not in Email Catalog */\nif RowCount(LookupRows(@catalogDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\nset @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the Email Catalog data extension.')\n\n InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\nRaiseError(@errorMSG,1,0,0,1)\nendif\n\n\n/*Lookup Data Extensions, StreamName and JourneyName in Email catalog*/\nset @prodDE = Lookup(@catalogDE, 'prodDE', 'emailname', @emailname,'lang_region',@lang_region)\nset @stgDE = Lookup(@catalogDE, 'stgDE', 'emailname', @emailname,'lang_region',@lang_region)\n\n\n\n/* Error -- Not STG and Nothing in prodDE */\nif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n\n set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@prodDE,'  data extension.')\n \nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',\n_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\nRaiseError(@errorMSG,1,0,0,1)\n\n\n/* Start Find Correct DE for Content */\n\n/* Error -- is STG and Nothing in stgDE*/\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@stgDE,'  data extension.')\n  \n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\n  RaiseError(@errorMSG,1,0,0,1)\n\n\n/* No Error -- is STG and has records in stgDE */\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\nset @deName = @stgDE\n\n\n/* No Error -- Empty STG and has records in prodDE*/\nelseif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\n set @deName = @prodDE\n\n\n /* No Error - is not STG and Records in prodDE*/\nelseif @is_stg == 'N' and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\n set @deName = @prodDE\n\nendif\n\n/* End Find Correct DE for Content */\n\n\n\n/* Error -- Ensure that there is a content row to pull from when @deName is set*/\nif RowCount(LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' has no records in ',@deName)\n\n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\n  RaiseError(@errorMSG,1,0,0,1)\nendif\n\n\n/*\nNo Error -- If no errors are found, look up values in the correct DE, log send. If there are errors Raise/Log Error Message\n*/\n\n/* Start Content Lookups */\nif Empty(@errorMSG) then\n set @contentRow = LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)\n set @row = Row(@contentRow, 1)\n  set @emailname = Field(@row, 'emailname')\n\n  set @subject = Field(@row, 'subject')\n  set @preheader = Field(@row, 'preheader')\n\n  set @headline_1 = Field(@row, 'headline_1')\n  set @subheadline_1 = Field(@row, 'subheadline_1')\n  set @copy_1 = Field(@row, 'copy_1')\n  set @cta_1 = Field(@row, 'cta_1')\n  set @imgsrc_1 = Field(@row, 'imgsrc_1')\n  set @alttext_1 = Field(@row, 'alttext_1')\n  \n  set @headline_2 = Field(@row, 'headline_2')\n  set @subheadline_2 = Field(@row, 'subheadline_2')\n  set @copy_2 = Field(@row, 'copy_2')\n  set @cta_2 = Field(@row, 'cta_2')\n  set @imgsrc_2 = Field(@row, 'imgsrc_2')\n  set @alttext_2 = Field(@row, 'alttext_2')\n\n  set @headline_3 = Field(@row, 'headline_3')\n  set @subheadline_3 = Field(@row, 'subheadline_3')\n  set @copy_3 = Field(@row, 'copy_3')\n  set @cta_3 = Field(@row, 'cta_3')\n  set @imgsrc_3 = Field(@row, 'imgsrc_3')\n  set @alttext_3 = Field(@row, 'alttext_3')\n\n  set @headline_4 = Field(@row, 'headline_4')\n  set @subheadline_4 = Field(@row, 'subheadline_4')\n  set @copy_4 = Field(@row, 'copy_4')\n  set @cta_4 = Field(@row, 'cta_4')\n  set @imgsrc_4 = Field(@row, 'imgsrc_4')\n  set @alttext_4 = Field(@row, 'alttext_4')\n  \n\n\n/* No Error - Log send to_INT_SendLog DE */ \nInsertDE(@sendLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\nelse\n\n/*Log error to@errorLogDEDE and Stop Send*/  \nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\nRaiseError(@errorMSG,1,0,0,1)\nendif\n\n/*\nTo add additional sections copy a section and change _x to the next number\n*]\%\%\n\n\n<!-- PreHeader Control -->\%\%[if Not Empty(@preheader) then]\%\%<div style=\"display: none; max-height: 0px; overflow: hidden;\">\%\%=TreatAsContent(@preheader)=\%\%</div><!-- Insert &zwnj;&nbsp; hack after hidden preview text --><div style=\"display: none; max-height: 0px; overflow: hidden;\">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>\n\%\%[endif]\%\%",
"description": "AMPScript for INT Content Lookup",
"name": ampscriptDEVContentContentBlock
};

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
 "content": "\%\%[\nset @dictionaryDE = 'INT_Dictionary'\n\n/* International Dictionary Lookups */\n\n/* @com sets the domain routing for global links */\n  \n  set @comCheck = Lookup(@dictionaryDE,@lang_region, \"Phrase\", \"com\")\n  if not empty(@comCheck) then \n    set @Phrase = @comCheck\n  else\n  set @com = Lookup(@dictionaryDE,\"en-US\",\"Phrase\",\"com\")\n  endif\n  \n  \n/*\n  set @PhraseCheck = Lookup(@dictionaryDE,@lang_region, \"Phrase\", \"Phrase\")\n  if not empty(@PhraseCheck) then \n    set @Phrase = @PhraseCheck\n  else\n  set @Phrase = Lookup(@dictionaryDE,\"en-US\",\"Phrase\",\"Phrase\")\n  endif\n*/\n\n\nset @baseURL = 'https://TrendlineInteractive.com/'\n\n/* define global links */\nset @path = Concat(@baseURL,@com,\"urlPath\")\n\n]\%\%",
"description": "AMPScript for INT Dictionary",
"name": ampscriptDEVDictionaryContentBlock
};

var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);


//Create Optional Content Blocks
//Create Reusable Content Block
var asset = {
"category": {
  "id": optSubFolderID,
  "name": optSubFolderName
    },
"assetType": {
  "id": 220,
  "name": "codesnippetblock"
  },
 "content": "\%\%[\n/* \nIf this block throws an error, should it error out the send for this subscriber? \n\n@stopSend = 'Y' //Stops Sends\n@stopSend = 'N' //Does Not Stop Sends\n@stopSend = ''  //Does Not Stop Sends\n*/\n\nset @stopSend = ''\n\n\n/* To set Reusable Content Block Limiting place the lang_regions you want to exclude */\n\nset @exclude = ''\n\nif IndexOf(@exclude, @lang_region) == 0 then\n\n\n/*Set Content Block ID*/\nset @contentBlockID = ''\n\n/*Set RC content DE*/\nset @ROM_STG = IIF(IndexOf(@deName,'ROM_STG')>0,1,0)\nset @SYM_STG = IIF(IndexOf(@deName,'SYM_STG')>0,1,0)\nset @ROM_PROD = IIF(IndexOf(@deName,'ROM_PROD')>0,1,0)\nset @SYM_PROD = IIF(IndexOf(@deName,'SYM_PROD')>0,1,0)\n\nif @ROM_STG == 1 then\n  set @RC_DE = 'ReusableContent_ROM_STG'\nelseif @SYM_STG == 1 then\n  set @RC_DE = 'ReusableContent_SYM_STG'\nelseif @ROM_PROD == 1 then\n  set @RC_DE = 'ReusableContent_ROM_PROD'\nelseif @SYM_PROD == 1 then\n  set @RC_DE = 'ReusableContent_SYM_PROD'\n\n/*Unable to Identify Data Extension*/\nelseif @ROM_STG == 0 and @SYM_STG == 0 and @ROM_PROD == 0 and @SYM_PROD == 0 then\n  set @errorMSG = Concat('Unable to identify ReusableContent Data Extension.')\n\n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\n if @stopSends == 'Y' then\n  RaiseError(@errorMSG,1,0,0,1)\n elseif @stopSends == 'N' or Empty(@stopSends) then\n endif\nendif\n\n\n/*Error Logging*/\n/*No Content Block ID Set*/\nif Empty(@contentBlockID) then\nset @errorMSG = Concat('No contentBlockID set for ', emailname_ ,'.')\n\n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\n if @stopSends == 'Y' then\n  RaiseError(@errorMSG,1,0,0,1)\n elseif @stopSends == 'N' or Empty(@stopSends) then\n endif\n\n/*Content Block ID Set and No Record in Data Extension*/\nelseif Not Empty(@contentBlockID) and RowCount(LookupRows(@RC_DE,'contentBlockID',@contentBlockID,'lang_region',@lang_region)) == 0 then\n\n set @errorMSG = Concat('No record for ', @contentBlockID, ' in the ',@RC_DE,' data extension.' )\n\n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\n if @stopSends == 'Y' then\n  RaiseError(@errorMSG,1,0,0,1)\n elseif @stopSends == 'N' or Empty(@stopSends) then\n endif\n\nendif\n\nset @contentRow = LookupRows(@RC_DE,'contentBlockID',@contentBlockID,'lang_region',@lang_region)\nset @row = Row(@contentRow, 1)\n\n set @rc_headline_1 = Field(@row, 'rc_headline_1')\n set @rc_subheadline_1 = Field(@row, 'rc_subheadline_1')\n set @rc_copy_1 = Field(@row, 'rc_copy_1')\n set @rc_cta_1 = Field(@row, 'rc_cta_1')\n set @rc_imgsrc_1 = Field(@row, 'rc_imgsrc_1')\n\n set @rc_headline_2 = Field(@row, 'rc_headline_2')\n set @rc_subheadline_2 = Field(@row, 'rc_subheadline_2')\n set @rc_copy_2 = Field(@row, 'rc_copy_2')\n set @rc_cta_2 = Field(@row, 'rc_cta_2')\n set @rc_imgsrc_2 = Field(@row, 'rc_imgsrc_2')\n\n set @rc_headline_3 = Field(@row, 'rc_headline_3')\n set @rc_subheadline_3 = Field(@row, 'rc_subheadline_3')\n set @rc_copy_3 = Field(@row, 'rc_copy_3')\n set @rc_cta_3 = Field(@row, 'rc_cta_3')\n set @rc_imgsrc_3 = Field(@row, 'rc_imgsrc_3')\n\n set @rc_headline_4 = Field(@row, 'rc_headline_4')\n set @rc_subheadline_4 = Field(@row, 'rc_subheadline_4')\n set @rc_copy_4 = Field(@row, 'rc_copy_4')\n set @rc_cta_4 = Field(@row, 'rc_cta_4')\n set @rc_imgsrc_4 = Field(@row, 'rc_imgsrc_4')\n \n/*\nTo add additional sections copy a section and change _x to the next number\n*/\n]\%\%\n\n\n<!-- CONTENT BLOCK HTML HERE -->\n\n\n\%\%[ENDIF]\%\%\n",
"description": "AMPScript for Reusable Content Blocks. Copy this code into your reusable content block, it should not be used directly. See Documentation for details.",
"name": ampscriptRCContentBlock
};

var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);




//Create Folders and Data Extensions

//Get Root Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {Property:"Name",SimpleOperator:"equals",Value:"Data Extensions"};

var folderData = folderProx.retrieve("DataFolder", cols, filter);
var rootID = folderData.Results[0].ID;


//Create Parent Folder
var description = "Parent Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : parentFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : rootID
};

var status = Folder.Add(newFolder);

//Get Parent Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: parentFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: rootID
  }
};

var folderData = folderProx.retrieve("DataFolder", cols, filter);
var parentFolderID = folderData.Results[0].ID;


//Create Supporting Folder
var description = "Supporting DEs Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : supportingFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : parentFolderID
};

var status = Folder.Add(newFolder);


//Get Supporting Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: supportingFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: parentFolderID
  }
};


var folderData = folderProx.retrieve("DataFolder", cols, filter);
var supportingFolderID = folderData.Results[0].ID;


//Create Catalog Folder
var description = "Catalog Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : catalogFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : supportingFolderID
};

var status = Folder.Add(newFolder);


//Get Catalog Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: catalogFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: supportingFolderID
  }
};

var folderData = folderProx.retrieve("DataFolder", cols, filter);
var catalogFolderID = folderData.Results[0].ID;


//Create Catalog DE
var prox = new Script.Util.WSProxy();
var description = "Catalog DE" + descriptionCopy;
var deGUID = Platform.Function.GUID();

var deFields = {
    Name: catalogDE,
    CustomerKey: deGUID,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "emailname",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "lang_region",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "prodDE",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "stgDE",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
    ],
    CategoryID: catalogFolderID
};

var res = prox.createItem("DataExtension", deFields);



//Upsert Testing Content into Catalog DE
var prox = new Script.Util.WSProxy();

/* Build DE Object */
var updateObject = {
    CustomerKey: deGUID,
    Properties: [
         {
            Name: 'emailname',
            Value: 'TLI_TestEmail'
        },
         {
            Name: 'lang_region',
            Value: 'en-US'
        },
         {
            Name: 'prodDE',
            Value: streamName + contentPRODFolderName
        },
         {
            Name: 'stgDE',
            Value: streamName + contentSTGFolderName
        }
    ]
};

var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

var res = prox.updateItem('DataExtensionObject', updateObject, options);


/* Build DE Object */
var updateObject = {
    CustomerKey: deGUID,
    Properties: [
         {
            Name: 'emailname',
            Value: 'TLI_TestEmail'
        },
         {
            Name: 'lang_region',
            Value: 'zh-HK'
        },
         {
            Name: 'prodDE',
            Value: streamName + contentPRODFolderName
        },
         {
            Name: 'stgDE',
            Value: streamName + contentSTGFolderName
        }
    ]
};


var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

var res = prox.updateItem('DataExtensionObject', updateObject, options);


//Create Content Block Catalog DE
var prox = new Script.Util.WSProxy();
var description = "Core Content Block Catalog DE" + descriptionCopy;
var deGUID = Platform.Function.GUID();

var deFields = {
    Name: contentBlockCatalogDE,
    CustomerKey: deGUID,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "AssetName",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "ID",MaxLength: 100,IsNillable: false,IsRequired: true}
      
    ],
    CategoryID: catalogFolderID
};

var res = prox.createItem("DataExtension", deFields);




for(i = 0; i < assetArray.length; i++){

//Get Content Block Asset IDs
var filter = "?$filter=Name%20like%20'" + assetArray[i] + "'"

var urlFilter = url + filter
   
var result = HTTP.Get(urlFilter, headerNames, headerValues);
var response = Platform.Function.ParseJSON(result.Content);
var assetID = response.items[0].id;   


//Upsert Core AMPScrpit IDs into Content Block Catalog DE
var prox = new Script.Util.WSProxy();

// Build DE Object
var updateObject = {
    CustomerKey: deGUID,
    Properties: [
         {
            Name: 'AssetName',
            Value: assetArray[i]
        },
         {
            Name: 'ID',
            Value: assetID
        }
    ]
};

var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

var res = prox.updateItem('DataExtensionObject', updateObject, options);
  
};



//Create Dictionary Folder
var description = "Dictionary Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : dictionaryFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : supportingFolderID
};

var status = Folder.Add(newFolder);


//Get Dictionary Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: dictionaryFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: supportingFolderID
  }
};

var folderData = folderProx.retrieve("DataFolder", cols, filter);
var dictionaryFolderID = folderData.Results[0].ID;


//Create Dictionary DE
var prox = new Script.Util.WSProxy();
var description = "Dictionary DE" + descriptionCopy;
var deGUID = Platform.Function.GUID();

var deFields = {
    Name: dictionaryDE,
    CustomerKey: deGUID,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "Phrase",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true}
    ],
    CategoryID: dictionaryFolderID
};

var res = prox.createItem("DataExtension", deFields);


//Use the supportedLanguages array at the top to input initial languages
for(y = 0; y < supportedLanguages.length; y++){
    var updateProx = new Script.Util.WSProxy(); 
    var name = supportedLanguages[y];   

    var deField = [
      {FieldType: "Text",Name: name,MaxLength: 4000,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
    ];
  
   var Props = { 
        CustomerKey: deGUID,
        Fields: deField 
    };
  
    var res = updateProx.updateItem("DataExtension", Props);
};



//Upsert Testing Content into Catalog DE
var prox = new Script.Util.WSProxy();

/* Build DE Object */
var updateObject = {
    CustomerKey: deGUID,
    Properties: [
         {
            Name: 'Phrase',
            Value: 'com'
        },
         {
            Name: 'en-US',
            Value: '.com'
        }
    ]
};

var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

var res = prox.updateItem('DataExtensionObject', updateObject, options);


//Create Send Limiting Folder
var description = "Send Limiting Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : limitingFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : supportingFolderID
};

var status = Folder.Add(newFolder);


//Get Send Limiting Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: limitingFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: supportingFolderID
  }
};

var folderData = folderProx.retrieve("DataFolder", cols, filter);
var limitingFolderID = folderData.Results[0].ID;


//Create Global Send Limiting DE
var prox = new Script.Util.WSProxy();
var description = "Global Send Limiting DE" + descriptionCopy;
var deGUID = Platform.Function.GUID();

var deFields = {
    Name: globalSendLimitingDE,
    CustomerKey: deGUID,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "editKey",MaxLength: 10,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "lang_regionExcludes", MaxLength: 400, IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Date",Name: "StartDate", IsPrimaryKey: false, IsNillable: true, IsRequired: false},
      {FieldType: "Date",Name: "EndDate", IsPrimaryKey: false, IsNillable: true, IsRequired: false},
      {FieldType: "Boolean",Name: "ongoing", IsPrimaryKey: false, IsNillable: true, IsRequired: false},
      {FieldType: "Text",Name: "LookupValue", MaxLength: 1, IsPrimaryKey: false, IsNillable: false, IsRequired: false, DefaultValue: "1"}
    ],
    CategoryID: limitingFolderID
};

var res = prox.createItem("DataExtension", deFields);


//Create Email Send Limiting DE
var prox = new Script.Util.WSProxy();
var description = "Email Send Limiting DE" + descriptionCopy;
var deGUID = Platform.Function.GUID();

var deFields = {
    Name: emailSendLimitingDE,
    CustomerKey: deGUID,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "editKey",MaxLength: 10,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "emailname", MaxLength: 400, IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "lang_regionExcludes", MaxLength: 400, IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Date",Name: "StartDate", IsPrimaryKey: false, IsNillable: true, IsRequired: false},
      {FieldType: "Date",Name: "EndDate", IsPrimaryKey: false, IsNillable: true, IsRequired: false},
      {FieldType: "Boolean",Name: "ongoing", IsPrimaryKey: false, IsNillable: true, IsRequired: false}
    ],
    CategoryID: limitingFolderID
};

var res = prox.createItem("DataExtension", deFields);



//Create Logging Folder
var description = "Logging DEs Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : logsFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : parentFolderID
};

var status = Folder.Add(newFolder);


//Get Logging Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: logsFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: parentFolderID
  }
};


var folderData = folderProx.retrieve("DataFolder", cols, filter);
var logsFolderID = folderData.Results[0].ID;



//Create Email Send Limiting Log DE
var prox = new Script.Util.WSProxy();
var description = "Email Send Limit Log DE" + descriptionCopy;
var deGUID = Platform.Function.GUID();

var deFields = {
    Name: sendLimitingLogDE,
    CustomerKey: deGUID,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "EmailName", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "Lang_Region", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Date",Name: "SendDate", IsPrimaryKey: false, IsNillable: true, IsRequired: false},
      {FieldType: "Text",Name: "JobID", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "BatchID", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "DataSourceName", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "Exclude_Identifier", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "Contact_Key", IsPrimaryKey: false, IsNillable: true, IsRequired: true}
    ],
    CategoryID: logsFolderID
};

var res = prox.createItem("DataExtension", deFields);


//Create Send Log DE
var prox = new Script.Util.WSProxy();
var description = "Email Send Log DE" + descriptionCopy;
var deGUID = Platform.Function.GUID();

var deFields = {
    Name: sendLogDE,
    CustomerKey: deGUID,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "EmailName", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "Contact_Key", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "Lang_Region", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Date",Name: "SendDate", IsPrimaryKey: false, IsNillable: true, IsRequired: false},
      {FieldType: "Text",Name: "JobID", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "BatchID", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "DataSourceName", IsPrimaryKey: false, IsNillable: true, IsRequired: true}
    ],
    CategoryID: logsFolderID
};

var res = prox.createItem("DataExtension", deFields);


//Create Error Log DE
var prox = new Script.Util.WSProxy();
var description = "Email Error Log DE" + descriptionCopy;
var deGUID = Platform.Function.GUID();

var deFields = {
    Name: errorLogDE,
    CustomerKey: deGUID,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "EmailName", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "Contact_Key", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "Lang_Region", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Date",Name: "SendDate", IsPrimaryKey: false, IsNillable: true, IsRequired: false},
      {FieldType: "Text",Name: "JobID", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "BatchID", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "DataSourceName", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "Error", IsPrimaryKey: false, IsNillable: true, IsRequired: true}
    ],
    CategoryID: logsFolderID
};

var res = prox.createItem("DataExtension", deFields);



//Create No Language Error Loging DE
var prox = new Script.Util.WSProxy();
var description = "Email Send Limit Log DE" + descriptionCopy;
var deGUID = Platform.Function.GUID();

var deFields = {
    Name: noLangErrorDE,
    CustomerKey: deGUID,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "EmailName", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "Contact_Key", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "Lang_Region", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Date",Name: "SendDate", IsPrimaryKey: false, IsNillable: true, IsRequired: false},
      {FieldType: "Text",Name: "JobID", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "BatchID", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "DataSourceName", IsPrimaryKey: false, IsNillable: true, IsRequired: true},
      {FieldType: "Text",Name: "Error", IsPrimaryKey: false, IsNillable: true, IsRequired: true}

    ],
    CategoryID: logsFolderID
};

var res = prox.createItem("DataExtension", deFields);


//Create Content Data Extension Folder
var description = "Content DEs Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : contentFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : parentFolderID
};

var status = Folder.Add(newFolder);


//Get Content Data Extension ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: contentFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: parentFolderID
  }
};


var folderData = folderProx.retrieve("DataFolder", cols, filter);
var contentFolderID = folderData.Results[0].ID;



//Create Stream Content Folder
var description = "Content DEs Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : contentSubFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : contentFolderID
};

var status = Folder.Add(newFolder);


//Get Stream Content Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: contentSubFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: contentFolderID
  }
};


var folderData = folderProx.retrieve("DataFolder", cols, filter);
var contentSubFolderID = folderData.Results[0].ID;


//Create Stream Prod Content Folder
var description = "Content DEs Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : streamName + contentPRODFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : contentSubFolderID
};

var status = Folder.Add(newFolder);


//Get Stream Prod Content Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: streamName + contentPRODFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: contentSubFolderID
  }
};


var folderData = folderProx.retrieve("DataFolder", cols, filter);
var contentPRODFolderID = folderData.Results[0].ID;


//Create Stream STG Content Folder
var description = "Content DEs Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : streamName + contentSTGFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : contentSubFolderID
};

var status = Folder.Add(newFolder);


//Get Stream STG Content Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: streamName + contentSTGFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: contentSubFolderID
  }
};


var folderData = folderProx.retrieve("DataFolder", cols, filter);
var contentSTGFolderID = folderData.Results[0].ID;


//Set Content DE Guids
var stgGuidROM = Platform.Function.GUID();
var stgGuidSYM = Platform.Function.GUID();
var prodGuidROM = Platform.Function.GUID();
var prodGuidSYM = Platform.Function.GUID();

//Update with Standard Fields
for(i = 1; i < 4; i++){
var prox = new Script.Util.WSProxy();
var description = "Content DE" + descriptionCopy;

 if(i == 1){
 var stgTag = "_ROM_STG"
 var stgGuid = stgGuidROM
 var prodTag = "_ROM_PROD"
 var prodGuid = prodGuidROM

 } else if(i == 2){
 var stgTag = "_SYM_STG"
 var stgGuid = stgGuidSYM
 var prodTag = "_SYM_PROD"
 var prodGuid = prodGuidSYM
 }

var de_STG = {
    Name: streamName + stgTag + attempt,
    CustomerKey: stgGuid,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "emailname",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "lang_region",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "subject",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "preheader",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
    ],
    CategoryID: contentSTGFolderID
};

var de_PROD = {
    Name: streamName + prodTag + attempt,
    CustomerKey: prodGuid,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "emailname",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "lang_region",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "subject",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "preheader",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
    ],
    CategoryID: contentPRODFolderID

};

var res = prox.createBatch("DataExtension", [de_STG, de_PROD]);


//Update with Content Fields
for(y = 1; y < 5; y++){
    var updateProx = new Script.Util.WSProxy();    

    var newSTGFields = [
      {FieldType: "Text",Name: "headline_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "subheadline_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "copy_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "cta_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "imgsrc_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "alttext_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
    ];
  
    var newPRODFields = [
      {FieldType: "Text",Name: "headline_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "subheadline_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "copy_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "cta_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "imgsrc_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "alttext_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
    ];
  
   var stgProps = { 
        CustomerKey: stgGuid,
        Fields: newSTGFields 
    };

    var prodProps = { 
        CustomerKey: prodGuid,
        Fields: newPRODFields 
    };
    
    var stgData = updateProx.updateItem("DataExtension", stgProps);
    var prodData = updateProx.updateItem("DataExtension", prodProps);
  };
};



//Upsert Testing Content into Stg DE
var prox = new Script.Util.WSProxy();

/* Build DE Object */
var updateObject = {
    CustomerKey: stgGuidROM,
    Properties: [
         {
            Name: 'emailname',
            Value: 'TLI_TestEmail'
        },
         {
            Name: 'lang_region',
            Value: 'en-US'
        },
         {
            Name: 'subject',
            Value: 'This email was created with love by TLI!'
        },
         {
            Name: 'preheader',
            Value: 'All from the comfort of an API'
        },
         {
            Name: 'headline_1',
            Value: 'TLI CMS - The Email CMS of the Future'
        },
         {
            Name: 'subheadline_1',
            Value: 'One Language or Many... We&rsquo;ve got you covered.'
        },
         {
            Name: 'copy_1',
            Value: 'Built on the foundation of AMPScript Code Snippets and Data Extensions, it allows the flexibility to serve as many supported translations as you can... well... translate! Use the Data Extensions to store content as well as any images hosted on a CDN or right here in SFMC!'
        },
         {
            Name: 'cta_1',
            Value: 'To learn more about Trendline, visit us at <a href="\%\%=RedirectTo(Concat("https://trendlineinteractive",@com))=\%\%">Trendline Interactive</a>.'
        },
         {
            Name: 'copy_2',
            Value: 'This content served to you from the \%\%=TreatAsContent(@deName)=\%\%!'
        }
    ]
};

var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

var res = prox.updateItem('DataExtensionObject', updateObject, options);



//Upsert Testing Content into prod DE
var prox = new Script.Util.WSProxy();

/* Build DE Object */
var updateObject = {
    CustomerKey: prodGuidROM,
    Properties: [
         {
            Name: 'emailname',
            Value: 'TLI_TestEmail'
        },
         {
            Name: 'lang_region',
            Value: 'en-US'
        },
         {
            Name: 'subject',
            Value: 'This email was created with love by TLI!'
        },
         {
            Name: 'preheader',
            Value: 'All from the comfort of an API'
        },
         {
            Name: 'headline_1',
            Value: 'TLI CMS - The Email CMS of the Future'
        },
         {
            Name: 'subheadline_1',
            Value: 'One Language or Many... We&rsquo;ve got you covered.'
        },
         {
            Name: 'copy_1',
            Value: 'Built on the foundation of AMPScript Code Snippets and Data Extensions, it allows the flexibility to serve as many supported translations as you can... well... translate! Use the Data Extensions to store content as well as any images hosted on a CDN or right here in SFMC!'
        },
         {
            Name: 'cta_1',
            Value: 'To learn more about Trendline, visit us at <a href="\%\%=RedirectTo(Concat("https://trendlineinteractive",@com))=\%\%">Trendline Interactive</a>.'
        },
         {
            Name: 'copy_2',
            Value: 'This content served to you from the \%\%=TreatAsContent(@deName)=\%\%!'
        }
    ]
};

var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

var res = prox.updateItem('DataExtensionObject', updateObject, options);



var prox = new Script.Util.WSProxy();
/* Build DE Object */
var updateObject = {
    CustomerKey: prodGuidSYM,
    Properties: [
         {
            Name: 'emailname',
            Value: 'TLI_TestEmail'
        },
         {
            Name: 'lang_region',
            Value: 'zh-HK'
        },
         {
            Name: 'subject',
            Value: '这封电子邮件是由爱人创建的 TLI!'
        },
         {
            Name: 'preheader',
            Value: '一切都来自API的舒适性'
        },
         {
            Name: 'headline_1',
            Value: 'TLI CMS - 未来的电子邮件CMS'
        },
         {
            Name: 'subheadline_1',
            Value: '一种或多种语言...我们已经为您覆盖。'
        },
         {
            Name: 'copy_1',
            Value: '建立在AMPScript代码段和数据扩展的基础上，它可以灵活地提供尽可能多的受支持的翻译。使用数据扩展来存储内容以及CDN上或SFMC此处的任何图像！'
        },
         {
            Name: 'cta_1',
            Value: '要了解有关Trendline的更多信息，请访问以下地址与我们联系<a href="\%\%=RedirectTo(Concat("https://trendlineinteractive",@com))=\%\%">Trendline Interactive</a>.'
        },
         {
            Name: 'copy_2',
            Value: '此内容是从 \%\%=TreatAsContent(@deName)=\%\%!'
        }
    ]
};

var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

var res = prox.updateItem('DataExtensionObject', updateObject, options);


var prox = new Script.Util.WSProxy();

/* Build DE Object */
var updateObject = {
    CustomerKey: stgGuidSYM,
    Properties: [
         {
            Name: 'emailname',
            Value: 'TLI_TestEmail'
        },
         {
            Name: 'lang_region',
            Value: 'zh-HK'
        },
         {
            Name: 'subject',
            Value: '这封电子邮件是由爱人创建的 TLI!'
        },
         {
            Name: 'preheader',
            Value: '一切都来自API的舒适性'
        },
         {
            Name: 'headline_1',
            Value: 'TLI CMS - 未来的电子邮件CMS'
        },
         {
            Name: 'subheadline_1',
            Value: '一种或多种语言...我们已经为您覆盖。'
        },
         {
            Name: 'copy_1',
            Value: '建立在AMPScript代码段和数据扩展的基础上，它可以灵活地提供尽可能多的受支持的翻译。使用数据扩展来存储内容以及CDN上或SFMC此处的任何图像！'
        },
         {
            Name: 'cta_1',
            Value: '要了解有关Trendline的更多信息，请访问以下地址与我们联系<a href="\%\%=RedirectTo(Concat("https://trendlineinteractive",@com))=\%\%">Trendline Interactive</a>.'
        },
         {
            Name: 'copy_2',
            Value: '此内容是从 \%\%=TreatAsContent(@deName)=\%\%!'
        }
    ]
};

var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

var res = prox.updateItem('DataExtensionObject', updateObject, options);



//Create Reusable Content Folder
var description = "Content DEs Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : rcContentSubFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : contentFolderID
};

var status = Folder.Add(newFolder);


//Get Reusable Content Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: rcContentSubFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: contentFolderID
  }
};


var folderData = folderProx.retrieve("DataFolder", cols, filter);
var contentSubFolderID = folderData.Results[0].ID;


//Create Reusable Content Prod Folder
var description = "Content DEs Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : 'RC' + contentPRODFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : contentSubFolderID
};

var status = Folder.Add(newFolder);


//Get Reusable Content Prod Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: 'RC' + contentPRODFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: contentSubFolderID
  }
};


var folderData = folderProx.retrieve("DataFolder", cols, filter);
var contentPRODFolderID = folderData.Results[0].ID;


//Create Reusable Content STG Folder
var description = "Content DEs Folder" + descriptionCopy;
var deGUID = Platform.Function.GUID();  

var newFolder = {
    "Name" : 'RC' + contentSTGFolderName,
    "CustomerKey" : deGUID,
    "Description" : description,
    "ContentType" : "DataExtension",
    "IsActive" : "true",
    "IsEditable" : "true",
    "AllowChildren" : "true",
    "ParentFolderID" : contentSubFolderID
};

var status = Folder.Add(newFolder);


//Get Reusable Content STG Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: 'RC' + contentSTGFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: contentSubFolderID
  }
};


var folderData = folderProx.retrieve("DataFolder", cols, filter);
var contentSTGFolderID = folderData.Results[0].ID;


//Set Reusable Content DE Guids
var stgGuidROM = Platform.Function.GUID();
var stgGuidSYM = Platform.Function.GUID();
var prodGuidROM = Platform.Function.GUID();
var prodGuidSYM = Platform.Function.GUID();

//Update with Standard Fields
for(i = 1; i < 4; i++){
var prox = new Script.Util.WSProxy();
var description = "Content DE" + descriptionCopy;

 if(i == 1){
 var stgTag = "_ROM_STG"
 var stgGuid = stgGuidROM
 var prodTag = "_ROM_PROD"
 var prodGuid = prodGuidROM

 } else if(i == 2){
 var stgTag = "_SYM_STG"
 var stgGuid = stgGuidSYM
 var prodTag = "_SYM_PROD"
 var prodGuid = prodGuidSYM
 }

var de_STG = {
    Name: 'RC' + stgTag + attempt,
    CustomerKey: stgGuid,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "contentBlockID",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "lang_region",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true}    
    ],
    CategoryID: contentSTGFolderID
};

var de_PROD = {
    Name: 'RC' + prodTag + attempt,
    CustomerKey: prodGuid,
    Description: description,
    Fields: [
      {FieldType: "Text",Name: "contentBlockID",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "lang_region",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true}      
    ],
    CategoryID: contentPRODFolderID

};

var res = prox.createBatch("DataExtension", [de_STG, de_PROD]);


//Update with Content Fields
for(y = 1; y < 5; y++){
    var updateProx = new Script.Util.WSProxy();    

    var newSTGFields = [
      {FieldType: "Text",Name: "rc_headline_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "rc_subheadline_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "rc_copy_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "rc_cta_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "rc_imgsrc_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "rc_alttext_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
    ];
  
    var newPRODFields = [
      {FieldType: "Text",Name: "rc_headline_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "rc_subheadline_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "rc_copy_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "rc_cta_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "rc_imgsrc_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "rc_alttext_" + y,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
    ];
  
   var stgProps = { 
        CustomerKey: stgGuid,
        Fields: newSTGFields 
    };

    var prodProps = { 
        CustomerKey: prodGuid,
        Fields: newPRODFields 
    };
    
    var stgData = updateProx.updateItem("DataExtension", stgProps);
    var prodData = updateProx.updateItem("DataExtension", prodProps);
  };
};



var asset = {
    "assetType": {
      "name": "htmlemail",
      "id": 208
     },
      "name": "TLI_TestEmail",
    "channels": {
      "email": true,
      "web": false
    },

  "views": {
        "subjectline": {
          "content": "\%\%=TreatAsContent(@subject)=\%\%"        
        },
        "html": {
          "content": "\%\%[\n/*\n**Controls Email Name Variables for lookups**\nNeeds to be set as it appears in the Email_Catalog and corresponding Content Data Extensions\n\n**Controls Prod/STG Content DE Selection**\n@is_stg == '' (pulls from Prod DEs)\n@is_stg == 'N' (pulls from Prod DEs)\n@is_stg == 'Y' (pulls from STG DEs)\n\n**Controls Prod/Dev AMPScript blocks for LanguageContentLookup and INT_Dictionary**\n@is_dev == '' (pulls from Prod AMPScript blocks)\n@is_dev == 'N' (pulls from Prod AMPScript blocks)\n@is_dev == 'Y' (pulls from STG AMPScript blocks)\n\n**Controls Prod/Dev AMPScript blocks for Footer**\n@is_footerDev == '' (pulls from Prod AMPScript blocks)\n@is_footerDev == 'N' (pulls from Prod AMPScript blocks)\n@is_footerDev == 'Y' (pulls from STG AMPScript blocks)\n*/\nset @emailname = 'TLI_TestEmail'\nset @is_stg = 'N'\nset @is_dev = 'N'\nset @is_footerDev = 'N'\n\n/*Set ContentBlockIDs for core PKGs*/\nset @INT_AMPScript_Core_PKG = Lookup('INT_AMPScriptCatalog','ID','AssetName','INT_AMPScript_Core_PKG')\n]\%\%\n<!--INT_Core_AMPScript_PKG-->\n\%\%=ContentBlockById(@INT_AMPScript_Core_PKG)=\%\%\n<!DOCTYPE html>\n<html lang=\"en\" xmlns:v=\"urn:schemas-microsoft-com:vml\" xmlns:o=\"urn:schemas-microsoft-com:office:office\">\n<head></head>\n<head>\n<meta http-equiv=\"Content-Type\" content=\"text/html; charset=utf-8\">\n<meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n<meta name=\"x-apple-disable-message-reformatting\">\n<meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n<title>Trendline Interactive CMS Test!</title>\n<!--[if mso]><xml><o:OfficeDocumentSettings><o:AllowPNG/><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->\n<style type=\"text/css\">\n@import url('https://fonts.googleapis.com/css?family=Roboto');@import url('https://fonts.googleapis.com/css?family=Arvo');table{border-collapse:collapse;}.col,td,th{font-size:16px;line-height:26px;vertical-align:top;}.col,td,th,div,p,h1,h2,h3,h4,h5,h6{font-family:-apple-system,system-ui,BlinkMacSystemFont,\"Segoe UI\",\"Roboto\",\"Helvetica Neue\",Arial,sans-serif;}h2{line-height:20px;margin-bottom:0px;mso-line-height-rule:exactly;}img{border:0;display:block;line-height:100%;}.container{margin:0 auto;}.spacer,.divider{mso-line-height-rule:exactly;overflow:hidden;vertical-align:middle;}a:link{color:#6b6b6b;text-decoration:none;}a:visited{color:#6b6b6b;text-decoration:none;}\n@media only screen and (max-width:699px){u~div .wrapper{min-width:100vw;}.container{-webkit-text-size-adjust:100%;width:100%!important;}.col{box-sizing:border-box;display:inline-block!important;line-height:23px;width:100%!important;}.hide-sm{display:none!important;}.align-sm-center{display:table!important;float:none;margin-left:auto!important;margin-right:auto!important;}.text-sm-center{text-align:center!important;}.text-sm-size{font-size:16px!important;line-height:20px!important;}.spacer,.divider{height:30px;line-height:100%!important;}}\n</style></head>\n<body style=\"box-sizing:border-box;margin:0;padding:0;width:100%;-webkit-font-smoothing:antialiased;word-break:break-word;\">\n<table class=\"wrapper\" cellpadding=\"15\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td>\n<table class=\"container\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"600\" style=\"width:600px;max-width:600px;border:1px solid #e7e7e7;background-color:#ffffff;\"><!--Spacer--><tr><td class=\"spacer\" height=\"20\" style=\"line-height:20px;\">&nbsp;\n</td></tr><!--end Spacer--><!--Header_Logo Row--><tr><td>\n<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td style=\"padding:0 20px;\">\n<table cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td class=\"col text-sm-center text-sm-size\" width=\"145\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td><td align=\"center\" class=\"col text-sm-center text-sm-size\" width=\"310\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">\n<a href=\"HYPERLINK\" alias=\"ALIAS\" target=\"_blank\"><img class=\"align-sm-center\" src=\"\" width=\"255\" alt=\"Logo\" style=\"max-width:255px;width:100%;\"></a>\n</td><td class=\"col text-sm-center text-sm-size\" width=\"145\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td></tr></table>\n</td></tr></table>\n</td></tr><!--Spacer--><tr><td class=\"spacer hide-sm\" height=\"30\" style=\"line-height:30px;\">&nbsp;\n</td></tr><!--end Spacer--><!--Row--><tr><td>\n<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td style=\"padding:0 20px;\">\n<table cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td class=\"col text-sm-center text-sm-size hide-sm\" width=\"90\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td><td class=\"col text-sm-center text-sm-size\" width=\"420\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\"><h1 style=\"font-size:22px;color:#2b2d2f;padding:0px;\">\%\%=TreatAsContent(@headline_1)=\%\%</h1><p>\%\%=TreatAsContent(@subheadline_1)=\%\%\n</p></td><td class=\"col text-sm-center text-sm-size hide-sm\" width=\"90\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td></tr></table>\n</td></tr></table>\n</td></tr><!--Divider--><tr><td>\n<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td style=\"padding:0 20px;\">\n<table cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td class=\"col text-sm-center text-sm-size hide-sm\" width=\"90\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td><td class=\"col text-sm-center text-sm-size\" width=\"420\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">\n<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td class=\"divider\" height=\"60\" style=\"height:60px;\"><div style=\"border-top:1px solid #EEEEEE;line-height:0;\">&nbsp;</div>\n</td></tr></table>\n</td><td class=\"col text-sm-center text-sm-size hide-sm\" width=\"90\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td></tr></table>\n</td></tr></table>\n</td></tr><!--Row--><tr><td>\n<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td style=\"padding:0 20px;\">\n<table cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td class=\"col text-sm-center text-sm-size\" width=\"145\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td><td class=\"col text-sm-center text-sm-size\" width=\"310\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">\%\%=TreatAsContent(@copy_1)=\%\%\n</td><td class=\"col text-sm-center text-sm-size\" width=\"145\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td></tr></table>\n</td></tr></table>\n</td></tr><!--Spacer--><tr><td class=\"spacer\" height=\"30\" style=\"line-height:30px;\">&nbsp;\n</td></tr><!--end Spacer--><!--Row--><tr><td>\n<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td style=\"padding:0 20px;\">\n<table cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td class=\"col text-sm-center text-sm-size\" width=\"145\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td><td class=\"col text-sm-center text-sm-size\" width=\"310\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">\%\%=TreatAsContent(@cta_1)=\%\%\n</td><td class=\"col text-sm-center text-sm-size\" width=\"145\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td></tr></table>\n</td></tr></table>\n</td></tr><!--Divider--><tr><td>\n<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td style=\"padding:0 20px;\">\n<table cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td class=\"col text-sm-center text-sm-size hide-sm\" width=\"90\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td><td class=\"col text-sm-center text-sm-size\" width=\"420\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">\n<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td class=\"divider\" height=\"60\" style=\"height:60px;\"><div style=\"border-top:1px solid #EEEEEE;line-height:0;\">&nbsp;</div>\n</td></tr></table>\n</td><td class=\"col text-sm-center text-sm-size hide-sm\" width=\"90\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td></tr></table>\n</td></tr></table>\n</td></tr><!--Row--><tr><td>\n<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td style=\"padding:0 20px;\">\n<table cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td class=\"col text-sm-center text-sm-size hide-sm\" width=\"90\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td><td class=\"col text-sm-center text-sm-size\" width=\"420\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\"><p>\%\%=TreatAsContent(@copy_2)=\%\%</p>\n</td><td class=\"col text-sm-center text-sm-size hide-sm\" width=\"90\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td></tr></table>\n</td></tr></table>\n</td></tr><!--Spacer--><tr><td class=\"spacer\" height=\"30\" style=\"line-height:30px;\">&nbsp;\n</td></tr><!--end Spacer--><!--Row--><tr><td>\n<table align=\"center\" cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td style=\"padding:0 20px;\">\n<table cellpadding=\"0\" cellspacing=\"0\" role=\"presentation\" width=\"100%\"><tr><td class=\"col text-sm-center text-sm-size hide-sm\" width=\"35\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td><td class=\"col text-sm-center\" width=\"420\" style=\"padding:0 10px;color:#444444;font-family:'Roboto',Arial,sans-serif;font-size:10px;line-height:13px;text-align:center;\">\nThis email is to ensure that the <strong>Trendline Interactive - Multi-lingual CMS</strong> is installed correctly.\n</td><td class=\"col text-sm-center text-sm-size hide-sm\" width=\"35\" style=\"padding:0 10px;color:#6b6b6b;font-family:'Roboto',Arial,sans-serif;font-size:14px;line-height:19px;\">&nbsp;\n</td></tr></table>\n</td></tr></table>\n</td></tr><!--Spacer--><tr><td class=\"spacer\" height=\"40\" style=\"line-height:40px;\">&nbsp;\n</td></tr><!--end Spacer--></table>\n</td></tr></table><custom name=\"opencounter\" type=\"tracking\">\n</custom></body>\n</html>\n"
        },
 
    "category": {
      "id": coreSubFolderID,
      "name": coreSubFolderName
    }
  }
};



var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);



 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>