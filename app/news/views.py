from rest_framework import generics
from rest_framework.response import Response
from .models import News
from .serializers import NewsDetailSerializer, NewsListSerializer


class NewsDetailView(generics.RetrieveAPIView):
    queryset = News.objects.all()
    serializer_class = NewsDetailSerializer


class NewsListView(generics.ListAPIView):
    serializer_class = NewsListSerializer

    def get_queryset(self):
        queryset = News.objects.all().order_by('-created_at')
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__id=category)
        return queryset