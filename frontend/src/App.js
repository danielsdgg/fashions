import React,{useEffect, useState} from 'react';
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Guide from './components/Guide';
import Profile from './components/Profile';
import ProductsList from './components/ProductsList';
import './App.css'
import Details from './components/Details';
import Cart from './components/Cart';

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

  // Search functionality
  function onSearch(filteredProducts){
    const filteredproductsbyname = product.filter(products => products.name.toLowerCase().includes(filteredProducts.toLowerCase()))
    
      return setProduct(filteredproductsbyname)
  }


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar/>
      <Routes>
      <Route exact path="/" element= {<Home/>}/>
      <Route path="/details" element= {<Details/>}/>
      <Route path="/products" element = {<ProductsList product= {product} onSearch = {onSearch} cartItems = {cartItems} handleAddProduct ={handleAddProduct}/>} />
      <Route path='/cart' element = {<Cart cartItems={cartItems} handleAddProduct = {handleAddProduct} handleRemoveProduct = {handleRemoveProduct} handleCartClearance = {handleCartClearance}/>} />
      <Route path="/guide" element= {<Guide/>}/>
      <Route path="/profile" element= {<Profile/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
