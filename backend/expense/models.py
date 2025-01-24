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
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    expense = models.CharField(max_length=255, null=False, blank=False)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)  # Expense category
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(max_length=255, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.expense} {self.amount} - {self.category.name}"

    def save(self, *args, **kwargs):
        # Create or update a related Transaction
        super().save(*args, **kwargs)
        transaction, created = Transaction.objects.update_or_create(
            expense=self,  # Link to the expense
            defaults={
                'name': self.expense,
                'amount': self.amount,
                'date': self.date.date(),
                'category': self.category,
                'user': self.user,
            }
        )

    def delete(self, *args, **kwargs):
        # Delete the related Transaction when deleting an Expense
        if hasattr(self, 'transaction'):
            self.transaction.delete()
        super().delete(*args, **kwargs)


class Income(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    source = models.CharField(max_length=100)  # income Category
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    description = models.TextField(max_length=255, null=True, blank=True)
    date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.amount} - {self.source} ({self.date})"

    def save(self, *args, **kwargs):
        # Save the Income object
        super().save(*args, **kwargs)

        # Create or update the related Transaction
        transaction, created = Transaction.objects.update_or_create(
            income=self,  # Correct link to income
            defaults={
                'name': self.source,
                'amount': self.amount,
                'date': self.date.date(),  # Use only the date portion
                'category': self.category,
                'user': self.user,
            }
        )

    def delete(self, *args, **kwargs):
        # Delete the related Transaction when deleting Income
        Transaction.objects.filter(income=self).delete()
        super().delete(*args, **kwargs)

class Transaction(models.Model):
    # Fields for linking with Expense and Income
    expense = models.OneToOneField(
        'expense.Expense', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True
    )
    income = models.OneToOneField(
        'Income', 
        on_delete=models.CASCADE, 
        null=True, 
        blank=True
    )
    
    # Other transaction details
    name = models.CharField(max_length=255)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    date = models.DateField()
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name} - {self.amount}"


class Budget(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    limit = models.DecimalField(max_digits=10, decimal_places=2)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()

    def __str__(self):
        return f"Budget for {self.category.name} - {self.limit}"    
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


