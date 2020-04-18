<script runat=server>
Platform.Load("Core","1.1.1");
 try {

var authBase = '...';
var url = authBase +'v2/token';
var contentType = 'application/json';
var clientId = '...';
var clientSecret = '...';
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
var restBase = "...";
var url = restBase + "asset/v1/content/assets";
var contentType = "application/json";
var headerNames = ["Authorization"];
var headerValues = ["Bearer " + accessToken];

var asset = {
"category": {
	"id": ...,
  	"name": "..."
		},
"assetType": {
	"id": 220,
	"name": "codesnippetblock"
	},
 "content": "...",
"description": "...",
"name": "..."
}

var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);
   
 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>