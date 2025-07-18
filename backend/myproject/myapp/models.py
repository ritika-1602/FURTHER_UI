from django.db import models

# Create your models here.

class Client(models.Model):
    # --- Section 1: Client Info ---
    clientCode = models.CharField(max_length=50, unique=True)
    clientName = models.CharField(max_length=255)
    clientCountry = models.CharField(max_length=100)
    launchDate = models.DateField()
    reinsurer = models.CharField(max_length=100)
    category = models.CharField(max_length=100, blank=True, null=True)
    channel = models.CharField(max_length=100)
    freqBordereau = models.CharField(max_length=100)
    freqReport = models.CharField(max_length=100)
    accountingPrinciple = models.CharField(max_length=100)
    primaryCurrency = models.CharField(max_length=10)
    secondaryCurrency = models.CharField(max_length=10, blank=True, null=True)
    taxProduct = models.CharField(max_length=100, blank=True, null=True)
    monthlyReport = models.BooleanField(default=False)

    # --- Section 2: Product Info ---
    productName = models.CharField(max_length=255)
    productCatalogueId = models.CharField(max_length=100)
    comments = models.TextField(blank=True, null=True)
    productType = models.CharField(max_length=50)
    house = models.CharField(max_length=10)

    # --- Section 3: Retention Info ---
    effectiveDate = models.DateField()
    effectiveTo = models.DateField(blank=True, null=True)
    retention = models.DecimalField(max_digits=5, decimal_places=2)

    # --- Section 4: Premium Info ---
    premiumRates = models.JSONField(default=list, blank=True)  # List of rows (table)
    premiumCurrency = models.CharField(max_length=10, default='EUR')

    # --- Section 5: Discount Info ---
    discounts = models.JSONField(default=list, blank=True)  # List of rows (table)

    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.clientCode} - {self.clientName}"



# Role-based access model
from django.contrib.auth.models import User

class UserProfile(models.Model):
    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Finance', 'Finance'),
        ('Technical', 'Technical Accounting'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(max_length=30, choices=ROLE_CHOICES)

    def __str__(self):
        return f"{self.user.username} - {self.role}"
