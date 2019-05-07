-- Pull All Data Views to DE's -- All Appends

-- Sent
Select 
concat(datepart(mm,getdate()), datepart(dd,getdate()), datepart(yy,getdate())) as run_id,
AccountID,
OYBAccountID,
JobID,
ListID,
BatchID,
SubscriberID,
SubscriberKey,
EventDate,
Domain,
TriggererSendDefinitionObjectID,
TriggeredSendCustomerKey


from _Sent
Where EventDate >= dateadd(d, -1, getdate())



-- Opens
Select 
concat(datepart(mm,getdate()), datepart(dd,getdate()), datepart(yy,getdate())) as run_id,
AccountID,
OYBAccountID,
JobID,
ListID,
BatchID,
SubscriberID,
SubscriberKey,
EventDate,
Domain,
IsUnique,
TriggererSendDefinitionObjectID,
TriggeredSendCustomerKey

from _Open
Where EventDate >= dateadd(d, -1, getdate())



-- Clicks
Select 
concat(datepart(mm,getdate()), datepart(dd,getdate()), datepart(yy,getdate())) as run_id,
AccountID,
OYBAccountID,
JobID,
ListID,
BatchID,
SubscriberID,
SubscriberKey,
EventDate,
Domain,
URL,
LinkName,
LinkContent,
IsUnique,
TriggeredSendCustomerKey

from _Click
Where EventDate >= dateadd(d, -1, getdate())



-- Jobs
Select 
concat(datepart(mm,getdate()), datepart(dd,getdate()), datepart(yy,getdate())) as run_id,
JobID,
EmailID,
AccountID,
AccountUserID,
FromName,
FromEmail,
SchedTime,
PickupTime,
DeliveredTime,
EventID,
IsMultipart,
JobType,
JobStatus,
ModifiedBy,
ModifiedDate,
EmailName,
EmailSubject,
IsWrapped,
TestEmailAddr,
Category,
BccEmail,
OriginalSchedTime,
CreatedDate,
CharacterSet,
IPAddress,
SalesForceTotalSubscriberCount,
SalesForceErrorSubscriberCount,
SendType,
DynamicEmailSubject,
SuppressTracking,
SendClassificationType,
SendClassification,
ResolveLinksWithCurrentData,
EmailSendDefinition,
DeduplicateByEmail,
TriggererSendDefinitionObjectID


from _Job
Where DeliveredTime >= dateadd(d, -1, getdate())



-- Bounce
select
    concat(datepart(mm,getdate()), datepart(dd,getdate()), datepart(yy,getdate())) as run_id,
    AccountID,
    OYBAccountID,
    JobID,
    ListID,
    BatchID,
    SubscriberID,
    SubscriberKey,
    EventDate,
    IsUnique,
    Domain,
    BounceCategoryID,
    BounceCategory,
    BounceSubcategoryID,
    BounceSubcategory,
    BounceTypeID,
    BounceType,
    SMTPBounceReason,
    SMTPMessage,
    SMTPCode,
    TriggererSendDefinitionObjectID,
    TriggeredSendCustomerKey
    
    from
        _Bounce
        
    where
    EventDate >= dateadd(d,-1,getdate())