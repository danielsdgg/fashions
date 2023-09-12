import React from 'react'
import { Link } from 'react-router-dom'

function ProductsItem({ name, description, image, price}) {
  return (
    <div className='grid justify-center items-center'>
        <Link to={'/details'}><img className='cursor-pointer' src={image} alt='name'/></Link>
        <h3 className='text-center font-semibold md:text-2xl sm:text-1xl'>{name}</h3>
        <p className='text-center'>{description}</p>
        <p className='text-center'>Kshs: {price}</p><br></br>

        <Link to={'/details'}><button className='bg-[#00df9a] w-[100px] rounded-md font-medium my-4 mx-auto py-3 text-black'>View More</button></Link>

    </div>
  )
}

export default ProductsItem