from rest_framework import serializers
from .models import User, UserInterest, SavedArticle
from app.categories.serializers import CategorySerializer

class UserLoginSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'full_name']


class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'full_name', 'is_agreed_to_terms']
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserInterestSerializer(serializers.ModelSerializer):
    interest_id = serializers.ReadOnlyField(source='interest.id')
    interest_name = serializers.ReadOnlyField(source='interest.name')

    class Meta:
        model = UserInterest
        fields = ['interest_id', 'interest_name']


class SavedArticleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedArticle
        fields = ['article']


class UserProfileSerializer(serializers.ModelSerializer):

    interests = UserInterestSerializer(many=True, read_only=True)
    saved_articles = SavedArticleSerializer(many=True, read_only=True)
    class Meta:
        model = User
        fields = ['username', 'full_name', 'image', 'email', 'interests', 'is_agreed_to_terms', 'saved_articles']


