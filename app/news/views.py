from rest_framework import generics
from .models import News
from .serializers import NewsDetailSerializer, NewsListSerializer


class NewsListView(generics.ListAPIView):
    serializer_class = NewsListSerializer

    def get_queryset(self):
        queryset = News.objects.all().order_by('-created_at')
        
        category = self.request.query_params.get('category')
        search = self.request.query_params.get('search')
        personalized = self.request.query_params.get('personalized')

        if personalized and self.request.user.is_authenticated:
            user_interests = self.request.user.interests.values_list('interest_id', flat=True)
            queryset = queryset.filter(category_id__in=user_interests)

        if category:
            queryset = queryset.filter(category__id=category)
        
        if search:
            queryset = queryset.filter(title__icontains=search)
            
        return queryset


class NewsDetailView(generics.RetrieveAPIView):
    """
    get:
    Детальная новость.
    Возвращает полную информацию об одной новости по ID.
    """
    queryset = News.objects.all()
    serializer_class = NewsDetailSerializer