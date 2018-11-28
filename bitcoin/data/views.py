from django.shortcuts import render
from django.http import HttpResponse, HttpRequest
from numpy import double
from .models import *
import datetime, decimal
import gdax
import requests
from django.http import JsonResponse

public_client = gdax.PublicClient()


def home(request):
    #return render(request, 'home.html')
    return render(request, 'realtime_orderbook.html')


def realtime(request):
    return render(request, 'realtime.html')


def history(request):
    # delete all data in database
    # GDAX_BTC_history.objects.all().delete()
    # GDAX_ETH_history.objects.all().delete()
    # GDAX_LTC_history.objects.all().delete()
    # Bitstamp_BTC_history.objects.all().delete()
    # Bitstamp_LTC_history.objects.all().delete()
    # Bitstamp_ETH_history.objects.all().delete()
    #
    # # get new data from api
    # GDAX_BTC_historylist = public_client.get_product_historic_rates('BTC-USD', granularity=86400)
    # for d in reversed(GDAX_BTC_historylist):
    #     data = GDAX_BTC_history(time=datetime.datetime.fromtimestamp(d[0]),
    #                             low=decimal.Decimal(d[1]),
    #                             high=decimal.Decimal(d[2]),
    #                             open=decimal.Decimal(d[3]),
    #                             close=decimal.Decimal(d[4]),
    #                             volume=decimal.Decimal(d[5]))
    #     data.save()
    #
    # GDAX_ETH_historylist = public_client.get_product_historic_rates('ETH-USD', granularity=86400)
    # for d in reversed(GDAX_ETH_historylist):
    #     data = GDAX_ETH_history(time=datetime.datetime.fromtimestamp(d[0]),
    #                             low=decimal.Decimal(d[1]),
    #                             high=decimal.Decimal(d[2]),
    #                             open=decimal.Decimal(d[3]),
    #                             close=decimal.Decimal(d[4]),
    #                             volume=decimal.Decimal(d[5]))
    #     data.save()
    #
    # GDAX_LTC_historylist = public_client.get_product_historic_rates('LTC-USD', granularity=86400)
    # for d in reversed(GDAX_LTC_historylist):
    #     data = GDAX_LTC_history(time=datetime.datetime.fromtimestamp(d[0]),
    #                             low=decimal.Decimal(d[1]),
    #                             high=decimal.Decimal(d[2]),
    #                             open=decimal.Decimal(d[3]),
    #                             close=decimal.Decimal(d[4]),
    #                             volume=decimal.Decimal(d[5]))
    #     data.save()
    #
    # response = requests.get(
    #     'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&aggregate=1&limit=300&e=bitstamp')
    # Bitstamp_BTC_historylist = response.json()
    # for d in Bitstamp_BTC_historylist['Data'][1:]:
    #     data = Bitstamp_BTC_history(time=datetime.datetime.fromtimestamp(d['time']),
    #                                 low=decimal.Decimal(d['low']),
    #                                 high=decimal.Decimal(d['high']),
    #                                 open=decimal.Decimal(d['open']),
    #                                 close=decimal.Decimal(d['close']),
    #                                 volume=decimal.Decimal(d['volumefrom']))
    #     data.save()
    #
    # response2 = requests.get(
    #     'https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&aggregate=1&limit=300&e=bitstamp')
    # Bitstamp_ETH_historylist = response2.json()
    # for d in Bitstamp_ETH_historylist['Data'][1:]:
    #     data = Bitstamp_ETH_history(time=datetime.datetime.fromtimestamp(d['time']),
    #                                 low=decimal.Decimal(d['low']),
    #                                 high=decimal.Decimal(d['high']),
    #                                 open=decimal.Decimal(d['open']),
    #                                 close=decimal.Decimal(d['close']),
    #                                 volume=decimal.Decimal(d['volumefrom']))
    #     data.save()
    #
    # response3 = requests.get(
    #     'https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&aggregate=1&limit=300&e=bitstamp')
    # Bitstamp_LTC_historylist = response3.json()
    # for d in Bitstamp_LTC_historylist['Data'][1:]:
    #     data = Bitstamp_LTC_history(time=datetime.datetime.fromtimestamp(d['time']),
    #                                 low=decimal.Decimal(d['low']),
    #                                 high=decimal.Decimal(d['high']),
    #                                 open=decimal.Decimal(d['open']),
    #                                 close=decimal.Decimal(d['close']),
    #                                 volume=decimal.Decimal(d['volumefrom']))
    #     data.save()
    #
    # # prepare data for frontend
    # gdaxbtccandlelist = []
    # gdaxethcandlelist = []
    # gdaxltccandlelist = []
    # bitstampbtccandlelist = []
    # bitstampethcandlelist = []
    # bitstampltccandlelist = []
    #
    # for gbtc in GDAX_BTC_history.objects.all():
    #     gdaxbtccandlelist.append(
    #         [int(datetime.datetime.strptime(str(gbtc.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
    #          double(gbtc.open), double(gbtc.close), double(gbtc.high), double(gbtc.low)])
    # for geth in GDAX_ETH_history.objects.all():
    #     gdaxethcandlelist.append(
    #         [int(datetime.datetime.strptime(str(geth.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
    #          double(geth.open), double(geth.close), double(geth.high), double(geth.low)])
    # for gltc in GDAX_LTC_history.objects.all():
    #     gdaxltccandlelist.append(
    #         [int(datetime.datetime.strptime(str(gltc.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
    #          double(gltc.open), double(gltc.close), double(gltc.high), double(gltc.low)])
    # for bbtc in Bitstamp_BTC_history.objects.all():
    #     bitstampbtccandlelist.append(
    #         [int(datetime.datetime.strptime(str(bbtc.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
    #          double(bbtc.open), double(bbtc.close), double(bbtc.high), double(bbtc.low)])
    # for beth in Bitstamp_ETH_history.objects.all():
    #     bitstampethcandlelist.append(
    #         [int(datetime.datetime.strptime(str(beth.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
    #          double(beth.open), double(beth.close), double(beth.high), double(beth.low)])
    # for bltc in Bitstamp_LTC_history.objects.all():
    #     bitstampltccandlelist.append(
    #         [int(datetime.datetime.strptime(str(bltc.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
    #          double(bltc.open), double(bltc.close), double(bltc.high), double(bltc.low)])
    #
    # gdaxbtcline = []
    # gdaxltcline = []
    # gdaxethline = []
    # bitstampbtcline = []
    # bitstampltcline = []
    # bitstampethline = []
    # comparisondate = []
    #
    # for gbtc in GDAX_BTC_history.objects.all():
    #     gdaxbtcline.append(double((gbtc.high + gbtc.low) / 2))
    #     comparisondate.append(int(datetime.datetime.strptime(str(gbtc.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()))
    # for gltc in GDAX_LTC_history.objects.all():
    #     gdaxltcline.append(double((gltc.high + gltc.low) / 2))
    # for geth in GDAX_ETH_history.objects.all():
    #     gdaxethline.append(double((geth.high + geth.low) / 2))
    # for bbtc in Bitstamp_BTC_history.objects.all():
    #     bitstampbtcline.append(double((bbtc.high + bbtc.low) / 2))
    # for bltc in Bitstamp_LTC_history.objects.all():
    #     bitstampltcline.append(double((bltc.high + bltc.low) / 2))
    # for beth in Bitstamp_ETH_history.objects.all():
    #     bitstampethline.append(double((beth.high + beth.low) / 2))
    #
    # context = {'gdaxbtccandlelist': gdaxbtccandlelist,
    #            'gdaxltccandlelist': gdaxltccandlelist,
    #            'gdaxethcandlelist': gdaxethcandlelist,
    #            'bitstampbtccandlelist': bitstampbtccandlelist,
    #            'bitstampltccandlelist': bitstampltccandlelist,
    #            'bitstampethcandlelist': bitstampethcandlelist,
    #            'gdaxbtcline': gdaxbtcline,
    #            'gdaxltcline': gdaxltcline,
    #            'gdaxethline': gdaxethline,
    #            'bitstampbtcline': bitstampbtcline,
    #            'bitstampltcline': bitstampltcline,
    #            'bitstampethline': bitstampethline,
    #            'comparisondate': comparisondate}

    return render(request, 'cleanHome.html')


