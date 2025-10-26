from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import timedelta, date

# User Role Choices
ROLE_CHOICES = [
    ('USER', 'User'),
    ('LIBRARIAN', 'Librarian'),
    ('ADMIN', 'Admin'),
]

class User(AbstractUser):
    user_id = models.AutoField(primary_key=True)
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='USER')
    
    # Ensure no conflicts with related names
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',  # Specify a unique related name
        blank=True,
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',  # Specify a unique related name
        blank=True,
    )

    def register(self):
        # Registration logic here
        pass

    def login(self):
        # Login logic here
        pass

    def logout(self):
        # Logout logic here
        pass

    def get_borrowed_books(self):
        return self.transaction_set.filter(return_date__isnull=True)

class Book(models.Model):
    book_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255)
    author = models.CharField(max_length=255)
    is_available = models.BooleanField(default=True)
    number_of_copies = models.PositiveIntegerField(default=1)  # New field for number of copies

    def add_book(self):
        # Logic to add a book
        pass

    def remove_book(self):
        # Logic to remove a book
        pass

    def check_availability(self):
        return self.is_available and self.number_of_copies > 0
    def __str__(self):
        return self.title

class Transaction(models.Model):
    transaction_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    book = models.ForeignKey(Book, on_delete=models.CASCADE)
    borrow_date = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    return_date = models.DateField(null=True, blank=True)
    fine = models.FloatField(default=0.0)

    def create_transaction(self):
        # Logic to create a transaction
        pass

    def calculate_fine(self):
        if self.return_date and self.return_date > self.due_date:
            days_overdue = (self.return_date - self.due_date).days
            return days_overdue * 1.0  # Fine rate: $1 per day
        return 0.0
        pass
    

    def get_transaction_history(self):
        # Logic to retrieve transaction history for the user
        pass