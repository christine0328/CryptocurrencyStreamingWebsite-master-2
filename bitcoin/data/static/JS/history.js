$(function(){

 var coinType1;
 var coinType2;
 var legend1='GDAX-BTC' ;
 var legend2='Bitstamp-BTC';
var comparisondate;
var hiscandleData;
var exchangename='bitstamp';
var selectedCoin='BTC';
//historyPriceCompare();

function sortNumber(a, b)
    {
    return b - a
    }

//        $.getJSON("/ethcompare",function(data){
//
//              coinType1= data['gdaxethline'];
//        coinType2= data['bitstampethline'];
//        comparisondate=data['eth_compdate'];
//        historyPriceCompare();
//          });

$.getJSON("/btccompare",function(data){

        coinType1= data['gdaxbtcline'];
        coinType2= data['bitstampbtcline'];
        comparisondate=data['btc_compdate'];
        historyPriceCompare();
          });

$.getJSON("/bitstampbtccandle",function(data){

       hiscandleData=data['bitstampbtccandlelist'];
       historyCandle();
       hiscandleData=[]
          });






function historyCandle(){

    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main3'));
	var upColor = '#ec0000';
	var upBorderColor = '#8A0000';
	var downColor = '#00da3c';
	var downBorderColor = '#008F28';



	var data0 = splitData(hiscandleData);


function splitData(rawData) {
    var categoryData = [];
    var values = []
    for (var i = 0; i < rawData.length; i++) {
        epochtime=rawData[i].splice(0, 1)[0];
        var newdate  = new Date(epochtime * 1000).toDateString();

        categoryData.push(newdate);
        values.push(rawData[i]);
    }
    return {
        categoryData: categoryData,
        values: values
    };
}

function calculateMA(dayCount) {
    var result = [];
    for (var i = 0, len = data0.values.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data0.values[i - j][1];
        }
        result.push(sum / dayCount);
    }
    return result;
}



option = {
    title: {
        text: selectedCoin+'-USD candle chart',
        left: 0
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },

    legend: {
        data: ['Day-K', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
    },
    xAxis: {
        type: 'category',
        data: data0.categoryData,
        scale: true,
        boundaryGap : false,
        axisLine: {onZero: false},
        splitLine: {show: false},
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
    },
    yAxis: {
        scale: true,
        splitArea: {
            show: true
        }
    },
    dataZoom: [
        {
            type: 'inside',
            start: 50,
            end: 100
        },
        {
            show: true,
            type: 'slider',
            y: '90%',
            start: 50,
            end: 100
        }
    ],
    series: [
        {
            name: 'K',
            type: 'candlestick',
            data: data0.values,
            itemStyle: {
                normal: {
                    color: upColor,
                    color0: downColor,
                    borderColor: upBorderColor,
                    borderColor0: downBorderColor
                }
            },
            markPoint: {
                label: {
                    normal: {
                        formatter: function (param) {
                            return param != null ? Math.round(param.value) : '';
                        }
                    }
                },
                data: [
                    {
                        name: 'XX标点',
                        coord: ['2013/5/31', 2300],
                        value: 2300,
                        itemStyle: {
                            normal: {color: 'rgb(41,60,85)'}
                        }
                    },
                    {
                        name: 'highest value',
                        type: 'max',
                        valueDim: 'highest'
                    },
                    {
                        name: 'lowest value',
                        type: 'min',
                        valueDim: 'lowest'
                    },
                    {
                        name: 'average value on close',
                        type: 'average',
                        valueDim: 'close'
                    }
                ],
                tooltip: {
                    formatter: function (param) {
                        return param.name + '<br>' + (param.data.coord || '');
                    }
                }
            },
            markLine: {
                symbol: ['none', 'none'],
                data: [
                    [
                        {
                            name: 'from lowest to highest',
                            type: 'min',
                            valueDim: 'lowest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                normal: {show: false},
                                emphasis: {show: false}
                            }
                        },
                        {
                            type: 'max',
                            valueDim: 'highest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                normal: {show: false},
                                emphasis: {show: false}
                            }
                        }
                    ],
                    {
                        name: 'min line on close',
                        type: 'min',
                        valueDim: 'close'
                    },
                    {
                        name: 'max line on close',
                        type: 'max',
                        valueDim: 'close'
                    }
                ]
            }
        },
        {
            name: 'MA5',
            type: 'line',
            data: calculateMA(5),
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },
        {
            name: 'MA10',
            type: 'line',
            data: calculateMA(10),
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },
        {
            name: 'MA20',
            type: 'line',
            data: calculateMA(20),
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },
        {
            name: 'MA30',
            type: 'line',
            data: calculateMA(30),
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        },

    ]
};

    myChart.setOption(option);

}


