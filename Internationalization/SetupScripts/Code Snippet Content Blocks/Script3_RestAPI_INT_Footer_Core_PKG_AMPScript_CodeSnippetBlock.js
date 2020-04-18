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
 "content": "\%\%[\nset @footerDev = '';\nset @footerProd = '';\n\nif @is_footerDev == 'Y' then\n]\%\%\n\nDevelopment Footer\n\%\%=ContentBlockById(@footerDev)=\%\%\n\n\%\%[elseif @is_footerDev == 'N' or @is_footerDev == '' then]\%\%\n\n<!--Production Footer-->\n\%\%=ContentBlockById(@footerProd)=\%\%\n\n\%\%[endif]\%\%",
"description": "AMPScript for INT Footer Package",
"name": "INT_AMPScript_Footer_PKG_API"
}


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);
   

 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>