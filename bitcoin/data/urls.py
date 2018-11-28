from django.urls import path

from . import views

urlpatterns = [
    path('realtime', views.realtime, name='realtime'),
    path('history', views.history, name='history'),
    path('btccompare', views.btc_comparison, name='btccompare'),
    path('ethcompare',views.eth_comparison, name='ethcompare'),
    path('ltccompare',views.ltc_comparison, name='ltccompare'),
    path('gdaxbtccandle',views.gdax_btc_history_candle, name='gdaxbtccandle'),
    path('gdaxethcandle',views.gdax_eth_history_candle, name='gdaxethcandle'),
    path('gdaxltccandle', views.gdax_ltc_history_candle, name='gdaxltccandle'),
    path('bitstampbtccandle', views.bitstamp_btc_history_candle, name='bitstampbtccandle'),
    path('bitstampethcandle', views.bitstamp_eth_history_candle, name='bitstampethcandle'),
    path('bitstampltccandle', views.bitstamp_ltc_history_candle, name='bitstampltccandle'),
    path("getdata", views.getdata, name = 'getdata'),
    path("updatedata", views.updatedata, name = 'updatedata'),
    path('home', views.home, name='home'),
    #path('insight', views.insight, name='insight'),
    path('insight_new', views.insight_new, name='insight_new'),
]


