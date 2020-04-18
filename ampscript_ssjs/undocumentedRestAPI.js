//Previews

    "GetEmailPreviewByID": {
            "path": "emails/{id}/preview",
            "httpMethod": "post",
            "description": "Get a preview for an email by id.",
            "parameters": {}
        },
        "GetEmailPreviewByIDWithContact": {
            "path": "emails/{id}/contacts/{cid}/preview",
            "httpMethod": "post",
            "description": "Get a preview for an email by id using a specific contact.",
            "parameters": {}
        },
        "GetEmailPreviewByIDWithList": {
            "path": "emails/{id}/lists/{lid}/preview",
            "httpMethod": "post",
            "description": "Get a preview for an email by id using a specific list.",
            "parameters": {}
        },
        "GetEmailPreviewByIDWithListAndContact": {
            "path": "emails/{id}/lists/{lid}/contacts/{cid}/preview",
            "httpMethod": "post",
            "description": "Get a preview for an email by id using a specific list and contact.",
            "parameters": {}
        },
        "GetEmailPreviewByIDWithDataExtensionAndContact": {
            "path": "emails/{id}/dataExtension/{deid}/contacts/{cid}/preview",
            "httpMethod": "post",
            "description": "Get a preview for an email by id using a specific data extension and contact.",
            "parameters": {}
        },
        "GetEmailPreviewByIDWithDataExtensionAndRow": {
            "path": "emails/{id}/dataExtension/{deid}/row/{rowId}/preview",
            "httpMethod": "post",
            "description": "Get a preview for an email by id using a specific data extension and data extension row.",
            "parameters": {}
        },
        "PostEmailPreviewSend": {
            "path": "emails/preview/send",
            "httpMethod": "post",
            "description": "Sends a preview of an email.",
            "parameters": {}
        }

//Automations
//Get Automation ID WSProxy

function retrieveAutoId(autoName,mid) {
  var prox = new Script.Util.WSProxy();
  /* Set ClientID */
  prox.setClientId({ "ID": mid }); //Impersonates the BU
  var cols = ["ObjectID","CategoryID"];
  var filter = {
      Property: "Name",
      SimpleOperator: "equals",
      Value: autoName
  };
  var res = prox.retrieve("Automation", cols, filter);
  var resLength = res.Results.length
  //var autoObjectID = res.Results[0].ObjectID;
  //var autoCategory = res.Results[0].CategoryID;
  return autoObjectID;
};


