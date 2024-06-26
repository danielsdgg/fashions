import React from 'react';
import First from './Homepage/First';
import Navbar from './Navbar';
import Footer from './Footer';


const Home = () => {
  return (
    <>
    <Navbar/>
    <div>
      <div className="first">
        <First/>
      </div>

      {/* Second section of homepage */}
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

      {/* Third section of the homepage */}
      <div className='w-full bg-gray-300 py-16 px-16'>
        <div className='max-w-[100%] mx-auto grid md:grid-cols-2'>
            <div className='flex flex-col justify-center text-black'>
                <h2 className='font-semibold py-2 md:text-6xl sm:text-3xl text-2xl'>Message from our CEO:</h2>
                <p>
                    Hero-Cloth-Line has one shared objective; To unlock the true potential of individuals, teams, and the community. We believe strongly in the power of sharing ideas and continuously strive to grow each other and ourselves.
                    <p>Internally, but also within the larger communities in which we are active. I am excited to be launching this website since it will connect us more to our clients. We are here to serve you. Enjoy..!</p>
                </p>
            </div>
            <img className='w-[500px] mx-auto rounded-3xl my-4' src='https://res.cloudinary.com/ddei3mzex/image/upload/v1709418342/CEO_arkrdk.jpg' alt='mind'/>

        </div>
    </div>

    {/* Fourth section of the homepage */}
    <div className='w-full bg-violet-200 text-black py-16 px-4 text-center md:text-6xl sm:text-3xl text-3xl'>
        <p>Become part of our mission and join<b> Hero-Cloth-Line</b></p>
    </div>
    </div>
    <Footer />
    </>
  )
}

export default Home