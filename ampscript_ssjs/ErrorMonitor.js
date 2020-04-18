<script runat='server'>
Platform.Load("core", "1.1.1");
  
  var automationName = 'SDC_INT_ErrorMontior_1';
  
  try {
    var checkProx = new Script.Util.WSProxy();
    var checkObjectType = "Program";
    var checkCols = ["Status", "Name"];
    var checkFilter = {
        Property: "Name",
        SimpleOperator: "equals",
        Value: automationName
    };
    
    var data = checkProx.retrieve(checkObjectType, checkCols, checkFilter);


    if(data.Results[0].Status != 3){

        var startProx = new Script.Util.WSProxy();
        // Need to retrieve the ObjectID for the Automation, which isn't available via the SFMC interface.
        var startCols = ["Name", "ProgramID", "IsActive"];
        var startObjectType = "Automation";
        var startFilter = {
        Property: "Name",
        SimpleOperator: "equals",
        Value: automationName
        };
      
        var desc = startProx.retrieve(startObjectType, startCols, startFilter);

        // Output ObjectID if you want to see it. 
        // Write('<br>ObjectID: ' + desc.Results[0].ObjectID);

        var props = {
        ObjectID: desc.Results[0].ObjectID
        };
        var action = "start";
        var opts = {};
        var res = startProx.performItem(startObjectType, props, action, opts);
        var status = res.Status;
        var statusCode = res.Results[0].StatusCode;
      
    }else{
          
        Write("Automation Already Running");
          
    };
   
  } catch(e) {
    Write(Strinify(e));
  };
</script>

