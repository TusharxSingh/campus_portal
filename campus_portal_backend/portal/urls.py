from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import user_info
from .views import TeacherViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'teachers', TeacherViewSet)
urlpatterns = [
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),  # JWT login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),  # JWT refresh
    path('user-info/', user_info, name='user_info'),
    path('', include(router.urls)),  
]
