from rest_framework import generics
from .models import News
from .serializers import NewsDetailSerializer, NewsListSerializer


class NewsListView(generics.ListAPIView):
    """
    get:
    Список новостей.
    Возвращает список всех новостей. Фильтрация по категории через ?category=1.
    """
    serializer_class = NewsListSerializer

    def get_queryset(self):
        queryset = News.objects.all().order_by('-created_at')
        category = self.request.query_params.get('category')
        if category:
            queryset = queryset.filter(category__id=category)
        return queryset


class NewsDetailView(generics.RetrieveAPIView):
    """
    get:
    Детальная новость.
    Возвращает полную информацию об одной новости по ID.
    """
    queryset = News.objects.all()
    serializer_class = NewsDetailSerializer