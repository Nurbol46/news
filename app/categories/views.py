from django.shortcuts import render
from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer


class CategoryListCreateView(generics.ListCreateAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = CategorySerializer
    queryset = Category.objects.all()

# Create your views here.
