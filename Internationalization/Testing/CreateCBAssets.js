<script runat=server>
  Platform.Load("core", "1.1.1");

  try{
var mod = '_func_testing_1';


var streamName = 'TLI Test';

//Content Builder Folder Names
var rootFolderName = 'INT_Assets' + mod;
var coreSubFolderName = 'Core Assets' + mod;
var devSubFolderName = 'Dev Assets' + mod;
var prodSubFolderName = 'Prod Assets' + mod;
var optSubFolderName = 'Optional Assets' + mod;

//Content Block Asset Names
var ampscriptEmailControlContentBlock = 'INT_EmailControl' + mod;
var ampscriptCoreContentBlock = 'INT_AMPScript_Core_PKG' + mod;
var ampscriptFooterContentBlock = 'INT_AMPScript_Footer_PKG' + mod;
var ampscriptPRODContentContentBlock = 'INT_ContentLookup_PROD' + mod;
var ampscriptPRODDictionaryContentBlock = 'INT_Dictionary_PROD' + mod;
var ampscriptDEVContentContentBlock = 'INT_ContentLookup_DEV' + mod;
var ampscriptDEVDictionaryContentBlock = 'INT_Dictionary_DEV' + mod;
var ampscriptRCContentBlock = 'INT_ReusableContent_Code' + mod;

//Data Extension Asset Folder Names   
var rootFolderName = 'INT_DataExtensions' + mod;
var supportingFolderName = 'Supporting Data Extensions' + mod;
var logsFolderName = 'Logs' + mod;
var dictionaryFolderName = 'Dictionary' + mod;
var catalogFolderName = 'Catalog' + mod;
var limitingFolderName = 'Send Limiting' + mod;

var contentFolderName = 'Content Data Extensions' + mod;
var contentSubFolderName = streamName + mod;
var contentPRODFolderName = streamName + '_PROD' + mod;
var contentSTGFolderName = streamName + '_STG' + mod;
var rcContentFolderName = 'Reusable Content' + mod;
var rcContentPRODFolderName = 'Reusable Content_PROD' + mod;
var rcContentSTGFolderName = 'Reusable Content_STG' + mod;

//Data Extension Names; DO NOT RENAME - These are used in the AMPScript Code Snippets
var catalogDE = 'INT_EmailCatalog' + mod;
var contentBlockCatalogDE = 'INT_AMPScriptCatalog' + mod;
var sendLogDE = 'INT_SendLog' + mod;
var errorLogDE = 'INT_ErrorLog' + mod;
var noLangErrorDE = 'INT_NoLangErrorLog' + mod;
var emailSendLimitingDE = 'INT_EmailSendLimiting' + mod;
var globalSendLimitingDE = 'INT_GlobalSendLimiting' + mod;
var sendLimitingLogDE = 'INT_SendLimitingLog' + mod;
var dictionaryDE = 'INT_Dictionary' + mod;
var contentPRODRomDE = streamName + "_ROM_PROD" + mod;
var contentPRODSymDE = streamName + "_SYM_PROD" + mod;
var contentSTGRomDE = streamName + "_ROM_STG" + mod;
var contentSTGSymDE = streamName + "_SYM_STG" + mod;

var iterations = 5;

var prefCenterDE = ''; //Fill in if there is an existing Preference Center or location for lang_region.


//Other Asset Names
var emailName = 'TLI_TestEmail' + mod;



/*************************************************/
//API Authentication; update: authBase, restBase, clientID, clientSecret vars with details from the SFMC Installed PKG
var authBase = 'https://mc1q10jrzwsds3bcgk0jjz2s8h80.auth.marketingcloudapis.com/';
var restBase = 'https://mc1q10jrzwsds3bcgk0jjz2s8h80.rest.marketingcloudapis.com/'; 
var contentType = 'application/json';
var grantType = 'client_credentials';

var clientId = 'uafzm4wvdyc7digq683cv3ys';
var clientSecret = 'W2aU6GMZ8BIBfRxs1JLG1ryn';
/*************************************************/


//Get Authentication Token
function auth(clientID, clientSecret, contentType, grantType, authBase){
  //Set Auth URL, and authHeaders
  var url = authBase +'v2/token';
  
  var payload = {
    "client_id": clientId,
    "client_secret": clientSecret,
    "grant_type": grantType
    };

  var authPayload = Platform.Function.Stringify(payload);

  var accessTokenResult = HTTP.Post(url, contentType, authPayload);
  var statusCode = accessTokenResult["StatusCode"];

  var response = accessTokenResult["Response"][0];
  var accessToken = Platform.Function.ParseJSON(response).access_token;   

  return accessToken;
};
  

function createCBFolder(restBase, contentType, accessToken, categoryName, parentID){
  if(!getFolderID(categoryName)){
      var url = restBase + 'asset/v1/content/categories';
      //Set Headers for RestAPI
      var headerNames = ["Authorization"];
      var headerValues = ["Bearer " + accessToken];

      //Create Folder
      var asset = {
          "Name" : categoryName,
          "ParentId" : parentID
      };   

      var payload = Platform.Function.Stringify(asset);
      var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);
  };
return result;
};

