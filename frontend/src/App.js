import React,{useEffect, useState} from 'react';
import './App.css'
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsList from './components/ProductsList';
import Details from './components/Details';
import Cart from './components/Cart';
import Design from './components/Design';
import Services from './components/Services';

function App() {
  const [product, setProduct] = useState([])
  const [cartItems, setCartItems] = useState([])

  // Cart functionalities
  const handleAddProduct = (product) =>{
    const productExist = cartItems.find((item) => item.id === product.id);
    if(productExist){
      setCartItems(cartItems.map((item) => item.id === product.id ?
      {...productExist, quantity: productExist.quantity +1}: item))
    }
    else {
      setCartItems([...cartItems, {...product, quantity: 1}])
    }
  }

  const handleRemoveProduct = (product) => {
    const productExist = cartItems.find((item) => item.id === product.id);
    if(productExist.quantity === 1){
      setCartItems(cartItems.filter((item) => item.id !== product.id))
    }
    else {
      cartItems.map((item) => item.id === product.id ? {...productExist, quantity: productExist.quantity - 1}: item)
    }
  }

  const handleCartClearance = () => {
    setCartItems([])
  }


// getting all products from the backend
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch("http://127.0.0.1:8000/products")
      const data = await response.json()
      return setProduct(data)
    }
    fetching()
  },[])


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route exact path="/" element = {<Home/>}/>
      <Route path='/design' element = {<Design/>}/> 
      <Route path="/details/:id" element= {<Details/>}/>
      <Route path='/services' element = {<Services/>}/>
      <Route path="/products" element = {<ProductsList product= {product}  cartItems = {cartItems} handleAddProduct ={handleAddProduct}/>} />
      <Route path='/cart' element = {<Cart cartItems={cartItems} handleAddProduct = {handleAddProduct} handleRemoveProduct = {handleRemoveProduct} handleCartClearance = {handleCartClearance}/>} />
      <Route path="/about" element= {<About/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
