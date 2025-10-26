from django.test import TestCase
from library.models import Book  # Update the path based on your app name

class BookModelTest(TestCase):
    def setUp(self):
        self.book = Book.objects.create(
            title="Django for Beginners",
            author="William Vincent",
            is_available=True,
            number_of_copies=5,
        )

    def test_check_availability(self):
        # Test if the book is available when copies > 0
        self.assertTrue(self.book.check_availability())
        
        # Test when all copies are borrowed
        self.book.number_of_copies = 0
        self.assertFalse(self.book.check_availability())

    def test_string_representation(self):
        # Test the string representation of the book
        self.assertEqual(str(self.book), "Django for Beginners")