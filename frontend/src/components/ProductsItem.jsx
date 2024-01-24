import React from 'react'
import { Link } from 'react-router-dom'

function ProductsItem({ id, name, description, image, price, handleAddProduct}) {
  return (
    <div className=' cadii '> {/* hover:scale-90 duration-700 */}
        <Link to={`/details/${id}`}><img className='cursor-pointer' src={image} id='imaging1' alt='name'/></Link>
        <h3 className='text-center font-normal md:text-2xl sm:text-1xl'>{name}</h3>
        <p className='text-center font-light'>{description}</p>
        <p className='text-center p-2 font-extrabold'>Kshs: {price}</p><br></br>

        <button onClick={() => handleAddProduct()} className='cart'>Add to Cart</button>
        <br></br><br></br>

        <Link to={`/details/${id}`}><button className='view'>View More</button></Link>

    </div>
  )
}

export default ProductsItem