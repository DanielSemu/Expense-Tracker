from django.urls import path
from .views import CategoryView,ExpenseView
urlpatterns = [
    path('category/', CategoryView.as_view(), name='category-list-create'),
    path('category/<int:pk>/', CategoryView.as_view(), name='category-detail'),
    path('expenses/', ExpenseView.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseView.as_view(), name='expense-detail'),
   
]
