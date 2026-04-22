from django.db import models
from app.categories.models import Category
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    full_name = models.CharField(max_length=255)
    image = models.ImageField(upload_to='images/users/', null=True, blank=True)
    email = models.EmailField(unique=True)
    is_agreed_to_terms = models.BooleanField(default=False)

    def __str__(self):
        return self.username

    class Meta:
        verbose_name = "Пользователь"
        verbose_name_plural = "Пользователи"


class UserInterest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='interests')
    interest = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = "Интерес"
        verbose_name_plural = "Интересы"


class SavedArticle(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='saved_articles')
    article = models.ForeignKey('news.News', on_delete=models.CASCADE)

    def __str__(self):
        return self.user.username

    class Meta:
        verbose_name = "Сохраненная статья"
        verbose_name_plural = "Сохраненные статьи"