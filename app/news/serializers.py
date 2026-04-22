from rest_framework import serializers
from .models import News

class NewsListSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    author = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = News
        fields = ['id', 'title', 'content', 'image', 'category', 'category_name', 'author', 'created_at']

class NewsDetailSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    author = serializers.CharField(source='user.full_name', read_only=True)

    class Meta:
        model = News
        fields = '__all__'