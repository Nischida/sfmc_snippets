<script runat=server>
/*********
Create a Folder and  Data Extensions for the following Data Views.

DataView_Sent
DataView_Open
DataView_Click
DataView_Job
DataView_Bounce
DataView_Unsubscribe

Future Updates: 
Create an automation with SQL Queries to pull Data View data every day.

*********/

  Platform.Load("core", "1.1.1");

try{
//Set Folder Name for Data View Extracts
var categoryName = 'Data View Extracts';
  

function createDEFolder(categoryName, parentID, description){
  if(!getFolderID(categoryName)){
  var deGUID = Platform.Function.GUID();

  var newFolder = {
      "Name" : categoryName,
      "CustomerKey" : deGUID,
      "Description" : description,
      "ContentType" : "DataExtension",
      "IsActive" : "true",
      "IsEditable" : "true",
      "AllowChildren" : "true",
      "ParentFolderID" : parentID
  };

  var result = Folder.Add(newFolder);
};

return result;
};


//Get categoryID based on Folder Name
function getFolderID(categoryName){
  //Get Root Folder ID
  var result = Folder.Retrieve({Property:"Name",SimpleOperator:"equals",Value:categoryName});
  var folderID = result[0].ID

  return folderID;
}; 


//Get External/CustomerKey of Data Extension based on DE Name
function getDECustomerKey(deName){
var prox = new Script.Util.WSProxy();
var cols = ["CustomerKey"];
var filter = {
    Property: "Name",
    SimpleOperator: "equals",
    Value: deName
};  
  
var result = prox.retrieve("DataExtension", cols, filter);
var customerKey = result.Results[0].CustomerKey  

return customerKey;
};


//Creates data Extension
function createDE(deName, init, description, categoryName){
  //Check to make sure DE does not already exist
  if(!getDECustomerKey(deName)){

    //If DE does not exist create DE
    var categoryID = getFolderID(categoryName);

    var prox = new Script.Util.WSProxy();  
    var deGUID = Platform.Function.GUID();

    var deFields = {
        Name: deName,
        CustomerKey: deGUID,
        Description: description,
        CategoryID: categoryID,
        Fields: init.fields
    };

    var result = prox.createItem("DataExtension", deFields);
  };
};


  


//Create Data extension objects; object needs DE Name, Category/Folder Name, Description, at minimum one Field.
var deAssets = 
[
  { 
    "name": "DataView_Sent",
    "categoryName": categoryName,
    "description": "DataView_Sent",
    "assets": [
            {
                "init": {
                   "fields": [
                        { "Name" : "AccountID", "FieldType" : "Number" , "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "OYBAccountID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "ListID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "BatchID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SubscriberID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254, "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "EventDate", "FieldType" : "Date", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "Domain", "FieldType" : "Text", "MaxLength" : 128, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true }
                    ]
                }
            }
        ]
    },
    { 
    "name": "DataView_Open",
    "categoryName": categoryName,
    "description": "DataView_Open",
    "assets": [
            {
                "init": {
                   "fields": [
                        { "Name" : "AccountID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "OYBAccountID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "ListID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "BatchID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "SubscriberID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254, "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "EventDate", "FieldType" : "Date", "Ordinal" : 2, "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "Domain", "FieldType" : "Text", "MaxLength" : 128, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "IsUnique", "FieldType" : "Boolean", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true }
                    ]
                }
            }
        ]
    },
    { 
    "name": "DataView_Click",
    "categoryName": categoryName,
    "description": "DataView_Click",
    "assets": [
            {
                "init": {
                   "fields": [
                        { "Name" : "AccountID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "OYBAccountID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "ListID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "BatchID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "SubscriberID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254, "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "EventDate", "FieldType" : "Date", "Ordinal" : 2, "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "Domain", "FieldType" : "Text", "MaxLength" : 128, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "IsUnique", "FieldType" : "Boolean", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "URL", "FieldType" : "Text", "MaxLength" : 900, "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "LinkName", "FieldType" : "Text", "MaxLength" : 1024, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "LinkContent", "FieldType" : "Text", "MaxLength" : 4000, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true }
                    ]
                }
            }
        ]
    },
    { 
    "name": "DataView_Job",
    "categoryName": categoryName,
    "description": "DataView_Job",
    "assets": [
            {
                "init": {
                   "fields": [
                        { "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "EmailID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "AccountID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "AccountUserID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "FromName", "FieldType" : "Text", "MaxLength" : 130, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "FromEmail", "FieldType" : "Text", "MaxLength" : 100, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SchedTime", "FieldType" : "Date", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "PickupTime", "FieldType" : "Date", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "DeliveredTime", "FieldType" : "Date", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "EventID", "FieldType" : "Text", "MaxLength" : 50, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "IsMultiPart", "FieldType" : "Boolean", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "JobType", "FieldType" : "Text", "MaxLength" : 50, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "JobStatus", "FieldType" : "Text", "MaxLength" : 50, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "ModifiedBy", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "ModifiedDate", "FieldType" : "Date", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "EmailName", "FieldType" : "Text", "MaxLength" : 100, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "EmailSubject", "FieldType" : "Text", "MaxLength" : 200, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "IsWrapped", "FieldType" : "Boolean", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "TestEmailAddr", "FieldType" : "Text", "MaxLength" : 128, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "Category", "FieldType" : "Text", "MaxLength" : 100, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "BCCEmail", "FieldType" : "Text", "MaxLength" : 100, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "OriginalSchedTime", "FieldType" : "Date", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "CreatedDate", "FieldType" : "Date", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "CharacterSet", "FieldType" : "Text", "MaxLength" : 30, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "IPAddress", "FieldType" : "Text", "MaxLength" : 50, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SalesForceTotalSubscriberCount", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SalesForceErrorSubscriberCount", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SendType", "FieldType" : "Text", "MaxLength" : 128, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "DynamicEmailSubject", "FieldType" : "Text", "MaxLength" : 4000, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SuppressTracking", "FieldType" : "Boolean", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SendClassificationType", "FieldType" : "Text", "MaxLength" : 32, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SendClassification", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "EmailSendDefinition", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "ResolveLinksWithCurrentData", "FieldType" : "Boolean", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "DeduplicateByEmail", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true }
                    ]
                }
            }
        ]
    },
    { 
    "name": "DataView_Bounce",
    "categoryName": categoryName,
    "description": "DataView_Bounce",
    "assets": [
            {
                "init": {
                   "fields": [
                        { "Name" : "AccountID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "OYBAccountID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "ListID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "BatchID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "SubscriberID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254, "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "EventDate", "FieldType" : "Date", "Ordinal" : 2, "IsPrimaryKey" : true, "IsRequired" : true },
                        { "Name" : "IsUnique", "FieldType" : "Boolean", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "BounceCategoryID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "BounceCategory", "FieldType" : "Text", "MaxLength" : 50, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "BounceSubcategoryID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "BounceSubcategory", "FieldType" : "Text", "MaxLength" : 50, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "BounceTypeID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "BounceType", "FieldType" : "Text", "MaxLength" : 50, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SMTPBounceReason", "FieldType" : "Text", "MaxLength" : 4000, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SMTPMessage", "FieldType" : "Text", "MaxLength" : 4000, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SMTPCode", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text", "MaxLength" : 36, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "Domain", "FieldType" : "Text", "MaxLength" : 128, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true }
                    ]
                }
            }
        ]
    },
    { 
    "name": "DataView_Unsubscribe",
    "categoryName": categoryName,
    "description": "DataView_Unsubscribe",
    "assets": [
            {
                "init": {
                   "fields": [
                        { "Name" : "AccountID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "OYBAccountID", "FieldType" : "Number", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "ListID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "BatchID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SubscriberID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254, "IsPrimaryKey" : true, "IsRequired" : true, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "EventDate", "FieldType" : "Date", "Ordinal" : 2, "IsPrimaryKey" : true, "IsRequired" : true, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "IsUnique", "FieldType" : "Boolean", "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true },
                        { "Name" : "Domain", "FieldType" : "Text", "MaxLength" : 128, "IsPrimaryKey" : false, "IsRequired" : false, "IsNillable" : true }
                    ]
                }
            }
        ]
    }
    //To add more Data Extensions, copy the above code, add a comma, and adjust as needed. If adding more than one DE, hardcode the DE Names, Category Name and discriptions.
];

  

//Default Details for Data View Extracts Folder
var parentID = getFolderID('Data Extensions');
var description = 'Data Extensions for Data View Extracts';
  
createDEFolder(categoryName, parentID, description);



//Create Data Extensions
//Get all DE assets from the above JSON
  for(i = 0; i < deAssets.length; i++){

    //List out asset details for review
    Write(deAssets[i].name + "<br>");
    Write(deAssets[i].categoryName + "<br>");
    Write(deAssets[i].description + "<br>");
    Write(Stringify(deAssets[i].assets[0].init) + "<br>");
  
    //Set variables for functions from the JSON
    var deName = deAssets[i].name;
    var categoryName = deAssets[i].categoryName;
    var description = deAssets[i].description;
    var init = deAssets[i].assets[0].init;
    
    //Initiate function with the above variables
    createDE(deName, init, description, categoryName);
    
  };


 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>