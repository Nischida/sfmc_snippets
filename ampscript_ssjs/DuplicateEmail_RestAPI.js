
<script runat=server>
  Platform.Load("Core","1.1.1");
  
  try {

var duplicateFolderID = 285139;
var duplicateFolderName = 'INT_Assets';


//API Authentication; update: authBase, restBase, clientID, clientSecret vars with details from the SFMC Installed PKG
var authBase = 'https://mc1q10jrzwsds3bcgk0jjz2s8h80.auth.marketingcloudapis.com/';
var restBase = "https://mc1q10jrzwsds3bcgk0jjz2s8h80.rest.marketingcloudapis.com/";   
var clientId = 'uafzm4wvdyc7digq683cv3ys';
var clientSecret = 'W2aU6GMZ8BIBfRxs1JLG1ryn';


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

    
//Content Types
var emails = ['html','xhtml','templatebasedemail','htmlemail','textonlyemail','defaulttemplate']
var contentBlocks = ['freeformblock','textblock','htmlblock','textplusimageblock','imageblock','abtestblock','dynamicblock','stylingblock','einsteincontentblock','socialshareblock','socialfollowblock','buttonblock','layoutblock','smartcaptureblock','smartcaptureformfieldblock','smartcapturesubmitoptionsblock','externalcontentblock','referenceblock','imagecarouselblock','customblock','liveimageblock','livesettingblock']


//Assets Endpoint
var url = restBase + "asset/v1/content/assets/";

//Get all results
var categoryResult = HTTP.Get(url, headerNames, headerValues);
var response = Platform.Function.ParseJSON(categoryResult.Content);
var total = response.count;
var pageSize = response.pageSize
var pages = Math.ceil(total/pageSize) + 1;
  
//Loop through result pages      
for(var p = 1; p < pages; p++){
var url = restBase + "asset/v1/content/assets?$page=" + p;
  
var categoryResult = HTTP.Get(url, headerNames, headerValues);
var response = Platform.Function.ParseJSON(categoryResult.Content);

    //Loop through page assets
    for(var i = 0; i < response.items.length; i++){
        var views = response.items[i].views;
        var name = response.items[i].name;
        var assetName = "INT_" + name;
        var id = response.items[i].id;
        var assetTypeName = response.items[i].assetType.name;
        var assetTypeID = response.items[i].assetType.id;
       

      //Check if asset is an email type
      for(e = 0; e < emails.length; e++){
        var emailCheck = emails[e].indexOf(assetTypeName);
      };

      //If email type create new asset
      if(emailCheck > 0){
            Write("<b>Name:</b> " + name + "<br>");
            Write("<b>id:</b> " + id + "<br>");
            Write("<b>assetTypeName:</b> " + assetTypeName + "<br>");
            Write("<b>assetTypeID:</b> " + assetTypeID + "<br>");
            Write(html + "<br><br><hr>");


            var asset = {
              "assetType": {
                "name": assetTypeName,
                "id": assetTypeID
               },
              "name": assetName,
              "channels": {
                "email": true,
                "web": false
              },

              "views": views,
              "category": {
                "id": duplicateFolderID,
                "name": duplicateFolderName
              }
            }

            var payload = Platform.Function.Stringify(asset);
            var result = HTTP.Post(url, contentType, payload, headerNames, headerValues);

    
        };
  

 
 
      
  };
};
    
   } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>