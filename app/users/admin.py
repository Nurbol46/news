from django.contrib import admin
from .models import Category, User, UserInterest  # Импортируем твои модели

# Регистрируем Категории
@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    list_display = ('id', 'name')
    search_fields = ('name',)

# Регистрируем Юзеров (чтобы видеть их в админке)
@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('username', 'email', 'full_name')

# Регистрируем Интересы (чтобы видеть, кто что выбрал)
@admin.register(UserInterest)
class UserInterestAdmin(admin.ModelAdmin):
    list_display = ('user', 'interest')