import React,{useState} from 'react'
import ProductsItem from './ProductsItem'
import {ShoppingCart} from 'phosphor-react'
import { Link } from 'react-router-dom'


const ProductsList = ({product, onSearch}) => {
    console.log(product)
    const [name, setName] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        onSearch(name)
    };

    const displayProducts = product.map(products => {
        var productimage = ""
        products.images?.map(image => {
            productimage = image.image1
            return productimage
        })
        return <ProductsItem key = {products.id} id = {products.id} name = {products.name} description={products.description} image={products.image} price={products.price}/>
    })

  return (
    <div className='bg-gray-300 h-full w-full'>
        <form onSubmit={handleSubmit}>
            <h4 className='font-extrabold md:text-1xl sm:text-1xl italic underline'>search for clothes</h4><br></br>
            <label className='font-semibold' htmlFor='name'>Name: </label>
            <select className='font-bold md:text-1xl sm:text-1xl' name='name' id='name' value={name} onChange={(e) => setName(e.target.value)}>
                <option value=''>Any</option>
                <option value='African'>African</option>
                <option value='Men'>Men</option>
                <option value='Women'>Women</option>
                <option value='Socks'>Socks</option>
                <option value='Hoody'>Hoody</option>
            </select><br></br>
            
            <button className='bg-[#00df9a] w-[100px] rounded-md font-medium my-3 mx-auto py-2 text-black' type='submit'>
              <span>Search</span>
            </button>
        </form><br></br>
        <h3 className='text-center font-bold md:text-4xl sm:text-3xl underline'>Products</h3>
        <Link to={'/cart'}><ShoppingCart size={32} className='float-right cursor-pointer m-2.5'/> </Link>
        <hr className="my-6 w-full border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-9" />
        <div className='grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        {displayProducts}
      </div>
    </div>
  )
}

export default ProductsList