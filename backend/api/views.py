from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from django.contrib.auth.hashers import make_password

from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken


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
    
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.settings import api_settings
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.models import User

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
    permission_classes=[AllowAny]
    
    def post(self,request, *args , **kwargs):
        data=request.data
        # Validate required fields
        username = data.get('username')
        email = data.get('email')
        password = data.get('password')
        
        
        if not username or not email or not password:
            raise ValidationError("Username, email and password are required fields.")
        if User.objects.filter(username=username).exists():
            raise ValidationError("This user with this Username is already Registered")
        if User.objects.filter(email=email).exists():
            raise ValidationError("User with this email is already registered!")
        
        
        # create User
        user=User.objects.create(
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
            status=status.HTTP_201_CREATED,
        )
        
        
class LogoutView(APIView):
    def post(self, request):
        response = Response({'message': 'Logged out successfully'}, status=200)
        response.delete_cookie('refresh_token')
        return response