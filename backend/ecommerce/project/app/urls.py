from app import views
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns=[
    path('',views.getRoutes,name="getRoutes"),
    path('products/',views.getproducts,name="getProducts"),
    path('product/<str:pk>',views.getproduct,name="getProduct"),
    path('users/login',views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('users/register/',views.registerUser,name='register'),
    path('activate/<uidb64>/<token>',views.ActivateAccountView.as_view(),name='activate'),
    path('add/',views.addOrderItems,name='orders-add')
   # path('users/login', TokenObtainPairView.as_view(), name='token_obtain_pair'),
]