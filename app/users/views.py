from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from .models import User, UserInterest, SavedArticle
from .serializers import UserRegisterSerializer, UserProfileSerializer


class UserRegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserRegisterSerializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            return Response({'id': user.id, 'username': user.username}, status=201)
        return Response(serializer.errors, status=400)


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            from django.contrib.auth import login
            login(request, user)
            return Response({'detail': 'OK'})
        return Response({'error': 'Неверные данные'}, status=401)


class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data)

    def patch(self, request):
        serializer = UserProfileSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=400)


class UserInterestView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        category_id = request.data.get('category_id')
        if not category_id:
            return Response({'error': 'category_id required'}, status=400)
        interest, created = UserInterest.objects.get_or_create(
            user=request.user,
            interest_id=category_id
        )
        if not created:
            return Response({'detail': 'Уже добавлен'}, status=400)
        return Response({'detail': 'Добавлен'}, status=201)

    def delete(self, request):
        category_id = request.data.get('category_id')
        deleted, _ = UserInterest.objects.filter(
            user=request.user,
            interest_id=category_id
        ).delete()
        if deleted:
            return Response({'detail': 'Удалён'})
        return Response({'error': 'Не найден'}, status=404)


class SavedArticleView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        article_id = request.data.get('article_id')
        if not article_id:
            return Response({'error': 'article_id required'}, status=400)
        saved, created = SavedArticle.objects.get_or_create(
            user=request.user,
            article_id=article_id
        )
        if not created:
            return Response({'detail': 'Уже сохранена'}, status=400)
        return Response({'detail': 'Сохранена'}, status=201)

    def delete(self, request):
        article_id = request.data.get('article_id')
        deleted, _ = SavedArticle.objects.filter(
            user=request.user,
            article_id=article_id
        ).delete()
        if deleted:
            return Response({'detail': 'Удалена'})
        return Response({'error': 'Не найдена'}, status=404)