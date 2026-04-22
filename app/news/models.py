from django.db import models
from app.categories.models import Category

class News(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE, verbose_name="Пользователь")
    title = models.CharField("Заголовок", max_length=255)
    content = models.TextField("Контент")
    category = models.ForeignKey(Category, on_delete=models.PROTECT, verbose_name="Категория")
    image = models.ImageField("Изображение", upload_to="images/news/")
    created_at = models.DateTimeField("Дата создания", auto_now_add=True)
    updated_at = models.DateTimeField("Дата обновления", auto_now=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name = "Новость"
        verbose_name_plural = "Новости"
