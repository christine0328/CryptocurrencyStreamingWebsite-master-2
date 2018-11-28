loadJqueryScript("https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js");
var bFreeze=false;

var iInit=setInterval(init,50);
function init(){
	if(!window.jQuery){
		console.log("jQuery not loaded yet");
	}else if(getGraphs().length==0){
		console.log("No graphs loaded yet");
	}else{
		clearInterval(iInit); 
		addSidebar();
	}
}
function loadJqueryScript(url) {
	var script = document.createElement("script"); // Make a script DOM node
	script.src = url; // Set it's src to the provided URL
	document.head.appendChild(script); // Add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
function freeze(){
	if(bFreeze){
		location.reload();
	}else{
		var k = setTimeout(function() {
				bFreeze = true;
				$('button#bFreeze').eq(0).text("Resume");
				for (var i = k; i > 0; i--){ clearInterval(i)}
			},1);
	}
}

function addSidebar(){
  $('body').append('<div id="sidebarCon" style="position:fixed;left:0;top:0;right:0;height:30px"></div>');
	$('div#sidebarCon').eq(0).append('<div id="sidebar">');
	var sideB=$('div#sidebar').eq(0);
	var cStyle = $('div#react-entry-point').eq(0).attr('style');
	if(cStyle==undefined){cStyle="";}
	cStyle += "position:relative;margin: 30px 0 0 0	";
	$('div#react-entry-point').eq(0).attr('style',cStyle);
	cStyle = $('body').eq(0).attr('style');
	if(cStyle==undefined){cStyle="";}
	cStyle += "font-family: Arial";
	$('body').eq(0).attr('style',cStyle);
	sideB.append('<button id="bFreeze" onclick="freeze()"> Pause </button>')
	//sideB.append('<p id="showHeader">Show/Hide Graphs:</p>')
	var aPairs = getGraphs();
	for (var i=0;i<aPairs.length;i++){
		var sElem='<input type="checkbox" checked id="cShow'+aPairs[i]+'"  onchange="toggleGraph(\''+aPairs[i]+'\')">'
		sElem += aPairs[i] + '</input>'
		sideB.append(sElem)
	}
}
function toggleGraph(pName){
	var elem =$('[id*="'+pName+'"')[0]
	if(elem.style.display=="none"){elem.style.display="block"}
	else{elem.style.display="none"}
}
function getGraphs(){
	var aGraph=$('div[id*="live-graph"]');
	var aPairs=[];
	for( var i=0;i<aGraph.length;i++){
		aPairs.push(aGraph[i].id.split("live-graph-")[1]);
	}
	return aPairs;
}
