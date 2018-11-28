from django.db import models


class GDAX_BTC_history(models.Model):
    time = models.DateTimeField(auto_now=False, auto_now_add=False)
    low = models.DecimalField(max_digits=10, decimal_places=3)
    high = models.DecimalField(max_digits=10, decimal_places=3)
    open = models.DecimalField(max_digits=10, decimal_places=3)
    close = models.DecimalField(max_digits=10, decimal_places=3)
    volume = models.DecimalField(max_digits=10, decimal_places=3)

    def __str__(self):
        return '%s' % self.time

    class Meta:
        db_table = "data_GDAX_BTC_history"


class GDAX_ETH_history(models.Model):
    time = models.DateTimeField(auto_now=False, auto_now_add=False)
    low = models.DecimalField(max_digits=10, decimal_places=3)
    high = models.DecimalField(max_digits=10, decimal_places=3)
    open = models.DecimalField(max_digits=10, decimal_places=3)
    close = models.DecimalField(max_digits=10, decimal_places=3)
    volume = models.DecimalField(max_digits=10, decimal_places=3)

    def __str__(self):
        return '%s' % self.time

    class Meta:
        db_table = "data_GDAX_ETH_history"


class GDAX_LTC_history(models.Model):
    time = models.DateTimeField(auto_now=False, auto_now_add=False)
    low = models.DecimalField(max_digits=10, decimal_places=3)
    high = models.DecimalField(max_digits=10, decimal_places=3)
    open = models.DecimalField(max_digits=10, decimal_places=3)
    close = models.DecimalField(max_digits=10, decimal_places=3)
    volume = models.DecimalField(max_digits=10, decimal_places=3)

    def __str__(self):
        return '%s' % self.time

    class Meta:
        db_table = "data_GDAX_LTC_history"


class Bitstamp_BTC_history(models.Model):
    time = models.DateTimeField(auto_now=False, auto_now_add=False)
    low = models.DecimalField(max_digits=10, decimal_places=3)
    high = models.DecimalField(max_digits=10, decimal_places=3)
    open = models.DecimalField(max_digits=10, decimal_places=3)
    close = models.DecimalField(max_digits=10, decimal_places=3)
    volume = models.DecimalField(max_digits=10, decimal_places=3)

    def __str__(self):
        return '%s' % self.time

    class Meta:
        db_table = "data_Bitstamp_BTC_history"


class Bitstamp_ETH_history(models.Model):
    time = models.DateTimeField(auto_now=False, auto_now_add=False)
    low = models.DecimalField(max_digits=10, decimal_places=3)
    high = models.DecimalField(max_digits=10, decimal_places=3)
    open = models.DecimalField(max_digits=10, decimal_places=3)
    close = models.DecimalField(max_digits=10, decimal_places=3)
    volume = models.DecimalField(max_digits=10, decimal_places=3)

    def __str__(self):
        return '%s' % self.time

    class Meta:
        db_table = "data_Bitstamp_ETH_history"


class Bitstamp_LTC_history(models.Model):
    time = models.DateTimeField(auto_now=False, auto_now_add=False)
    low = models.DecimalField(max_digits=10, decimal_places=3)
    high = models.DecimalField(max_digits=10, decimal_places=3)
    open = models.DecimalField(max_digits=10, decimal_places=3)
    close = models.DecimalField(max_digits=10, decimal_places=3)
    volume = models.DecimalField(max_digits=10, decimal_places=3)

    def __str__(self):
        return '%s' % self.time

    class Meta:
        db_table = "data_Bitstamp_LTC_history"
        
        
# ##-------------------------------------------------------------------------------
# #Bitstamp data
# class Bitstamp_BTC_history_new(models.Model):
#     time = models.DateTimeField(auto_now=False, auto_now_add=False)
#     high = models.DecimalField(max_digits=19, decimal_places=3)
#     low = models.DecimalField(max_digits=19, decimal_places=3)
#     open = models.DecimalField(max_digits=19, decimal_places=3)
#     close = models.DecimalField(max_digits=19, decimal_places=3)
#     volumefrom = models.DecimalField(max_digits=19, decimal_places=3)
#     volumeto = models.DecimalField(max_digits=19, decimal_places=3)
#     def __str__(self):
#         return '%s' % self.time
#
#     class Meta:
#         db_table = "Bitstamp_BTC_history_new"
#
# class Bitstamp_ETHER_history(models.Model):
#     time = models.DateTimeField(auto_now=False, auto_now_add=False)
#     high = models.DecimalField(max_digits=19, decimal_places=3)
#     low = models.DecimalField(max_digits=19, decimal_places=3)
#     open = models.DecimalField(max_digits=19, decimal_places=3)
#     close = models.DecimalField(max_digits=19, decimal_places=3)
#     volumefrom = models.DecimalField(max_digits=19, decimal_places=3)
#     volumeto = models.DecimalField(max_digits=19, decimal_places=3)
#     def __str__(self):
#         return '%s' % self.time
#
#     class Meta:
#         db_table = "Bitstamp_ETHER_history"
#
#
# class Bitstamp_LITECOIN_history(models.Model):
#     time = models.DateTimeField(auto_now=False, auto_now_add=False)
#     high = models.DecimalField(max_digits=19, decimal_places=3)
#     low = models.DecimalField(max_digits=19, decimal_places=3)
#     open = models.DecimalField(max_digits=19, decimal_places=3)
#     close = models.DecimalField(max_digits=19, decimal_places=3)
#     volumefrom = models.DecimalField(max_digits=19, decimal_places=3)
#     volumeto = models.DecimalField(max_digits=19, decimal_places=3)
#     def __str__(self):
#         return '%s' % self.time
#
#     class Meta:
#         db_table = "Bitstamp_LITECOIN_history"
# #--------------------------------------------------------------------------

class priceChart(models.Model):
    p_title = models.CharField(max_length=20)
    p_shape = models.CharField(max_length=20)
    p_time_unit = models.CharField(max_length=20)
    p_price = models.DecimalField(max_digits=19, decimal_places=2)
    p_Time = models.DateTimeField()
    p_highest = models.DecimalField(max_digits=19, decimal_places=2)
    p_lowest = models.DecimalField(max_digits=19, decimal_places=2)
    p_volume = models.IntegerField()
    p_open = models.DecimalField(max_digits=19, decimal_places=2)
    p_close = models.DecimalField(max_digits=19, decimal_places=2)

    class Meta:
        db_table = "data_price_chart"

    def __str__(self):
            return self.p_title


class latestPrice(models.Model):
    time = models.DateTimeField(auto_now=False, auto_now_add=False)
    price = models.DecimalField(max_digits=19, decimal_places=2)

    class Meta:
        db_table ="data_latest_trading_price"

    def __str__(self):
        return self.price
