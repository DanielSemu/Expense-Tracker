from django.urls import path
from .views import CategoryView,ExpenseView,TransactionView,IncomeView,BudgetView
urlpatterns = [
    path('category/', CategoryView.as_view(), name='category-list-create'),
    path('category/<int:pk>/', CategoryView.as_view(), name='category-detail'),
    path('budget/', BudgetView.as_view(), name='budget-list-create'),
    path('budget/<int:pk>/', BudgetView.as_view(), name='budget-detail'),
    path('expenses/', ExpenseView.as_view(), name='expense-list-create'),
    path('expenses/<int:pk>/', ExpenseView.as_view(), name='expense-detail'),
    path('incomes/', IncomeView.as_view(), name='income-list-create'),
    path('incomes/<int:pk>/', IncomeView.as_view(), name='income-detail'),
    path('transaction/', TransactionView.as_view(), name='transaction-list-create'),
    path('transaction/<int:pk>/', TransactionView.as_view(), name='transaction-detail'),
]
