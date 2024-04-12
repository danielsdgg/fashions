import React from 'react'
import { Link } from 'react-router-dom'

function ProductsItem({  name, description, image, price, handleAddtoCart, handleDelete}) {
  const quantity = 1
  const total = quantity * price

  return (
    <div className=' cadii hover:scale-110 duration-700'> {/* hover:scale-90 duration-700 */}
        <img className=' imagee cursor-pointer' src={image} alt='name'/>
        <h3 className='text-center font-normal md:text-2xl sm:text-1xl'>{name}</h3>
        <p className='text-center font-light'>{description}</p>
        <p className='text-center p-2 font-extrabold'>Kshs: {price}</p><br></br>

        <Link to={''}><button onClick={() => handleAddtoCart(name,description,price,image,quantity,total)} className='carttt'>Add to Cart</button> </Link>
        <br></br><br></br>

        <button className='view'>Update Product</button>
        <br></br><br></br>

        <Link to={''}><button onClick={() => handleDelete()} className='del'>Delete Product</button></Link>

    </div>
  )
}

export default ProductsItem