<script runat=server>
  Platform.Load("core", "1.1.1");

  try{
//API Authentication; update: authBase, restBase, clientID, clientSecret vars with details from the SFMC Installed PKG
var authBase = 'https://mc1q10jrzwsds3bcgk0jjz2s8h80.auth.marketingcloudapis.com/';
var restBase = 'https://mc1q10jrzwsds3bcgk0jjz2s8h80.rest.marketingcloudapis.com/'; 
var contentType = 'application/json';
var grantType = 'client_credentials';

var clientId = 'uafzm4wvdyc7digq683cv3ys';
var clientSecret = 'W2aU6GMZ8BIBfRxs1JLG1ryn';






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

  
function getCBFolderID(categoryName){
	//Get Root Folder ID
	var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:categoryName});
	var folderID = result[0].ID

	return folderID;
}; 


function createCBAsset(categoryID, categoryName,){

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
};


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);

return result
};


//Get Access Token
var accessToken = auth(clientID, clientSecret, contentType, grantType, authBase);

  
Write('Token: ' + accessToken + '<br>');


var emailControl = {
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
	"name": 'INT_EmailControl_func'
	};

var corePKG = {
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


var cbAssets = [ 	
  {
    "name": 'INT_Assets_func',
    "assets": [],
  	"subfolder": [
      	{
      		"name": 'INT_CoreAssets_func',
      		"assets": [emailControl, corePKG]
	    },
      	{
      		"name": 'INT_DevAssets_func',
      		"assets": [];
      	}
    ],
    
  }
  ];

    
//Get Content Builder Folder ID
var categoryName = 'Content Builder';
var parentID = getCBFolderID(categoryName);

Write('CB Folder: ' + categoryName + ' | ' + parentID + '<br>');
    
//Loop through main folders; tier 1
for(i = 0; i < cbAssets.length; i++){
	//Set Category Name
	var categoryName = cbAssets[i].name;
	
  	
	//Create Category
	var res = createCBFolder(restBase, contentType, accessToken, categoryName, parentID);
  	
	//Get CategoryID and push into JSON object
	cbAssets[i].id = getCBFolderID(categoryName);
    
  	var parentID = cbAssets[i].id;
  	Write('T1 Folder Name: ' + categoryName + ' | ' + parentID + '<br>');
  
  	//Loop through subfolders; tier 2
  	for(s=0; s < cbAssets[i].subfolder.length; s++){
		//Check for Subfolders
		if(cbAssets[i].subfolder[s].name){
			//Set Category Name
			var categoryName = cbAssets[i].subfolder[s].name;
          	
			//Create Category
			//createCBFolder(restBase, contentType, accessToken, categoryName, parentID);
			//Get CategoryID and push into JSON object
			//cbAssets[i].subfolder[s].id = getCBFolderID(categoryName);

			//var categoryID = cbAssets[i].subfolder[s].id
          	//Write('T1 Folder Name: ' + categoryName + ' | ' + categoryID + '<br>');
          
			// for(a = 0; a < cbAssets[i].subfolder[s].asset.length; a++){
			// 	var name = cbAssets[i].subfolder[s].asset[a].name;
			// 	var categoryName = cbAssets[i].subfolder[s].asset[a].category.name;
			// 	var categoryID = cbAssets[i].subfolder[s].asset[a].category.id;
			// 	var content = Stringify(cbAssets[i].subfolder[s].asset[a].content);
			// 	var description = cbAssets[i].subfolder[s].asset[a].description;


				
		// }
		//cbAssets[i].subfolder[s].ID = //get categoryID
      };
    };
  };
  


 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>

