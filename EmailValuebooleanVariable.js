EmailValuebooleanVariable

function() {
  var mail = document.getElementById('contactform-email').value;
	{
 		if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail))
  			{
    			return true
  			}
    	return false
	}
}
