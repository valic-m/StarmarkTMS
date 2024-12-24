from django.contrib import admin
from .models import Location, LocationPhoto, Category


class LocationPhotoInline(admin.TabularInline):
    """
    Inline for managing photos related to a location in the admin panel.
    """
    model = LocationPhoto
    extra = 1
    readonly_fields = ('id',)  # Optional: Display the ID as read-only


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Location model.
    """
    list_display = (
        'name',
        'city',
        'state',
        'no_reefers',
        'charges_lumper',
        'do_not_load',
        'shipping_hours_from',
        'shipping_hours_to',
    )
    search_fields = ('name', 'city', 'state', 'email')
    list_filter = ('do_not_load', 'no_reefers', 'charges_lumper', 'categories')
    inlines = [LocationPhotoInline]
    filter_horizontal = ('categories',)  # Enables a better interface for selecting categories

    # Optional: Add ordering, pagination, and other configurations
    ordering = ('name',)
    list_per_page = 20


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Category model.
    """
    list_display = ('name', 'description')
    search_fields = ('name',)
    list_filter = ('name',)

    # Optional: Add ordering
    ordering = ('name',)


@admin.register(LocationPhoto)
class LocationPhotoAdmin(admin.ModelAdmin):
    """
    Admin configuration for the LocationPhoto model.
    """
    list_display = ('location', 'description', 'image_thumbnail')
    search_fields = ('location__name', 'description')
    list_filter = ('location',)

    # Optional: Display a thumbnail of the image in the admin
    readonly_fields = ('image_thumbnail',)

    def image_thumbnail(self, obj):
        """
        Returns an HTML image tag for the photo thumbnail.
        """
        if obj.image:
            return f'<img src="{obj.image.url}" width="100" height="100" />'
        return "No Image"

    image_thumbnail.allow_tags = True
    image_thumbnail.short_description = 'Thumbnail'
