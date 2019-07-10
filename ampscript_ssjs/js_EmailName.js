<script runat="server">
Platform.Load("Core", "1")
var prox = new Script.Util.WSProxy(),
    objectType = "Email",
    cols = ["Name"],
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
        if(data && data.Results) {
            for(var i=0; i< data.Results.length; i++) {
                Platform.Response.Write(data.Results[i].Name);
                numItems++;
            }
        }
    }
}
Platform.Response.Write("<br />" + numItems + " total " + objectType);
</script>