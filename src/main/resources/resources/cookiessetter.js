var responseCode = context.getVariable('calloutResponse.status.code');
print("Callout response code : "+responseCode);
var authToken=context.getVariable('request.header.Authorization');
var payload = context.getVariable("calloutResponse.content"); 
var jsonObject= JSON.parse(payload); 
var authn_ssid = null;
if(jsonObject != null) {
	if(jsonObject.hasOwnProperty('tokenId')) {
		//replace iPlanetDirectoryPro with authn_ssid
		authn_ssid = jsonObject.tokenId;
	}
}
var cookiesHeaders = context.getVariable('calloutResponse.header.Set-Cookie.values')+'';

var cookiesArray = cookiesHeaders.substring(1, cookiesHeaders.length-1).split(',');
var j=1;
var cacheDetailsArray = [];
for (var i=0, L = cookiesArray.length; i<L; i++) {
  var currentcookie=cookiesArray[i];
  currentcookie=currentcookie.replace('HttpOnly','');
  cacheDetailsArray.push(currentcookie);
  context.setVariable("request.header.cookie."+(i+1), currentcookie);
  j++;
}
//cacheDetailsArray.push("authn_ssid="+authn_ssid);
//context.setVariable("cacheVar",cacheDetailsArray);
context.setVariable("cacheVar", cacheDetailsArray.toString());
//context.setVariable("request.header.cookie."+j, "authn_ssid="+authn_ssid);
context.setVariable("accessVar", authToken);