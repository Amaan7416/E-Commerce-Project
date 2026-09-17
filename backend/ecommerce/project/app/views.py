from django.shortcuts import render
#from django.http import JsonResponse
#from .products import products
from .models import Product,Order,OrderItem,ShippingAddress
from rest_framework.response import Response
from rest_framework.decorators import api_view,permission_classes
from .serializer import ProductSerializer , UserSerializerWithToken,OrderSerializer
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

# for email purpose and cerifying the email
from django.template.loader import render_to_string
from django.utils.http import urlsafe_base64_decode,urlsafe_base64_encode
from django.utils.encoding import force_bytes,force_text,DjangoUnicodeDecodeError
from django.core.mail import EmailMessage
from django.conf import settings
from django.views.generic import View
from .utils import TokenGenerator,generate_token
from rest_framework import status

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    myapis=[
       { 
           "products":'http://127.0.0.1:8000/api/products/',
           "product":'http://127.0.0.1:8000/api/product/3',
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
        user=User.objects.create(first_name=data['fname'],last_name=data['lname'],username=data['email'],email=data['email'],password=make_password(data['password']),is_active=False)

        email_subject="Activate Your Account"
        message=render_to_string(
            "activate.html",{
                'user':user,
                'domain':'127.0.0.1:8000/',
                'uid':urlsafe_base64_encode(force_bytes(user.pk)),
                'token':generate_token.make_token(user)

            }
        )

      #  email_message=EmailMessage(email_subject,message,settings.EMAIL_HOST_USER,[data['email']])
      #  email_message.send()


        message={"details":f"Activate your account please check click the link in gmail for account activation {message}"}
        return Response(message)
    
    except Exception as e:
        message={"details":f"Signup is failed {e}"}
        return Response(message)

class ActivateAccountView(View):

    def get(self,request,uidb64,token):
        try:
            uid=force_text(urlsafe_base64_decode(uidb64))
            user=User.objects.get(pk=uid)
        except Exception as identifier:
            user=None
        
        if user is not None and generate_token.check_token(user,token):
            user.is_active=True
            user.save()
            return render(request,"activatesuccess.html")
        else:
            return render(request,"activatefail.html")
        
@api_view(['POST'])
@permission_classes
def addOrderItems(request):
    user=request.user
    data=request.data
    OrderItem=data['orderItems']
    if OrderItems and len(OrderItems)==0:
        return Response({'details':"No Order Items"},status=status.HTTP_400_BAD_REQUEST)

     # 1. Create Order
    order=Order.objects.create(
        user=user,
        # paymentMethod=data['paymentMethod'],
        paymentMethod='Cash on Delivery',
        taxPrice=data['taxPrice'],
        shippingPrice=data['shippingPrice'],
        totalPrice=data['totalPrice']
    )

    # 2. Shipping Address 
    shipping=ShippingAddress.objects.create(
        order=order,
        address=data['shippingAddress']['address'],
        city=data['shippingAddress']['city'],
        postalCode=data['shippingAddress']['postalCode'],
        country=data['shippingAddress']['country']
    )

    # 3. Create order items ad set order-orderitem relationship
    print(orderItems)
    for i in orderItems:
        print(i['product'])
        product=Product.objects.get(_id=i['product'])
        item=OrderItem.objects.create ( product=product,
            order=order,
            name=product.name,
            qty=i['qty'],
            price=i['price'],
            image=product.image.url
        )

           # update the stock

        product.countInStock-=item.qty
        product.save()
    serializer=OrderSerializer(order,many=False)
    return Response(serializer.data)
