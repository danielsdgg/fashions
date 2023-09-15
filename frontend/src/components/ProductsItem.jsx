import React from 'react'
import { Link } from 'react-router-dom'

function ProductsItem({ name, description, image, price, handleAddProduct}) {
  return (
    <div className=' justify-center items-center'>
        <Link to={'/details'}><img className='cursor-pointer' src={image} alt='name'/></Link>
        <h3 className='text-center font-semibold md:text-2xl sm:text-1xl'>{name}</h3>
        <p className='text-center'>{description}</p>
        <p className='text-center'>Kshs: {price}</p><br></br>

        <button className='cart' onClick={() =>handleAddProduct()}>Add to Cart</button>
        <br></br><br></br>

        <Link to={'/details'}><button className='view'>View More</button></Link>

    </div>
  )
}

export default ProductsItem