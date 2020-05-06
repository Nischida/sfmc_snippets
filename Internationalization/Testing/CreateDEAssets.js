<script runat=server>
  Platform.Load("core", "1.1.1");

  try{

var mod = '_FT_M427_1';
  
//Other Asset Names
var emailName = 'TLI_TestEmail' + mod;
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
var supportingFolderName = 'Supporting' + mod;
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

  
//Data Extension Headers
var contentHeaders = ["headline","subheadline","copy","cta","imgsrc","alttext"]
var dictionaryHeaders = ["en-US","zh-HK"]



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
  
  var payload = {"client_id": clientId,"client_secret": clientSecret,"grant_type": grantType};

  var authPayload = Platform.Function.Stringify(payload);

  var accessTokenResult = HTTP.Post(url, contentType, authPayload);
  var statusCode = accessTokenResult["StatusCode"];

  var response = accessTokenResult["Response"][0];
  var accessToken = Platform.Function.ParseJSON(response).access_token;   

  return accessToken;
};


/***** Start Functions *****/
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}
  
  
//Get category IDs
function getFolderID(categoryName){
 var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:categoryName});
 var categoryID = result[0].ID

 return categoryID;
};


/***** Start Data Extension Functions *****/
function getDEFolderID(deFolderName, parentID){
  
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: deFolderName
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: parentID
  }
};


var folderData = folderProx.retrieve("DataFolder", cols, filter);
var parentID = folderData.Results[0].ID;
  
return parentID;
};
  
//Create Data Extension Folder
function createDEFolder(deFolderName, description, parentID){
    var deGUID = Platform.Function.GUID();

        var newFolder = {
        "Name": deFolderName,
        "CustomerKey": deGUID,
        "Description": description,
        "ContentType": "DataExtension",
        "IsActive": "true",
        "IsEditable": "true",
        "AllowChildren": "true",
        "ParentFolderID": parentID
        }; 

   var result = Folder.Add(newFolder);
};

  
//Get Data Extension Customer Key
function getDECustomerKey(deName){
 var prox = new Script.Util.WSProxy();
 var cols = ["CustomerKey"];
 var filter = {Property: "Name", SimpleOperator: "equals", Value: deName};  
   
 var res = prox.retrieve("DataExtension", cols, filter);
 var customerKey = res.Results[0].CustomerKey  

 return customerKey;
};

//Create Data Extension
function createDE(deObj){
var deName = deObj.name;
  
  if(!getDECustomerKey(deName)){   
        var categoryName = deObj.categoryName;
        var description = deObj.description;
        var init = deObj.assets[0].init;
        var update = deObj.assets[1].update;
     	var categoryID = getFolderID(categoryName);

  var prox = new Script.Util.WSProxy();  
  var deGUID = Platform.Function.GUID();

  var deFields = {
   "Name": deName,
   "CustomerKey": deGUID,
   "Description": description,
   "CategoryID": categoryID,
   "Fields": init.fields
  };
    
    
    	Write(deName + '<br>');
       	Write(categoryName + '<br>');
       	Write(description + '<br>');
       	Write(Stringify(init) + '<br><br>');
       	Write(Stringify(update) + '<br><br><hr>');

   		var result = prox.createItem("DataExtension", deFields);
    
    
    if(update){
      updateDEFields(update, deGUID);
    };
          
 };
};

//Add additional Fields to Created Data Extension -- this is done at the same time a DE is created.
function updateDEFields(update, deGUID){
    var fieldType = update.fieldType;
    var isprimarykey = update.isPrimaryKey;
    var isNillable = update.isNillable;
    var isRequired = update.isRequired;
    var fields = update.fields;

    for(p = 1; p < update.iterations; p++){
        for(u = 0; u < fields.length; u++){
            var prox = new Script.Util.WSProxy();

            var fieldName = fields[u] + "_" + p;

            var deField = [
            {FieldType: fieldType, Name: fieldName, IsPrimaryKey: isprimarykey, IsNillable: isNillable, IsRequired: isRequired}
            ];

            var props = {CustomerKey: deGUID, Fields: deField};

            var result = prox.updateItem("DataExtension", props);
        };
    };

};

  
/***** Start Content Builder Functions *****/