function getDEFolderID(name, parentID){
//Get Stream Content Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: name
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: parentID
  }
};



var folderData = folderProx.retrieve("DataFolder", cols, filter);
var folderID = folderData.Results[0].ID;

return folderID;
};
  

function getFolderID(categoryName){
  //Get Root Folder ID
  var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:categoryName});
  var folderID = result[0].ID

  return folderID;
}; 

    
function createCBAsset(restBase, contentType, accessToken, categoryID, categoryName, assetTypeID, assetTypeName, content, description, name){
    var url = restBase + 'asset/v1/content/assets';
    //Set Headers for RestAPI
    var headerNames = ["Authorization"];
    var headerValues = ["Bearer " + accessToken];

  
    var asset = {
      "category": {
        "id": categoryID,
        "name": categoryName
          },
      "assetType": {
        "id": assetTypeID,
        "name": assetTypeName
        },
       "content": content,
       "description": description,
       "name": name
    };


var payload = Platform.Function.Stringify(asset);

Write(payload + '<br><br><hr>');
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);

return result
}; 
    

function getCBAssetID(restBase, accessToken, assetName){
	var url = restBase + 'asset/v1/content/assets';
    //Set Headers for RestAPI
    var headerNames = ["Authorization"];
    var headerValues = ["Bearer " + accessToken];

	//Get Content Block Asset IDs
	var filter = "?$filter=Name%20like%20'" + name + "'"
	var urlFilter = url + filter
	   
	var result = HTTP.Get(urlFilter, headerNames, headerValues);
	var response = Platform.Function.ParseJSON(result.Content);
	var assetID = response.items[0].id; 

	return assetID;  
};
    

function updateAssetIDDE(assetName, assetID, customerKey){
//Upsert Core AMPScrpit IDs into Content Block Catalog DE
var prox = new Script.Util.WSProxy();

// Build DE Object
var updateObject = {
    CustomerKey: customerKey,
    Properties: [
         {
            Name: 'AssetName',
            Value: assetName
        },
         {
            Name: 'ID',
            Value: assetID
        }
    ]
};

var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

var result = prox.updateItem('DataExtensionObject', updateObject, options);

return result;
};





//Get Access Token
var accessToken = auth(clientID, clientSecret, contentType, grantType, authBase);

  
Write('Token: ' + accessToken + '<br>');