{
    "methods": {
        "discovery": {
            "path": "rest",
            "httpMethod": "get",
            "description": "Returns discovery document",
            "parameters": {}
        },
        "Automations": {
            "path": "automations",
            "httpMethod": "get",
            "description": "GetAutomations",
            "parameters": {}
        },
        "AutomationsByCategory": {
            "path": "automations/category/{categoryId}",
            "httpMethod": "get",
            "description": "GetAutomationsByCategory",
            "parameters": {}
        },
        "AutomationsById": {
            "path": "automations/{id}",
            "httpMethod": "get",
            "description": "GetById",
            "parameters": {}
        },
        "ResetMigration": {
            "path": "automations/migration/reset",
            "httpMethod": "post",
            "description": "ResetMigration",
            "parameters": {}
        },
        "StartMigration": {
            "path": "automations/migration/",
            "httpMethod": "post",
            "description": "StartMigration",
            "parameters": {}
        },
        "GetInstanceById": {
            "path": "automations/instance/{instanceId}",
            "httpMethod": "get",
            "description": "GetInstanceById",
            "parameters": {}
        },
        "StartAutomation": {
            "path": "automations/{id}/actions/start",
            "httpMethod": "post",
            "description": "StartAutomation",
            "parameters": {}
        },
        "RunAllActivitiesOnce": {
            "path": "automations/{id}/actions/runallonce",
            "httpMethod": "post",
            "description": "RunAllActivitiesOnce",
            "parameters": {}
        },
        "FtpLocations": {
            "path": "ftplocations",
            "httpMethod": "get",
            "description": "GetFtpLocations",
            "parameters": {}
        },
        "NameAndKeyValidation": {
            "path": "activities/validate",
            "httpMethod": "post",
            "description": "ValidateNameAndKey",
            "parameters": {}
        },
        "GetCultures": {
            "path": "activities/cultures",
            "httpMethod": "get",
            "description": "Gets all cultures supported by the system.",
            "parameters": {}
        },
        "DataVerificationDefinition.GetById": {
            "path": "dataverifications/{id}",
            "httpMethod": "get",
            "description": "Get a Data Verification Definition by Id",
            "parameters": {}
        },
        "DataVerificationDefinition.Create": {
            "path": "dataverifications",
            "httpMethod": "post",
            "description": "Creates a Data Verification Definition",
            "parameters": {}
        },
        "DataVerificationDefinition.Update": {
            "path": "dataverifications/{id}",
            "httpMethod": "patch",
            "description": "Updates a Data Verification Definition",
            "parameters": {}
        },
        "DataVerificationDefinition.Delete": {
            "path": "dataverifications/{id}",
            "httpMethod": "delete",
            "description": "Deletes a Data Verification Definition by Id",
            "parameters": {}
        },
        "QueryDefinition.GetByCategoryId": {
            "path": "queries/category/{CategoryId}",
            "httpMethod": "get",
            "description": "Get list of Query Definitions based on CategoryId",
            "parameters": {}
        },
        "QueryDefinition.GetCollection": {
            "path": "queries",
            "httpMethod": "get",
            "description": "Get Collection of Query Definitions",
            "parameters": {}
        },
        "QueryDefinition.Validate": {
            "path": "queries/actions/validate",
            "httpMethod": "post",
            "description": "Validates SQL text in QueryActivity",
            "parameters": {}
        },
        "QueryDefinition.ValidateSpecificQuery": {
            "path": "queries/{id}/actions/validate",
            "httpMethod": "post",
            "description": "Validates SQL text for a specific QueryActivity",
            "parameters": {}
        },
        "QueryDefinition.GetByDefinitionId": {
            "path": "queries/{id}",
            "httpMethod": "get",
            "description": "Gets a QueryDefinition object based on QueryDefinitionId",
            "parameters": {}
        },
        "QueryDefinition.Create": {
            "path": "queries",
            "httpMethod": "post",
            "description": "Creates a QueryDefinition",
            "parameters": {}
        },
        "QueryDefinition.Delete": {
            "path": "queries/{id}",
            "httpMethod": "delete",
            "description": "Deletes a QueryDefinition based on QueryDefinitionId",
            "parameters": {}
        },
        "QueryDefinition.Start": {
            "path": "queries/{id}/actions/start",
            "httpMethod": "post",
            "description": "Starts a QueryDefinition based on QueryDefinitionId",
            "parameters": {}
        },
        "QueryDefinition.IsRunning": {
            "path": "queries/{id}/actions/isrunning",
            "httpMethod": "get",
            "description": "Checks if a QueryDefinition is running based on QueryDefinitionId",
            "parameters": {}
        },
        "QueryDefinition.Update": {
            "path": "queries/{id}",
            "httpMethod": "patch",
            "description": "Updates a QueryDefinition",
            "parameters": {}
        },
        "FileTransfer.Get": {
            "path": "filetransfers/{FileTransferId}",
            "httpMethod": "get",
            "description": "Get File Trigger based on Id",
            "parameters": {}
        },
        "FileTransfer.GetCollection": {
            "path": "filetransfers",
            "httpMethod": "get",
            "description": "Get File Transfer Collection",
            "parameters": {}
        },
        "FileTransfer.Update": {
            "path": "filetransfers/{FileTransferId}",
            "httpMethod": "patch",
            "description": "Update File Transfer Collection",
            "parameters": {}
        },
        "FileTransfer.Create": {
            "path": "filetransfers",
            "httpMethod": "post",
            "description": "Create File Transfer",
            "parameters": {}
        },
        "FileTransfer.Start": {
            "path": "filetransfers/{FileTransferId}/start/",
            "httpMethod": "post",
            "description": "Start File Transfer Collection",
            "parameters": {}
        },
        "FileTransfer.Delete": {
            "path": "filetransfers/{FileTransferId}",
            "httpMethod": "delete",
            "description": "Delete File Transfer Collection",
            "parameters": {}
        },
        "Imports.GetCollection": {
            "path": "imports",
            "httpMethod": "get",
            "description": "Gets a paged and sorted collection of Imports.",
            "parameters": {}
        },
        "Imports.Get": {
            "path": "imports/{id}",
            "httpMethod": "get",
            "description": "Gets an Import by it's ID.",
            "parameters": {}
        },
        "Imports.Create": {
            "path": "imports",
            "httpMethod": "post",
            "description": "Creates a new Import",
            "parameters": {}
        },
        "Imports.Update": {
            "path": "imports/{id}",
            "httpMethod": "patch",
            "description": "Updates an existing Import",
            "parameters": {}
        },
        "Imports.Delete": {
            "path": "imports/{id}",
            "httpMethod": "delete",
            "description": "Deletes an existing Import",
            "parameters": {}
        },
        "Imports.Start": {
            "path": "imports/{id}/actions/start",
            "httpMethod": "post",
            "description": "Starts an existing Import",
            "parameters": {}
        },
        "Imports.GetHistory": {
            "path": "imports/{id}/history",
            "httpMethod": "get",
            "description": "Gets file history for an Import",
            "parameters": {}
        },
        "Imports.ParseFileHeaders": {
            "path": "imports/actions/getheaders",
            "httpMethod": "post",
            "description": "Takes sample text file contents and parses out the headers",
            "parameters": {}
        },
        "Automation.Folder.GetByCategoryId": {
            "path": "folders/{categoryId}",
            "httpMethod": "get",
            "description": "Gets an folder by categoryId.",
            "parameters": {}
        },
        "Automation.Folder.GetCollection": {
            "path": "folders",
            "httpMethod": "get",
            "description": "Gets all folders for given categoryTypes.",
            "parameters": {}
        },
        "Automatmion.SSJS.GetCollection": {
            "path": "scripts/category/{CategoryID}",
            "httpMethod": "get",
            "description": "gets a collection of SSJSActivities.",
            "parameters": {}
        },
        "Automatmion.SSJS.GetByID": {
            "path": "scripts/{ssjsId}",
            "httpMethod": "get",
            "description": "Gets and SSJSActivity by SSJSActivityID.",
            "parameters": {}
        },
        "Automatmion.SSJS.Save": {
            "path": "scripts",
            "httpMethod": "post",
            "description": "Creates an SSJSActivity.",
            "parameters": {}
        },
        "Automatmion.SSJS.Update": {
            "path": "scripts/{ssjsId}",
            "httpMethod": "patch",
            "description": "Updates an SSJSActivity.",
            "parameters": {}
        },
        "Automatmion.SSJS.Start": {
            "path": "scripts/{ssjsId}/start/",
            "httpMethod": "post",
            "description": "Starts an SSJSActivity.",
            "parameters": {}
        },
        "Automatmion.SSJS.Delete": {
            "path": "scripts/{ssjsId}",
            "httpMethod": "delete",
            "description": "Deletes an SSJSActivity.",
            "parameters": {}
        },
        "Automatmion.SSJS.Validate": {
            "path": "scripts/validate/",
            "httpMethod": "post",
            "description": "Validates javascript in SSJSActivity.",
            "parameters": {}
        },
        "Automatmion.SSJS.GetAll": {
            "path": "scripts",
            "httpMethod": "get",
            "description": "Gets all SSJS Activities regardless of folder",
            "parameters": {}
        },
        "Filter.Get": {
            "path": "filters/{FilterActivityId}",
            "httpMethod": "get",
            "description": "Get Filter based on Id",
            "parameters": {}
        },
        "Filter.GetCollection": {
            "path": "filters",
            "httpMethod": "get",
            "description": "Gets a paged and sorted collection of Filters.",
            "parameters": {}
        },
        "Filter.GetCollectionByCategoryId": {
            "path": "filters/category/{CategoryId}",
            "httpMethod": "get",
            "description": "Gets a paged and sorted collection of Filters based on CategoryId",
            "parameters": {}
        },
        "Filter.Update": {
            "path": "filters/{FilterActivityId}",
            "httpMethod": "patch",
            "description": "Update Filter",
            "parameters": {}
        },
        "Filter.Create": {
            "path": "filters",
            "httpMethod": "post",
            "description": "Create Filter",
            "parameters": {}
        },
        "Filter.Delete": {
            "path": "filters/{FilterActivityId}",
            "httpMethod": "delete",
            "description": "Delete Filter",
            "parameters": {}
        },
        "Filter.Start": {
            "path": "filters/{FilterActivityId}/start/",
            "httpMethod": "post",
            "description": "Start Filter",
            "parameters": {}
        },
        "FilterDefinition.Get": {
            "path": "filterdefinitions/{FilterDefinitionId}",
            "httpMethod": "get",
            "description": "Get Filter Definition based on Id",
            "parameters": {}
        },
        "FilterDefinition.GetCollection": {
            "path": "filterdefinitions",
            "httpMethod": "get",
            "description": "Gets a paged and sorted collection of Filter definitions.",
            "parameters": {}
        },
        "FilterDefinition.GetCollectionByCategoryId": {
            "path": "filterdefinitions/category/{CategoryId}",
            "httpMethod": "get",
            "description": "Gets a paged and sorted collection of Filter definitions based on CategoryId",
            "parameters": {}
        },
        "PublicKeys.Get": {
            "path": "publickeys",
            "httpMethod": "get",
            "description": "Gets a list of Public Keys by Mid",
            "parameters": {}
        },
        "DataExtract.Get": {
            "path": "dataextracts/{id}",
            "httpMethod": "get",
            "description": "Get Data Extract Definition based on Id",
            "parameters": {}
        },
        "DataExtract.GetCollection": {
            "path": "dataextracts",
            "httpMethod": "get",
            "description": "Gets a paged and sorted collection of Data Extracts.",
            "parameters": {}
        },
        "DataExtract.Update": {
            "path": "dataextracts/{id}",
            "httpMethod": "patch",
            "description": "Update Data Extract",
            "parameters": {}
        },
        "DataExtract.Create": {
            "path": "dataextracts",
            "httpMethod": "post",
            "description": "Create Data Extract",
            "parameters": {}
        },
        "DataExtract.Delete": {
            "path": "dataextracts/{id}",
            "httpMethod": "delete",
            "description": "Delete Data Extract",
            "parameters": {}
        },
        "DataExtract.Start": {
            "path": "dataextracts/{id}/actions/start",
            "httpMethod": "post",
            "description": "Start Data Extract",
            "parameters": {}
        },
        "DataExtractType.Get": {
            "path": "dataextracttypes/{id}",
            "httpMethod": "get",
            "description": "Get Data Extract Type based on Id",
            "parameters": {}
        },
        "DataExtractType.GetCollection": {
            "path": "dataextracttypes",
            "httpMethod": "get",
            "description": "Gets a collection of Data Extract Types.",
            "parameters": {}
        },
        "DataExtract.AutomationLog.GetCollection": {
            "path": "dataextracts/{id}/log",
            "httpMethod": "get",
            "description": "Gets a collection of log entries for data extracts.",
            "parameters": {}
        },
        "SSJS.AutomationLog.GetCollection": {
            "path": "scripts/{ssjsId}/log",
            "httpMethod": "get",
            "description": "Gets a collection of log entries for SSJS activities.",
            "parameters": {}
        },
        "FileTransfer.AutomationLog.GetCollection": {
            "path": "filetransfers/{FileTransferId}/log",
            "httpMethod": "get",
            "description": "Gets a collection of log entries for File Transfers.",
            "parameters": {}
        },
        "Filters.AutomationLog.GetCollection": {
            "path": "filters/{FilterActivityId}/log",
            "httpMethod": "get",
            "description": "Gets a collection of log entries for Filter activities.",
            "parameters": {}
        },
        "Imports.AutomationLog.GetCollection": {
            "path": "imports/{id}/log",
            "httpMethod": "get",
            "description": "Gets a collection of log entries for Imports.",
            "parameters": {}
        },
        "QueryDefinitions.AutomationLog.GetCollection": {
            "path": "queries/{id}/log",
            "httpMethod": "get",
            "description": "Gets a collection of log entries for Query Definitions.",
            "parameters": {}
        },
        "DataFactoryUtility.GetTileConfigValue": {
            "path": "dfuactivity/displaytile",
            "httpMethod": "get",
            "description": "Gets dbo.setting value for field AutomationStudio.DFUActivity",
            "parameters": {}
        },
        "AudienceBuilder.BuildAudienceActivity.GetCollection": {
            "path": "buildaudiences",
            "httpMethod": "get",
            "description": "Gets a collection of Build Audience activities.",
            "parameters": {}
        },
        "AudienceBuilder.BuildAudienceActivity.GetSingle": {
            "path": "buildaudiences/{id}",
            "httpMethod": "get",
            "description": "Gets a Build Audience activity based on Id.",
            "parameters": {}
        },
        "AudienceBuilder.BuildAudienceActivity.Create": {
            "path": "buildaudiences",
            "httpMethod": "post",
            "description": "Creats a Build Audience activity.",
            "parameters": {}
        },
        "AudienceBuilder.BuildAudienceActivity.Update": {
            "path": "buildaudiences/{id}",
            "httpMethod": "patch",
            "description": "Updates a Build Audience activity based on Id.",
            "parameters": {}
        },
        "AudienceBuilder.BuildAudienceActivity.Start": {
            "path": "buildaudiences/{id}/actions/start",
            "httpMethod": "post",
            "description": "Starts a Build Audience activity based on Id.",
            "parameters": {}
        },
        "AudienceBuilder.BuildAudienceActivity.Delete": {
            "path": "buildaudiences/{id}",
            "httpMethod": "delete",
            "description": "Deletes a Build Audience activity.",
            "parameters": {}
        },
        "AudienceBuilder.Audience.GetCollection": {
            "path": "audiences",
            "httpMethod": "get",
            "description": "Gets a collection of audiences.",
            "parameters": {}
        },
        "AudienceBuilder.CountAudiencesActivity.GetCollection": {
            "path": "countaudiences",
            "httpMethod": "get",
            "description": "Gets a collection of Count Audience activities.",
            "parameters": {}
        },
        "AudienceBuilder.CountAudiencesActivity.GetSingle": {
            "path": "countaudiences/{id}",
            "httpMethod": "get",
            "description": "Gets a Count Audience activity based on Id.",
            "parameters": {}
        },
        "AudienceBuilder.SegmentTemplateRefresh.GetSingle": {
            "path": "segmenttemplaterefreshes/{id}",
            "httpMethod": "get",
            "description": "Gets a Segment Template Refresh activity based on Id.",
            "parameters": {}
        },
        "CreateAutomationV2": {
            "path": "automations",
            "httpMethod": "post",
            "description": "Create Automation",
            "parameters": {}
        },
        "UpdateAutomationV2": {
            "path": "automations/{id}",
            "httpMethod": "patch",
            "description": "Update Automation",
            "parameters": {}
        },
        "DataTransferConfiguration.GetById": {
            "path": "dts/transferConfigs/id:{id}",
            "httpMethod": "get",
            "description": "Get a Data Transfer Configuration by Id",
            "parameters": {}
        },
        "DataTransferConfiguration.GetByKey": {
            "path": "dts/transferConfigs/{key}",
            "httpMethod": "get",
            "description": "Get a Data Transfer Configuration by Key",
            "parameters": {}
        },
        "DataTransferConfiguration.Create": {
            "path": "dts/transferConfigs",
            "httpMethod": "post",
            "description": "Creates a Data Transfer Configuration",
            "parameters": {}
        },
        "Dts.Callback": {
            "path": "dts/callback/{correlationId}",
            "httpMethod": "post",
            "description": "Callback from Data Transfer Service",
            "parameters": {}
        }
    }
}