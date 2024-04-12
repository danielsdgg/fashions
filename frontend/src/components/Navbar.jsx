import React, { useContext, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Navbar = ({title}) => {
  const [nav, setNav] = useState(false);
  const [token, setToken] = useContext(UserContext);

  const handleNav = () => {
    setNav(!nav);
  };

  const handleLogout = () => {
    setToken(null);
  }

  return (
    <div className='flex justify-between items-center h-24 w-full mx-auto px-4 text-white bg-[#104c4e]'>
      <Link to={'/'}> <img src="https://res-console.cloudinary.com/ddei3mzex/thumbnails/v1/image/upload/v1709419077/SU1HLTIwMjQwMTA5LVdBMDAwMV9zemoyZmc=/as_is" className="h-8 mr-2 cursor-pointer" alt="Fashion Design" /></Link>
      <span className="w-full text-2xl font-semibold whitespace-nowrap text-white cursor-pointer">Hero-Cloth-line</span>
      <ul className='hidden md:flex'>
        <Link to={'/home'}><li className='text-white p-4 cursor-pointer'>Home</li></Link>
        <Link to={'/products'}><li className='text-white p-4 cursor-pointer'>Products</li></Link>
        <Link to={'/design'}><li className='text-white p-4 cursor-pointer'>Design</li></Link>
        <Link to={'/services'}><li className='text-white p-4 cursor-pointer'>Services</li></Link>
        <Link to={'/about'}><li className='text-white p-4 cursor-pointer'>About</li></Link>
        <li className='text-white p-4 cursor-pointer'>Profile</li>
      </ul>
      <div className="has-text-centered m-6">
        <h1 className="title">{title}</h1>
        {token && (
          <button className='button' onClick={handleLogout}>
            Logout
          </button>
        )}
      </div>
      <div onClick={handleNav} className='block md:hidden cursor-pointer'>
          {nav ? <AiOutlineClose size={20}/> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'fixed left-0 top-0 w-[80%] h-fit border-r border-r-gray-200 bg-[#104c4e] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
      <img src="https://res.cloudinary.com/ddei3mzex/image/upload/v1699436420/Image_169h9387811877_zqgrpu.jpg" className="h-8 mr-2 cursor-pointer" alt="Fashion Design" />
      <span className="w-full text-2xl font-semibold whitespace-nowrap dark:text-white cursor-pointer">Hero-Cloth-line</span><br></br>
      <Link to={'/home'}><li className='text-white p-4 cursor-pointer border-b border-gray-600'>Home</li></Link>
      <Link to={'/products'}><li className='text-white p-4 cursor-pointer border-b border-gray-600'>Products</li></Link>
      <Link to={'/design'}><li className='text-white p-4 cursor-pointer border-b border-gray-600'>Design</li></Link>
      <Link to={'/services'}><li className='text-white p-4 cursor-pointer'>Services</li></Link>
      <Link to={'/about'}><li className='text-white p-4 cursor-pointer border-b border-gray-600'>About</li> </Link>
      <li className='text-white p-4 cursor-pointer'>Profile</li>
      </ul>
    </div>
  );
};

export default Navbar;