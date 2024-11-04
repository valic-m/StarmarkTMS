from django.contrib import admin
from .models import Account, AccountType, Transaction

admin.site.register(Account)
admin.site.register(AccountType)
admin.site.register(Transaction)
