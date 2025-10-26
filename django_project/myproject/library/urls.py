"""from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, BookViewSet, TransactionViewSet

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'books', BookViewSet)
router.register(r'transactions', TransactionViewSet)

urlpatterns = [
    path('', include(router.urls)),
]"""

# library/urls.py
from django.urls import path
from .views import RegisterView, LoginView, ProfileView, LogoutView, PublicUserListView, UserDetailView, BookListView, BorrowBookView, ReturnBookView, TransactionHistoryView, BookCreateView, BookDeleteView #UserListView UserDetailView
from rest_framework_simplejwt.views import TokenRefreshView  # Import TokenRefreshView
urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path('profile/', ProfileView.as_view(), name='profile'),
    path('logout/', LogoutView.as_view(), name='logout'),
    #path('users/', UserListView.as_view(), name='user-list'),
    path('users/<int:user_id>/', UserDetailView.as_view(), name='user-detail'),  # Use <int:user_id>
    path('public/', PublicUserListView.as_view(), name='public-user-list'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('library/addbooks/', BookCreateView.as_view(), name='add-books'),
    path('books/', BookListView.as_view(), name='book-list'),
    path('books/<int:book_id>/', BookDeleteView.as_view(), name='book-delete'),
    path('borrow/', BorrowBookView.as_view(), name='borrow-book'),
    path('return/<int:transaction_id>/', ReturnBookView.as_view(), name='return-book'),
    path('transactions/', TransactionHistoryView.as_view(), name='transaction-history'),
]

