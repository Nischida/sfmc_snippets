-- Running automation of List Size Counts by status

Select
    concat(datepart(mm,getdate()), datepart(dd,getdate()), datepart(yy,getdate())) as run_id,
	Count(case when sub.SubscriberID is not null then 1 else null end) as total_subscribers,
	Count(case when sub.Status = 'Active' then 1 else null end) as active,
	Count(case when sub.Status = 'Unsubscribed' then 1 else null end) as unsubscribed,
	Count(case when sub.Status = 'Bounced' then 1 else null end) as bounced,
	Count(case when sub.Status = 'Held' then 1 else null end) as held

from _ListSubscribers sub

inner join [Subscribers List/DE] s
    on s.SubscriberKey = sub.SubscriberKey
    
Where 
sub.ListID = All Subscribers ListID
and
s.SubscriberKey is not null