//Create Content Builder Folders
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

  return result;
 };
};

//Create Content Builder Asset
function createCBAsset(restBase, contentType, accessToken, parentID, categoryName, asset){
    var url = restBase + 'asset/v1/content/assets';
    //Set Headers for RestAPI
    var headerNames = ["Authorization"];
    var headerValues = ["Bearer " + accessToken];
  
   var assetName = asset.name;
    var assetDescription = asset.description;
    var assetContent = asset.content;
    var assetTypeID = asset.assetType.id;
    var assetTypeName = asset.assetType.name;
  
    var asset = {
       "category": {
        "id": parentID,
        "name": categoryName
        },
       "assetType": {
        "id": assetTypeID,
        "name": assetTypeName
        },
        "content": assetContent,
        "description": assetDescription,
        "name": assetName
    };


 var payload = Platform.Function.Stringify(asset);
 var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);

    Write('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Asset Name: ' + assetName + '<br>');
    Write('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Asset Type: ' + assetTypeID + " | " + assetTypeName + '<br>');
    Write('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Asset Description: ' + assetDescription + '<br>');
    Write('&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Asset Content: ' + assetContent + '<br><br><hr>');
  
    return result
}; 



var deFolders = [   
  {
      "deFolderName": rootFolderName,
      "parentFolderName": "Data Extensions",
      "description": "All data extensions assets."
  },
  {
  "deFolderName": contentFolderName,
  "parentFolderName": rootFolderName,
  "description": "All Content Data Extensions for all emails."
 },
  {
      "deFolderName": logsFolderName,
      "parentFolderName": rootFolderName,
      "description": "All logging data extensions."
 },
 {
     "deFolderName": supportingFolderName,
     "parentFolderName": rootFolderName,
     "description": "All supporting data extensions."
 },
 {
  "deFolderName": dictionaryFolderName,
  "parentFolderName": supportingFolderName,
  "description": "All dictionary data extensions."
 },
 {
  "deFolderName": catalogFolderName,
  "parentFolderName": supportingFolderName,
  "description": "All catalog data extensions."

 },
 {
  "deFolderName": limitingFolderName,
  "parentFolderName": supportingFolderName,
  "description": "All send limiting data extensions."
 },
 {
  "deFolderName": contentSubFolderName,
  "parentFolderName": contentFolderName,
  "description": "Content folder."
 },
 {
  "deFolderName": contentPRODFolderName,
  "parentFolderName": contentSubFolderName,
  "description": "Content folder for production content."
 },
 {
  "deFolderName": contentSTGFolderName,
  "parentFolderName": contentSubFolderName,
  "description": "Content folder for staging content."
 },
 {
  "deFolderName": rcContentFolderName,
  "parentFolderName": contentFolderName,
  "description": "Content folder for reusable content."
 },       
 {
  "deFolderName": rcContentPRODFolderName,
  "parentFolderName": rcContentFolderName,
  "description": "Content folder for reusable content."
 },
 {
  "deFolderName": rcContentSTGFolderName,
  "parentFolderName": rcContentFolderName,
  "description": "Content folder for reusable content."
 }
];
    

