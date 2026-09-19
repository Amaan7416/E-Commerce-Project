import React from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './Component/Header'
import {Container} from 'react-bootstrap'
import Home from './Component/Home'
import Footer from './Component/Footer'
import SignupScreen from './Component/screens/SignupScreen'
import LoginScreen from './Component/screens/LoginScreen'
import ProductDetail from './Component/screens/ProductDetail'
import CartScreen from './Component/screens/CartScreen'
import ShippingScreen from './Component/screens/ShippingScreen'
import PlaceOrderScreen from './Component/screens/PlaceOrderScreen'
import PaymentScreen from './Component/screens/PaymentScreen'
import OrderScreen from './Component/screens/OrderScreen'
import ProductListScreen from './Component/screens/ProductListScreen'
import ProductEditScreen from './Component/screens/ProductEditScreen'
import OrderListScreen from './Component/screens/OrderListScreen'
import UserListScreen from './Component/screens/UserListScreen'
import UserEditScreen from './Component/screens/UserEditScreen'
import ProfileScreen from './Component/screens/ProfileScreen'

export default function () {
  return (
    <>.
    <BrowserRouter>
    <Header/>
    <main>
      <Container>
        <Routes>
          <Route path="/" element={<Home/>}/>
           <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/signup" element={<SignupScreen/>}/>
          <Route path="/login" element={<LoginScreen/>}/>
          <Route path="/cart/:id?" element={<CartScreen/>}/>
          <Route path="/checkout" element={<ShippingScreen/>}/>
          <Route path="/placeorder" element={<PlaceOrderScreen/>}/>
          <Route path="/payment" element={<PaymentScreen/>}/>
          <Route path="/order/:id" element={<OrderScreen/>}/>
          <Route path="/admin/productList" element={<ProductListScreen/>}/>
          <Route path="/admin/product/:id/edit" element={<ProductEditScreen/>}/>
          <Route path="/admin/orderlist" element={<OrderListScreen/>}/>
          <Route path="/admin/userlist" element={<UserListScreen/>}/>
          <Route path="/admin/user/:id/edit" element={<UserEditScreen/>}/>
          <Route path="/profile" element={<ProfileScreen/>}/>
        </Routes>

      </Container>
    </main>
    <Footer/>
    
    </BrowserRouter>
    
    </>
  )
}
