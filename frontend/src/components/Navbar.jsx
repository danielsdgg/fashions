import React, { useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => {
    setNav(!nav);
  };

  return (
    <div className='flex justify-between items-center h-24 w-full mx-auto px-4 text-white bg-[#104c4e]'>
        <img src="https://img.freepik.com/free-vector/flat-design-clothing-store-logo-design_23-2149496415.jpg" className="h-8 mr-2 cursor-pointer" alt="Fashion Design" />
      <span className="w-full text-2xl font-semibold whitespace-nowrap dark:text-white cursor-pointer">FASHION DEALERS</span>
      <ul className='hidden md:flex'>
        <Link to={'/'}><li className='p-4 cursor-pointer'>Home</li></Link>
        <Link to={'/products'}><li className='p-4 cursor-pointer'>Products</li></Link>
        <li className='p-4 cursor-pointer'>Design</li>
        <li className='p-4 cursor-pointer'>About</li>
        <Link to={'/profile'}><li className='p-4 cursor-pointer'>Profile</li></Link>
      </ul>
      <div onClick={handleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[80%] h-fit border-r border-r-gray-200 bg-[#104c4e] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
      <img src="https://img.freepik.com/free-vector/flat-design-clothing-store-logo-design_23-2149496415.jpg" className="h-8 mr-2 cursor-pointer" alt="Fashion Design" />
      <span className="w-full text-2xl font-semibold whitespace-nowrap dark:text-white cursor-pointer">FASHION DEALERS</span><br></br>
      <Link to={'/'}><li className='p-4 cursor-pointer border-b border-gray-600'>Home</li></Link>
      <Link to={'/products'}><li className='p-4 cursor-pointer border-b border-gray-600'>Products</li></Link>
          <li className='p-4 cursor-pointer border-b border-gray-600'>Design</li>
          <li className='p-4 cursor-pointer border-b border-gray-600'>About</li>
          <Link to={'/profile'}><li className='p-4 cursor-pointer border-b border-gray-600'>Profile</li></Link>
      </ul>
    </div>
  );
};

export default Navbar;