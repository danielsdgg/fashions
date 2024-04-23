import React,{ useState, useEffect} from 'react';
import './App.css'
import Home from './components/Home';
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
import ProductsItem from './components/ProductsItem';
// import { UserContext } from './context/UserContext';


function App({token, id, setErrorMessage}) {
  const [product, setProduct] = useState("");
  const [message, setMessage] = useState("");

  // cart
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [total_price, setTotalPrice] = useState("")


  // const [token] = useContext(UserContext);


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
    try {
      // Make a GET request to the /products endpoint
      const response = await fetch("/products");
      // Parse the JSON data from the response
      const data = await response.json();
      // Update the state with the fetched products
      setProduct(data);
    } catch (error) {
      // Handle any errors that occur during the fetch
      console.error("Error fetching products:", error);
    }
  };
  // Call the fetching function when the component mounts (empty dependency array)
  fetching();
}, []); // Empty dependency array ensures the effect runs only once after the component mounts
    

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
          console.log("success")
        }
      })
    }

    const cleanFormData = () => {
      setName("");
      setDescription("");
      setImage("");
      setPrice("");
      setQuantity("");
      setTotalPrice("")
    }

    const handleAddtoCart = async (e) => {
      e.preventDefault();
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
          name: name,
          description: description,
          image: image,
          price: price,
          quantity: quantity,
          total_price: total_price,
        }),
      };
      const response = await fetch("/cart", requestOptions);
      if (!response.ok) {
        setErrorMessage("Something went wrong when adding to cart");
      } else {
        cleanFormData();
      }
    }


  return (
    <div className="App">
      <div className='cols'>

            <div className='cols2'>
              <BrowserRouter>
              <Routes>
                <Route exact path="/" element={<Login title={message}/>} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path="/products" element={<ProductsList product={product} handleAddtoCart={handleAddtoCart}/>} />
                <Route path="/produc" element={<ProductsItem handleAddtoCart={handleAddtoCart}/>} />
                <Route path="/design" element={<Design />} />
                <Route path="/services" element={<Services serviceForm={serviceForm} />} />
                <Route path="/cart" element={<Cart addSales={addSales} />} />
                <Route path="/order" element={<Order addShipping={addShipping} />} />
                <Route path="/about" element={<About />} />
                <Route path="/addproduct" element={<Addproduct />} />              </Routes>
              </BrowserRouter>
                {/* <Register /> <Login/> */}
              </div>  

        </div>
    </div>
  );
}

export default App;
