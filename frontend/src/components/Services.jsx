import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const Services = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [message, setMessage] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        fetch("/services",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({name:name, email:email, message:message})
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
    }



  return (
    <>
    <Navbar/>
    <div className='all'>

        {/* First Section */}
        <div className='w-full bg-black py-16 px-4'>
            <div className='max-w-[100%] mx-auto grid md:grid-cols-2 justify-between '>
                <div className='flex flex-col justify-center text-white'>
                    <img className='w-[120px] mx-auto my-4' src='https://i.pinimg.com/736x/63/d9/1f/63d91f8fe7dacece85d70d7833dff18e.jpg' alt='/'/>
                    <h2 className='font-bold md:text-2xl sm:text-1xl text-1xl'> Fashion solutions</h2>
                    <p>We go beyond a simple patch-up but develop lasting solutions through Hero-Cloth-Line. We design and customize outfits.</p>
                </div>
                <div className='flex flex-col justify-center text-white'>
                    <img className='w-[120px] mx-auto my-4' src='https://i.pinimg.com/736x/63/d9/1f/63d91f8fe7dacece85d70d7833dff18e.jpg' alt='/'/>
                    <h2 className='font-bold md:text-2xl sm:text-1xl text-1xl'>Impact</h2>
                    <p>We have made a great impacts with all companies and persons that have come in need of ourservices. The outlooks says it all. We are delighted to serve.</p>
                </div>
            </div>
        
        </div>

        {/* Second section */}
        <div className='max-w-[full] bg-gray-400 m-auto w-full p-4 py-8'>
        <h3 className='text-center font-extrabold py-2 md:text-3xl sm:text-3xl text-2xl'>In need of our Services? Fill out the form to reach us or shoot an email to gathigidg26@gmail.com</h3><br></br>
        <div className='grid md:grid-cols-2'>
          <img src='https://www.fabusse.com/wp-content/uploads/2019/07/How-important-is-a-fashion-service-provider-01.jpg' alt='/'
          className='w-full md:h-full object-cover p-2 max-h-[680px] h-[310px]'/>
          <form onSubmit={handleSubmit}>
            <div className=' grid grid-cols-2'>
              <input className=' border m-2 p-2' value={name} onChange={(e) => setName(e.target.value)} type='text' placeholder='name'/>
              <input className=' border m-2 p-2' value={email} type='email' onChange={(e) => setEmail(e.target.value)} placeholder='Email'/>
              <textarea className='border col-span-2 m-2 p-2' cols='30' rows='10' value={message} onChange={(e) => setMessage(e.target.value)} placeholder='enter feedback'></textarea>
              <button className='subbb'>submit</button>
            </div>
          </form>
        </div>
    </div>

    {/* Third Section */}
    <div className='w-full bg-violet-200 text-black py-16 px-4 text-center md:text-6xl sm:text-3xl text-3xl'>
        <p>Become part of our mission and join<b> Hero-Cloth-Line</b></p>
    </div>

    </div>
    <Footer/>
    </>
  )
}

export default Services