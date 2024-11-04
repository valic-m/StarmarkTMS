# Path: C:\Users\valic\OneDrive\Documents\TMS\backend\accounts\tests.py

from django.test import TestCase
from .models import Account, AccountType, Transaction

class AccountModelTest(TestCase):

    def setUp(self):
        # Set up account types and accounts for the test
        self.bank_type = AccountType.objects.create(name='bank')
        self.income_type = AccountType.objects.create(name='income')
        self.expense_type = AccountType.objects.create(name='expense')

        self.account1 = Account.objects.create(name='Checking Account', account_type=self.bank_type, balance=1000.00)
        self.account2 = Account.objects.create(name='Salary Account', account_type=self.income_type, balance=5000.00)
    
    def test_account_creation(self):
        # Test that account creation works
        self.assertEqual(self.account1.name, 'Checking Account')
        self.assertEqual(self.account1.balance, 1000.00)
    
    def test_transaction_credit(self):
        # Test a credit transaction on account1
        transaction = Transaction.objects.create(account=self.account1, amount=200.00, transaction_type='credit')
        self.account1.refresh_from_db()
        self.assertEqual(self.account1.balance, 1200.00)
    
    def test_transaction_debit(self):
        # Test a debit transaction on account1
        transaction = Transaction.objects.create(account=self.account1, amount=300.00, transaction_type='debit')
        self.account1.refresh_from_db()
        self.assertEqual(self.account1.balance, 700.00)
    
    def test_transaction_negative_balance(self):
        # Test that balance cannot go negative
        transaction = Transaction.objects.create(account=self.account1, amount=1500.00, transaction_type='debit')
        self.account1.refresh_from_db()
        self.assertTrue(self.account1.balance >= 0, "Account balance should not go negative.")

