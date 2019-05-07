-- SQL Select element to take multiple rows of items associated to a single user and concat them together with a '|' to separate them
-- Use to clean up a send DE with varying amounts of rows that need to be combined

SUBSTRING (
stuff(( 
    select distinct '|' + [sku] 
    from abandoned_browse ab_clean
    where ab_clean.session_id = ab.session_id
    order by 1 
        FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)') 
    ,1,0,'' ) 
    ,2,9999) as sku




-- Used with Abandoned Browse data from WAC

select distinct 
session_id,
EmailAddress,
SubscriberID,
user_id,
min(timestamp) as start_timestamp,
max(timestamp) as end_timestamp,
SUBSTRING (
stuff(( 
    select distinct '|' + [sku] 
    from abandoned_browse ab_clean
    where ab_clean.session_id = ab.session_id
    order by 1 
        FOR XML PATH(''), TYPE).value('.', 'NVARCHAR(MAX)') 
    ,1,0,'' ) 
    ,2,9999) as sku
from 
    abandoned_browse ab
    
group by session_id, user_id, EmailAddress, SubscriberID