var deAssets = 
[
	{
		"name": dictionaryDE,
		"categoryName": dictionaryFolderName,
		"description": "Translated phrases and other assets.",
		"assets":[
		{
			"init": {
				"fields": 
				[
			      {FieldType: "Text", Name: "Phrase", MaxLength: 250, IsPrimaryKey: true, IsNillable: false, IsRequired: true}
				]

			},
			"update": 
			{	
              	"fields": dictionaryHeaders,
				"fieldType": "Text",
				"isPrimaryKey": false,
				"isNillable": true,
				"isRequired": false,
				"iterations": 1
			}
              
		}
		]
	},
	{
		"name": catalogDE,
		"categoryName": catalogFolderName,
		"description": "Catalog of all emails and data extension locations.",
      	"assets":
      	[
			{
            "init": {
                "fields": [
                    {FieldType: "Text",Name: "emailname",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
                    {FieldType: "Text",Name: "lang_region",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
                    {FieldType: "Text",Name: "prodDE",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
                    {FieldType: "Text",Name: "stgDE",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
                    ]
                }
            }
    	]
	},
	{
		"name": contentBlockCatalogDE,
		"categoryName": catalogFolderName,
		"description": "All assets and asset IDs.",
		"assets": 
  		[
            {
            	"init":{
                        "fields": [
                            {FieldType: "Text",Name: "AssetName",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
                            {FieldType: "Text",Name: "ID",MaxLength: 100,IsNillable: false,IsRequired: true}
                        ]
                }
            }
        ]
	},
	{	
		"name": contentPRODRomDE,
		"categoryName": contentPRODFolderName,
		"description": "Production Content",
		"assets":[
            {
                "init": {
                    "fields": [
	                    {FieldType: "Text",Name: "emailname",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
	                    {FieldType: "Text",Name: "lang_region",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
	                    {FieldType: "Text",Name: "subject",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
	                    {FieldType: "Text",Name: "preheader",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
                    ]
                }
			},
			{
				"update": 
				{
					"fields": contentHeaders,
					"fieldType": "Text",
					"isPrimaryKey": false,
					"isNillable": true,
					"isRequired": false,
					"iterations": iterations + 1
				}
			}
		]
	},
	{	
		"name": contentPRODSymDE,
		"categoryName": contentPRODFolderName,
		"description": "Production Content",
		"assets": [
            {
                "init": {
                    "fields": [
                          {FieldType: "Text",Name: "emailname",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
                          {FieldType: "Text",Name: "lang_region",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
                          {FieldType: "Text",Name: "subject",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
                          {FieldType: "Text",Name: "preheader",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
                        ]
                    }
			},
			{
				"update": 
					{
						"fields": contentHeaders,
						"fieldType": "Text",
						"isPrimaryKey": false,
						"isNillable": true,
						"isRequired": false,
						"iterations": iterations + 1
					}
			}
		]
	},
	{	
		"name": contentSTGRomDE,
		"categoryName": contentSTGFolderName,
		"description": "Staging Content",
		"assets":[
            {
              "init": 
                  {
                      "fields": 
                      [
                        {FieldType: "Text",Name: "emailname",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
                        {FieldType: "Text",Name: "lang_region",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
                        {FieldType: "Text",Name: "subject",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
                        {FieldType: "Text",Name: "preheader",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
                      ]
                  }

			},
			{
				"update": 
				{
					"fields": contentHeaders,
					"fieldType": "Text",
					"isPrimaryKey": false,
					"isNillable": true,
					"isRequired": false,
					"iterations": iterations + 1
				}
			}

		]
	},
	{	
		"name": contentSTGSymDE,
		"categoryName": contentSTGFolderName,
		"description": "Staging Content",
		"assets": [
            {
                "init": {
                   "fields": [
                        {FieldType: "Text",Name: "emailname",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
                        {FieldType: "Text",Name: "lang_region",MaxLength: 250,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
                        {FieldType: "Text",Name: "subject",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
                        {FieldType: "Text",Name: "preheader",MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
                    ]
                }
            },
            {
	            "update": {
	                "fields": contentHeaders,
	                "fieldType": "Text",
	                "isPrimaryKey": false,
	                "isNillable": true,
	                "isRequired": false,
	                "iterations": iterations + 1
                }
            }
        ]
    }
];



var categoryName = 'Data Extensions';
var parentID = getFolderID(categoryName);
  
try{
//Create Data Extension Folder Assets
for(df = 0; df < deFolders.length; df++){    
  var deObj = deFolders[df];
  var deFolderName = deObj.deFolderName;
  var description = deObj.description;
  var categoryName = deObj.parentFolderName;
   
    Write(deFolderName + '<br>');
    Write(categoryName + '<br>');
    Write(description + '<br>');
    Write(parentID + '<br><br><hr>');
  
   createDEFolder(deFolderName, description, parentID); 
  
   var parentID = getDEFolderID(categoryName, parentID);
  

};

       } catch(e) {
  Platform.Response.Write('DE Folders: ' + Stringify(e));   
 }
  

  
 try{ 
//Create and Update Data Extensions 
for(de = 0; de < deAssets.length; de++){
   var deObj = deAssets[de];
 
 createDE(deObj); 

};
   } catch(e) {
  Platform.Response.Write('DEs: ' + Stringify(e));   
 }
  
 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
  </script>