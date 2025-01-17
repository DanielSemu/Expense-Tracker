from django.shortcuts import render # type: ignore
from rest_framework.views import APIView # type: ignore
from rest_framework.response import Response # type: ignore
from rest_framework.permissions import IsAuthenticated,AllowAny # type: ignore
from rest_framework import status # type: ignore
from django.contrib.auth.models import User # type: ignore
from rest_framework.exceptions import ValidationError # type: ignore
from django.contrib.auth.hashers import make_password # type: ignore
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView # type: ignore
from rest_framework_simplejwt.tokens import RefreshToken # type: ignore


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self,request,*args, **kwargs):
        response=super().post(request,*args, **kwargs)
        token_data=response.data

        if 'access' in token_data and 'refresh' in token_data:
            response.set_cookie(
                key='refresh_token',
                value=token_data['refresh'],
                httponly=True,
                # secure=True,
                # samesite='Lax'
            )
            del token_data['refresh']
        return response
    

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        # Get the refresh token from cookies
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            request.data['refresh'] = refresh_token

        # Call the parent class's post method to refresh the token
        response = super().post(request, *args, **kwargs)
        
        # Decode the refresh token to get user information
        try:
            token = RefreshToken(refresh_token)
            user_id = token['user_id']
            user = User.objects.get(id=user_id)
            response.data['username'] = user.username
        except Exception as e:
            response.data['error'] = 'Could not retrieve user information'

        return response


class UserProfileView(APIView):
    permission_classes=[IsAuthenticated]
    
    def get(self,request):
        user=request.user
        return Response({
            'username':user.username,
            'email':user.email,
            'first name':user.first_name,
            'last name':user.last_name
        })
class RegisterUserView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request, *args, **kwargs):
        data = request.data
        
        # Validate required fields
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        print(username)  # Debugging info
        
        # Check if required fields are missing
        if not username or not email or not password:
            return Response(
                {"error": "Username, email, and password are required fields."},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        # Check if username already exists
        if User.objects.filter(username=username).exists():
            return Response(
                {"error": "A user with this username is already registered."},
                status=status.HTTP_409_CONFLICT
            )
        
        # Check if email already exists
        if User.objects.filter(email=email).exists():
            return Response(
                {"error": "A user with this email is already registered."},
                status=status.HTTP_409_CONFLICT
            )
        
        # Create user
        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password),
            first_name=data.get('first_name'),
            last_name=data.get('last_name')
        )
        
        # Return a success response
        return Response(
            {
                "message": "User registered successfully.",
                "user": {
                    "id": user.id,
                    "username": user.username,
                    "email": user.email,
                },
            },
            status=status.HTTP_201_CREATED
        )
        
# class LogoutView(APIView):
#     permission_classes=[IsAuthenticated]
#     def post(self, request):
#         response = Response({'message': 'Logged out successfully'}, status=200)
#         response.delete_cookie('refresh_token')
#         return response
class LogoutView(APIView):
    """
    Handles user logout by clearing the access and refresh tokens stored in HttpOnly cookies.
    """
    def post(self, request, *args, **kwargs):
        response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
        
        # Clear the access token cookie
        response.delete_cookie('access_token')
        
        # Clear the refresh token cookie if used
        response.delete_cookie('refresh_token')
        
        return response
