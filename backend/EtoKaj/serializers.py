from rest_framework import serializers
from .models import EtoKaj

class DBSerializer(serializers.ModelSerializer):
    class Meta:
        model = EtoKaj
        fields = '__all__'