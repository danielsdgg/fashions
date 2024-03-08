import React,{ useState, useEffect} from 'react';
import './App.css'
import Footer from './components/Footer';
import Home from './components/Home';
import Navbar from './components/Navbar';
import About from './components/About';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProductsList from './components/ProductsList';
// import Details from './components/Details';
import Cart from './components/Cart';
import Design from './components/Design';
import Services from './components/Services';
import Addproduct from './components/Addproduct';
import Order from './components/Order';
import Login from './components/Login';
import Register from './components/Register'


function App() {
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");

  const getWelcomeMessage = async () => {
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type":"application/json",
      }
    }
    const response = await fetch('/api', requestOptions);
    const data = await response.json();

    if (!response.ok) {
      console.log("Something messed up")
    } else {
      setMessage(data.message);
    }
  }
  useEffect(() => {
    getWelcomeMessage()
  }, [])

// getting all products from the backend
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch("/products")
      const data = await response.json()
      return setProduct(data)
    }
    fetching()
  },[])

    // Delete a product functionality
    

    const addSales =(quantity, amount,name) => {
      fetch("/sales",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
          quantity:quantity,
          amount:amount,
          name:name
        })
      })
      .then(r => {
        if (r.status === 200){
          r.json()
        }
      })
    }

    const addShipping = (location) => {
      fetch("/orders",{
        method:"POST", 
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(location)
      })
      .then(r => {
        if (r.status === 200){
          // navigate("/payment")
          r.json()
        }
      })
      .catch(err => console.log(err))
  
    }

    const serviceForm = (user) => {
      fetch("/services",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify(user)
      })
      .then(r => {
        if (r.status === 200){
          console.log("sucess")
        }
      })
    }

    const handleAddtoCart = (name, price, description, image, quantity, total_price) => {
      // console.log(name, price, description, image, quantity, total_price)
      fetch("/cart",{
       method:"POST",
       headers:{"Content-Type":"application/json", "Accept": "application"},
       body:JSON.stringify({
         name:name,
         price:price,
         description:description,
         image:image,
         quantity:quantity, 
         total_price:total_price
       })
     })
   }


  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
      <p className='italic mt-2 md:text-3xl sm:text-2xl text-1xl text-green-900'>{message}</p>
      <Routes>
      <Route path="/login" element = {<Login/>}/>
      <Route path="/register" element = {<Register/>}/>
      <Route path="/" element = {<Home/>}/>
      <Route path='/design' element = {<Design/>}/> 
      {/* <Route path="/details" element= {<Details /> }/> */}
      <Route path='/services' element = {<Services serviceForm={serviceForm}/>}/>
      <Route path="/products" element = {<ProductsList product= {product} handleAddtoCart={handleAddtoCart} />} />
      <Route path='/cart' element = {<Cart addSales={addSales}  />} />
      <Route path='/order' element = {<Order addShipping={addShipping}  />} />
      <Route path="/about" element= {<About/>}/>
      <Route path='/addproduct' element = {<Addproduct/>}/> 
      </Routes>
      <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
