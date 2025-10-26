
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from django.contrib.auth import authenticate, login, logout
from .models import User
from rest_framework.views import APIView
from .serializers import UserSerializer, ProfileSerializer
from rest_framework_simplejwt.tokens import RefreshToken  # Import to generate tokens
from rest_framework.permissions import AllowAny
from rest_framework.generics import ListAPIView
from .models import Book, Transaction
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .serializers import BookSerializer, TransactionSerializer
from django.shortcuts import get_object_or_404
from datetime import date
# additional solution for authentication based on token
from rest_framework.authentication import get_authorization_header
from rest_framework.exceptions import AuthenticationFailed
import jwt  # Assuming you're using PyJWT for token decoding
from django.conf import settings  # For access to the SECRET_KEY
from datetime import date, timedelta
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

class LoginView(generics.GenericAPIView):
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]

    def post(self, request, *args, **kwargs):
        username = request.data.get('username')
        password = request.data.get('password')
        role = request.data.get('role')  # Get the role from the request

        # Debugging log
        
        print(f"Attempting to log in user: {username} with role: {role}")
        print(f"Username: {username}, Password: {password}")

        user = authenticate(request, username=username, password=password)
        print(f"Authenticate result: {user}")
        if user is not None and user.is_active:
            if hasattr(user, 'role') and user.role == role:  # Check if role attribute exists
                login(request, user)
                # Generate tokens
                refresh = RefreshToken.for_user(user)
                return Response({
                    'message': 'Login successful',
                    'role': user.role,
                    'user_id': user.user_id,  # Use user.user_id instead of user.id
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),  # Include access token
                }, status=status.HTTP_200_OK)
            else:
                return Response({'error': 'Role does not match'}, status=status.HTTP_401_UNAUTHORIZED)
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
class ProfileView(generics.RetrieveAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]  # Ensure that only authenticated users can access

    def get(self, request):
        user = request.user  # Get the authenticated user
        user_data = {
            'username': user.username,
            'email': user.email,
            'role': user.role,  # Assuming you have a 'role' field
            
        }

        return Response(user_data, status=status.HTTP_200_OK)

class LogoutView(APIView):
    permission_classes = []

    def post(self, request):
        # Extract the refresh token from the request body
        refresh_token = request.data.get('refresh_token')
        if not refresh_token:
            return Response({'error': 'Refresh token not provided'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            # Blacklist the refresh token
            token = RefreshToken(refresh_token)
            token.blacklist()  # Blacklist the refresh token so it cannot be used for future requests
            
            # Allow logout even if the access token is expired
            return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        except InvalidToken:
            return Response({'error': 'Invalid refresh token'}, status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            return Response({'error': f'An error occurred: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class PublicUserListView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]

class UserDetailView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]  # Adjust permissions if needed
    lookup_field = 'user_id'  # Use this if the primary key is named user_id
    def update(self, request, *args, **kwargs):
        user = self.get_object()
        serializer = self.get_serializer(user, data=request.data, partial=True)  # Allow partial updates
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
   #book view
class BookCreateView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = BookSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
class BookListView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        books = Book.objects.all()
        serializer = BookSerializer(books, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class BorrowBookView(APIView):
    def post(self, request):
        # Step 1: Extract the token from the Authorization header
        auth_header = get_authorization_header(request).decode('utf-8')
        if not auth_header or not auth_header.startswith("Bearer "):
            return Response({"error": "Authorization token not provided or invalid"}, status=status.HTTP_401_UNAUTHORIZED)

        token = auth_header.split(" ")[1]  # Extract the token part

        # Step 2: Decode and validate the token
        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        except jwt.ExpiredSignatureError:
            return Response({"error": "Token has expired"}, status=status.HTTP_401_UNAUTHORIZED)
        except jwt.InvalidTokenError as e:
            print(f"Invalid token error: {str(e)}")  # Log error for debugging
            return Response({"error": "Invalid token"}, status=status.HTTP_401_UNAUTHORIZED)
        # Step 3: Retrieve the user_id from the token
        user_id_from_token = decoded_token.get("user_id")
        if not user_id_from_token:
            return Response({"error": "Invalid token payload"}, status=status.HTTP_401_UNAUTHORIZED)

        # Ensure the user_id in the request matches the token's user_id
        if request.data.get('user_id') != user_id_from_token:
            return Response({"error": "User ID mismatch"}, status=status.HTTP_403_FORBIDDEN)
        book_id = request.data.get('book_id')
        user_id = request.data.get('user_id')

        book = get_object_or_404(Book, pk=book_id)
        if not book.check_availability():
            return Response({"error": "Book not available"}, status=status.HTTP_400_BAD_REQUEST)

        book.number_of_copies -= 1
        if book.number_of_copies == 0:
            book.is_available = False
        book.save()

        transaction = Transaction.objects.create(
            user_id=user_id,
            book=book,
            due_date=date.today() + timedelta(days=14)
        )
        
        serializer = TransactionSerializer(transaction)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
class BookDeleteView(APIView):
    permission_classes = [AllowAny]
    
    def delete(self, request, book_id):
        book = get_object_or_404(Book, pk=book_id)
        book.delete()
        return Response({"message": "Book deleted successfully"}, status=status.HTTP_200_OK)
class ReturnBookView(APIView):
    permission_classes = [AllowAny]
    def post(self, request, transaction_id):
        transaction = get_object_or_404(Transaction, pk=transaction_id)
        if transaction.return_date is not None:
            return Response({"error": "Book already returned"}, status=status.HTTP_400_BAD_REQUEST)

        transaction.return_date = date.today()
        transaction.fine = transaction.calculate_fine()
        transaction.save()

        book = transaction.book
        book.number_of_copies += 1
        book.is_available = True
        book.save()

        serializer = TransactionSerializer(transaction)
        return Response(serializer.data, status=status.HTTP_200_OK)
       
   #transaction view
class TransactionHistoryView(APIView):
    permission_classes = [AllowAny]
    def get(self, request):
        # Fetch all transactions (no user_id filtering)
        transactions = Transaction.objects.all().select_related('book')
        # If no transactions are found, return a 404 response
        if not transactions:
            return Response({"detail": "No transactions found."}, status=status.HTTP_404_NOT_FOUND)
        # Serialize the transaction data
        serializer = TransactionSerializer(transactions, many=True)
        # Return the serialized data with a 200 OK status
        return Response(serializer.data, status=status.HTTP_200_OK)