from django.contrib import admin

# Register your models here.
from .models import Client

@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ("clientCode", "clientName", "launchDate")