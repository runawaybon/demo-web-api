var apiBasepath = context.getVariable('proxy.basepath').replace(/^\//, '').replace(/\/$/, '')	.replace(/\//g,'|');
var currApiBin = "";

var apiType = context.getVariable('apiproduct.name');
if(apiType == "FALCON_PRIVATE" || apiType == "FALCON_SDM"){
	/* Assigning bin as Private Bin */
	currApiBin = "PrivateBinValue";
}

var flowName = context.getVariable('current.flow.name');
flowName = flowName.split(/-(.+)/)[1];
if(typeof flowName === "undefined"){
	flowName = "";
}else{
  if(!flowName.startsWith("/")){
  	flowName = "|"+flowName;
  }
  flowName = flowName.replace(/\/$/, '').replace(/\//g,'|');
}

var apiActionType = context.getVariable('request.verb');
var apiToWeightBinMapKey = apiBasepath+flowName+"#"+apiActionType;

context.setVariable('apiToWeightBinMapKey', apiToWeightBinMapKey);
context.setVariable('currApiBin', currApiBin);