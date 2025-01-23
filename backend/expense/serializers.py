from rest_framework import serializers

from .models import Category,Expense,Income, Budget, Transaction, RecurringExpense, Settings

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'category_type', 'user']  # Include fields to be serialized
        read_only_fields = ['user']  # The user is set from the request and not from input




class ExpenseSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = Expense
        fields = '__all__'  # Include all fields to be serialized
        read_only_fields = ['user', 'date']  # These fields are set automatically



class IncomeSerializer(serializers.ModelSerializer):
    category = serializers.StringRelatedField()
    class Meta:
        model = Income
        fields = ['id', 'user', 'amount', 'source', 'description', 'date']
        read_only_fields = ['user', 'date']


class BudgetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Budget
        fields = ['id', 'user', 'category', 'limit', 'start_date', 'end_date']
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
