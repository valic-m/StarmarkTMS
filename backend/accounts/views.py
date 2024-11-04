# Path: C:\Users\valic\OneDrive\Documents\TMS\backend\accounts\views.py

from django.shortcuts import render, get_object_or_404, redirect
from .models import Account
from .forms import AccountForm

def account_list(request):
    accounts = Account.objects.all()
    return render(request, 'accounts/account_list.html', {'accounts': accounts})

def account_detail(request, account_id):
    account = get_object_or_404(Account, pk=account_id)
    return render(request, 'accounts/account_detail.html', {'account': account})

def create_account(request):
    if request.method == 'POST':
        form = AccountForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('account_list')
    else:
        form = AccountForm()
    return render(request, 'accounts/account_form.html', {'form': form})
