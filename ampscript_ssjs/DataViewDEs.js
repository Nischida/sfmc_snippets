<script runat="server">
Platform.Load("core","1.1")
var deObjSent = {
"CustomerKey" : "TemplateSent-DataView-Export",
"Name" : "Sent_Dataview_Template",
"Fields" : [
{ "Name" : "AccountID", "FieldType" : "Number" },
{ "Name" : "OYBAccountID", "FieldType" : "Number" },
{ "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "ListID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "BatchID", "FieldType" : "Number" },
{ "Name" : "SubscriberID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254, "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "EventDate", "FieldType" : "Date", , "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "Domain", "FieldType" : "Text", "MaxLength" : 128 },
{ "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text", "MaxLength" : 36 },
{ "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text", "MaxLength" : 36 }
]
 };
var myDE = DataExtension.Add(deObjSent);
var deObjOpen = {
"CustomerKey" : "TemplateOpen-DataView-Export",
"Name" : "Open_Dataview_Template",
"Fields" : [
{ "Name" : "AccountID", "FieldType" : "Number" },
{ "Name" : "OYBAccountID", "FieldType" : "Number" },
{ "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "ListID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "BatchID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "SubscriberID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254, "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "EventDate", "FieldType" : "Date", "Ordinal" : 2, "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "Domain", "FieldType" : "Text", "MaxLength" : 128 },
{ "Name" : "IsUnique", "FieldType" : "Boolean" },
{ "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text", "MaxLength" : 36 },
{ "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text", "MaxLength" : 36 }
]
 };
var myDE = DataExtension.Add(deObjOpen);
var deObjClick = {
"CustomerKey" : "TemplateClick-DataView-Export",
"Name" : "Click_Dataview_Template",
"Fields" : [
{ "Name" : "AccountID", "FieldType" : "Number" },
{ "Name" : "OYBAccountID", "FieldType" : "Number" },
{ "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "ListID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "BatchID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "SubscriberID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254, "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "EventDate", "FieldType" : "Date", "Ordinal" : 2, "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "Domain", "FieldType" : "Text", "MaxLength" : 128 },
{ "Name" : "IsUnique", "FieldType" : "Boolean" },
{ "Name" : "URL", "FieldType" : "Text", "MaxLength" : 900, "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "LinkName", "FieldType" : "Text", "MaxLength" : 1024 },
{ "Name" : "LinkContent", "FieldType" : "Text", "MaxLength" : 4000 },
{ "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text", "MaxLength" : 36 },
{ "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text", "MaxLength" : 36 }
]
 };
var myDE = DataExtension.Add(deObjClick);
</script>
<script runat="server">
Platform.Load("core","1.1")
var deObjJobs = {
"CustomerKey" : "TemplateJob-DataView-Export",
"Name" : "Job_Dataview_Template",
"Fields" : [
{ "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "EmailID", "FieldType" : "Number" },
{ "Name" : "AccountID", "FieldType" : "Number" },
{ "Name" : "AccountUserID", "FieldType" : "Number" },
{ "Name" : "FromName", "FieldType" : "Text", "MaxLength" : 130 },
{ "Name" : "FromEmail", "FieldType" : "Text", "MaxLength" : 100 },
{ "Name" : "SchedTime", "FieldType" : "Date", },
{ "Name" : "PickupTime", "FieldType" : "Date", },
{ "Name" : "DeliveredTime", "FieldType" : "Date", },
{ "Name" : "EventID", "FieldType" : "Text", "MaxLength" : 50 },
{ "Name" : "IsMultiPart", "FieldType" : "Boolean" },
{ "Name" : "JobType", "FieldType" : "Text", "MaxLength" : 50 },
{ "Name" : "JobStatus", "FieldType" : "Text", "MaxLength" : 50 },
{ "Name" : "ModifiedBy", "FieldType" : "Number" },
{ "Name" : "ModifiedDate", "FieldType" : "Date", },
{ "Name" : "EmailName", "FieldType" : "Text", "MaxLength" : 100 },
{ "Name" : "EmailSubject", "FieldType" : "Text", "MaxLength" : 200 },
{ "Name" : "IsWrapped", "FieldType" : "Boolean" },
{ "Name" : "TestEmailAddr", "FieldType" : "Text", "MaxLength" : 128 },
{ "Name" : "Category", "FieldType" : "Text", "MaxLength" : 100 },
{ "Name" : "BCCEmail", "FieldType" : "Text", "MaxLength" : 100 },
{ "Name" : "OriginalSchedTime", "FieldType" : "Date", },
{ "Name" : "CreatedDate", "FieldType" : "Date", },
{ "Name" : "CharacterSet", "FieldType" : "Text", "MaxLength" : 30 },
{ "Name" : "IPAddress", "FieldType" : "Text", "MaxLength" : 50 },
{ "Name" : "SalesForceTotalSubscriberCount", "FieldType" : "Number" },
{ "Name" : "SalesForceErrorSubscriberCount", "FieldType" : "Number" },
{ "Name" : "SendType", "FieldType" : "Text", "MaxLength" : 128 },
{ "Name" : "DynamicEmailSubject", "FieldType" : "Text", "MaxLength" : 4000 },
{ "Name" : "SuppressTracking", "FieldType" : "Boolean" },
{ "Name" : "SendClassificationType", "FieldType" : "Text", "MaxLength" : 32 },
{ "Name" : "SendClassification", "FieldType" : "Text", "MaxLength" : 36 },
{ "Name" : "EmailSendDefinition", "FieldType" : "Text", "MaxLength" : 36 },
{ "Name" : "ResolveLinksWithCurrentData", "FieldType" : "Boolean" },
{ "Name" : "DeduplicateByEmail", "FieldType" : "Text", "MaxLength" : 36 },
{ "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text", "MaxLength" : 36 },
{ "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text", "MaxLength" : 36 }
]
 };
var myDE = DataExtension.Add(deObjJobs);
var deObjBnc = {
"CustomerKey" : "TemplateBounce-DataView-Export",
"Name" : "Bounce_Dataview_Template",
"Fields" : [
{ "Name" : "AccountID", "FieldType" : "Number" },
{ "Name" : "OYBAccountID", "FieldType" : "Number" },
{ "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "ListID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "BatchID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "SubscriberID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254, "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "EventDate", "FieldType" : "Date", "Ordinal" : 2, "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "IsUnique", "FieldType" : "Boolean" },
{ "Name" : "BounceCategoryID", "FieldType" : "Number" },
{ "Name" : "BounceCategory", "FieldType" : "Text", "MaxLength" : 50 },
{ "Name" : "BounceSubcategoryID", "FieldType" : "Number" },
{ "Name" : "BounceSubcategory", "FieldType" : "Text", "MaxLength" : 50 },
{ "Name" : "BounceTypeID", "FieldType" : "Number" },
{ "Name" : "BounceType", "FieldType" : "Text", "MaxLength" : 50 },
{ "Name" : "SMTPBounceReason", "FieldType" : "Text", "MaxLength" : 4000 },
{ "Name" : "SMTPMessage", "FieldType" : "Text", "MaxLength" : 4000 },
{ "Name" : "SMTPCode", "FieldType" : "Number" },
{ "Name" : "TriggererSendDefinitionObjectID", "FieldType" : "Text", "MaxLength" : 36 },
{ "Name" : "TriggeredSendCustomerKey", "FieldType" : "Text", "MaxLength" : 36 },
{ "Name" : "Domain", "FieldType" : "Text", "MaxLength" : 128 }
]
 };
var myDE = DataExtension.Add(deObjBnc);
var deObjUns = {
"CustomerKey" : "TemplateUnsubscribe-DataView-Export",
"Name" : "Unsubscribe_Dataview_Template",
"Fields" : [
{ "Name" : "AccountID", "FieldType" : "Number" },
{ "Name" : "OYBAccountID", "FieldType" : "Number" },
{ "Name" : "JobID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "ListID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "BatchID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "SubscriberID", "FieldType" : "Number", "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "SubscriberKey", "FieldType" : "Text", "MaxLength" : 254, "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "EventDate", "FieldType" : "Date", "Ordinal" : 2, "IsPrimaryKey" : true, "IsRequired" : true },
{ "Name" : "IsUnique", "FieldType" : "Boolean" },
{ "Name" : "Domain", "FieldType" : "Text", "MaxLength" : 128 }
]
 };
var myDE = DataExtension.Add(deObjUns);
</script>