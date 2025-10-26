
from rest_framework import serializers
from .models import User
from .models import Book, Transaction
#from django.contrib.auth.models import User  # Ensure you import the User model

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id','username', 'password', 'email', 'role')

    def create(self, validated_data):
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Hash the password
        user.save()
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'username', 'email', 'role')

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = ['book_id', 'title', 'author', 'is_available', 'number_of_copies']

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = ['transaction_id', 'user', 'book', 'borrow_date', 'due_date', 'return_date', 'fine']