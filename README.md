# News Backend API

REST API для новостного портала «The Modern Curator» на Django REST Framework.

## Стек
Backend
- Python 3.13
- Django 6.0
- Django REST Framework
- SQLite
- Pillow
- django-cors-headers
- drf-yasg

Frontend
- Node.js 25.9.0
- React.js 19.2.5
- TypeScript 6.0.3
- Vite

## Документация API

| Интерфейс | URL |
|-----------|-----|
| Swagger UI | http://127.0.0.1:8000/swagger/ |
| ReDoc | http://127.0.0.1:8000/redoc/ |

## Установка

```bash
git clone https://github.com/Nurbol46/news.git
cd news
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py runserver
```

## Переменные окружения

Скопируй `.env.example` в `.env` и заполни:

```env
SECRET_KEY=your-secret-key
DEBUG=True
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:3000
```

## API Endpoints

### Users
| Метод | URL | Описание |
|-------|-----|----------|
| POST | `/users/register/` | Регистрация |
| POST | `/users/login/` | Логин |
| GET / PATCH | `/users/profile/` | Профиль / Обновить |
| POST / DELETE | `/users/interests/` | Добавить/удалить интерес |
| POST / DELETE | `/users/saved/` | Сохранить/удалить статью |

### News
| Метод | URL | Описание |
|-------|-----|----------|
| GET | `/news/` | Список новостей |
| GET | `/news/?category=1` | Фильтрация по категории |
| GET | `/news/<id>/` | Детальная новость |

### Categories
| Метод | URL | Описание |
|-------|-----|----------|
| GET / POST | `/categories/` | Список / Создать |
| GET / PUT / DELETE | `/categories/<id>/` | Получить / Обновить / Удалить |

## Примеры запросов

### Регистрация
```bash
curl -X POST http://127.0.0.1:8000/users/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@test.com",
    "password": "12345678",
    "full_name": "Test User",
    "is_agreed_to_terms": true
  }'
```

### Логин
```bash
curl -X POST http://127.0.0.1:8000/users/login/ \
  -H "Content-Type: application/json" \
  -d '{"username": "testuser", "password": "12345678"}' \
  -c cookies.txt
```

### Профиль
```bash
curl http://127.0.0.1:8000/users/profile/ -b cookies.txt
```

## Структура проекта

```
news_backend_1/
├── app/
│   ├── categories/
│   ├── news/
│   └── users/
├── config/
│   ├── settings.py
│   └── urls.py
├── .env
├── .env.example
├── .gitignore
├── manage.py
└── README.md
```
