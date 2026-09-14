from django.shortcuts import render
#from django.http import JsonResponse
#from .products import products
from .models import Product
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializer import ProductSerializer , UserSerializerWithToken
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    myapis=[
       { 
           "products":'http://127.0.0.1:8000/api/products/',
           "product":'http://127.0.0.1:8000/api/products/1',
           "login":'http://127.0.0.1:8000/api/users/login',
           "signup":'http://127.0.0.1:8000/api/users/register',
           }
    ]
    return Response(myapis)

@api_view(['GET'])
def getproducts(request):
    products=Product.objects.all()
    serializer=ProductSerializer(products,many=True)
    return Response(serializer.data)

@api_view(['GET'])
def getproduct(request,pk):
    product=Product.objects.get(_id=pk)
    serialize=ProductSerializer(product,many=False)
    return Response(serialize.data)

""" class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        # ...

        return token
 """

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self,attrs):
        data=super().validate(attrs)
        serializer=UserSerializerWithToken(self.user).data
        for k,v in serializer.items():
            data[k]=v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

@api_view(['POST'])
def registerUser(request):
    data=request.data

    try:
        user=User.objects.create(first_name=data['fname'],last_name=data['lname'],username=data['email'],email=data['email'],password=make_password(data['password']))

        message={"details":"Signup is successfully"}
        return Response(message)
    
    except Exception as e:
        message={"details":f"Signup is failed {e}"}
        return Response(message)

