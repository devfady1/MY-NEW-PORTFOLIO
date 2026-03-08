from django.contrib import admin
from .models import Skill, Project, ProjectImage, Review, Contact


class ProjectImageInline(admin.TabularInline):
    model = ProjectImage
    extra = 3
    fields = ('image', 'caption', 'order')


@admin.register(Skill)
class SkillAdmin(admin.ModelAdmin):
    list_display = ('name', 'icon', 'category', 'proficiency', 'order')
    list_editable = ('order', 'proficiency')
    list_filter = ('category',)
    search_fields = ('name',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'slug', 'tech_stack', 'featured', 'order')
    list_editable = ('featured', 'order')
    list_filter = ('featured',)
    search_fields = ('title', 'description')
    prepopulated_fields = {'slug': ('title',)}
    inlines = [ProjectImageInline]
    fieldsets = (
        (None, {
            'fields': ('title', 'slug', 'description', 'full_description', 'image')
        }),
        ('Links', {
            'fields': ('url', 'github_url')
        }),
        ('Details', {
            'fields': ('tech_stack', 'featured', 'order', 'created_date')
        }),
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'client_role', 'rating', 'order')
    list_editable = ('order', 'rating')
    search_fields = ('client_name', 'content')


@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('created_at',)
