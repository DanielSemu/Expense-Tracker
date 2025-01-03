from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework import status
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError
from django.contrib.auth.hashers import make_password


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