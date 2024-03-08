import React from 'react';
import {
  FaDribbbleSquare,
  FaFacebookSquare,
  FaInstagram,
  FaTwitterSquare,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='bg-[#104c4e]'>
      <div className='max-w-[1240px] mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-white'>
      <div>
        <Link to={'/'}><img src="https://res-console.cloudinary.com/ddei3mzex/thumbnails/v1/image/upload/v1709419077/SU1HLTIwMjQwMTA5LVdBMDAwMV9zemoyZmc=/as_is" className="h-4/12 w-3/12 mr-2 cursor-pointer" alt="Fashion Design" /></Link>
        <p className='py-4'>Shop through our application antytime and reach out to us incase of any enquiries.</p>
        <div className='flex justify-between md:w-[75%] my-6'>
        <a href="http://www.facebook.com" ><FaFacebookSquare size={30} /> </a>
        <a href="http://www.instagram.com" ><FaInstagram size={30} /> </a>
        <a href="http://www.twitter.com" ><FaTwitterSquare size={30} /> </a>
        <a href="http://www.dribble.com" ><FaDribbbleSquare size={30} /> </a>
        </div>
      </div>
      <div className='lg:col-span-2 flex justify-between mt-6'>
    <div>
        <h6 className='font-medium text-gray-400'>Solutions</h6>
        <ul>
            <li className='py-2 text-sm'>Analytics</li>
            <li className='py-2 text-sm'>Marketing</li>
            <li className='py-2 text-sm'>Commerce</li>
            <li className='py-2 text-sm'>Insights</li>
        </ul>
    </div>
    <div>
        <h6 className='font-medium text-gray-400'>Support</h6>
        <ul>
            <li className='py-2 text-sm'>Pricing</li>
            <li className='py-2 text-sm'>Documentation</li>
            <li className='py-2 text-sm'>Guides</li>
            <li className='py-2 text-sm'>API Status</li>
        </ul>
    </div>
    <div>
        <h6 className='font-medium text-gray-400'>Company</h6>
        <ul>
            <li className='py-2 text-sm'>About</li>
            <li className='py-2 text-sm'>Blog</li>
            <li className='py-2 text-sm'>Jobs</li>
            <li className='py-2 text-sm'>Press</li>
            <li className='py-2 text-sm'>Careers</li>
        </ul>
    </div>
    <div>
        <h6 className='font-medium text-gray-400'>Legal</h6>
        <ul>
            <li className='py-2 text-sm'>Claim</li>
            <li className='py-2 text-sm'>Policy</li>
            <li className='py-2 text-sm'>Terms</li>
        </ul>
    </div>
      </div>
    </div>

    </div>
    
  );
};

export default Footer;