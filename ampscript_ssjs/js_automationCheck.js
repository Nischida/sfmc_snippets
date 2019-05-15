// Plan to adjust to filter within SSJS, try to add Last Successful Run Time

<script runat="server">
    Platform.Load("Core", "1")
    Platform.Function.DeleteData('automation_check', ["Lookup"], ["1"]);

    var prox = new Script.Util.WSProxy();
    objectType = "Program",
    cols = ["Status", "Name"],
    moreData = true,
    reqID = null,
    numItems = 0;
    
while(moreData) {
    moreData = false;
    var data = reqID == null ?
           prox.retrieve(objectType, cols) :
           prox.getNextBatch(objectType, reqID);

    if(data != null) {
        moreData = data.HasMoreRows;
        reqID = data.RequestID;
            for(var i=0; i< data.Results.length; i++) {
                if (data.Results[i].Status == "1") {
                    friendlyStatus = "Building";
                } else if(data.Results[i].Status == "2") {
                    friendlyStatus = "Ready";
                } else if (data.Results[i].Status == "3") {
                    friendlyStatus = "Running";
                } else if (data.Results[i].Status == "4") {
                    friendlyStatus = "Paused | Check";
                } else if (data.Results[i].Status == "5") {
                    friendlyStatus = "Stopped | Check";
                } else if (data.Results[i].Status == "6") {
                    friendlyStatus = "Scheduled";
                } else if (data.Results[i].Status == "7") {
                    friendlyStatus = "Awaiting Trigger";
                } else if (data.Results[i].Status == "-1") {
                    friendlyStatus = "Error | Check";
                } else if (data.Results[i].Status == "0") {
                    friendlyStatus = "Building Error | Check";
                } else {
                    friendlyStatus = "Unknown Status | Check";
                }
                Platform.Function.InsertDE("automation_check",["Name","Status"],[data.Results[i].Name, friendlyStatus]);
               }
            }
        }
</script>
