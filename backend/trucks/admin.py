# backend/trucks/admin.py

from django.contrib import admin
from .models import (
    Truck,
    InspectionType,
    Inspection,
    MaintenanceLog,
    Expense,
    OutOfServiceHistory,
)


# Optional: If you have related models like OperationalCompany and Carrier
# from backend.companies.models import OperationalCompany
# from backend.carriers.models import Carrier

# Inline Models for Truck Admin

class InspectionInline(admin.TabularInline):
    """
    Inline admin interface for Inspection records related to a Truck.
    """
    model = Inspection
    extra = 1
    readonly_fields = ('document_link',)
    fields = ('inspection_type', 'date_performed', 'expiration_date', 'document_link')

    def document_link(self, obj):
        if obj.document:
            return format_html('<a href="{}" target="_blank">View Document</a>', obj.document.url)
        return "No Document"

    document_link.short_description = "Document"


class MaintenanceLogInline(admin.TabularInline):
    """
    Inline admin interface for MaintenanceLog records related to a Truck.
    """
    model = MaintenanceLog
    extra = 1
    readonly_fields = ('document_link',)
    fields = ('description', 'date', 'cost', 'document_link')

    def document_link(self, obj):
        if obj.document:
            return format_html('<a href="{}" target="_blank">View Document</a>', obj.document.url)
        return "No Document"

    document_link.short_description = "Document"


class ExpenseInline(admin.TabularInline):
    """
    Inline admin interface for Expense records related to a Truck.
    """
    model = Expense
    extra = 1
    readonly_fields = ('document_link',)
    fields = ('description', 'date', 'amount', 'document_link')

    def document_link(self, obj):
        if obj.document:
            return format_html('<a href="{}" target="_blank">View Receipt</a>', obj.document.url)
        return "No Document"

    document_link.short_description = "Receipt"


class OutOfServiceHistoryInline(admin.TabularInline):
    """
    Inline admin interface for OutOfServiceHistory records related to a Truck.
    """
    model = OutOfServiceHistory
    extra = 1
    fields = ('reason', 'date_start', 'date_end')


class InspectionTypeAdmin(admin.ModelAdmin):
    """
    Admin interface for InspectionType model.
    """
    list_display = ('name', 'description')
    search_fields = ('name',)
    ordering = ('name',)


class InspectionAdmin(admin.ModelAdmin):
    """
    Admin interface for Inspection model.
    """
    list_display = ('truck', 'inspection_type', 'date_performed', 'expiration_date')
    list_filter = ('inspection_type', 'date_performed', 'expiration_date')
    search_fields = ('truck__name', 'inspection_type__name')
    readonly_fields = ('document_link',)
    fields = ('truck', 'inspection_type', 'date_performed', 'expiration_date', 'document_link', 'document')

    def document_link(self, obj):
        if obj.document:
            return format_html('<a href="{}" target="_blank">View Document</a>', obj.document.url)
        return "No Document"

    document_link.short_description = "Document"


class MaintenanceLogAdmin(admin.ModelAdmin):
    """
    Admin interface for MaintenanceLog model.
    """
    list_display = ('truck', 'date', 'cost')
    list_filter = ('date',)
    search_fields = ('truck__name', 'description')
    readonly_fields = ('document_link',)
    fields = ('truck', 'description', 'date', 'cost', 'document_link', 'document')

    def document_link(self, obj):
        if obj.document:
            return format_html('<a href="{}" target="_blank">View Receipt</a>', obj.document.url)
        return "No Document"

    document_link.short_description = "Receipt"


class ExpenseAdmin(admin.ModelAdmin):
    """
    Admin interface for Expense model.
    """
    list_display = ('truck', 'description', 'date', 'amount')
    list_filter = ('date',)
    search_fields = ('truck__name', 'description')
    readonly_fields = ('document_link',)
    fields = ('truck', 'description', 'date', 'amount', 'document_link', 'document')

    def document_link(self, obj):
        if obj.document:
            return format_html('<a href="{}" target="_blank">View Receipt</a>', obj.document.url)
        return "No Document"

    document_link.short_description = "Receipt"


class OutOfServiceHistoryAdmin(admin.ModelAdmin):
    """
    Admin interface for OutOfServiceHistory model.
    """
    list_display = ('truck', 'reason', 'date_start', 'date_end')
    list_filter = ('date_start', 'date_end')
    search_fields = ('truck__name', 'reason')


# Main Truck Admin

@admin.register(Truck)
class TruckAdmin(admin.ModelAdmin):
    """
    Admin interface for Truck model with inlines for related records.
    """
    list_display = (
        'name',
        'license_plate',
        'manufacturer',
        'year',
        'vin',
        'owner',
        'carrier',
        'is_leased',
        'is_out_of_service',
    )
    list_filter = (
        'manufacturer',
        'year',
        'owner',
        'carrier',
        'is_leased',
        'is_out_of_service',
    )
    search_fields = (
        'name',
        'license_plate',
        'manufacturer',
        'vin',
        'owner__name',
        'carrier__name',
    )
    readonly_fields = ('integration_id_display',)
    fields = (
        'name',
        'license_plate',
        'manufacturer',
        'year',
        'vin',
        'starting_mileage',
        'color',
        'owner',
        'carrier',
        # 'payable_to',  # Uncomment if Vendor model is available
        'is_leased',
        'leased_to',
        'sub_leased',
        'owner_operated',
        'annual_insurance_cost',
        'insurance_renewal_date',
        'annual_plate_cost',
        'dashcam_installed',
        'apu_installed',
        'fuel_card',
        'integration_id_display',
        'integration_id',
        'is_out_of_service',
        'out_of_service_reason',
    )
    inlines = [
        InspectionInline,
        MaintenanceLogInline,
        ExpenseInline,
        OutOfServiceHistoryInline,
    ]

    def integration_id_display(self, obj):
        return obj.integration_id or "Not Set"

    integration_id_display.short_description = "Integration ID"


# Registering other models with their respective admin classes

admin.site.register(InspectionType, InspectionTypeAdmin)
admin.site.register(Inspection, InspectionAdmin)
admin.site.register(MaintenanceLog, MaintenanceLogAdmin)
admin.site.register(Expense, ExpenseAdmin)
admin.site.register(OutOfServiceHistory, OutOfServiceHistoryAdmin)

# Optionally, customize the admin site header and title
admin.site.site_header = "Transportation Management Admin"
admin.site.site_title = "Transportation Management Admin Portal"
admin.site.index_title = "Welcome to the Transportation Management Admin Interface"
