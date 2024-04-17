import React from 'react'

const First = () => {
  return (
    <div className='w-full bg-gray-300 py-16 px-12'>
        <div className='max-w-[100%] mx-auto grid md:grid-cols-2'>
            <div className='flex flex-col justify-center text-black'>
                <h2 className='font-semibold py-2 md:text-6xl sm:text-3xl text-2xl'>Fashion and designs corporate</h2>
                <p>Welcome to your no:1 fashion and designs store. Here we got all you need.
                  <p> Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                   Beatae cum excepturi ad, itaque repellendus quibusdam rem voluptatum quae ullam, reprehenderit ratione aspernatur doloremque qui assumenda nihil officia, fugiat exercitationem autem?</p>

            </div>
            <img className='w-[500px] mx-auto rounded-3xl my-4' src='https://res.cloudinary.com/ddei3mzex/image/upload/v1709419077/IMG-20240109-WA0001_szj2fg.jpg' alt=''/>
        </div>
    </div>
  )
}

export default First