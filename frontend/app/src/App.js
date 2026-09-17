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
        </Routes>

      </Container>
    </main>
    <Footer/>
    
    </BrowserRouter>
    
    </>
  )
}
