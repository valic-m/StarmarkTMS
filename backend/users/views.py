from django.shortcuts import render
from django.contrib.auth.models import User  # Add this import

# View for Active Users
def active_users(request):
    users = User.objects.filter(is_active=True)
    return render(request, 'users/active_users.html', {'users': users})

# View for User Activity
def user_activity(request):
    return render(request, 'users/user_activity.html')

# View for Inactive Users
def inactive_users(request):
    users = User.objects.filter(is_active=False)
    return render(request, 'users/inactive_users.html', {'users': users})

# View for User Commission
def user_commission(request):
    return render(request, 'users/user_commission.html')
