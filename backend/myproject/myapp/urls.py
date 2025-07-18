from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClientViewSet, login

router = DefaultRouter()
router.register(r'clients', ClientViewSet, basename='client')

urlpatterns = [
    path('login/', login, name='login'),
    path('', include(router.urls)),  # includes /clients/ endpoints
]
