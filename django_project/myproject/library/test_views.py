from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from library.models import Book  # Update the path based on your app name

class BookListViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()
        # Create sample books
        Book.objects.create(title="Django for Beginners", author="William Vincent", number_of_copies=3)
        Book.objects.create(title="React Explained", author="Zac Gordon", number_of_copies=1)

    def test_get_books(self):
        # Make a GET request to the BookListView
        response = self.client.get(reverse('book-list'))  # 'book-list' should match the name of your URL
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.data), 2)
        self.assertEqual(response.data[0]['title'], "Django for Beginners")
        self.assertEqual(response.data[1]['title'], "React Explained")