# Path: C:\Users\valic\OneDrive\Documents\TMS\backend\accounts\models.py

from django.db import models

class AccountType(models.Model):
    """
    Model representing different types of accounts such as Bank, Income, and Expense.
    """
    ACCOUNT_CHOICES = [
        ('bank', 'Bank'),
        ('income', 'Income'),
        ('expense', 'Expense'),
    ]
    name = models.CharField(max_length=50, choices=ACCOUNT_CHOICES)

    def __str__(self):
        return self.name


class Account(models.Model):
    """
    Model representing an individual account.
    """
    name = models.CharField(max_length=100)
    account_number = models.CharField(max_length=20, blank=True, null=True)  # Optional account number
    account_type = models.ForeignKey(AccountType, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=12, decimal_places=2)
    description = models.TextField(blank=True, null=True)  # Optional description

    def __str__(self):
        return f"{self.name} ({self.account_type.name})"


class Transaction(models.Model):
    """
    Model for transactions between accounts, supporting credit and debit operations.
    """
    TRANSACTION_TYPES = [
        ('credit', 'Credit'),
        ('debit', 'Debit'),
    ]

    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    transaction_type = models.CharField(max_length=6, choices=TRANSACTION_TYPES)
    transaction_date = models.DateField(auto_now_add=True)
    description = models.TextField(blank=True, null=True)  # Optional description

    def __str__(self):
        return f"{self.account.name} - {self.amount} ({self.transaction_type})"

    def save(self, *args, **kwargs):
        """
        Override save method to update account balance based on transaction type.
        """
        if self.transaction_type == 'credit':
            self.account.balance += self.amount
        elif self.transaction_type == 'debit':
            self.account.balance -= self.amount

        self.account.save()
        super().save(*args, **kwargs)
