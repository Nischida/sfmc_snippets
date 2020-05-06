<script runat=server>
  Platform.Load("core", "1.1.1");

try{

var deName = '';
var categoryName = '';
var description = '';


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
    "name": deName,
    "categoryName": categoryName,
    "description": description,
    "assets": [
            {
                "init": {
                   "fields": [
                        {FieldType: "Text", Name: "", MaxLength: 250,IsPrimaryKey: false,IsNillable: false,IsRequired: true},
                        {FieldType: "Text", Name: "", MaxLength: 250,IsPrimaryKey: false,IsNillable: false,IsRequired: true},
                        {FieldType: "Text", Name: "", MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false},
                        {FieldType: "Text", Name: "", MaxLength: 250,IsPrimaryKey: false,IsNillable: true,IsRequired: false}
                    ]
                }
            }
        ]
    }
    //To add more Data Extensions, copy the above code, add a comma, and adjust as needed. If adding more than one DE, hardcode the DE Names, Category Name and discriptions.
];




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
    var update = deAssets[i].assets[1].update;
    
    //Initiate function with the above variables
    createDE(deName, init, description, categoryName);
    
  };


 } catch(e) {
  Platform.Response.Write(Stringify(e));   
 }
</script>