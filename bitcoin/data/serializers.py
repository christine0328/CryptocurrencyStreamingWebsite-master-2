from rest_framework import serializers
import data.models

class dataSerializer(serializers.ModelSerializer):
    class Meta:
        model = Data
        fields = '__all__'

