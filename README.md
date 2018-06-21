# READ ME

## Standard Custom Dimensions
These custom dimensions should be included with all new accounts
- GAID
- SessionID
- HitTimeStamp
- GCLID
- Referrer

For ATC we also use
- Ministry

### assign GCLID to session
*GCLID can be used to push data back into AdWords. Like if you decide that an event should be a goal, you can push these goals into ADwords using GCLID as a primary key*
1. Create a session scoped custom dimension called GCLID
1. Create a URL variable called GCLID in URL 34 looking for the Query gclid
1. Craete a first part cookie variable named GCLID 34 that looks for the cooke name gclid
1. Create "Assign GCLID to Cookie 34" tag and have it fire on pageview before your GA page tracker fires
1. Add GCLID 34 as a custom dimesion field in your GA settings variable

### SeissionID
1. Add the RadmonSessionID as a js variable
1. Add Random Session ID as a custom dimension field in your GA setting variable



## GA Setting Variable


## IP Tracking in GTM if you use set anonymizeIp to true in GTM
https://www.simoahava.com/analytics/block-internal-traffic-gtm/