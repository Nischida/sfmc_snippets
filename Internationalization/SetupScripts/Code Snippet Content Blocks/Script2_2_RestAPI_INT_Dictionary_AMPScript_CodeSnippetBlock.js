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
 "content": "\%\%[\nset @dictionaryDE = 'INT_Dictionary'\n\n/* International Dictionary Lookups */\n\n  /* @com sets the domain routing for global links */\n  set @comCheck = Lookup(@INT_Dictionary,@lang_region, \"Phrase\", \"com\")\n  if not empty(@comCheck) then \n    set @Phrase = @comCheck\n  else\n  set @com = Lookup(@INT_Dictionary,\"en-US\",\"Phrase\",\"com\")\n  endif\n\n  set @ValueCheck = Lookup(@INT_Dictionary,@lang_region, \"Phrase\", \"Phrase\")\n  if not empty(@ValueCheck) then \n    set @Phrase = @ValueCheck\n  else\n  set @Phrase = Lookup(@INT_Dictionary,\"en-US\",\"Phrase\",\"Phrase\")\n  endif\n  \n\n/*Social Links*/\n/*Facebook*/\nset @socialLink_FacebookCheck = Lookup(@INT_Dictionary,@lang_region, \"Phrase\", \"socialLink_Facebook\")\nif not empty(@socialLink_FacebookCheck) then \n  set @socialLink_Facebook = @socialLink_FacebookCheck\nelse\n set @socialLink_Facebook = Lookup(@INT_Dictionary,\"en-US\",\"Phrase\",\"socialLink_Facebook\")\nendif\n\n\n/* define global links */\nset @path = Concat(@baseURL,@com,\"urlPath\")\n\n]\%\%",
"description": "AMPScript for INT Dictionary",
"name": "INT_Dictionary_API"
}


var payload = Platform.Function.Stringify(asset);
   
var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);
   

 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>