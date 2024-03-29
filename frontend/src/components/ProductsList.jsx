import React, { useState } from 'react';
import ProductsItem from './ProductsItem';
import { ShoppingCart } from 'phosphor-react';
import { Link } from 'react-router-dom';
import Cart from './Cart';

const ProductsList = ({ product, handleAddtoCart, handleDelete }) => {
  const [search, setSearch] = useState([]);
  const [name, setName] = useState('');
  const [show, setShow] = useState(false)

  // search-bar for selection
  function handleShow(){
    setShow(!show)
  }

  // search functionality
  const filtering = () => {
    const filteredProducts = product && product.filter((pro) => pro.name.toLowerCase().includes(name.toLowerCase()));
    console.log(filteredProducts);
    setSearch(filteredProducts);
  };

  console.log(product)
  const handleSubmit = (e) => {
    e.preventDefault();
    filtering();
    console.log(search);
  };

  let displayProducts;

  if (Array.isArray(product)) {
    displayProducts = product.map(phone => (
      <ProductsItem key={phone.id} name={phone.name} description={phone.description} price={phone.price} image={phone.image} />
    ));
  } else {
    // Handle case where product is not an array
    displayProducts = <p>No products available</p>;
  }

  return (
    <div className='bg-gray-300 h-full w-full'>
      <div className="prods">   
        {displayProducts}
      </div>
      <form onSubmit={handleSubmit}>
        {/* <h4 className='font-extrabold md:text-1xl sm:text-1xl italic underline'>search for clothes</h4> */}
        <br></br>
        <label className='font-semibold mr-2' htmlFor='name'>
         Select Category :
        </label>
        <select className='slcc font-bold md:text-1xl sm:text-1xl' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)}>
          <option value=''>Any</option>
          <option value='African'>African</option>
          <option value='Ladies'>Ladies</option>
          <option value='Men'>Men</option>
          <option value='Shirt'>Shirt</option>
          <option value='Socks'>Socks</option>
          <option value='Hoody'>Hoody</option>
        </select>

        <button className='bg-[#00df9a] w-[100px] rounded-md font-medium my-1 mx-auto py-2 text-black w-42' type='submit'>
          <span>Search</span>
        </button>
      </form>
      <br></br>
      <h3 className='text-center font-bold md:text-4xl sm:text-3xl underline'>Products</h3>
      <Link to={'/addproduct'}><button className="add">Add Product</button></Link>
      {/* <Link to={'/cart'}> */}
        <ShoppingCart size={32} className='float-right cursor-pointer m-2.5' onClick={handleShow} />
      {/* </Link> */}
      <div className={show ? '':'hidden'}><Cart handleShow = {handleShow}/></div>
      <hr className='my-6 w-full border-gray-200 sm:mx-auto dark:border-gray-900 lg:my-2' />
      <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4'>{displayProducts}</div>
    </div>
  );
};

export default ProductsList;
