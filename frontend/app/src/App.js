import React from 'react'
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import Header from './Component/Header'
import {Container} from 'react-bootstrap'
import Home from './Component/Home'
import Footer from './Component/Footer'
import SignupScreen from './Component/screens/SignupScreen'
import LoginScreen from './Component/screens/LoginScreen'
import ProductDetail from './Component/screens/ProductDetail'

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
        </Routes>

      </Container>
    </main>
    <Footer/>
    
    </BrowserRouter>
    
    </>
  )
}