function historyPriceCompare(){
//_______________________________________________

//    <!--// 基于准备好的dom，初始化echarts实例-->
//    <!--script for price comparison-->

 var myChart = echarts.init(document.getElementById('main4'));

    var rawday = comparisondate;
    var day= [];
    var gdax = coinType1;
    var bitstamp = coinType2;

var colors = ['#5793f3', '#d14a61', '#675bba'];

    for (var i = 0; i < rawday.length; i++) {

        var newdate  = new Date(rawday[i] * 1000).toDateString();

        day.push(newdate);

    }


option = {
    color: colors,

    tooltip: {
        trigger: 'none',
        axisPointer: {
            type: 'cross'
        }
    },
    legend: {
        data:[legend1, legend2]
    },
    grid: {
        top: 70,
        bottom: 50
    },
    xAxis: [
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[1]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return legend1+'  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: day
        },
        {
            type: 'category',
            axisTick: {
                alignWithLabel: true
            },
            axisLine: {
                onZero: false,
                lineStyle: {
                    color: colors[0]
                }
            },
            axisPointer: {
                label: {
                    formatter: function (params) {
                        return legend2+'  ' + params.value
                            + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
                    }
                }
            },
            data: day
        }
    ],
    yAxis: [
        {
            type: 'value'
        }
    ],
    series: [
        {
            name:legend1,
            type:'line',
            xAxisIndex: 1,
            smooth: true,
            data:gdax
        },
        {
            name:legend2,
            type:'line',
            smooth: true,
            data:bitstamp
        }
    ]
};


    myChart.setOption(option);
//    ______________________________________________

}




$("#product li").click(function(event){
        event.preventDefault();

selectedCoin=$(this).text().substring(0,3)
         legend1= 'GDAX-'+selectedCoin;
        legend2= 'Bitstamp-'+ selectedCoin;
        alert($(this).text().substring(0,3));
        if(selectedCoin=="BTC"){
        alert("1");
        if(exchangename =='bitstamp'){
               $.getJSON("/bitstampbtccandle",function(data2){

       hiscandleData=data2['bitstampbtccandlelist'];
       historyCandle();
          });
          }
         else{
          $.getJSON("/gdaxbtccandle",function(data2){

       hiscandleData=data2['gdaxbtccandlelist'];
       historyCandle();
          });

         }

        $.getJSON("/btccompare",function(data1){

        coinType1= data1['gdaxbtcline'];
        coinType2= data1['bitstampbtcline'];
        alert(coinType2);
        alert(coinType1);
        comparisondate=data1['btc_compdate'];
        historyPriceCompare();
          });

        }
        else if(selectedCoin=="ETH"){
        alert("2");

        if(exchangename =='bitstamp'){
        $.getJSON("/bitstampethcandle",function(data2){

       hiscandleData=data2['bitstampethcandlelist'];
       historyCandle();
          });
          }

        else{
       $.getJSON("/gdaxethcandle",function(data2){

       hiscandleData=data2['gdaxethcandlelist'];
       historyCandle();
       });

         }


        $.getJSON("/ethcompare",function(data1){


        coinType1= data1['gdaxethline'];
        coinType2= data1['bitstampethline'];
        comparisondate=data1['eth_compdate'];
        historyPriceCompare();
          });
        }

        else{
        alert("3");
        if(exchangename =='bitstamp'){
        $.getJSON("/bitstampltccandle",function(data2){

       hiscandleData=data2['bitstampltccandlelist'];
       historyCandle();
          });}
        else{
        $.getJSON("/gdaxltccandle",function(data2){

       hiscandleData=data2['gdaxltccandlelist'];
       historyCandle();  });

        }

        $.getJSON("/ltccompare",function(data1){

              coinType1= data1['gdaxltcline'];
        coinType2= data1['bitstampltcline'];
        comparisondate=data1['ltc_compdate'];
        historyPriceCompare();
          });

        }

        $("#pricecomparename").text($(this).text()+" Price Compare ");
       //        $('#try').after("!!!!"+fsym);
//       $('#main4').empty();

});

$('#bitbit').click(function(){
exchangename='bitstamp';
if(selectedCoin=="BTC")
{
$.getJSON("/bitstampbtccandle",function(data2){

       hiscandleData=data2['bitstampbtccandlelist'];
       historyCandle();
          });
}
else if (selectedCoin=="ETH"){

$.getJSON("/bitstampethcandle",function(data2){

       hiscandleData=data2['bitstampethcandlelist'];
       historyCandle();
          });

}
else {
$.getJSON("/bitstampltccandle",function(data2){

       hiscandleData=data2['bitstampltccandlelist'];
       historyCandle();
          });

}

});


$('#gdxgdx').click(function(){
exchangename='gdax';

if(selectedCoin=="BTC")
{
$.getJSON("/gdaxbtccandle",function(data2){

       hiscandleData=data2['gdaxbtccandlelist'];
       historyCandle();
          });
}
else if (selectedCoin=="ETH"){

$.getJSON("/gdaxethcandle",function(data2){

       hiscandleData=data2['gdaxbtccandlelist'];
       historyCandle();
          });

}
else {
$.getJSON("/gdaxltccandle",function(data2){

       hiscandleData=data2['gdaxltccandlelist'];
       historyCandle();
          });

}

});



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

});