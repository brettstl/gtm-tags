getvalueofinputsubmit.js

function() {
  var gate = document.querySelector("input[type*='submit']");
  var myValue = gate.getAttribute("value");
  //alert(myValue)
  return myValue
}