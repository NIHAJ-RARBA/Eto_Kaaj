from django.contrib import admin
from .models import EtoKaj

class AppAdmin(admin.ModelAdmin):
    list_display = ('taskTitle', 'groupId', 'taskDescription', 'starred', 'completed', 'dateCreated', 'dateCompleted')
    list_filter = ('starred', 'completed', 'dateCreated', 'dateCompleted')
    search_fields = ('taskTitle', 'groupId', 'taskDescription', 'starred', 'completed', 'dateCreated', 'dateCompleted')
    ordering = ('-groupId', '-dateCreated')

# Register models

admin.site.register(EtoKaj, AppAdmin)