from rest_framework import serializers

from .models import Category,Expense,Income, Budget, Transaction, RecurringExpense, Settings

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'category_type', 'user']  # Include fields to be serialized
        read_only_fields = ['user']  # The user is set from the request and not from input




class ExpenseSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_id = serializers.IntegerField(source="category.id", read_only=True)

    class Meta:
        model = Expense
        fields = ['id', 'user', 'expense', 'category_name', 'category_id', 'amount', 'description', 'date']
        read_only_fields = ['user', 'date']  # These fields are set automatically



class IncomeSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_id = serializers.IntegerField(source="category.id", read_only=True)
    class Meta:
        model = Income
        fields = ['id', 'user', 'source', 'category_name', 'category_id', 'amount', 'description', 'date']
        read_only_fields = ['user', 'date']  # These fields are set automatically


class BudgetSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_id = serializers.IntegerField(source="category.id", read_only=True)
    class Meta:
        model = Budget
        fields = ['id', 'user','category_id','category_name', 'limit', 'start_date', 'end_date']
        read_only_fields = ['user']


class TransactionSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['user', 'date']


class RecurringExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = RecurringExpense
        fields = ['id', 'user', 'category', 'amount', 'interval', 'next_due_date']
        read_only_fields = ['user']


class SettingsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Settings
        fields = ['id', 'user', 'preferred_currency', 'language']
        read_only_fields = ['user']
