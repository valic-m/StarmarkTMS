from django.contrib import admin
from .models import Location, OperatingHours, LocationPhoto, LocationComment, Category


class OperatingHoursInline(admin.TabularInline):
    """
    Inline admin to manage Operating Hours for a Location.
    """
    model = OperatingHours
    extra = 1


class LocationPhotoInline(admin.TabularInline):
    """
    Inline admin to manage Photos for a Location.
    """
    model = LocationPhoto
    extra = 1


class LocationCommentInline(admin.TabularInline):
    """
    Inline admin to manage Comments for a Location.
    """
    model = LocationComment
    extra = 1


@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Location model.
    """
    list_display = (
        'name',
        'address_line1',
        'city',
        'state',
        'zip_code',
        'get_operating_hours',
        'plus_code',
        'website',
        'no_reefers',
        'charges_lumper',
        'do_not_load',
    )
    search_fields = ('name', 'address_line1', 'city', 'state', 'zip_code', 'plus_code')
    list_filter = ('do_not_load', 'no_reefers', 'charges_lumper', 'categories')
    inlines = [OperatingHoursInline, LocationPhotoInline, LocationCommentInline]
    filter_horizontal = ('categories',)
    ordering = ('name',)
    list_per_page = 20

    def get_operating_hours(self, obj):
        """
        Custom method to display operating hours in the list view.
        """
        hours = obj.operating_hours.all()
        if hours.exists():
            return "; ".join(
                f"{hour.get_day_display()}: {hour.open_time} - {hour.close_time}" for hour in hours
            )
        return "No hours set"

    get_operating_hours.short_description = "Operating Hours"


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Admin configuration for the Category model.
    """
    list_display = ('name', 'description')
    search_fields = ('name',)
    list_filter = ('name',)


@admin.register(LocationPhoto)
class LocationPhotoAdmin(admin.ModelAdmin):
    """
    Admin configuration for the LocationPhoto model.
    """
    list_display = ('location', 'description', 'image_thumbnail')
    search_fields = ('location__name', 'description')
    list_filter = ('location',)
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


@admin.register(LocationComment)
class LocationCommentAdmin(admin.ModelAdmin):
    """
    Admin configuration for the LocationComment model.
    """
    list_display = ('location', 'user', 'content', 'created_at')
    search_fields = ('location__name', 'user__username', 'content')
    list_filter = ('location', 'created_at')
    ordering = ('-created_at',)
