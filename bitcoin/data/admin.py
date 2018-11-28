'''
Edited by Ziqi Yang 12/04/2018
'''
from django.contrib import admin

from .models import *


admin.site.register(GDAX_BTC_history)
admin.site.register(priceChart)
admin.site.register(latestPrice)
