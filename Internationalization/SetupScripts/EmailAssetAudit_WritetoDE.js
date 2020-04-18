<script runat=server>
  Platform.Load("Core","1.1.1");
  
  try {

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
var emailTypes = Stringify(emails);
var images = ['psd','gif','jpeg','jpg','png','tif','tiff','bmp','svg','cr2']
var contentBlocks = ['freeformblock','textblock','htmlblock','textplusimageblock','imageblock','abtestblock','dynamicblock','stylingblock','einsteincontentblock','socialshareblock','socialfollowblock','buttonblock','layoutblock','smartcaptureblock','smartcaptureformfieldblock','smartcapturesubmitoptionsblock','externalcontentblock','referenceblock','imagecarouselblock','customblock','liveimageblock','livesettingblock']



//Get Root Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {Property:"Name",SimpleOperator:"equals",Value:"Data Extensions"};

var folderData = folderProx.retrieve("DataFolder", cols, filter);
var rootID = folderData.Results[0].ID;


//Create Discovery Folder
var description = "Email Audit and Discovery";
var date = Now();
var year = Stringify(date.getFullYear());
var month = Stringify(date.getMonth() + 1);
var day = Stringify(date.getDate());


if(month.length  < 2){
  var monthFormatted = '0' + month;
} else {
  var monthFormatted = month;
}


if(day.length < 2){
  var dayFormatted = '0' + day;
} else {
  var dayFormatted = day;
}
    
var deDate = year + monthFormatted + dayFormatted; 
var deGUID = Platform.Function.GUID();


//Get Version Folder ID
var folderProx = new Script.Util.WSProxy();
var cols = ["Name","ID"];
var filter = {
    LeftOperand:{ 
    Property: "Name",
    SimpleOperator: "equals",
    Value: "INT_EmailVersionControl"
    },
    LogicalOperator: "AND",
    RightOperand: {
    Property: "ParentFolder.ID",
    SimpleOperator: "equals",
    Value: rootID
  }
};

var folderData = folderProx.retrieve("DataFolder", cols, filter);
var discoveryFolderID = folderData.Results[0].ID;


//Create Dictionary DE
var prox = new Script.Util.WSProxy();
var description = "Email Audit";
var deGUID = Platform.Function.GUID();

var deFields = {
    Name: "INT_EmailVersionControl_" + deDate,
    CustomerKey: deGUID,
    Description: "Email Audit",
    Fields: [
      {FieldType: "Boolean",Name: "Copy",IsNillable: true,IsRequired: false,DefaultValue: false},
      {FieldType: "Boolean",Name: "Duplicated",IsNillable: true,IsRequired: false,DefaultValue: false},
      {FieldType: "Text",Name: "ID",MaxLength: 400,IsPrimaryKey: true,IsNillable: false,IsRequired: true},
      {FieldType: "Text",Name: "Name",MaxLength: 400,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "MID",MaxLength: 400,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "CreatedByEmail",MaxLength: 400,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "CreatedByName",MaxLength: 400,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Date",Name: "CreatedDate",IsPrimaryKey: false, IsNillable: true, IsRequired: false},
      {FieldType: "Text",Name: "ModifiedByEmail",MaxLength: 400,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "ModifiedByName",MaxLength: 400,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Date",Name: "ModifiedDate",IsPrimaryKey: false, IsNillable: true, IsRequired: false},
      {FieldType: "Text",Name: "CategoryID",MaxLength: 400,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "CategoryName",MaxLength: 400,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "AssetType",MaxLength: 400,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "Subject",MaxLength: 400,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
      {FieldType: "Text",Name: "HTML",IsPrimaryKey: false,IsNillable: true,IsRequired: false}
    ],
    CategoryID: discoveryFolderID
};

var res = prox.createItem("DataExtension", deFields);


//Create Assets Endpoint
var url = restBase + "asset/v1/content/assets/";

var categoryResult = HTTP.Get(url, headerNames, headerValues);
var response = Platform.Function.ParseJSON(categoryResult.Content);
var total = response.count;
var pageSize = response.pageSize
var pages = Math.ceil(total/pageSize) + 1;
  
for(var p = 1; p < pages; p++){
var url = restBase + "asset/v1/content/assets?$page=" + p;
  
var categoryResult = HTTP.Get(url, headerNames, headerValues);
var response = Platform.Function.ParseJSON(categoryResult.Content);

  
    for(var i = 0; i < response.items.length; i++){
        var name = response.items[i].name;
        var id = response.items[i].id;
        var mid = response.items[i].memberId;
        var createdByEmail = response.items[i].createdBy.email;
        var createdByName = response.items[i].createdBy.name;
        var createdDate = response.items[i].createdDate;
        var modifiedDate = response.items[i].modifiedDate;
        var modifiedByEmail = response.items[i].modifiedBy.email;
        var modifiedByName = response.items[i].modifiedBy.name;    
        var category = response.items[i].category.id;
        var categoryName = response.items[i].category.name;
        var subject = response.items[i].views.subjectline.content;
        var html = response.items[i].views.html.content;
        var assetType = response.items[i].assetType.name;
       

      if(emailTypes.indexOf(assetType)){
         Write("<b>Name:</b> " + name + "<br>");
         Write("<b>id:</b> " + id + "<br>");
            Write("<b>subject:</b> " + subject + "<br>");
            Write("<b>category:</b> " + category + "<br>");
            Write("<b>categoryName:</b> " + categoryName + "<br>");    
            Write("<b>createdByEmail:</b> " + createdByEmail + "<br>");
            Write("<b>createdByName:</b> " + createdByName + "<br>");
            Write("<b>createdDate:</b> " + createdDate + "<br>");
           Write("<b>modifiedDate:</b> " + modifiedDate + "<br>");
            Write("<b>modifiedByEmail:</b> " + modifiedByEmail + "<br>");
            Write("<b>modifiedByName:</b> " + modifiedByName + "<br>");
            Write("<b>assetType:</b> " + assetType + "<br>");
            Write("<b>MID:</b> " + mid + "<br><br><hr>");
       
  
//Upsert Testing Content into Catalog DE
var prox = new Script.Util.WSProxy();

/* Build DE Object */
var updateObject = {
   CustomerKey: deGUID,
   Properties: [
        {
      Name: "ID",
      Value: id
},
{
      Name: "Name",
      Value: name
},
{
      Name: "MID",
      Value: mid
},
{
      Name: "CreatedByEmail",
      Value: createdByEmail
},
{
      Name: "CreatedByName",
      Value: createdByName
},
{
      Name: "CreatedDate",
      Value:createdDate
},
{
      Name: "ModifiedByEmail",
      Value: modifiedByEmail
},
{
      Name: "ModifiedByName",
      Value: modifiedByName
},
{
      Name: "ModifiedDate",
      Value: modifiedDate
},
{
      Name: "CategoryID",
      Value: category
},
{
      Name: "CategoryName",
      Value: categoryName
},
{
      Name: "AssetType",
      Value: assetType
},
{
      Name: "Subject",
      Value: subject
},
{
      Name: "HTML",
      Value: html
}
   ]
};

var options = {SaveOptions: [{'PropertyName': '*', SaveAction: 'UpdateAdd'}]};

var res = prox.updateItem('DataExtensionObject', updateObject, options);
       };
      
    };

};
    
   } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>