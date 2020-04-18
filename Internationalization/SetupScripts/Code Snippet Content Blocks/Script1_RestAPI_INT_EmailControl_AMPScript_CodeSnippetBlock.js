<script runat=server>
Platform.Load("Core","1.1.1");
 try {

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
   
   
// Create Assets
var restBase = "https://mc1q10jrzwsds3bcgk0jjz2s8h80.rest.marketingcloudapis.com/";
var url = restBase + "asset/v1/content/assets";
var contentType = "application/json";
var headerNames = ["Authorization"];
var headerValues = ["Bearer " + accessToken];

var asset = {
"category": {
	"id": 284572,
  	"name": "API Content Blocks"
		},
"assetType": {
	"id": 220,
	"name": "codesnippetblock"
	},
 "content": "\%\%[\n/*\n**Controls Email Name Variables for lookups**\nNeeds to be set as it appears in the SDC_Email_Catalog and corresponding Content Data Extensions\n\n**Controls Prod/STG Content DE Selection**\n@is_stg == '' (pulls from Prod DEs)\n@is_stg == 'N' (pulls from Prod DEs)\n@is_stg == 'Y' (pulls from STG DEs)\n\n**Controls Prod/Dev AMPScript blocks for LanguageContentLookup and INT_Dictionary**\n@is_dev == '' (pulls from Prod AMPScript blocks)\n@is_dev == 'N' (pulls from Prod AMPScript blocks)\n@is_dev == 'Y' (pulls from STG AMPScript blocks)\n\n**Controls Prod/Dev AMPScript blocks for Footer**\n@is_footerDev == '' (pulls from Prod AMPScript blocks)\n@is_footerDev == 'N' (pulls from Prod AMPScript blocks)\n@is_footerDev == 'Y' (pulls from STG AMPScript blocks)\n*/\n\nset @emailname = ''\nset @is_stg = 'Y'\nset @is_dev = 'N'\nset @is_footerDev = 'N'\n]\%\%",
"description": "AMPScript for INT Email Control",
"name": "INT_EmailControl_API"
}


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);
   

 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>