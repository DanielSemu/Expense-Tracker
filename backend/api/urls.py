from django.urls import path
from .views import UserProfileView,RegisterUserView

urlpatterns = [
    path('profile/', UserProfileView.as_view(), name='user_profile'),
    path('register/',RegisterUserView.as_view(), name='register_user')
]
