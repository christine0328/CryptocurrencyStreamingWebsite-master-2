$(function(){
exchange="bitstamp";

var PrevDataUrl =  "https://min-api.cryptocompare.com/data/histominute?fsym=" + fsym + "&tsym=" + tsym+"&limit=60&e="+exchange;
var candledataUrl = "https://min-api.cryptocompare.com/data/histominute?fsym=" + fsym + "&tsym=" + tsym+"&limit=1&e="+exchange;
var prevData = [];
//function changeType(){
//
//}

//alert(candledataUrl);
drawcandle("bitstamp","container000");


 function drawcandle(e, toID){
exchange= e;
toid=toID;
//fsym = $().text().substring(0,3);
PrevDataUrl =  "https://min-api.cryptocompare.com/data/histominute?fsym=" + fsym + "&tsym=" + tsym+"&limit=60&e="+exchange;
candledataUrl = "https://min-api.cryptocompare.com/data/histominute?fsym=" + fsym + "&tsym=" + tsym+"&limit=1&e="+exchange;

 $.getJSON(PrevDataUrl, function(data) {

                                var rawprevData = data['Data'];

                                for (var i = 0; i < rawprevData.length-1; i++) {


                                    prevData[i] = [rawprevData[i]['time']*1000, rawprevData[i]['open'], rawprevData[i]['high'], rawprevData[i]['low'], rawprevData[i]['close']];

                                }
                                alert("when draw: fysm:" +fsym);
                                      draw(toid);
//                                    alert(prevData);

                            });}



var draw=function(id){

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

                    // set up the updating of the chart each second
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

                        series.addPoint([last.x + 60000, s1, s2, s3, s4], true, true);
                   });
                    }, 60000);
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

        series: [{
            name: exchange+' BTC-USD',
            data: prevData
            }]
    });
}



$("#myTab li").click(function(event){
        event.preventDefault();
 alert(exchange= $(this).text());
//
////        $("#sells tr").length=1;
////        $("#buys tr").length=1;
//
////        sell_list=new Array();
////        buy_list=new Array();
//
//
                if(exchange=="Bitstamp"){
////
drawcandle("bitstamp","container000");


        }
        else{
            drawcandle("gdax","candlestick000");}
//        drawcandle("gdax","candlestick000");
//        }

//        $('#try').after("!!!!"+fsym);
//        myFunction();
});



});