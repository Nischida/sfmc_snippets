<script language=javascript runat=server>
Platform.Load("Core", "1");
CustomProgram = {
   Init: function(ObjectID,MID) {
      var obj = {};
  
      obj.Perform = function() {
         try {
            var program = Platform.Function.CreateObject("Program");
            var clientID = Platform.Function.CreateObject("ClientID");
            Platform.Function.SetObjectProperty(clientID, "ID", MID);
            Platform.Function.SetObjectProperty(clientID, "IDSpecified", "true");
            Platform.Function.SetObjectProperty(program, "Client", clientID);
            Platform.Function.SetObjectProperty(program, "ObjectID", ObjectID);
            Platform.Function.InvokePerform(program, "Start", status);
            return status[0];
         }
         catch (err) {
            return err.message;
         }
      };
   return obj;
   }
};
var myClientID = XXXXXXX;  // This is the MID of the other BU where the automation to start is setup
var myAutomation = "XXXXXXX";  // This is found by looking at the Automation ProgramID accessible through API
var prog = CustomProgram.Init(myAutomation,myClientID);
prog.Perform();
</script>