from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static
from django.conf import settings


urlpatterns = [
    path('admin/', admin.site.urls),
    path('users/', include('app.users.urls')),
    path('news/', include('app.news.urls')),
    path('categories/', include('app.categories.urls')),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
