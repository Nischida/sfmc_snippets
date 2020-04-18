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
 "content": "<!--This block acts a a package for the LanguageContentLookup and INT_Dictionary AMPScript\nWith the addition of the @is_dev variable, we can now toggle between the Development and Production blocks from the Email Control AMPScript block rather than needing to adjust the ContentBlockById Function.\n\nThis block should be set as a Reference Content Block.-->\n\n\%\%[\n/*Set Dev and Prod Content Block IDs*/\nset @devContent = '';\nset @devDictionary = '';\n\nset @prodContent = '';\nset @prodDictionary = '';\n\nif @is_dev == 'Y' then\n]\%\%\n\n<!--LanguageContentLookup Block-->\n\%\%=ContentBlockById(@devContent)=\%\%\n<!--INT_Dictionary Block-->\n\%\%=ContentBlockById(@devDictionary)=\%\%\n\n\%\%[elseif @is_dev == 'N' or @is_dev == '' then]\%\%\n\n<!--LanguageContentLookup Block-->\n\%\%=ContentBlockById(@prodContent)=\%\%\n<!--INT_Dictionary Block-->\n\%\%=ContentBlockById(@prodDictionary)=\%\%\n\n\%\%[endif]\%\%",
"description": "AMPScript for INT Core Package",
"name": "INT_AMPScript_Core_PKG_API"
}


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);
   

 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>