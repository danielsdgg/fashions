import React from 'react';
import Typed from 'react-typed';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className='text-white'>
    <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
      <p className='text-green-500 font-bold p-2'>
        First Impression Matters
      </p>
      <div className='flex justify-center items-center'>
        <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4 text-gray-500'>
            We'll get you started on
        </p>
        <Typed
        className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 text-green-500'
          strings={['STYLE', 'SWAG', 'LOOKS']}
          typeSpeed={120}
          backSpeed={140}
          loop
        />
      </div>
      <p className='md:text-2xl text-xl font-bold text-gray-500'>Indeed Fashion is the armor to survive the reality of everyday life.</p>
      <Link to={'/products'}><button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button></Link>
    </div>
  </div>
  );
};

export default Home;