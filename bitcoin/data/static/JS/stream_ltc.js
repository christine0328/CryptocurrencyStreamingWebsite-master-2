var streamUrl = "https://streamer.cryptocompare.com/";
var fsym = "ETH";
var tsym = "USD";

var currentSubs;
var newsubs=[];
var currentSubsText = "";
var dataUrl = "https://min-api.cryptocompare.com/data/subs?fsym=" + fsym + "&tsyms=" + tsym ;
var socket = io(streamUrl);
var sell_list=new Array();
var buy_list=new Array();

function sortNumber(a, b)
    {
    return b - a
    }


$.getJSON(dataUrl, function(data) {
	currentSubs = data['USD']['TRADES'];
//	console.log(dataurl);
	console.log(currentSubs);
	for (var i = 0; i < currentSubs.length; i++) {
//	if(currentSubs[i] == "0~Bitstamp~BTC~USD" || currentSubs[i] == "0~Coinbase~BTC~USD" )
		{
//		newsubs[j]=currentSubs[i];
//		j++;
		currentSubsText += currentSubs[i] + ", ";}
	}

	$('#sub-exchanges').text(currentSubs);
	socket.emit('SubAdd', { subs: currentSubs });
});



socket.on('m', function(currentData) {
	var tradeField = currentData.substr(0, currentData.indexOf("~"));
	if (tradeField == CCC.STATIC.TYPE.TRADE) {
		transformData(currentData);
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
	}
	else if (incomingTrade['F'] & 2) {
		newTrade['Type'] = "BUY";
	}
	else {
		newTrade['Type'] = "UNKNOWN";
	}
    if(incomingTrade['M'].toLowerCase() == "bitstamp"||incomingTrade['M'].toLowerCase() == "coinbase")
	{displayData(newTrade);}
};

var displayData = function(dataUnpacked) {
	var maxTableSize = 15;
	var length1 = $('.table1 tr').length;
	var length2 = $('.table2 tr').length;
    var new_price = Number(dataUnpacked.Price.substring(1));
    if(dataUnpacked.Type.toLowerCase() == "sell"){
    var index1 = jQuery.inArray(new_price, sell_list);
//$('#try').after(index1);
    if(index1>=0){
//    index1+=1;
    var $tb1th=$("#sells tr:eq("+index1+") th:eq(2)");
    var $tb1tr=$("#sells tr:eq("+index1+")");
    var old_quantity=$tb1th.text().substring(1);
    var new_quantity=dataUnpacked.Quantity.substring(1);
// var originColor= $(".table1 tr:eq("+index1+")").currentStyle.backgroundColor;

    $tb1tr.addClass('flash');
        setTimeout(function(){
        $tb1tr.removeClass('flash');
        $tb1th.html("Ł "+(Number(old_quantity)+Number(new_quantity)).toFixed(4));
        },500);
    }
    else{

    sell_list.unshift(new_price);
    sell_list.sort(sortNumber);

    var index_insert = jQuery.inArray(new_price, sell_list);
//	$(".table1").find("tr:gt(0)").toArray().sort(comparer(1));

    $("#sells tr:eq("+index_insert+")").after(
		"<tr class=" + dataUnpacked.Type + "><th>" + dataUnpacked.Market + "</th><th>" + dataUnpacked.Price + "</th><th>" + dataUnpacked.Quantity + "</th></tr>"
	);

//    $('#try').after(sell_list+"!!!");
	 if (length1 >= (maxTableSize)) {
		$('#sells tr:eq(0)').remove();
		delete sell_list[0];}
	}}

	else if(dataUnpacked.Type.toLowerCase() == "buy"){
    var index2 = jQuery.inArray(new_price, buy_list);
$('#try').after(index2);
    if(index2 >= 0){
//    index1+=1;
    var $tb2th=$("#buys tr:eq("+index2+") th:eq(2)");
    var $tb2tr=$("#buys tr:eq("+index2+")");
    var old_quantity=$tb2th.text().substring(1);
    var new_quantity=dataUnpacked.Quantity.substring(1);
// var originColor= $(".table1 tr:eq("+index1+")").currentStyle.backgroundColor;

    $tb2tr.addClass('flash');
        setTimeout(function(){
        $tb2tr.removeClass('flash');
        $tb2th.html("Ł "+(Number(old_quantity)+Number(new_quantity)).toFixed(4));
        },500);
    }
    else{

    buy_list.unshift(new_price);
    buy_list.sort(sortNumber);

    var index_insert2 = jQuery.inArray(new_price, buy_list);
//	$(".table1").find("tr:gt(0)").toArray().sort(comparer(1));

    $("#buys tr:eq("+index_insert2+")").after(
		"<tr class=" + dataUnpacked.Type + "><th>" + dataUnpacked.Market + "</th><th>" + dataUnpacked.Price + "</th><th>" + dataUnpacked.Quantity + "</th></tr>"
	);

//    $('#try').after(buy_list+"!!!");
	 if (length2 >= (maxTableSize)) {
		$('#buys tr:last').remove();
		buy_list.pop();}
	}}
};

$('#unsubscribe').click(function() {
	console.log('Unsubscribing to streamers');
	$('#subscribe').removeClass('subon');
	$(this).addClass('subon');
	$('#stream-text').text('Stream stopped');
	socket.emit('SubRemove', { subs: currentSubs });
	$('#sub-exchanges').text("");
});

$('#subscribe').click(function() {
	console.log('Subscribing to streamers')
	$('#unsubscribe').removeClass('subon');
	$(this).addClass('subon');
	$('#stream-text').text("Streaming...");
	socket.emit('SubAdd', { subs: currentSubs });
	$('#sub-exchanges').text(currentSubsText);
});