# def insight(request):
#     return render(request, 'insight.html')


def insight_new(request):
    return render(request, 'insight_new.html')


#GDAX BTC candle chart of history data of last 300days
def gdax_btc_history_candle(request):
    gdaxbtccandlelist = []
    for gbtc in GDAX_BTC_history.objects.all():
        gdaxbtccandlelist.append(
            [int(datetime.datetime.strptime(str(gbtc.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
             double(gbtc.open), double(gbtc.close), double(gbtc.high), double(gbtc.low)])
    gdaxbtc_dirct = {'gdaxbtccandlelist': gdaxbtccandlelist}

    return JsonResponse(gdaxbtc_dirct)

#GDAX ETH candle chart of history data of last 300days
def gdax_eth_history_candle(request):
    gdaxethcandlelist = []
    for geth in GDAX_ETH_history.objects.all():
        gdaxethcandlelist.append(
            [int(datetime.datetime.strptime(str(geth.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
             double(geth.open), double(geth.close), double(geth.high), double(geth.low)])
    gdaxeth_dirct = {'gdaxethcandlelist': gdaxethcandlelist}

    return JsonResponse(gdaxeth_dirct)

#GDAX LTC candle chart of history data of last 300days
def gdax_ltc_history_candle(request):
    gdaxltccandlelist = []
    for gltc in GDAX_LTC_history.objects.all():
        gdaxltccandlelist.append(
            [int(datetime.datetime.strptime(str(gltc.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
             double(gltc.open), double(gltc.close), double(gltc.high), double(gltc.low)])
    gdaxltc_dirct = {'gdaxltccandlelist': gdaxltccandlelist}

    return JsonResponse(gdaxltc_dirct)


#Bitstamp BTC candle chart of history data of last 300days
def bitstamp_btc_history_candle(request):
    bitstampbtccandlelist = []
    for bbtc in Bitstamp_BTC_history.objects.all():
        bitstampbtccandlelist.append(
            [int(datetime.datetime.strptime(str(bbtc.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
             double(bbtc.open), double(bbtc.close), double(bbtc.high), double(bbtc.low)])
    bitbtc_dirct = {'bitstampbtccandlelist': bitstampbtccandlelist}

    return JsonResponse(bitbtc_dirct)

#Bitstamp ETH candle chart of history data of last 300days
def bitstamp_eth_history_candle(request):
    bitstampethcandlelist = []
    for beth in Bitstamp_ETH_history.objects.all():
        bitstampethcandlelist.append(
            [int(datetime.datetime.strptime(str(beth.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
             double(beth.open), double(beth.close), double(beth.high), double(beth.low)])
    biteth_dirct={'bitstampethcandlelist':bitstampethcandlelist}
    return JsonResponse(biteth_dirct)

#Bitstamp LTC candle chart of history data of last 300days
def bitstamp_ltc_history_candle(request):
    bitstampltccandlelist = []
    for bltc in Bitstamp_LTC_history.objects.all():
        bitstampltccandlelist.append(
            [int(datetime.datetime.strptime(str(bltc.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()),
             double(bltc.open), double(bltc.close), double(bltc.high), double(bltc.low)])
    bitltc_dirct={'bitstampltccandlelist':bitstampltccandlelist}
    return JsonResponse(bitltc_dirct)

#BTC median price comparison
# BTC median price comparison
def btc_comparison(request):
    gdaxbtcline = []
    bitstampbtcline = []
    comparisondate = []
    for gbtc in GDAX_BTC_history.objects.all():
        gdaxbtcline.append(double((gbtc.high + gbtc.low) / 2))
        comparisondate.append(
            int(datetime.datetime.strptime(str(gbtc.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()))
    for bbtc in Bitstamp_BTC_history.objects.all():
        bitstampbtcline.append(double((bbtc.high + bbtc.low) / 2))

    btccomp_dict = {'gdaxbtcline': gdaxbtcline, 'bitstampbtcline': bitstampbtcline, 'btc_compdate': comparisondate}
    return JsonResponse(btccomp_dict)


# ETH median price comparison
def eth_comparison(request):
    gdaxethline = []
    bitstampethline = []
    comparisondate = []
    for geth in GDAX_ETH_history.objects.all():
        gdaxethline.append(double((geth.high + geth.low) / 2))
        comparisondate.append(
            int(datetime.datetime.strptime(str(geth.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()))
    for beth in Bitstamp_ETH_history.objects.all():
        bitstampethline.append(double((beth.high + beth.low) / 2))

    ethcomp_dict = {'gdaxethline': gdaxethline, 'bitstampethline': bitstampethline, 'eth_compdate': comparisondate}
    return JsonResponse(ethcomp_dict)


# LTC median price comparison
def ltc_comparison(request):
    gdaxltcline = []
    bitstampltcline = []
    comparisondate = []
    for gltc in GDAX_LTC_history.objects.all():
        gdaxltcline.append(double((gltc.high + gltc.low) / 2))
        comparisondate.append(
            int(datetime.datetime.strptime(str(gltc.time).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp()))
    for bltc in Bitstamp_LTC_history.objects.all():
        bitstampltcline.append(double((bltc.high + bltc.low) / 2))

    ltccomp_dict = {'gdaxltcline': gdaxltcline, 'bitstampltcline': bitstampltcline, 'ltc_compdate': comparisondate}
    return JsonResponse(ltccomp_dict)


def getdata(request):
    GDAX_BTC_historylist = public_client.get_product_historic_rates('BTC-USD', granularity=86400)[1:]
    for d in reversed(GDAX_BTC_historylist):
        data = GDAX_BTC_history(time=datetime.datetime.fromtimestamp(d[0]),
                                low=decimal.Decimal(d[1]),
                                high=decimal.Decimal(d[2]),
                                open=decimal.Decimal(d[3]),
                                close=decimal.Decimal(d[4]),
                                volume=decimal.Decimal(d[5]))
        data.save()

    GDAX_ETH_historylist = public_client.get_product_historic_rates('ETH-USD', granularity=86400)[1:]
    for d in reversed(GDAX_ETH_historylist):
        data = GDAX_ETH_history(time=datetime.datetime.fromtimestamp(d[0]),
                                low=decimal.Decimal(d[1]),
                                high=decimal.Decimal(d[2]),
                                open=decimal.Decimal(d[3]),
                                close=decimal.Decimal(d[4]),
                                volume=decimal.Decimal(d[5]))
        data.save()

    GDAX_LTC_historylist = public_client.get_product_historic_rates('LTC-USD', granularity=86400)[1:]
    for d in reversed(GDAX_LTC_historylist):
        data = GDAX_LTC_history(time=datetime.datetime.fromtimestamp(d[0]),
                                low=decimal.Decimal(d[1]),
                                high=decimal.Decimal(d[2]),
                                open=decimal.Decimal(d[3]),
                                close=decimal.Decimal(d[4]),
                                volume=decimal.Decimal(d[5]))
        data.save()

    response = requests.get(
        'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&aggregate=1&limit=300&e=bitstamp')
    Bitstamp_BTC_historylist = response.json()
    for d in Bitstamp_BTC_historylist['Data'][1:300]:
        data = Bitstamp_BTC_history(time=datetime.datetime.fromtimestamp(d['time']),
                                    low=decimal.Decimal(d['low']),
                                    high=decimal.Decimal(d['high']),
                                    open=decimal.Decimal(d['open']),
                                    close=decimal.Decimal(d['close']),
                                    volume=decimal.Decimal(d['volumefrom']))
        data.save()

    response2 = requests.get(
        'https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&aggregate=1&limit=300&e=bitstamp')
    Bitstamp_ETH_historylist = response2.json()
    for d in Bitstamp_ETH_historylist['Data'][1:300]:
        data = Bitstamp_ETH_history(time=datetime.datetime.fromtimestamp(d['time']),
                                    low=decimal.Decimal(d['low']),
                                    high=decimal.Decimal(d['high']),
                                    open=decimal.Decimal(d['open']),
                                    close=decimal.Decimal(d['close']),
                                    volume=decimal.Decimal(d['volumefrom']))
        data.save()

    response3 = requests.get(
        'https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&aggregate=1&limit=300&e=bitstamp')
    Bitstamp_LTC_historylist = response3.json()
    for d in Bitstamp_LTC_historylist['Data'][1:300]:
        data = Bitstamp_LTC_history(time=datetime.datetime.fromtimestamp(d['time']),
                                    low=decimal.Decimal(d['low']),
                                    high=decimal.Decimal(d['high']),
                                    open=decimal.Decimal(d['open']),
                                    close=decimal.Decimal(d['close']),
                                    volume=decimal.Decimal(d['volumefrom']))
        data.save()

    return HttpResponse("get data.")

def updatedata(request):
    GDAX_BTC_historylist = public_client.get_product_historic_rates('BTC-USD', granularity=86400)[1:]
    a = GDAX_BTC_history.objects.all()[len(GDAX_BTC_history.objects.all())-1].time;
    for d in reversed(GDAX_BTC_historylist):
        if d[0]>datetime.datetime.strptime(str(a).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp():
            data = GDAX_BTC_history(time=datetime.datetime.fromtimestamp(d[0]),
                                    low=decimal.Decimal(d[1]),
                                    high=decimal.Decimal(d[2]),
                                    open=decimal.Decimal(d[3]),
                                    close=decimal.Decimal(d[4]),
                                    volume=decimal.Decimal(d[5]))
            data.save()


    GDAX_ETH_historylist = public_client.get_product_historic_rates('ETH-USD', granularity=86400)[1:]
    a = GDAX_ETH_history.objects.all()[len(GDAX_ETH_history.objects.all()) - 1].time;
    for d in reversed(GDAX_ETH_historylist):
        if d[0] > datetime.datetime.strptime(str(a).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp():
            data = GDAX_ETH_history(time=datetime.datetime.fromtimestamp(d[0]),
                                    low=decimal.Decimal(d[1]),
                                    high=decimal.Decimal(d[2]),
                                    open=decimal.Decimal(d[3]),
                                    close=decimal.Decimal(d[4]),
                                    volume=decimal.Decimal(d[5]))
            data.save()

    GDAX_LTC_historylist = public_client.get_product_historic_rates('LTC-USD', granularity=86400)[1:]
    a = GDAX_LTC_history.objects.all()[len(GDAX_LTC_history.objects.all()) - 1].time;
    for d in reversed(GDAX_LTC_historylist):
        if d[0] > datetime.datetime.strptime(str(a).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp():
            data = GDAX_LTC_history(time=datetime.datetime.fromtimestamp(d[0]),
                                    low=decimal.Decimal(d[1]),
                                    high=decimal.Decimal(d[2]),
                                    open=decimal.Decimal(d[3]),
                                    close=decimal.Decimal(d[4]),
                                    volume=decimal.Decimal(d[5]))
            data.save()

    response = requests.get(
        'https://min-api.cryptocompare.com/data/histoday?fsym=BTC&tsym=USD&aggregate=1&limit=300&e=bitstamp')
    Bitstamp_BTC_historylist = response.json()
    a = Bitstamp_BTC_history.objects.all()[len(Bitstamp_BTC_history.objects.all()) - 1].time;
    for d in Bitstamp_BTC_historylist['Data'][1:300]:
        if d['time'] > datetime.datetime.strptime(str(a).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp():
            data = Bitstamp_BTC_history(time=datetime.datetime.fromtimestamp(d['time']),
                                        low=decimal.Decimal(d['low']),
                                        high=decimal.Decimal(d['high']),
                                        open=decimal.Decimal(d['open']),
                                        close=decimal.Decimal(d['close']),
                                        volume=decimal.Decimal(d['volumefrom']))
            data.save()

    response2 = requests.get(
        'https://min-api.cryptocompare.com/data/histoday?fsym=ETH&tsym=USD&aggregate=1&limit=300&e=bitstamp')
    Bitstamp_ETH_historylist = response2.json()
    a = Bitstamp_ETH_history.objects.all()[len(Bitstamp_ETH_history.objects.all()) - 1].time;
    for d in Bitstamp_ETH_historylist['Data'][1:300]:
        if d['time'] > datetime.datetime.strptime(str(a).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp():
            data = Bitstamp_ETH_history(time=datetime.datetime.fromtimestamp(d['time']),
                                        low=decimal.Decimal(d['low']),
                                        high=decimal.Decimal(d['high']),
                                        open=decimal.Decimal(d['open']),
                                        close=decimal.Decimal(d['close']),
                                        volume=decimal.Decimal(d['volumefrom']))
            data.save()

    response3 = requests.get(
        'https://min-api.cryptocompare.com/data/histoday?fsym=LTC&tsym=USD&aggregate=1&limit=300&e=bitstamp')
    Bitstamp_LTC_historylist = response3.json()
    a = Bitstamp_LTC_history.objects.all()[len(Bitstamp_LTC_history.objects.all()) - 1].time;
    for d in Bitstamp_LTC_historylist['Data'][1:300]:
        if d['time'] > datetime.datetime.strptime(str(a).split('+')[0], '%Y-%m-%d %H:%M:%S').timestamp():
            data = Bitstamp_LTC_history(time=datetime.datetime.fromtimestamp(d['time']),
                                        low=decimal.Decimal(d['low']),
                                        high=decimal.Decimal(d['high']),
                                        open=decimal.Decimal(d['open']),
                                        close=decimal.Decimal(d['close']),
                                        volume=decimal.Decimal(d['volumefrom']))
            data.save()

        return HttpResponse("update data.")
