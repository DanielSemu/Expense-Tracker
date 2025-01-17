from django.db import models # type: ignore

from django.contrib.auth.models import User 
# Create your models here.

from django.db import models

class Category(models.Model):
    CATEGORY_TYPE_CHOICES = [
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]

    name = models.CharField(max_length=100)  # Category name (e.g., "Food", "Salary")
    category_type = models.CharField(
        max_length=7, 
        choices=CATEGORY_TYPE_CHOICES, 
        default='expense'
    )  # Category type - can be income or expense
    user = models.ForeignKey(
        User, 
        on_delete=models.CASCADE, 
        related_name='categories'
    )  # Link each category to a user, so each user has their own categories

    def __str__(self):
        return f"{self.name} ({self.get_category_type_display()})"

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'





