from rest_framework import generics
from .models import Category
from .serializers import CategorySerializer


class CategoryListCreateView(generics.ListCreateAPIView):
    """
    get:
    Список категорий.
    Возвращает все категории.

    post:
    Создать категорию.
    Создаёт новую категорию.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.all()


class CategoryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    """
    get:
    Получить категорию.
    Возвращает категорию по ID.

    put:
    Обновить категорию.
    Обновляет категорию по ID.

    delete:
    Удалить категорию.
    Удаляет категорию по ID.
    """
    serializer_class = CategorySerializer
    queryset = Category.objects.all()