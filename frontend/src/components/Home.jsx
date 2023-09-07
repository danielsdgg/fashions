import React from 'react';
import Typed from 'react-typed';

const Home = () => {
  return (
    <div className='text-white'>
        <img src='https://i.pinimg.com/1200x/25/ea/21/25ea21d75edbbcbd8f3c002c0c3a09e6.jpg' alt='/' 
            className='w-full h-full object-cover' />
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          First Impression Matters
        </p>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Fast, flexible financing for
          </p>
          <Typed
          className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2 text-green-900'
            strings={['STYLE', 'SWAG', 'LOOKS']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Monitor your data analytics to increase revenue for BTB, BTC, & SASS platforms.</p>
        <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
      </div>
    </div>
  );
};

export default Home;