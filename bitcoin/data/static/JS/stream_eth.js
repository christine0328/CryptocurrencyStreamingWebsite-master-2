$(function(){

var maxTableSize=22;
var prevData = [];
var streamUrl = "https://streamer.cryptocompare.com/";
var fsym = "BTC";
var tsym = "USD";
var sign = "Ƀ ";
var currentSubs;
var newsubs=[];
var currentSubsText = "";
var newcurrentSubs =[];
var totalData=[];

var dataUrl = "https://min-api.cryptocompare.com/data/subs?fsym=" + fsym + "&tsyms=" + tsym ;
var socket = io(streamUrl);
//var sell_list=new Array();
//var buy_list=new Array();
var exchange="bitstamp";
var aggregate="1";
var theunit="minute";
var PrevDataUrl =  "https://min-api.cryptocompare.com/data/histo"+theunit+"?fsym=" + fsym + "&tsym=" + tsym+"&limit=60&e="+exchange+"&aggregate="+aggregate;
var candledataUrl = "https://min-api.cryptocompare.com/data/histo"+theunit+"?fsym=" + fsym + "&tsym=" + tsym+"&limit=1&e="+exchange+"&aggregate="+aggregate;
var interval=60000;
//var depthchartURL= "https://www.bitstamp.net/api/v2/order_book/btcusd";
//function changeType(){
var depthchartURL = "https://api.gdax.com/products/"+fsym+"-USD/book?level=2";
//
//}
var preOrderDataURL="https://api.cryptowat.ch/markets/gdax/"+fsym.toLowerCase() +"usd/orderbook";
//var sell_list=[];
//var buy_list=[];

var h;

var ordernumber=128;

var oldasks={};
var oldbids={};
//alert(candledataUrl);

drawcandle("bitstamp","container000",fsym);
//alert(depthchartURL);
        depthchartURL = "https://www.bitstamp.net/api/v2/order_book/"+fsym.toLowerCase()+"usd";
        alert(depthchartURL);
        depthchart("chartdiv",depthchartURL);
        depthchartURL = "https://api.gdax.com/products/"+fsym+"-USD/book?level=2";
        alert(depthchartURL);
        depthchart("chartdiv",depthchartURL);

//oldorder();
myFunction();
//setInterval(function() { oldorder(); }, 86400000);




function oldorder(){
oldasks={};
oldbids={};
preOrderDataURL="https://api.cryptowat.ch/markets/gdax/"+fsym.toLowerCase() +"usd/orderbook";

$.getJSON(preOrderDataURL,function(data) {
//var oldasks = data['result']['asks'];
//var oldbids =  data['result']['bids'];
var rawoldasks = data['result']['asks'].slice(0,ordernumber );
var rawoldbids =  data['result']['bids'].slice(0,ordernumber );
//alert(rawoldasks.length);
var asklen=rawoldasks.length;
var table_len=20;
var p=0;

for (i in rawoldasks){
oldasks[Number(rawoldasks[asklen-1-i][0]).toFixed(2)] = Number(rawoldasks[asklen-1-i][1].toFixed(4));
//alert(rawoldasks[asklen-1-i][0].toFixed(2));
if(i<20){ //table body real length=21; 20 rows containing data;

$("#sells tr:eq(0)").after(
		"<tr id="+rawoldasks[i][0].toFixed(2)+"><th>" + "coinbase" + "</th><th>" + rawoldasks[i][0].toFixed(2)  + "</th><th>" + rawoldasks[i][1].toFixed(4) + "</th></tr>");
//sell_list[i]= rawoldasks[i][0].toFixed(2);

		}

//sell_list.sort(sortNumber);
}

//alert(typeof Object.keys(oldasks)[0]);
//alert(typeof Object.values(oldasks)[0]);
for(j in rawoldbids){
oldbids[Number(rawoldbids[j][0]).toFixed(2)] = Number(rawoldbids[j][1].toFixed(4));
if(j<20){
$("#buys tr:eq("+j+")").after("<tr id="+rawoldbids[j][0].toFixed(2)+"><th>" + "coinbase" + "</th><th>" + rawoldbids[j][0].toFixed(2)  + "</th><th>" + rawoldbids[j][1].toFixed(4) + "</th></tr>"
	);
//buy_list[j]= rawoldbids[j][0].toFixed(2);
	}

}


});}

function sortDict(obj){//big--small sort key(quantity) according to value(price).

objSorted = Object.keys(obj).sort(
    function(a, b){
        return  obj[b] - obj[a] ;
    }
);
return objSorted;
}


function countUp(addflash,elem, endVal, startVal, duration, decimal) {
    //传入参数依次为 数字要变化的元素，最终显示数字，数字变化开始值，变化持续时间，小数点位数
    var startTime = 0;
    var dec = Math.pow(10, decimal);
    var progress,value;
    addflash.addClass('flash');
//           setTimeout(function(){
//    addflash.removeClass('flash');
//  },1000);

    function startCount(timestamp) {

        if(!startTime) startTime = timestamp;
        progress = timestamp - startTime;
        value = startVal + (endVal - startVal) * (progress / duration);
        value = (value > endVal) ? endVal : value;
        value = Math.floor(value*dec) / dec;
        elem.innerHTML = value.toFixed(decimal);
        progress < duration && requestAnimationFrame(startCount)
    }
    requestAnimationFrame(startCount)
}

function countDown(addflash,elem, endVal, startVal, duration, decimal) {
        var startTime = 0;
        var dec = Math.pow(10, decimal);
        var progress,value;
        addflash.addClass('flash');
//           setTimeout(function(){
//         addflash.removeClass('flash');
//         },1000);
        function startCount(timestamp) {
//           $('#table2').removeClass('flash');
            startTime = !startTime ? timestamp : startTime;
            progress = timestamp - startTime;
            value = startVal - (startVal - endVal) * (progress / duration);
            value = (value < endVal) ? endVal : value;
            value = Math.floor(value*dec) / dec;
            elem.innerHTML = value.toFixed(decimal);
            progress < duration && requestAnimationFrame(startCount)
        }

        requestAnimationFrame(startCount)

    }


function myFunction(){
socket.connect();
oldorder();
dataUrl = "https://min-api.cryptocompare.com/data/subs?fsym=" + fsym + "&tsyms=" + tsym ;
$.getJSON(dataUrl, function(data) {

	currentSubs = data['USD']['TRADES'];
//	console.log(dataurl);
	console.log(currentSubs);
	Object.values(currentSubs)[0].split("~")
	var k=0;

	for (var i = 0; i < currentSubs.length; i++) {
    var exchangename=Object.values(currentSubs)[i].split("~")[1];
//	if( exchangename== "Bitstamp" || exchangename == "Coinbase" )
    if( exchangename == "Coinbase" )
		{
//		newsubs[j]=currentSubs[i];
//		j++;

		newcurrentSubs[k] = currentSubs[i];
		k++;
		}


}
//alert(newcurrentSubs);

//	$('#sub-exchanges').text(currentSubsText);
    h=0;
    totalData=[];
	socket.emit('SubAdd', { subs: newcurrentSubs });
});
}


socket.on('m', function(currentData) {
	var tradeField = currentData.substr(0, currentData.indexOf("~"));
	if (tradeField == CCC.STATIC.TYPE.TRADE) {
//	    if(CCC.TRADE.unpack(currentData)['M']== "bitstamp"||CCC.TRADE.unpack(currentData)['M'].toLowerCase() == "coinbase"){
//    if(CCC.TRADE.unpack(currentData)['M'].toLowerCase() == "coinbase"){

transformData(currentData);
//        totalData[h]=currentData;
//        h++;
//        if(h>=3){
//        for (eachdata in totalData){
//		transformData(totalData[eachdata]);
//		}
//		}
//		}
	}
});



var transformData = function(data) {
	var coinfsym = CCC.STATIC.CURRENCY.getSymbol(fsym);
	var cointsym = CCC.STATIC.CURRENCY.getSymbol(tsym)
	var incomingTrade = CCC.TRADE.unpack(data);
//	$('#try').after(fsym);
//	$('#trades').after("<tr><th>" + incomingTrade +"</th></tr>");
	var newTrade = {
		Market: incomingTrade['M'],
		Type: incomingTrade['T'],
		ID: incomingTrade['ID'],
		Price: CCC.convertValueToDisplay(cointsym, incomingTrade['P']),
		Quantity: CCC.convertValueToDisplay(coinfsym, incomingTrade['Q']),
		Total: CCC.convertValueToDisplay(cointsym, incomingTrade['TOTAL'])
	};

	if (incomingTrade['F'] & 1) {
		newTrade['Type'] = "SELL";
		displayData(newTrade);
	}
	else if (incomingTrade['F'] & 2) {
		newTrade['Type'] = "BUY";
		displayData(newTrade);
	}


};

var displayData = function(dataUnpacked) {

//	var length1 = $('.table1 tr').length;
//	var length2 = $('.table2 tr').length;
//       alert(dataUnpacked);
    var sign=CCC.STATIC.CURRENCY.getSymbol(fsym);
    var preprice=Number(dataUnpacked.Price.split("$")[1].trim().replace(/\,/g,'')).toFixed(2);
    var newprice = Number(preprice);
    var newquantity=Number(Number(dataUnpacked.Quantity.split(sign)[1].trim().replace(/\,/g,'')).toFixed(4));


    if(dataUnpacked.Type.toLowerCase() == "sell"){

    updateOrderbookSell(newprice,newquantity,  oldbids, oldasks,   "buys", "sells");
    }
    else if(dataUnpacked.Type.toLowerCase() == "buy"){
    updateOrderbookBuy(newprice,newquantity, oldasks, oldbids,  "sells", "buys");
    }
     };


var updateOrderbookSell=function(new_price,new_quantity, mtoppo, mtorg, oppoName, orgName){

    var moplist=Object.keys(mtoppo).sort(function(a,b){return -(a-b)});//-big---small
//    var mtorglist=Object.keys(mtorg).sort(function(a,b){return -(a-b)});//-big---small
    var mtoplist=listToNumber(moplist);
    var hb;
    var lb;
    var minusNum;
    var oplen=mtoplist.length;
    var nextpricefrom;
    var nextpriceIndx;
    var flashPosition;

     console.log(new_price + "   =======++++?table oppolen@@@@@   "+$("#"+oppoName+" tr").length+"oppo "+oppoName );
       console.log(new_price + "   =======++++?table orglen@@@@@   "+$("#"+orgName+" tr").length+"oppo "+oppoName );

  hb=19;lb=0;
  nextpricefrom = "last";
  flashPosition="eq("+$("#"+oppoName+" tr").length+")";
  //mtoplist=total buy list

    var opIndex=moplist.indexOf(new_price.toFixed(2));
    var afterQuantity;



    var goahead=false;

    if(opIndex<0){
    opIndex =locationOf(new_price,mtoplist);
    if(opIndex>0){
    opIndex = opIndex -1;
    goahead=true;
    }
    }else{goahead=true;}



    if(goahead==false){//means in selllist, there are ask(s) lower than/equal to new bid /OR/ in buylist, there are bid(s) higher than/equal to the new ask.


var morgl=Object.keys(mtorg).sort(function(a,b){return -(a-b)});
   var mtorgl=listToNumber(morgl);
//   var show=false;
//   if((orgName == "sells") && (new_price<=mtorgl[0])){show=true;}
//   else if((orgName == "buys") && (new_price>=mtorgl[mtorgl.length-1])){show=true;}
//    if(show==true){//only if the new price is within the old dict price coverage-->add or update

    afterQuantity = new_quantity;

    var olen=morgl.length;
//    console.log("before add/ uppdate---length: "+olen);
//     console.log("quantity to add: "+afterQuantity);
//    console.log("old quantity in org list"+mtorg[new_price.toFixed(2)]);
    mtorg[new_price.toFixed(2)]=Number(((mtorg[new_price.toFixed(2)]||0)+afterQuantity).toFixed(4));

//    console.log("new quantity in org list"+mtorg[new_price.toFixed(2)]);

    addOrUpdatenewSell(new_price,olen,mtorg,orgName);

    }


    else{
    var i;
    afterQuantity = new_quantity ;
    for (i=0;i<=opIndex;i++){

    afterQuantity=afterQuantity -mtoppo[moplist[i]];
    var priceInTable = [];
    var indexInTable;
 $("#"+oppoName+" tr").each(function() {
      priceInTable.push($(this).children('th').eq(1).text());
    });
//    console.log("allprice.inoppo....>>>>");
//    console.log(priceInTable);
    priceInTable.shift();
    var pricelistNum=listToNumber(priceInTable);
    indexInTable=priceInTable.indexOf(moplist[i]);
//    console.log("allprice.inoppo....>>>>");
//    console.log(priceInTable);

    if(afterQuantity<0){
    if(indexInTable>=0){


//    var $tb2th=$("#"+oppoName+" tr:eq("+(indexInTable+1)+") th:eq(2)");
    var $tb2tr=$("#"+oppoName+" tr:eq("+(indexInTable+1)+")");
//        $tb2tr.addClass('flash');
        $("#"+oppoName+" tr:eq("+(indexInTable+1)+") th:eq(2)").text(((-1)*afterQuantity).toFixed(4));
//        $tb2tr.removeClass('flash');

var c=document.getElementById(moplist[i]).getElementsByTagName("th")[2];

countDown($tb2tr,c, (-1)*afterQuantity, mtoppo[moplist[i]], 10000, 4);
//        setTimeout(function(){
//        $tb2tr.removeClass('flash');
//        $tb2th.text(afterQuantity);
//        },400);
//        console.log(new_price + "   after quantity change in oppo list --quantity "+$("#"+oppoName+" tr:eq("+opIndex+") th:eq(2)").text());
     } mtoppo[moplist[i]]=Number((-1)*afterQuantity.toFixed(4));
     break;
     }

     else{

    if(indexInTable>=0){
    var newmoplist=Object.keys(mtoppo).sort(function(a,b){return -(a-b)});
    var $tb2tr=$("#"+oppoName+" tr:eq("+(indexInTable+1)+")");
//    console.log(new_price + "find the right price?--> "+$("#"+oppoName+" tr:eq("+opIndex+") th:eq(1)").text());
    $tb2tr.remove();
    var npreprice=$("#"+oppoName+" tr:last th:eq(1)").text();
//  console.log(typeof npreprice);
if(newmoplist.indexOf(npreprice)<newmoplist.length-1){
  nextpriceIndx=newmoplist.indexOf(npreprice)+1;

  $("#"+oppoName+" tr:"+nextpricefrom).after("<tr id="+newmoplist[nextpriceIndx]+"><th>" + "coinbase" + "</th><th>" + newmoplist[nextpriceIndx]  + "</th><th>" + mtoppo[newmoplist[nextpriceIndx]] + "</th></tr>");
//var c=$("#"+oppoName+" tr:"+flashPosition+" th:eq(2)");

var c=document.getElementById(newmoplist[nextpriceIndx]).getElementsByTagName("th")[2];
countUp($("#"+oppoName+" tr:"+flashPosition),c, mtoppo[newmoplist[nextpriceIndx]], 0.0000, 500, 4);
console.log("1");
console.log("row: "+nextpricefrom+"  price: "+ $("#"+oppoName+" tr:"+flashPosition+" th:eq(1)").text()+ " quantity: "+$("#"+oppoName+" tr:"+flashPosition+" th:eq(2)").text());
}
   //        console.log("next price go up"+ $("#"+oppoName+" tr:"+nextpricefrom+" th:eq(1)").text());
   } delete mtoppo[moplist[i]];
        if(afterQuantity==0){
        break;
        }
//        $("#"+oppoName+" tr:"+flashPosition).removeClass('flash');

    }
    }
    if(afterQuantity >0){//*******
//    mtoppo[moplist[i]]=Number(afterQuantity.toFixed(4));

    var morgl=Object.keys(mtorg).sort(function(a,b){return -(a-b)});//current price list in descending order
    var mtorgl=listToNumber(morgl);


    var olen=morgl.length;
//      console.log("quantity to add: "+afterQuantity);
  mtorg[new_price.toFixed(2)]=Number(((mtorg[new_price.toFixed(2)]||0)+afterQuantity).toFixed(4));//list and dict maintained.new/update, one for two cases.
//console.log("new quantity in orglist: "+mtorg[new_price.toFixed(2)]+"  new_price: "+new_price.toFixed(2));
//    alert("+++++");
//    alert(mtorg[new_price.toFixed(2)]);
//    alert(new_price.toFixed(2));
//    alert(typeof mtorg[new_price.toFixed(2)]);
//alert(Object.keys(mtorg));
  addOrUpdatenewSell(new_price,olen,mtorg,orgName);//table update/add

    }//end-------}
    }



    };



var updateOrderbookBuy=function(new_price,new_quantity, mtoppo, mtorg, oppoName, orgName){

    var moplist=Object.keys(mtoppo).sort(function(a,b){return -(a-b)});//-big---small
//    var mtorglist=Object.keys(mtorg).sort(function(a,b){return -(a-b)});//-big---small
    var mtoplist=listToNumber(moplist);

 console.log("all");
 console.log(moplist);
    var hb;
    var lb;
    var minusNum;
    var oplen=mtoplist.length;
    var nextpricefrom;
    var nextpriceIndx;
    var flashPosition;

     console.log(new_price + "   =======++++?table oppolen@@@@@   "+$("#"+oppoName+" tr").length+"oppo "+oppoName );
       console.log(new_price + "   =======++++?table orglen@@@@@   "+$("#"+orgName+" tr").length+"oppo "+oppoName );

  hb=oplen-1;lb=hb-19;
  nextpricefrom = "eq(0)";
   flashPosition="eq(1)";
  //mtoplist=total buy list

    var opIndex=moplist.indexOf(new_price.toFixed(2));
    var afterQuantity;



    var goahead=false;

   //oppo=sells
    if(opIndex<0){
    opIndex =locationOf(new_price,mtoplist);
    if(opIndex<moplist.length)
    {goahead=true;}
    }else{
    goahead = true;}



    if(goahead == false){
    //means in selllist, NO ask(s) lower than/equal to new bid /OR/ in buylist, NO bid(s) higher than/equal to the new ask.

var morgl=Object.keys(mtorg).sort(function(a,b){return -(a-b)});
   var mtorgl=listToNumber(morgl);

    afterQuantity = new_quantity;

    var olen=morgl.length;
//    console.log("before add/ uppdate---length: "+olen);
//     console.log("quantity to add: "+afterQuantity);
//    console.log("old quantity in org list"+mtorg[new_price.toFixed(2)]);
    mtorg[new_price.toFixed(2)]=Number(((mtorg[new_price.toFixed(2)]||0)+afterQuantity).toFixed(4));

//    console.log("new quantity in org list"+mtorg[new_price.toFixed(2)]);

    addOrUpdatenewBuy(new_price,olen,mtorg,orgName);

    }
    else{

    //*****
    var j;
    afterQuantity = new_quantity ;
    afterQuantity=afterQuantity - mtoppo[moplist[j]];
    var priceInTable = [];
    var indexInTable;

    $("#"+oppoName+" tr").each(function() {
      priceInTable.push($(this).children('th').eq(1).text());
    });
//    console.log("allprice.inoppo....>>>>");
    console.log(priceInTable);
    priceInTable.shift();
    var pricelistNum=listToNumber(priceInTable);
    indexInTable=priceInTable.indexOf(moplist[j]);


    for (var j=moplist.length-1;j>=opIndex;j--){

if(afterQuantity<0){
    if(indexInTable>=0){
//    var $tb2th=$("#"+oppoName+" tr:eq("+(indexInTable+1)+") th:eq(2)");
    var $tb2tr=$("#"+oppoName+" tr:eq("+(indexInTable+1)+")");
//        $tb2tr.addClass('flash');
        $("#"+oppoName+" tr:eq("+(indexInTable+1)+") th:eq(2)").text((-1)*afterQuantity.toFixed(4));
//        $tb2tr.removeClass('flash');



var c=document.getElementById(moplist[j]).getElementsByTagName("th")[2];
countDown($tb2tr,c, (-1)*afterQuantity, mtoppo[moplist[j]], 500, 4);
//     console.log(new_price + "   after quantity change in oppo list --quantity "+$("#"+oppoName+" tr:eq("+opIndex+") th:eq(2)").text());
    } mtoppo[moplist[j]]=Number((-1)*afterQuantity.toFixed(4));
     break;
     }

     else{

    if(indexInTable>=0){
    var newmoplist=Object.keys(mtoppo).sort(function(a,b){return -(a-b)});

    var $tb2tr=$("#"+oppoName+" tr:eq("+(indexInTable+1)+")");

    $tb2tr.remove();

 var preprice=$("#"+oppoName+" tr:eq(1) th:eq(1)").text();
  console.log(preprice);
  if(newmoplist.indexOf(preprice)>0){
  nextpriceIndx=newmoplist.indexOf(preprice)-1;

  $("#"+oppoName+" tr:"+nextpricefrom).after(
  "<tr id="+ newmoplist[nextpriceIndx] +"><th>"+ "coinbase" + "</th><th>" + newmoplist[nextpriceIndx]  + "</th><th>" + mtoppo[newmoplist[nextpriceIndx]] + "</th></tr>");

var c=document.getElementById(newmoplist[nextpriceIndx]).getElementsByTagName("th")[2];
countUp($("#"+oppoName+" tr:"+flashPosition),c, mtoppo[newmoplist[nextpriceIndx]], 0.0000,500, 4);
//  $("#"+oppoName+" tr:"+flashPosition).removeClass('flash');

console.log("2");//wt
console.log("row: "+nextpricefrom+"  price: "+ $("#"+oppoName+" tr:"+flashPosition+" th:eq(1)").text()+ " quantity: "+$("#"+oppoName+" tr:"+flashPosition+" th:eq(2)").text());
   //        console.log("next price go up"+ $("#"+oppoName+" tr:"+nextpricefrom+" th:eq(1)").text());
}   }
        delete mtoppo[moplist[j]];
     if(afterQuantity==0){ break;}
     }
//      $tb2tr.removeClass('flash');

}
     if(afterQuantity >0){//*******
//    mtoppo[moplist[i]]=Number(afterQuantity.toFixed(4));

    var morgl=Object.keys(mtorg).sort(function(a,b){return -(a-b)});//current price list in descending order
    var mtorgl=listToNumber(morgl);

    var olen=morgl.length;

  mtorg[new_price.toFixed(2)]=Number(((mtorg[new_price.toFixed(2)]||0)+afterQuantity).toFixed(4));//list and dict maintained.new/update, one for two cases.

  addOrUpdatenewBuy(new_price,olen,mtorg,orgName);//table update/add

    }

    }};


function listToNumber(moplist){
var mtoplist=[];
 moplist.forEach(function(element) {
  mtoplist.push(Number(element));
});
return mtoplist;
}//maybe

var addOrUpdatenewSell=function(new_price,olen, aDict, aName){

    //2. if size of buy in the market < size of this sell at the same price, so: 1)). the buy is disappeared; 2)).sell needs to be added.
    //1)). the buy is disappeared;

    var orglstr=Object.keys(aDict).sort(function(a,b){return -(a-b)});//current orgprice list
    var orgl=listToNumber(orglstr);
//     console.log("after add/ uppdate---length: "+orglstr.length);
//    console.log("newprice!!!!"+new_price);
//    console.log(orgl);
//    console.log(typeof orgl[0]);
    var len=orgl.length;
    //2)).sell needs to be added.
//    console.log("len"+len);
    var priceInTable = [];
    var indexInTable;

    $("#"+aName+" tr").each(function() {
      priceInTable.push($(this).children('th').eq(1).text());
    });
//    console.log("allprice.....>>>>");
//    console.log(priceInTable);

    priceInTable.shift();
    var pricelistNum=listToNumber(priceInTable);
    indexInTable=priceInTable.indexOf(new_price.toFixed(2));
//    if(indexInTable<0){
//    indexInTable=locationOf(new_price, pricelistNum)+1;}

//    console.log("nummberprice list!!");
//    console.log(pricelistNum);

    var index1 = orglstr.indexOf(new_price.toFixed(2));
//    console.log("aname>>>>"+aName );
//    console.log("index1>>>>"+index1);


    if((index1>=(len-20)) && (index1<=(len-1))){
//    index1=index1-(len-20);
//    console.log($('#sells tr').length +"$('#sells tr').length ");


    var $tb1tr;


    if((len==olen) && (indexInTable>=0)){//price in old dict and table

//    index1+=1;
    indexInTable=locationOf(new_price, pricelistNum);

//    indexInTable+=1;//cuz shifted the first empty row;
//    console.log(indexInTable+"____");
    $tb1tr=$("#"+aName+" tr:eq("+indexInTable+")");
//    var a=$("#"+aName+" tr:eq("+indexInTable+") th:eq(1)");
//    console.log(new_price + "   =======++++???!!!!@   "+$("#"+aName+" tr:eq("+indexInTable+") th:eq(1)").text());

    $tb1tr.remove();
//    var a=$("#"+aName+" tr:eq("+indexInTable+") th:eq(1)");
//    console.log(new_price + "   =======!  !   "+a.text());
    indexInTable=indexInTable-1;

    }
    else if(indexInTable<0){indexInTable=locationOf(new_price, pricelistNum);
    }
//    var a=$("#"+aName+" tr:eq("+(indexInTable+1)+") th:eq(1)");
//    console.log(new_price + "   =======?  ?   "+a.text());
//        console.log(index1 + "   =======? index1 ?   ");
//      var $tb1tr=$("#"+aName+" tr:eq("+indexInTable+")");
      var $tb1trr=$("#"+aName+" tr:eq("+indexInTable+")");

//          console.log($("#"+aName+" tr:eq("+(indexInTable+1)+") th:eq(1)").text());
//console.log($("#"+aName+" tr:eq("+(indexInTable)+") th:eq(1)").text());


      $tb1trr.after("<tr id="+new_price.toFixed(2)+"><th>" + "coinbase" + "</th><th>" + new_price.toFixed(2)  + "</th><th>" + aDict[new_price.toFixed(2)] + "</th></tr>");
console.log("check");
console.log($("#"+aName+" tr:eq("+(indexInTable+1)+") th:eq(1)").text());
console.log(new_price.toFixed(2));
var c=document.getElementById(new_price.toFixed(2)).getElementsByTagName("th")[2];
countUp($("#"+aName+" tr:eq("+(indexInTable+1)+")"),c, aDict[new_price.toFixed(2)], 0.0000,500, 4);
//***&
      console.log("3");
      console.log("row: "+(indexInTable+1)+"  price: "+ $("#"+aName+" tr:eq("+(indexInTable+1)+") th:eq(1)").text()+ " quantity: "+$("#"+aName+" tr:eq("+(indexInTable+1)+") th:eq(2)").text());


//        setTimeout(function(){
//        $tb1tr.removeClass('flash');
//          } ,400);

//    a=$("#"+aName+" tr:eq("+index1+") th:eq(1)");
//    console.log(a.text());
//    index1=index1-1;
//    $tb1tr=$("#"+aName+" tr:eq("+index1+")");

        }
//        $("#"+aName+" tr:eq("+(indexInTable+1)+")").removeClass('flash');
//        },400);
        if($('.table1 tr').length > (maxTableSize)){
		$('#'+aName+' tr:eq(1)').remove();

    }

    var mt=Object.keys(aDict).sort(function(a,b){return -(a-b)});
    if(mt.length>128){

  delete  aDict[mt[0]];
  }

    };

var addOrUpdatenewBuy=function(new_price,olen, aDict, aName){

    //2. if size of buy in the market < size of this sell at the same price, so: 1)). the buy is disappeared; 2)).sell needs to be added.
    //1)). the buy is disappeared;

    var orglstr=Object.keys(aDict).sort(function(a,b){return -(a-b)});//current orgprice list
    var orgl=listToNumber(orglstr);
//     console.log("after add/ uppdate---length: "+orglstr.length);
//    console.log("newprice!!!!"+new_price);
//    console.log(orgl);
//    console.log(typeof orgl[0]);
    var len=orgl.length;
    //2)).sell needs to be added.
//    console.log("len"+len);
    var priceInTable = [];
    var indexInTable;

    $("#"+aName+" tr").each(function() {
      priceInTable.push($(this).children('th').eq(1).text());
    });
//    console.log("allprice.....>>>>");
//    console.log(priceInTable);

    priceInTable.shift();
    var pricelistNum=listToNumber(priceInTable);
    indexInTable=priceInTable.indexOf(new_price.toFixed(2));
//    if(indexInTable<0){
//    indexInTable=locationOf(new_price, pricelistNum)+1;}

//    console.log("nummberprice list!!");
//    console.log(pricelistNum);

    var index1 = orglstr.indexOf(new_price.toFixed(2));
//    console.log("aname>>>>"+aName );
//    console.log("index1>>>>"+index1);

    if((index1>=0) && (index1<=19) ){
//     var $tb1th=$("#"+aName+" tr:eq("+index1+") th:eq(2)");
//    index1+=1;
//    var $tb1tr=$("#"+aName+" tr:eq("+index1+")");
      var $tb1tr;


    if((len==olen) && (indexInTable>=0)){
//   console.log("len"+len);
//   console.log("olen"+olen);
   indexInTable=locationOf(new_price, pricelistNum);
//    indexInTable+=1;
//    console.log("realIndex"+indexInTable);
    $tb1tr=$("#"+aName+" tr:eq("+indexInTable+")");
//        var a=$("#"+aName+" tr:eq("+indexInTable+") th:eq(1)");
//    console.log(a.text()+"  =======?????======  "+new_price );
    $tb1tr.remove();
//    var a=$("#"+aName+" tr:eq("+indexInTable+") th:eq(1)");
//    console.log(a.text()+"  =======!!!!======  "+new_price );

    indexInTable=indexInTable-1;
    }
    else if(indexInTable<0){indexInTable=locationOf(new_price, pricelistNum);}


    var $tb1trr=$("#"+aName+" tr:eq("+indexInTable+")");
        var newidx=indexInTable+1;
        var $tnew=$("#"+aName+" tr:eq("+newidx+")");
//     $("#"+aName+" tr:eq("+(indexInTable+1)+")").addClass('flash');
      $tb1trr.after("<tr id="+new_price.toFixed(2)+"><th>" + "coinbase" + "</th><th>" + new_price.toFixed(2) + "</th><th>" + aDict[new_price.toFixed(2)] + "</th></tr>");
console.log("checkag");
console.log($("#"+aName+" tr:eq("+newidx+") th:eq(1)").text());
console.log(new_price.toFixed(2));
var c=document.getElementById(new_price.toFixed(2)).getElementsByTagName("th")[2];
countUp($("#"+aName+" tr:eq("+(indexInTable+1)+")"),c, aDict[new_price.toFixed(2)], 0.0000,500, 4);
//      $("#"+aName+" tr:eq("+(indexInTable+1)+")").removeClass('flash');
//        setTimeout(function(){
//        $tb1tr.removeClass('flash');
//        $tb1tr.after("<tr><th>" + "coinbase" + "</th><th>" + new_price.toFixed(2) + "</th><th>" + aDict[new_price.toFixed(2)] + "</th></tr>");
//        },400);
console.log("4");//wt
 console.log("row: "+(indexInTable+1)+"  price: "+ $("#"+aName+" tr:eq("+(indexInTable+1)+") th:eq(1)").text()+ " quantity: "+$("#"+aName+" tr:eq("+(indexInTable+1)+") th:eq(2)").text());
}

 if($('.table2 tr').length > (maxTableSize)){
		$('#'+aName+' tr:last').remove();
    }
    var mt=Object.keys(aDict).sort(function(a,b){return -(a-b)});
    if(mt.length>128){

  delete  aDict[mt[mt.length-1]];
  }

    };



//descending order -- sort
function insert(element, array) {
  array.splice(locationOf(element, array), 0, element);
  return array;
}

function locationOf(element, array, start, end) {
  if (array[0]<element) {return 0}
  start = start || 0;
  end = end || array.length;
  var pivot = parseInt(start + (end - start) / 2, 10);
  if (end-start <= 1 || array[pivot] == element) return pivot+1;

  if (array[pivot] > element) {
    return locationOf(element, array, pivot, end);
  } else {
    return locationOf(element, array, start, pivot);
  }
}

//candlechart
 function drawcandle(e, toID,fsym){
exchange= e;
toid=toID;
//fsym = $().text().substring(0,3);
PrevDataUrl =  "https://min-api.cryptocompare.com/data/histo"+theunit+"?fsym=" + fsym + "&tsym=" + tsym+"&limit=60&e="+exchange+"&aggregate="+aggregate;
candledataUrl = "https://min-api.cryptocompare.com/data/histo"+theunit+"?fsym=" + fsym + "&tsym=" + tsym+"&limit=1&e="+exchange+"&aggregate="+aggregate;
//alert(PrevDataUrl);
 $.getJSON(PrevDataUrl, function(data) {

                        var rawprevData = data['Data'];
                        for (var i = 0; i < rawprevData.length-1; i++) {
                        prevData[i] = [rawprevData[i]['time']*1000, rawprevData[i]['open'], rawprevData[i]['high'],
                        rawprevData[i]['low'], rawprevData[i]['close']];

                               }
//                      alert("when draw: fysm:" +fsym);
                        draw(toid,fsym,interval);
    //                                    alert(prevData);

                            });

                            }



var draw=function(id,f,inter){

    Highcharts.setOptions({
        global: {
            useUTC: false
        }
    });

    window.chart = new Highcharts.StockChart({
        chart: {
            type: 'candlestick',
            renderTo: id,
            events: {
                load: function() {

                    // set up the updating of the chart each chosen time unit
                    var series = this.series[0];
                    setInterval(function() {
                    $.getJSON(candledataUrl, function(data) {

                                var current = data['Data'];

                                   var currentText = current[0];

                        var last = series.data[series.data.length - 1];
                        var s1 = currentText['open'];
                        var s2 = currentText['high'];
                        var s3 = currentText['low'];
                        var s4 = currentText['close'];

                        series.addPoint([last.x + inter, s1, s2, s3, s4], true, true);
                   });
                   }, inter);
//                    setInterval(function() {
//                        var nv = Math.random() * 2 + 70;
//                        var last = series.data[series.data.length - 1];
//                        var high = Math.max(last.high, nv);
//                        var low = Math.min(last.low, nv);
//
//                        last.update([
//                            last.x,
//                            last.open,
//                            high,
//                            low,
//                            nv
//                        ], true);
//                        //series.xAxis.setExtremes(1133395200000, 1135900800000, false, false);
//                        //series.yAxis.setExtremes(68, 76, true, false);
//                    }, 600);
                }
            }
        },

        rangeSelector: {

            inputEnabled: false,
            selected: 0,
            enabled: false
        },

        scrollbar: {
            enabled: false
        },
        navigator: {
            enabled: true,
        },
        plotOptions: {
        candlestick: {
            	lineColor: '#FC6A42',
            	color: '#FC516A',
	    		upLineColor: '#6EC25F',
	    		upColor: '#71E793'
        }
    },

        series: [{
            name: exchange+' '+f+'-USD',
            data: prevData
            }]
    });
}




//__________________



function sortNumber(a, b)
    {
    return a - b
    }

function depthchart(depthid,durl){
AmCharts.makeChart(depthid, {
  "type": "serial",
  "theme": "light",
  "dataLoader": {
    "url": durl,
    "format": "json",
    "reload": 30,
    "postProcess": function(data) {

      // Function to process (sort and calculate cummulative volume)
      function processData(list, type, desc) {

        // Convert to data points
        for(var i = 0; i < list.length; i++) {
          list[i] = {
            value: Number(list[i][0]),
            volume: Number(list[i][1]),
          }
        }

        // Sort list just in case
        list.sort(function(a, b) {
          if (a.value > b.value) {
            return 1;
          }
          else if (a.value < b.value) {
            return -1;
          }
          else {
            return 0;
          }
        });

        // Calculate cummulative volume
        if (desc) {
          for(var i = list.length - 1; i >= 0; i--) {
            if (i < (list.length - 1)) {
              list[i].totalvolume = list[i+1].totalvolume + list[i].volume;
            }
            else {
              list[i].totalvolume = list[i].volume;
            }
            var dp = {};
            dp["value"] = list[i].value;
            dp[type + "volume"] = list[i].volume;
            dp[type + "totalvolume"] = list[i].totalvolume;
            res.unshift(dp);
          }
        }
        else {
          for(var i = 0; i < list.length; i++) {
            if (i > 0) {
              list[i].totalvolume = list[i-1].totalvolume + list[i].volume;
            }
            else {
              list[i].totalvolume = list[i].volume;
            }
            var dp = {};
            dp["value"] = list[i].value;
            dp[type + "volume"] = list[i].volume;
            dp[type + "totalvolume"] = list[i].totalvolume;
            res.push(dp);
          }
        }

      }

      // Init
      var res = [];
      processData(data.bids, "bids", true);
      processData(data.asks, "asks", false);

      //console.log(res);
      return res;
    }
  },
  "graphs": [{
    "id": "bids",
    "fillAlphas": 0.1,
    "lineAlpha": 1,
    "lineThickness": 2,
    "lineColor": "#0f0",
    "type": "step",
    "valueField": "bidstotalvolume",
    "balloonFunction": balloon
  }, {
    "id": "asks",
    "fillAlphas": 0.1,
    "lineAlpha": 1,
    "lineThickness": 2,
    "lineColor": "#f00",
    "type": "step",
    "valueField": "askstotalvolume",
    "balloonFunction": balloon
  }, {
    "lineAlpha": 0,
    "fillAlphas": 0.2,
    "lineColor": "#000",
    "type": "column",
    "clustered": false,
    "valueField": "bidsvolume",
    "showBalloon": false
  }, {
    "lineAlpha": 0,
    "fillAlphas": 0.2,
    "lineColor": "#000",
    "type": "column",
    "clustered": false,
    "valueField": "asksvolume",
    "showBalloon": false
  }],
  "categoryField": "value",
  "chartCursor": {},
  "balloon": {
    "textAlign": "left"
  },
  "valueAxes": [{
    "title": "Volume"
  }],
  "categoryAxis": {
    "title": "Price (BTC/USD)",
    "minHorizontalGap": 100,
    "startOnAxis": true,
    "showFirstLabel": false,
    "showLastLabel": false
  },
  "export": {
    "enabled": true
  }
});
}

function balloon(item, graph) {
  var txt;
  if (graph.id == "asks") {
    txt = "Ask: <strong>" + formatNumber(item.dataContext.value, graph.chart, 4) + "</strong><br />"
      + "Total volume: <strong>" + formatNumber(item.dataContext.askstotalvolume, graph.chart, 4) + "</strong><br />"
      + "Volume: <strong>" + formatNumber(item.dataContext.asksvolume, graph.chart, 4) + "</strong>";
  }
  else {
    txt = "Bid: <strong>" + formatNumber(item.dataContext.value, graph.chart, 4) + "</strong><br />"
      + "Total volume: <strong>" + formatNumber(item.dataContext.bidstotalvolume, graph.chart, 4) + "</strong><br />"
      + "Volume: <strong>" + formatNumber(item.dataContext.bidsvolume, graph.chart, 4) + "</strong>";
  }
  return txt;
}

function formatNumber(val, chart, precision) {
  return AmCharts.formatNumber(
    val,
    {
      precision: precision ? precision : chart.precision,
      decimalSeparator: chart.decimalSeparator,
      thousandsSeparator: chart.thousandsSeparator
    }
  );
}



$("#product li").click(function(event){
        event.preventDefault();
        socket.disconnect();
        sell_list=new Array();
        buy_list=new Array();

        $("#sells tr:gt(0)").remove();
        $("#buys tr:gt(0)").remove();
//        $("#sells tr").length=1;
//        $("#buys tr").length=1;

//        sell_list=new Array();
//        buy_list=new Array();

        fsym = $(this).text().substring(0,3);
        $("#orderTitle").text($(this).text()+" Order Book ");
        $("#btnname").html($(this).text()+"      &#x25BC <br> select product");
//        dataUrl = "https://min-api.cryptocompare.com/data/subs?fsym=" + fsym + "&tsyms=" + tsym ;
//        $('#try').after("!!!!"+fsym);

        myFunction();
//        alert("stream:"+exchange+" fsym:"+fsym);

        if(exchange=="bitstamp"){
////
//$("#container000").empty();
drawcandle("bitstamp","container000",fsym);


        depthchartURL = "https://www.bitstamp.net/api/v2/order_book/"+fsym.toLowerCase()+"usd";
         depthchart("chartdiv",depthchartURL);


        }
        else{
            drawcandle("coinbase","candlestick000",fsym);


         depthchartURL ="https://api.gdax.com/products/"+fsym+"-USD/book?level=2";
         depthchart("chartdivsec",depthchartURL);
         }


});

//$("#depth1").click(function(event){
////        event.preventDefault();
//        alert($(this).text().trim());
//
//        alert("2");
//        exchange="bitstamp";
//        depthchartURL = "https://www.bitstamp.net/api/v2/order_book/"+fsym.toLowerCase()+"usd";
//        depthchart("chartdiv",depthchartURL);
//
//         });
//
//$("#depth2").click(function(event){
////        event.preventDefault();
//
//        exchange="coinbase";
//
//        depthchartURL = "https://api.gdax.com/products/"+fsym+"-USD/book?level=2";
//        alert(depthchartURL);
//        depthchart("chartdiv",depthchartURL);
//
//
//        });

$("#pbitstamp li").click(function(event){
        event.preventDefault();
exchange= "bitstamp";
var a=$(this).text();
//alert("a:"+a);
 if(a=='1m'||a=='5m'||a=='30m'){
 theunit="minute";
 aggregate=a.split('m')[0];
 interval=60000*Number(aggregate);
// alert("interval"+interval);
 }
 else{
 theunit="hour";
 aggregate="1";
 interval=3600000;
 }
 $("#myTabDrop1").html("Bitstamp <br>"+$(this).text()+"<b class=\"caret\"></b>");

//
////        $("#sells tr").length=1;
////        $("#buys tr").length=1;
//
////        sell_list=new Array();
////        buy_list=new Array();
//
//

drawcandle("bitstamp","container000",fsym);
//        drawcandle("gdax","candlestick000");
//        }

//        $('#try').after("!!!!"+fsym);
//        myFunction();
});



$("#pcoinbase li").click(function(event){
        event.preventDefault();
 exchange= "coinbase";
var a=$(this).text();
//alert("a:"+a);
 if(a=='1m'||a=='5m'||a=='30m'){
 theunit="minute";
 aggregate=a.split('m')[0];
 interval=60000*Number(aggregate);
// alert("interval:"+interval);
 }
 else{
 theunit="hour";
 aggregate="1";
 interval=3600000;
 }
 $("#myTabDrop2").html("Coinbase <br>"+$(this).text()+"<b class=\"caret\"></b>");

//
////        $("#sells tr").length=1;
////        $("#buys tr").length=1;
//
////        sell_list=new Array();
////        buy_list=new Array();
//
//

            drawcandle("coinbase","candlestick000",fsym);
//        drawcandle("gdax","candlestick000");
//        }

//        $('#try').after("!!!!"+fsym);
//        myFunction();
});

$('#unsubscribe').click(function() {
	console.log('Unsubscribing to streamers');
	$('#subscribe').removeClass('subon');
	$(this).addClass('subon');
	$('#stream-text').text('Stream stopped');
	socket.emit('SubRemove', { subs: newcurrentSubs });
	$('#sub-exchanges').text("");
});

$('#subscribe').click(function() {
	console.log('Subscribing to streamers')
	$('#unsubscribe').removeClass('subon');
	$(this).addClass('subon');
	$('#stream-text').text("Streaming...");
	socket.emit('SubAdd', { subs: newcurrentSubs });
	$('#sub-exchanges').text(currentSubsText);
});


});
