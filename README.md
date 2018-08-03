# READ ME
This is my resource to better leverage Google Tag Manager. 
This is not a repo that you download and add to your website, but a list of a la carte update to Google Tag Manager that can help track non-standard implementaiton.

Most of this is borrowed, and most of the borrowed stuff is from [Simo Ahava](https://www.simoahava.com/).


## Best Practices

### Naming Conventions
- for GTM tags use this format
> Application - Type - Unique Attribute - folder

Example: GA - Event - Hospital Contact Submit - shared

- for GTM trigger use this format
> Trigger - Action Driving Trigger - folder

- for GTM variables use this format
> VAR - attribute of varaible

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

### Trigger only fires on homepage

Use this regex test on the page path 
``` ^/(\?(.*))?$
```

## Empty strings and undefined values
If a value is undefined, you can create a trigger rule that equals 'undefined'
But, if a blank strng is passed, you need to use a regex match for ^$

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

An example can be found in the ATC template container.

### Wildcard CSS Selectors
[link](https://www.simoahava.com/analytics/use-wildcard-css-selectors-with-all-elements-triggers/)

This is a simple rule I was too dense to realize, but you can use a wildcard symbol in your match CSS select to select all posssible elements that are children of that element. Kinda cool. 

In this example, I can capture any click on the a tag, or any child element of that a tag. 
> a[href*="/contact"], a[href*="/contact"] * (This example can be found in the creative anvil container)


### Outbound link check
Create a regex variable that looks for the following matches in the Click URL
one is the {{page hostname}}
the second is ^/
you may also want to check for emty string with ^$

This should catch 95% of internal links. Anything else could be counted as an outbound link. This is useful when creating template tags you want to quckly added to a lot of different sites. 

Example for creativeanvil.com VAR - Compare Hostname to Click URL Regex - 2018


## Wait for HTML element to become visable
Occasionally elements on the page will not be availiable until after the DOM is ready and the window has loaded. You would need a custom listner tag for these cases that fires a datalayer event once the element is visable. 

## Getting values of GTM dataLayer push events in the console.
USe this code to get dataLayer events 

``` google_tag_manager['GTM-MLZ64TT'].dataLayer.get({split: function() { return [] }});
```

(repalce with the GTM container on the site)

You could also do this to pull a dataLayer push from one GTM container into another GTM container!


## Documentation in progress

### clear values out of the dataLayer using 
``` dataLayer.push({_clear: true}); 
```

I'm not getting this to work, but I don't quite understand the syntax and I could not find anything about this. I need to do more research. Was discovered on the #measure Slack



### Validate a form in GTM
In some cases you will need to vaildate a form in GTM. This is not ideal, but maybe the best case for AJAX forms I have found so far.

If you want to validate if a form field has text, see TextAreahasValuebooleanVariable.js
It will return true of their is text and false if there is no text


### IP Tracking in GTM if you use set anonymizeIp to true in GTM
[link](https://www.simoahava.com/analytics/block-internal-traffic-gtm/)


### Reduce Google Analytics Payload length if it is too big
[link](https://www.simoahava.com/analytics/automatically-reduce-google-analytics-payload-length/)
First, you should find out if your hit payload lenght is getting too big. You can do that by creating a customtask that collectes this data and then passes this data to a custom dimension. See hitPayloadLengthCustomDimension. 
Last, you update the Google Analyitcs variable to include the fiel name customTask with your custom js variable as the value. 

### Facebook Pixels
In addition to the 9 standard events, you can create custom perameters to customize each activity collected. You will need to use Custom Conversion to segment by specific custom perameters. See FacebookPixelCode.HTLM for examples of event tracking. 

### Downnload Links

### utm builder
https://www.terminusapp.com/

## Resources

### CSS Selector Examples
This tool shows you how elements would be selected on page based on your CSS selector. 
[link](https://www.w3schools.com/cssref/trysel.asp)