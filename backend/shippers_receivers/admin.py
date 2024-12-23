from django.contrib import admin
from .models import Location, Customer, LocationPhoto, Category


class LocationPhotoInline(admin.TabularInline):
    """
    Inline for managing photos related to a location in the admin panel.
    """
    model = LocationPhoto
    extra = 1


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Location model.
    """
    list_display = ('name', 'city', 'state', 'no_reefers', 'charges_lumper', 'do_not_load', 'shipping_hours_from', 'shipping_hours_to')
    search_fields = ('name', 'city', 'state', 'email')
    list_filter = ('do_not_load', 'no_reefers', 'charges_lumper', 'categories')
    inlines = [LocationPhotoInline]
    filter_horizontal = ('categories',)  # Enable a better interface for selecting categories


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Customer model.
    """
    list_display = ('name', 'city', 'state', 'is_lead', 'rating')
    search_fields = ('name', 'city', 'state', 'email')
    list_filter = ('is_lead', 'rating')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Category model.
    """
    list_display = ('name', 'description')
    search_fields = ('name',)


@admin.register(LocationPhoto)
class LocationPhotoAdmin(admin.ModelAdmin):
    """
    Admin configuration for the LocationPhoto model.
    """
    list_display = ('location', 'description')
    search_fields = ('location__name',)
