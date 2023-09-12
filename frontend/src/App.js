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

function App() {
  const [product, setProduct] = useState([])

  useEffect(() => {
    const fetching = async () => {
      const response = await fetch("http://127.0.0.1:8000/products")
      const data = await response.json()
      return setProduct(data)
    }
    fetching()
  },[])

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
      <Route path="/products" element = {<ProductsList product= {product} onSearch = {onSearch}/>} />
      <Route path="/guide" element= {<Guide/>}/>
      <Route path="/profile" element= {<Profile/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>

    </div>
  );
}

export default App;
