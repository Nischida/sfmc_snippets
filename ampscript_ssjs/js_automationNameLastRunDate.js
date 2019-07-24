<script runat="server">
Platform.Load("Core", "1")
try{
var prox = new Script.Util.WSProxy(),
    objectType = "AutomationInstance",
    cols = ["Name", "CompletedTime", "AutomationTasks"],

   // DD_Type = Variable.GetValue("@DD_Type");
   DD_Type = "WL"
        if(DD_Type == "WL"){ queryName = "00000413_WEBLETTER_CountQueries" } 
        if(DD_Type == "travel"){ queryName = "Travel_Newsletter Queries" } 
        if(DD_Type == "health"){ queryName = "Health Queries" } 
        if(DD_Type == "money"){ queryName = "Money Queries_4SLTs" } 
        if(DD_Type == "espanol"){ queryName = "Spanish_Newsletter_MASTER" } 
        if(DD_Type == "leisure"){ queryName = "Leisure Master and SLT Queries" } 


    filter = {
        Property: "Name",
        SimpleOperator: "equals",
        Value: queryName
    }; 
    moreData = true,
    reqID = null,
    numItems = 0;
    date = new Date();
    yesterday = date.setDate(date.getDate() - 7);

while(moreData) {
    moreData = false;
    var data = reqID == null ?
           prox.retrieve(objectType, cols, filter) :
           prox.getNextBatch(objectType, reqID);

    if(data != null) {
        moreData = data.HasMoreRows;
        reqID = data.RequestID;
        if(data && data.Results) {
            
                automationName = data.Results[data.Results.length - 1].Name;
                automationRunDate = data.Results[data.Results.length - 1].CompletedTime;

                for(i=0; i < data.Results[i].length; i++) {
                Platform.Response.Write(data.Results[i].AutomationTasks);
            }
       
            }
        }
    }
  
Variable.SetValue("automationName",automationName);
Variable.SetValue("automationRunDate",automationRunDate);
  } catch(e) {
    Platform.Response.Write(e)
  }
</script>