var cbAssets = [  
  {
    "name": rootFolderName,
    "subfolder": [
        {
          "name": coreSubFolderName,
          "assets": [
                  //Email Control
                  {
                      "assetType": {
                        "id": 220,
                        "name": "codesnippetblock"
                        },
                      "content": "\%\%[\n/*\n**Controls Email Name Variables for lookups**\nNeeds to be set as it appears in the Email_Catalog and corresponding Content Data Extensions\n\n**Controls Prod/STG Content DE Selection**\n@is_stg == '' (pulls from Prod DEs)\n@is_stg == 'N' (pulls from Prod DEs)\n@is_stg == 'Y' (pulls from STG DEs)\n\n**Controls Prod/Dev AMPScript blocks for LanguageContentLookup and INT_Dictionary**\n@is_dev == '' (pulls from Prod AMPScript blocks)\n@is_dev == 'N' (pulls from Prod AMPScript blocks)\n@is_dev == 'Y' (pulls from STG AMPScript blocks)\n\n**Controls Prod/Dev AMPScript blocks for Footer**\n@is_footerDev == '' (pulls from Prod AMPScript blocks)\n@is_footerDev == 'N' (pulls from Prod AMPScript blocks)\n@is_footerDev == 'Y' (pulls from STG AMPScript blocks)\n*/\n\n/*Set ContentBlockID for core PKG*/\nset @INT_AMPScript_Core_PKG = Lookup('INT_AMPScriptCatalog','ID','AssetName','INT_AMPScript_Core_PKG')\n\n\nset @emailname = 'TLI_TestEmail'\nset @is_stg = 'N'\nset @is_dev = 'N'\nset @is_footerDev = 'N'\n]\%\%",
                      "description": "AMPScript for INT Email Control",
                      "name": ampscriptEmailControlContentBlock
                  },
                  //Core PKG
                  {
                      "assetType": {
                        "id": 220,
                        "name": "codesnippetblock"
                        },
                       "content": "<!--\nThis block acts a a package for the LanguageContentLookup and INT_Dictionary AMPScript. With the addition of the @is_dev variable, we can now toggle between the Development and Production blocks from the Email Control AMPScript block rather than needing to adjust the ContentBlockById Function.\n\nThis block should be set as a Reference Content Block in all emails.\n-->\n\n\%\%[\n\n/* Set Dev and Prod Content Block IDs From INT_AMPScriptCatalog */\nset @devContent = Lookup('INT_AMPScriptCatalog','ID','AssetName','INT_ContentLookup_DEV')\nset @devDictionary = Lookup('INT_AMPScriptCatalog','ID','AssetName','INT_Dictionary_DEV')\nset @prodContent = Lookup('INT_AMPScriptCatalog','ID','AssetName','INT_ContentLookup_PROD')\nset @prodDictionary = Lookup('INT_AMPScriptCatalog','ID','AssetName','INT_Dictionary_PROD')\n\nif @is_dev == 'Y' then\n]\%\%\n\n<!--DEV LanguageContentLookup Block-->\n\%\%=ContentBlockById(@devContent)=\%\%\n<!--DEV INT_Dictionary Block-->\n\%\%=ContentBlockById(@devDictionary)=\%\%\n\n\%\%[elseif @is_dev == 'N' or @is_dev == '' then]\%\%\n\n<!--PROD LanguageContentLookup Block-->\n\%\%=ContentBlockById(@prodContent)=\%\%\n<!--PROD INT_Dictionary Block-->\n\%\%=ContentBlockById(@prodDictionary)=\%\%\n\n\%\%[endif]\%\%",
                      "description": "AMPScript for INT Core Package",
                      "name": ampscriptCoreContentBlock
                  },
                  //Footer PKG
                  {
                      "assetType": {
                        "id": 220,
                        "name": "codesnippetblock"
                        },
                       "content": "\%\%[\n/* Set Dev and Prod Content Block IDs From INT_AMPScriptCatalog */\nset @footerDev = Lookup('INT_AMPScriptCatalog','ID','AssetName','')\nset @footerProd = Lookup('INT_AMPScriptCatalog','ID','AssetName','')\n\nif @is_footerDev == 'Y' then\n]\%\%\n\n<!--Development Footer-->\n\%\%=ContentBlockById(@footerDev)=\%\%\n\n\%\%[elseif @is_footerDev == 'N' or @is_footerDev == '' then]\%\%\n\n<!--Production Footer-->\n\%\%=ContentBlockById(@footerProd)=\%\%\n\n\%\%[endif]\%\%",
                      "description": "AMPScript for INT Footer Package",
                      "name": ampscriptFooterContentBlock
                  }
                    ]
          },
          {
            "name": devSubFolderName,
            "assets": [
              {
                //Dev Dictionary Lookup
                "assetType": {
                "id": 220,
                "name": "codesnippetblock"
                },
                "content": "\%\%[\n/* Set Data Extension Names */\nset @catalogDE = '"+ catalogDE + "'\nset @sendLogDE = '" + sendLogDE + "'\n\nset @errorLogDE = 'INT_ErrorLog'\nset @noLangErrorDE = 'INT_NoLangErrorLog'\n\nset @emailSendLimitingDE = 'INT_EmailSendLimiting'\nset @globalSendLimitingDE = 'INT_GlobalSendLimiting'\nset @sendLimitingLogDE = 'INT_SendLimitingLog'\n\nset @preferenceCenterDE = ''\n\n\n/* Start of Language Preference Identification*/\n\nif Empty(@preferenceCenterDE) then\nset @lang_region = 'en-US'\nelse\n/*\nPreference Center DE\nset @lang_region = Lookup('@preferenceCenterDE','language_preference','email_address',emailaddr)\n*/\nendif\n\n\n/*If no lang_region can be found RaiseError and Log*/\nif EMPTY(@lang_region) then\nset @errorMSG = Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey)\n\nInsertDE(@noLangErrorDE,'EmailAddress',emailaddr,'SendDate', Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG,'SubscriberKey',_subscriberkey)\n\nRaiseError(Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey),1,0,0,1)\nendif\n\n/* End of Language Preference Identification*/\n\n\nset @today = Now()\n\n/****Start Email Exclusion Limiting****/\nset @emailExcludeRows = LookupRows(@emailSendLimitingDE,'emailname',@emailname)\nset @emailExcludeRowCount = RowCount(@emailExcludeRows)\n\nif @emailExcludeRowCount == 0 then\nelse\n\n  for @e = 1 to @emailExcludeRowCount do\n  set @emailExcludeRow = Row(@emailExcludeRows, @e)\n  set @lang_regionExclude = Field(@emailExcludeRow,'lang_regionExclusions')\n  set @ongoing = Field(@emailExcludeRow,'ongoing')\n  \n  if @today >= Field(@emailExcludeRow,'StartDate') and @today <= Field(@emailExcludeRow,'EndDate') then\n    set @emailExcludeActive = 1\n  elseif @ongoing == 1 then\n    set @emailExcludeActive = 1\n  else\n    set @emailExcludeActive = 0\n  endif\n\n    if IndexOf(@lang_regionExclude,@lang_region) > 0 and @emailExcludeActive == 1 then\n\n      set @emailMSG = Concat('Email Lang_Region Exclusion: ',@lang_regionExclude)\n\n       InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@emailMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\n       RaiseError(Concat('Email -- Regions excluded in this send: ', @lang_regionExclude),1,0,0,1)\n    endif\n  next @e\nendif\n\n/****Start Global Exclusion Limiting****/\n\nset @globalRows = LookupRows(@globalSendLimitingDE,'LookupValue','1')\nset @globalCount = RowCount(@globalRows)\n\nif @globalCount == 0 then\nelse\n\nfor @g = 1 to @globalCount do\n  set @globalRow = Row(@globalRows, @d)\n  set @dOngoing = Field(@globalRow,'ongoing')\n  \nif @today >= Field(@globalRow,'StartDate') and @today <= Field(@globalRow,'EndDate') then\n  set @globalActive = 1\nelseif  @gOngoing == 1 then\n  set @globalActive = 1\nelse\n  set @globalActive = 0\nendif\n\n\n  /*Pulls list of Lang_Regions to exclude from global sends */\n  set @globalLang_Region = Field(@globalRow,'lang_regionExclusions')\n\n  if IndexOf(@globalLang_Region,@lang_region) >= 1 and @globalActive == 1 then\n  set @globalMSG = Concat('Global Lang_Region Exclusion: ',@globalLang_Region)\n\n  InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@disMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\n     RaiseError(Concat('Global -- Regions excluded in this send: ', @globalLang_Region),1,0,0,1)\n  endif\n\nnext @g\nendif\n\n\n/* Error -- Not in Email Catalog */\nif RowCount(LookupRows(@catalogDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\nset @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the Email Catalog data extension.')\n\n InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\nRaiseError(@errorMSG,1,0,0,1)\nendif\n\n\n/*Lookup Data Extensions, StreamName and JourneyName in Email catalog*/\nset @prodDE = Lookup(@catalogDE, 'prodDE', 'emailname', @emailname,'lang_region',@lang_region)\nset @stgDE = Lookup(@catalogDE, 'stgDE', 'emailname', @emailname,'lang_region',@lang_region)\n\n\n\n/* Error -- Not STG and Nothing in prodDE */\nif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n\n set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@prodDE,'  data extension.')\n \nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',\n_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\nRaiseError(@errorMSG,1,0,0,1)\n\n\n/* Start Find Correct DE for Content */\n\n/* Error -- is STG and Nothing in stgDE*/\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@stgDE,'  data extension.')\n  \n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\n  RaiseError(@errorMSG,1,0,0,1)\n\n\n/* No Error -- is STG and has records in stgDE */\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\nset @deName = @stgDE\n\n\n/* No Error -- Empty STG and has records in prodDE*/\nelseif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\n set @deName = @prodDE\n\n\n /* No Error - is not STG and Records in prodDE*/\nelseif @is_stg == 'N' and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\n set @deName = @prodDE\n\nendif\n\n/* End Find Correct DE for Content */\n\n\n\n/* Error -- Ensure that there is a content row to pull from when @deName is set*/\nif RowCount(LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' has no records in ',@deName)\n\n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\n  RaiseError(@errorMSG,1,0,0,1)\nendif\n\n\n/*\nNo Error -- If no errors are found, look up values in the correct DE, log send. If there are errors Raise/Log Error Message\n*/\n\n/* Start Content Lookups */\nif Empty(@errorMSG) then\n set @contentRow = LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)\n set @row = Row(@contentRow, 1)\n  set @emailname = Field(@row, 'emailname')\n\n  set @subject = Field(@row, 'subject')\n  set @preheader = Field(@row, 'preheader')\n\n  set @headline_1 = Field(@row, 'headline_1')\n  set @subheadline_1 = Field(@row, 'subheadline_1')\n  set @copy_1 = Field(@row, 'copy_1')\n  set @cta_1 = Field(@row, 'cta_1')\n  set @imgsrc_1 = Field(@row, 'imgsrc_1')\n  set @alttext_1 = Field(@row, 'alttext_1')\n  \n  set @headline_2 = Field(@row, 'headline_2')\n  set @subheadline_2 = Field(@row, 'subheadline_2')\n  set @copy_2 = Field(@row, 'copy_2')\n  set @cta_2 = Field(@row, 'cta_2')\n  set @imgsrc_2 = Field(@row, 'imgsrc_2')\n  set @alttext_2 = Field(@row, 'alttext_2')\n\n  set @headline_3 = Field(@row, 'headline_3')\n  set @subheadline_3 = Field(@row, 'subheadline_3')\n  set @copy_3 = Field(@row, 'copy_3')\n  set @cta_3 = Field(@row, 'cta_3')\n  set @imgsrc_3 = Field(@row, 'imgsrc_3')\n  set @alttext_3 = Field(@row, 'alttext_3')\n\n  set @headline_4 = Field(@row, 'headline_4')\n  set @subheadline_4 = Field(@row, 'subheadline_4')\n  set @copy_4 = Field(@row, 'copy_4')\n  set @cta_4 = Field(@row, 'cta_4')\n  set @imgsrc_4 = Field(@row, 'imgsrc_4')\n  set @alttext_4 = Field(@row, 'alttext_4')\n  \n\n\n/* No Error - Log send to_INT_SendLog DE */ \nInsertDE(@sendLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\nelse\n\n/*Log error to@errorLogDEDE and Stop Send*/  \nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\nRaiseError(@errorMSG,1,0,0,1)\nendif\n\n/*\nTo add additional sections copy a section and change _x to the next number\n*]\%\%\n\n\n<!-- PreHeader Control -->\%\%[if Not Empty(@preheader) then]\%\%<div style=\"display: none; max-height: 0px; overflow: hidden;\">\%\%=TreatAsContent(@preheader)=\%\%</div><!-- Insert &zwnj;&nbsp; hack after hidden preview text --><div style=\"display: none; max-height: 0px; overflow: hidden;\">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>\n\%\%[endif]\%\%",
                "description": "AMPScript for INT Content Lookup",
                "name": ampscriptDEVContentContentBlock
              },
              { 
              "assetType": {
                "id": 220,
                "name": "codesnippetblock"
                },
               "content": "\%\%[\nset @dictionaryDE = 'INT_Dictionary'\n\n/* International Dictionary Lookups */\n\n/* @com sets the domain routing for global links */\n  \n  set @comCheck = Lookup(@dictionaryDE,@lang_region, \"Phrase\", \"com\")\n  if not empty(@comCheck) then \n    set @Phrase = @comCheck\n  else\n  set @com = Lookup(@dictionaryDE,\"en-US\",\"Phrase\",\"com\")\n  endif\n  \n  \n/*\n  set @PhraseCheck = Lookup(@dictionaryDE,@lang_region, \"Phrase\", \"Phrase\")\n  if not empty(@PhraseCheck) then \n    set @Phrase = @PhraseCheck\n  else\n  set @Phrase = Lookup(@dictionaryDE,\"en-US\",\"Phrase\",\"Phrase\")\n  endif\n*/\n\n\nset @baseURL = 'https://TrendlineInteractive.com/'\n\n/* define global links */\nset @path = Concat(@baseURL,@com,\"urlPath\")\n\n]\%\%",
              "description": "AMPScript for INT Dictionary Lookup",
              "name": ampscriptDEVDictionaryContentBlock
              }
            ]
        },
        {
          "name": prodSubFolderName,
          "assets": [
            //Prod Dictionary Lookup
          { 
            "assetType": {
              "id": 220,
              "name": "codesnippetblock"
              },
             "content": "\%\%[\n/* Set Data Extension Names */\nset @catalogDE = 'INT_EmailCatalog'\nset @sendLogDE = 'INT_SendLog'\n\nset @errorLogDE = 'INT_ErrorLog'\nset @noLangErrorDE = 'INT_NoLangErrorLog'\n\nset @emailSendLimitingDE = 'INT_EmailSendLimiting'\nset @globalSendLimitingDE = 'INT_GlobalSendLimiting'\nset @sendLimitingLogDE = 'INT_SendLimitingLog'\n\nset @preferenceCenterDE = ''\n\n\n/* Start of Language Preference Identification*/\n\nif Empty(@preferenceCenterDE) then\nset @lang_region = 'en-US'\nelse\n/*\nPreference Center DE\nset @lang_region = Lookup('@preferenceCenterDE','language_preference','email_address',emailaddr)\n*/\nendif\n\n\n/*If no lang_region can be found RaiseError and Log*/\nif EMPTY(@lang_region) then\nset @errorMSG = Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey)\n\nInsertDE(@noLangErrorDE,'EmailAddress',emailaddr,'SendDate', Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG,'SubscriberKey',_subscriberkey)\n\nRaiseError(Concat('Lang_region Cannot be found for ',emailaddr, ' | ', _subscriberkey),1,0,0,1)\nendif\n\n/* End of Language Preference Identification*/\n\n\nset @today = Now()\n\n/****Start Email Exclusion Limiting****/\nset @emailExcludeRows = LookupRows(@emailSendLimitingDE,'emailname',@emailname)\nset @emailExcludeRowCount = RowCount(@emailExcludeRows)\n\nif @emailExcludeRowCount == 0 then\nelse\n\n  for @e = 1 to @emailExcludeRowCount do\n  set @emailExcludeRow = Row(@emailExcludeRows, @e)\n  set @lang_regionExclude = Field(@emailExcludeRow,'lang_regionExclusions')\n  set @ongoing = Field(@emailExcludeRow,'ongoing')\n  \n  if @today >= Field(@emailExcludeRow,'StartDate') and @today <= Field(@emailExcludeRow,'EndDate') then\n    set @emailExcludeActive = 1\n  elseif @ongoing == 1 then\n    set @emailExcludeActive = 1\n  else\n    set @emailExcludeActive = 0\n  endif\n\n    if IndexOf(@lang_regionExclude,@lang_region) > 0 and @emailExcludeActive == 1 then\n\n      set @emailMSG = Concat('Email Lang_Region Exclusion: ',@lang_regionExclude)\n\n       InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@emailMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\n       RaiseError(Concat('Email -- Regions excluded in this send: ', @lang_regionExclude),1,0,0,1)\n    endif\n  next @e\nendif\n\n/****Start Global Exclusion Limiting****/\n\nset @globalRows = LookupRows(@globalSendLimitingDE,'LookupValue','1')\nset @globalCount = RowCount(@globalRows)\n\nif @globalCount == 0 then\nelse\n\nfor @g = 1 to @globalCount do\n  set @globalRow = Row(@globalRows, @d)\n  set @dOngoing = Field(@globalRow,'ongoing')\n  \nif @today >= Field(@globalRow,'StartDate') and @today <= Field(@globalRow,'EndDate') then\n  set @globalActive = 1\nelseif  @gOngoing == 1 then\n  set @globalActive = 1\nelse\n  set @globalActive = 0\nendif\n\n\n  /*Pulls list of Lang_Regions to exclude from global sends */\n  set @globalLang_Region = Field(@globalRow,'lang_regionExclusions')\n\n  if IndexOf(@globalLang_Region,@lang_region) >= 1 and @globalActive == 1 then\n  set @globalMSG = Concat('Global Lang_Region Exclusion: ',@globalLang_Region)\n\n  InsertDE(@sendLimitingLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Exclude_Identifier',@disMSG,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\n     RaiseError(Concat('Global -- Regions excluded in this send: ', @globalLang_Region),1,0,0,1)\n  endif\n\nnext @g\nendif\n\n\n/* Error -- Not in Email Catalog */\nif RowCount(LookupRows(@catalogDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\nset @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the Email Catalog data extension.')\n\n InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\nRaiseError(@errorMSG,1,0,0,1)\nendif\n\n\n/*Lookup Data Extensions, StreamName and JourneyName in Email catalog*/\nset @prodDE = Lookup(@catalogDE, 'prodDE', 'emailname', @emailname,'lang_region',@lang_region)\nset @stgDE = Lookup(@catalogDE, 'stgDE', 'emailname', @emailname,'lang_region',@lang_region)\n\n\n\n/* Error -- Not STG and Nothing in prodDE */\nif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n\n set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@prodDE,'  data extension.')\n \nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',\n_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\nRaiseError(@errorMSG,1,0,0,1)\n\n\n/* Start Find Correct DE for Content */\n\n/* Error -- is STG and Nothing in stgDE*/\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' is not in the ',@stgDE,'  data extension.')\n  \n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\n  RaiseError(@errorMSG,1,0,0,1)\n\n\n/* No Error -- is STG and has records in stgDE */\nelseif @is_stg == 'Y' and RowCount(LookupRows(@stgDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\nset @deName = @stgDE\n\n\n/* No Error -- Empty STG and has records in prodDE*/\nelseif Empty(@is_stg) and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\n set @deName = @prodDE\n\n\n /* No Error - is not STG and Records in prodDE*/\nelseif @is_stg == 'N' and RowCount(LookupRows(@prodDE,'emailname',@emailname,'lang_region',@lang_region)) > 0 then\n\n set @deName = @prodDE\n\nendif\n\n/* End Find Correct DE for Content */\n\n\n\n/* Error -- Ensure that there is a content row to pull from when @deName is set*/\nif RowCount(LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)) == 0 then\n  set @errorMSG = Concat(@emailname, '_', @lang_region, ' has no records in ',@deName)\n\n  InsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\n  RaiseError(@errorMSG,1,0,0,1)\nendif\n\n\n/*\nNo Error -- If no errors are found, look up values in the correct DE, log send. If there are errors Raise/Log Error Message\n*/\n\n/* Start Content Lookups */\nif Empty(@errorMSG) then\n set @contentRow = LookupRows(@deName,'emailname',@emailname,'lang_region',@lang_region)\n set @row = Row(@contentRow, 1)\n  set @emailname = Field(@row, 'emailname')\n\n  set @subject = Field(@row, 'subject')\n  set @preheader = Field(@row, 'preheader')\n\n  set @headline_1 = Field(@row, 'headline_1')\n  set @subheadline_1 = Field(@row, 'subheadline_1')\n  set @copy_1 = Field(@row, 'copy_1')\n  set @cta_1 = Field(@row, 'cta_1')\n  set @imgsrc_1 = Field(@row, 'imgsrc_1')\n  set @alttext_1 = Field(@row, 'alttext_1')\n  \n  set @headline_2 = Field(@row, 'headline_2')\n  set @subheadline_2 = Field(@row, 'subheadline_2')\n  set @copy_2 = Field(@row, 'copy_2')\n  set @cta_2 = Field(@row, 'cta_2')\n  set @imgsrc_2 = Field(@row, 'imgsrc_2')\n  set @alttext_2 = Field(@row, 'alttext_2')\n\n  set @headline_3 = Field(@row, 'headline_3')\n  set @subheadline_3 = Field(@row, 'subheadline_3')\n  set @copy_3 = Field(@row, 'copy_3')\n  set @cta_3 = Field(@row, 'cta_3')\n  set @imgsrc_3 = Field(@row, 'imgsrc_3')\n  set @alttext_3 = Field(@row, 'alttext_3')\n\n  set @headline_4 = Field(@row, 'headline_4')\n  set @subheadline_4 = Field(@row, 'subheadline_4')\n  set @copy_4 = Field(@row, 'copy_4')\n  set @cta_4 = Field(@row, 'cta_4')\n  set @imgsrc_4 = Field(@row, 'imgsrc_4')\n  set @alttext_4 = Field(@row, 'alttext_4')\n  \n\n\n/* No Error - Log send to_INT_SendLog DE */ \nInsertDE(@sendLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName)\n\nelse\n\n/*Log error to@errorLogDEDE and Stop Send*/  \nInsertDE(@errorLogDE,'EmailAddress',emailaddr,'SendDate',Now(),'Contact_Key',_SubscriberKey,'EmailName',@emailname,'Lang_Region',@lang_region,'JobID',jobid,'BatchID',_JobSubscriberBatchID,'DataSourceName',_DataSourceName,'Error',@errorMSG)\n\nRaiseError(@errorMSG,1,0,0,1)\nendif\n\n/*\nTo add additional sections copy a section and change _x to the next number\n*]\%\%\n\n\n<!-- PreHeader Control -->\%\%[if Not Empty(@preheader) then]\%\%<div style=\"display: none; max-height: 0px; overflow: hidden;\">\%\%=TreatAsContent(@preheader)=\%\%</div><!-- Insert &zwnj;&nbsp; hack after hidden preview text --><div style=\"display: none; max-height: 0px; overflow: hidden;\">&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;</div>\n\%\%[endif]\%\%",
            "description": "AMPScript for INT Content Lookup",
            "name": ampscriptPRODContentContentBlock
            },
            { 
            "assetType": {
              "id": 220,
              "name": "codesnippetblock"
              },
             "content": "\%\%[\nset @dictionaryDE = 'INT_Dictionary'\n\n/* International Dictionary Lookups */\n\n/* @com sets the domain routing for global links */\n  \n  set @comCheck = Lookup(@dictionaryDE,@lang_region, \"Phrase\", \"com\")\n  if not empty(@comCheck) then \n    set @Phrase = @comCheck\n  else\n  set @com = Lookup(@dictionaryDE,\"en-US\",\"Phrase\",\"com\")\n  endif\n  \n  \n/*\n  set @PhraseCheck = Lookup(@dictionaryDE,@lang_region, \"Phrase\", \"Phrase\")\n  if not empty(@PhraseCheck) then \n    set @Phrase = @PhraseCheck\n  else\n  set @Phrase = Lookup(@dictionaryDE,\"en-US\",\"Phrase\",\"Phrase\")\n  endif\n*/\n\n\nset @baseURL = 'https://TrendlineInteractive.com/'\n\n/* define global links */\nset @path = Concat(@baseURL,@com,\"urlPath\")\n\n]\%\%",
            "description": "AMPScript for INT Dictionary Lookup",
            "name": ampscriptPRODDictionaryContentBlock
            }
          ]
        }
    ]
  }
];



