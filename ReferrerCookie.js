// we only want to track ATC pages, vendor pages, or ministry pages for our ATC traffic. 
// We want to exclude all other traffic, but we want to capture future visits as well (up to 30 days)


// wrap this in a script tag!

  var atc = function() {
  // new 30 day cookie experation
  var d = new Date();
  d.setTime(d.getTime() + (24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  //console.log(expires);
  //
  var ATCRef = /(get|(providenc|seton).*care).*\.com/i;
  var ATClanding = /((((((get|(providenc|seton).*care).*\.com|inquick)|anytime\.org)|clockwise)|zipnosis)|mdlive)/i;
  
  		if (ATCRef.test({{Referrer}})) {
  			document.cookie = "ATC_referrer=atclandingpagereferral30days;" + expires +  ";path=/";
       	} else if (ATClanding.test({{Page Hostname}})) {
         	document.cookie = "ATC-referrer=atclandingpagevisitors30days;" + expires + ";path=/"; 
        }
}
atc();
