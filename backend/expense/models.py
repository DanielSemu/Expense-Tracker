from django.db import models  # Remove the second import
from django.contrib.auth.models import User 

class Category(models.Model):
    CATEGORY_TYPE_CHOICES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]

    name = models.CharField(max_length=100)
    category_type = models.CharField(
        max_length=7,
        choices=CATEGORY_TYPE_CHOICES,
        default='expense'
    )
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='categories'
    )

    def __str__(self):
        return f"{self.name} ({self.get_category_type_display()})"

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'



class Expense(models.Model):
    user=models.ForeignKey(User, on_delete=models.CASCADE)
    category=models.ForeignKey(Category, on_delete=models.CASCADE) #expense Category
    expense=models.CharField(max_length=255, null=False, blank=False)
    amount=models.DecimalField(max_digits=10, decimal_places=2)
    date=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.expense} {self.amount} - {self.category.name} "
    
class Income(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    source=models.ForeignKey(Category,on_delete=models.CASCADE) #income Category
    amount=models.DecimalField(max_digits=10,decimal_places=2)
    description=models.TextField(max_length=255,null=True, blank=True)
    date=models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.amount} - {self.source.name} ({self.date})"
    
class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return f"Budget for {self.category.name} - {self.limit}"
    
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expense = models.ForeignKey(Expense, null=True, blank=True, on_delete=models.SET_NULL)
    income = models.ForeignKey(Income, null=True, blank=True, on_delete=models.SET_NULL)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        if self.expense:
            return f"Expense: {self.expense.amount} - {self.expense.category.name}"
        if self.income:
            return f"Income: {self.income.amount} - {self.income.source}"
        return f"Transaction on {self.date}"
    
    
class RecurringExpense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    interval = models.CharField(max_length=50)  # e.g., 'monthly', 'yearly'
    next_due_date = models.DateTimeField()
    
    def __str__(self):
        return f"Recurring expense: {self.amount} - {self.category.name} ({self.interval})"



class Settings(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    preferred_currency = models.CharField(max_length=10, default="USD")
    language = models.CharField(max_length=50, default="English")

    def __str__(self):
        return f"Settings for {self.user.username}"


