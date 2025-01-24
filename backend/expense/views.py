from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.permissions import IsAuthenticated,AllowAny # type: ignore
from rest_framework import status # type: ignore
from .serializers import CategorySerializer,ExpenseSerializer,IncomeSerializer, BudgetSerializer, TransactionSerializer, RecurringExpenseSerializer, SettingsSerializer
from rest_framework.exceptions import NotFound

from .models import Expense,Category,Income, Budget, Transaction, RecurringExpense, Settings


class CategoryView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        categories = Category.objects.filter(user=request.user)
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = CategorySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        category_id = kwargs.get('pk')
        try:
            category = Category.objects.get(id=category_id, user=request.user)
        except Category.DoesNotExist:
            return Response({"error": "Category not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = CategorySerializer(category, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        category_id = kwargs.get('pk')
        try:
            category = Category.objects.get(id=category_id, user=request.user)
            category.delete()
            return Response({"message": "Category deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Category.DoesNotExist:
            return Response({"error": "Category not found."}, status=status.HTTP_404_NOT_FOUND)

class ExpenseView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        # Filter expenses by the authenticated user
        expenses = Expense.objects.filter(user=request.user)
        serializer = ExpenseSerializer(expenses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        # Ensure category belongs to 'expense' type
        category_id = request.data.get('category')
        try:
            category = Category.objects.get(id=category_id, category_type='expense')
        except Category.DoesNotExist:
            return Response({"error": "Invalid category for expense."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate and create the expense
        serializer = ExpenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, category=category)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        expense_id = kwargs.get('pk')
        try:
            expense = Expense.objects.get(id=expense_id, user=request.user)
        except Expense.DoesNotExist:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)

        # Ensure category belongs to 'expense' type
        category_id = request.data.get('category', expense.category.id)
        try:
            category = Category.objects.get(id=category_id, category_type='expense')
        except Category.DoesNotExist:
            return Response({"error": "Invalid category for expense."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate and update the expense
        serializer = ExpenseSerializer(expense, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(category=category)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        expense_id = kwargs.get('pk')
        try:
            expense = Expense.objects.get(id=expense_id, user=request.user)
            expense.delete()
            return Response({"message": "Expense deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Expense.DoesNotExist:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)
class IncomeView(APIView):
    permission_classes=[IsAuthenticated]

    def get(self, request, *args, **kwargs):
        income=Income.objects.filter(user=request.user)
        serializer=IncomeSerializer(income, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def post(self, request, *args, **kwargs):
        # Ensure category belongs to 'expense' type
        category_id = request.data.get('category')
        try:
            category = Category.objects.get(id=category_id, category_type='income')
        except Category.DoesNotExist:
            return Response({"error": "Invalid category for income."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate and create the expense
        serializer = IncomeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, category=category)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, *args, **kwargs):
        income_id=kwargs.get("pk")
        try:
            income=Income.objects.get(id=income_id,user=request.user )
        except:
            return Response({"error":"Income Not Found"}, status=status.HTTP_4004_NOT_FOUND)

        # Ensure category belongs to 'income' type
        category_id = request.data.get('category', income.category.id)
        try:
            category = Category.objects.get(id=category_id, category_type='income')
        except Category.DoesNotExist:
            return Response({"error": "Invalid category for Income."}, status=status.HTTP_400_BAD_REQUEST)

        # Validate and update the expense
        serializer = ExpenseSerializer(income, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save(category=category)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        income_id = kwargs.get('pk')
        try:
            income = Income.objects.get(id=income_id, user=request.user)
            income.delete()
            return Response({"message": "Income deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Income.DoesNotExist:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)




class BudgetView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        budgets = Budget.objects.filter(user=request.user)
        serializer = BudgetSerializer(budgets, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = BudgetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        budget_id = kwargs.get('pk')
        try:
            budget = Budget.objects.get(id=budget_id, user=request.user)
        except Budget.DoesNotExist:
            return Response({"error": "Budget not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = BudgetSerializer(budget, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        budget_id = kwargs.get('pk')
        try:
            budget = Budget.objects.get(id=budget_id, user=request.user)
            budget.delete()
            return Response({"message": "Budget deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Budget.DoesNotExist:
            return Response({"error": "Budget not found."}, status=status.HTTP_404_NOT_FOUND)


class TransactionView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        if transaction_id := kwargs.get('id'):
            try:
                transaction = Transaction.objects.get(id=transaction_id, user=request.user)
            except Transaction.DoesNotExist as e:
                raise NotFound("Transaction not found.") from e
            serializer = TransactionSerializer(transaction)
            return Response(serializer.data, status=status.HTTP_200_OK)

        # If 'id' is not provided, fetch all transactions for the user
        transactions = Transaction.objects.filter(user=request.user)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        transaction_id = kwargs.get('pk')
        try:
            transaction = Transaction.objects.get(id=transaction_id, user=request.user)
            transaction.delete()
            return Response({"message": "Transaction deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except Transaction.DoesNotExist:
            return Response({"error": "Transaction not found."}, status=status.HTTP_404_NOT_FOUND)


class RecurringExpenseView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        recurring_expenses = RecurringExpense.objects.filter(user=request.user)
        serializer = RecurringExpenseSerializer(recurring_expenses, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request, *args, **kwargs):
        serializer = RecurringExpenseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        recurring_expense_id = kwargs.get('pk')
        try:
            recurring_expense = RecurringExpense.objects.get(id=recurring_expense_id, user=request.user)
        except RecurringExpense.DoesNotExist:
            return Response({"error": "Recurring expense not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = RecurringExpenseSerializer(recurring_expense, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        recurring_expense_id = kwargs.get('pk')
        try:
            recurring_expense = RecurringExpense.objects.get(id=recurring_expense_id, user=request.user)
            recurring_expense.delete()
            return Response({"message": "Recurring expense deleted successfully."}, status=status.HTTP_204_NO_CONTENT)
        except RecurringExpense.DoesNotExist:
            return Response({"error": "Recurring expense not found."}, status=status.HTTP_404_NOT_FOUND)


class SettingsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        try:
            settings = Settings.objects.get(user=request.user)
            serializer = SettingsSerializer(settings)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Settings.DoesNotExist:
            return Response({"error": "Settings not found."}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, *args, **kwargs):
        serializer = SettingsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, *args, **kwargs):
        try:
            settings = Settings.objects.get(user=request.user)
        except Settings.DoesNotExist:
            return Response({"error": "Settings not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = SettingsSerializer(settings, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
