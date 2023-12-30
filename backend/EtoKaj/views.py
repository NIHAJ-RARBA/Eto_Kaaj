from django.shortcuts import render
from rest_framework import viewsets
from .serializers import DBSerializer
from .models import EtoKaj

# Create your views here.
class ApiView(viewsets.ModelViewSet):
    queryset = EtoKaj.objects.all()
    serializer_class = DBSerializer