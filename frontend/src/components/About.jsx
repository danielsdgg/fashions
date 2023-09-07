import React from 'react';
import Pic from '../assets/clients.jpg'

const About = () => {
  return (
    <div className='w-full bg-slate-400 py-16 px-4'>
        <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
            <img className='w-[500px] mx-auto my-4' src={Pic} alt='/' />
            <div className='flex flex-col justify-center'>
                <h3 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>What Our Clients say about us</h3><br></br>
                <p>"I recently moved into town and tried getting a new apartment. I have met with a couple of Agents and they couldnot provide what i needed, then i came across Alpha Homes; I got a new apartment in less than a week" </p><br></br>
                <p>Mohammed Khalif </p>
            </div>

        </div>

    </div>
  )
}

export default About