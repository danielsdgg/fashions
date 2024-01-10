import React from 'react';

const About = () => {
  return (
    <div className="all">
          <div className='w-full bg-white py-16 px-4'>
        <div className='max-w-[100%] mx-auto grid md:grid-cols-2 justify-between '>
            <div className='flex flex-col justify-center text-black'>
            <img className='w-[120px] mx-auto my-4' src='https://i.pinimg.com/736x/63/d9/1f/63d91f8fe7dacece85d70d7833dff18e.jpg' alt='/'/>
            <h2 className='font-bold md:text-2xl sm:text-1xl text-1xl'> Fashion solutions</h2>
                <p>
                We go beyond a simple patch-up but develop lasting solutions through Hero-Cloth-Line. We design and customize outfits.      
                </p>
            </div>
            <div className='flex flex-col justify-center text-black'>
                <img className='w-[120px] mx-auto my-4' src='https://i.pinimg.com/736x/63/d9/1f/63d91f8fe7dacece85d70d7833dff18e.jpg' alt='/'/>
                <h2 className='font-bold md:text-2xl sm:text-1xl text-1xl'>Impact</h2>
                <p>
                    We have made a great impacts with all companies and persons that have come in need of ourservices. The outlooks says it all. We are delighted to serve.      
                </p>
            </div>
        </div>
        
    </div>
    <div className='w-full bg-black py-16 px-12'>
        <div className='max-w-[100%] mx-auto grid md:grid-cols-2'>
          <img className='w-[500px] rounded-3xl mx-auto my-4' src='https://res.cloudinary.com/ddei3mzex/image/upload/v1694210974/fash_qqif6b.jpg' alt='imagery'/>
          <div className='flex flex-col justify-center text-white'>
            <h2 className='font-semibold py-2 md:text-6xl sm:text-3xl text-2xl'>Effortless Search</h2>
            <p>
            Explore a curated selection of fashion designs, clothings for purchase, and services offered to our clients. Our intuitive interface makes finding your ideal taste a breeze.
            </p>
          </div>
        </div>
      </div>

    </div>

  )
}

export default About