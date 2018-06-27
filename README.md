# READ ME
This is my resource to better leverage Google Tag Manager. 
This is not a repo that you download and add to your website, but a list of a la carte update to Google Tag Manager that can help track non-standard implementaiton.

Most of this is borrowed, and most of the borrowed stuff is from [Simo Ahava](https://www.simoahava.com/).


## Best Practices

### Naming Conventions
- for GTM tags use this format
> Application - Type - Unique Attribute 

Example: GA - Event - Hospital Contact Submit

### Standard Custom Dimensions
These custom dimensions should be included with all new accounts and need to be collected by GTM. 
- GAID
- SessionID
- HitTimeStamp
- GCLID
- Referrer

For ATC we also use
- Ministry


### GA Setting Variable
This GTM variable should be used as a universal variable for all tags in a container. 

For cross-domain tracking you will need the following settings:
- Cookie Domina = auto
- allowLinker = true
- Auto Link Domains (sites that will recieve cross-domain links)
*make sure to add the source links to the referral exclusion list in the GA property admin*


## Custom tags, triggers and variables
These are bits of JS I have needed over the years to complete tasks that wont work with the standard GTM triggers and variables. 


### assign GCLID to session
*GCLID can be used to push data back into AdWords. Like if you decide that an event should be a goal, you can push these goals into ADwords using GCLID as a primary key*
1. Create a session scoped custom dimension called GCLID
1. Create a URL variable called GCLID in URL 34 looking for the Query gclid
1. Craete a first part cookie variable named GCLID 34 that looks for the cooke name gclid
1. Create "Assign GCLID to Cookie 34" tag and have it fire on pageview before your GA page tracker fires
1. Add GCLID 34 as a custom dimesion field in your GA settings variable

Note: This may be overkill. I could probably just look for GCLID in the URL and assign it as a session level dimension. If it is undefined the rest of the session, it should be added to all hits in the session. I have not tested this. The only other issue is that future sessions will not have this GCLID if I don't use the cookie method, and this would only give us a last-click attribution. I should add in a time out for the cookie of 30 days.

### SeissionID
1. Add the RadmonSessionID as a js variable
1. Add Random Session ID as a custom dimension field in your GA setting variable

### YouTube State Change
I found this great article from [Analytics mania](https://www.analyticsmania.com/post/youtube-tracking-google-tag-manager-solved/) for when the standard YouTube tracking will not work. This could cause some slow down on your site, so only use it as a last resort. 
1. Add the listener tag and have it fire on all pages (on dom ready)
1. makes sure to add the following DataLayer variables if you don't already have them: eventCategory, eventAction, eventLabel
1. create the Universal GA event tag for the custom YouTube tracking. I tend to use the eventLabel as the event action, as it gives info like "video played," "75% video played", etc with the name of the video.
1. create a Custom Event trigger for this tag taht fires on the Event name youtube


## Documentation in progress

### IP Tracking in GTM if you use set anonymizeIp to true in GTM
[link](https://www.simoahava.com/analytics/block-internal-traffic-gtm/)


### Reduce Google Analytics Payload length if it is too big
[link](https://www.simoahava.com/analytics/automatically-reduce-google-analytics-payload-length/)