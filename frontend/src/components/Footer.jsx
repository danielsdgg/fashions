import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
<footer className="bg-black-to-red rounded-lg shadow dark:bg-[#104c4e] m-4">
  <div className="w-full m-auto max-w-screen-xl mx-auto p-4 md:py-8">
    <div className="sm:flex sm:items-center sm:justify-between">
      <p className="flex items-center mb-4 sm:mb-0">
        <img src="https://res.cloudinary.com/ddei3mzex/image/upload/v1694214858/designn_ntpgtd.avif" className="h-8 mr-3" alt="Flowbite Logo" />
        <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">FASHION DEALERS</span>
      </p>
      <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
        <li className="mr-4 hover:underline md:mr-6 cursor-pointer">About
        </li>
        <Link to={'/guide'}><li className="mr-4 hover:underline md:mr-6 cursor-pointer">App-Guide
        </li></Link>
        <li className="mr-4 hover:underline md:mr-6 cursor-pointer">Licensing
        </li>
        <li className="hover:underline cursor-pointer">Contact
        </li>
      </ul>
    </div>
    <hr className="my-6 w-full border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
    <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 fashion-dealers. All Rights Reserved.</span>
  </div>
</footer>
  )
}

export default Footer