//Create Content Builder Assets
 
//Get Content Builder Folder ID
var categoryName = 'Content Builder';
var parentID = getFolderID(categoryName);

Write('CB Folder: ' + categoryName + ' | ' + parentID + '<br><br>');
    
//Loop through main folders; tier 1
for(i = 0; i < cbAssets.length; i++){
  //Set Category Name
  var categoryName = cbAssets[i].name;
  
    
  //Create Category
  createCBFolder(restBase, contentType, accessToken, categoryName, parentID);
    
  //Get CategoryID and push into JSON object
  cbAssets[i].id = getFolderID(categoryName);
    
    var parentID = getFolderID(categoryName);
    Write('T1 Folder Name: ' + categoryName + ' | ' + parentID + '<br><hr>');
  
    //Loop through subfolders; tier 2
    for(s=0; s < cbAssets[i].subfolder.length; s++){
    //Check for Subfolders
    if(cbAssets[i].subfolder[s].name){
      //Set Category Name
      var categoryName = cbAssets[i].subfolder[s].name;
            
      //Create Category
      createCBFolder(restBase, contentType, accessToken, categoryName, parentID);
      //Get CategoryID and push into JSON object
      cbAssets[i].subfolder[s].id = getFolderID(categoryName);

      var categoryID = getFolderID(categoryName);
      Write('<br>T1 Folder Name: ' + categoryName + ' | ' + categoryID + '<br><br>');
          
       for(a = 0; a < cbAssets[i].subfolder[s].assets.length; a++){
        var name = cbAssets[i].subfolder[s].assets[a].name;
        var content = cbAssets[i].subfolder[s].assets[a].content;
        var description = cbAssets[i].subfolder[s].assets[a].description;
        var assetTypeID = cbAssets[i].subfolder[s].assets[a].assetType.id;
        var assetTypeName = cbAssets[i].subfolder[s].assets[a].assetType.name;

                Write('name: ' + name + '<br>');
                Write('categoryName: ' + categoryName + '<br>');
                Write('categoryID: ' + categoryID + '<br>');
                Write('content: ' + content + '<br>');
                Write('description: ' + description + '<br>');
                Write('assetTypeID: ' + assetTypeID + '<br>');
                Write('assetTypeName: ' + assetTypeName + '<br><br><hr><br><br>');
               
               
               createCBAsset(restBase, contentType, accessToken, categoryID, categoryName, assetTypeID, assetTypeName, content, description, name);
        
     };
         
    //cbAssets[i].subfolder[s].ID = //get categoryID
      };
    };
  };
     


 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>

