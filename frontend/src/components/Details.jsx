import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Details = (handleDelete) => {

  const {name} = useParams()
  const [show2, setShow2] = useState(false);

  const [image, setImage] = useState([])
  const data = []
  var image1 = ""
  var image2 = ""
  var image3 = ""

  data.push(image)


  //fetching images data 
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(`http://127.0.0.1:8000/product/${name}`)
      const data = await response.json()
      return setImage(data)
    }
    fetching()
  },[name])
  console.log(name)

  // mapping
  image.images?.map(image => {
    console.log(image.image1)
    image1 = image.image1
    image2 = image.image2
    image3 = image.image3
  })

  return (
    <div className='w-full bg-gray-300 py-16 px-16'>
      <div className="max-w-[100%] mx-auto grid md:grid-cols-3">
        <div className="flex flex-col justify-center"><img className="mt-3 w-[500px] h-100 mx-auto rounded-3xl my-4 " alt={image.name} src={image1} /></div>
        <div className="flex flex-col justify-center md:ml-3"><img className="mt-3 w-[500px] h-100 mx-auto rounded-3xl my-4" alt={image.name} src={image2} /></div>
        <div className="flex flex-col justify-center md:ml-3"><img className="mt-3 w-[500px] h-100 mx-auto rounded-3xl my-4 " alt={image.name} src={image3} /></div>
      </div> <br></br>
      <div className="flex flex-col justify-center bg-slate-300">
        <div className="border-b border-gray-200 pb-6">
          {/* <p className="text-sm leading-none text-gray-600">{product.name}</p> */}
          <h1 className="text-center lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2 ">
            {image.name}
          </h1>
          <hr className='my-6 w-[100%] border-gray-500 sm:mx-auto dark:border-gray-900 lg:my-2' />
        </div>
        <div>
          <div className="border-b py-4 border-gray-200">
            <div onClick={() => setShow2(!show2)} className="flex justify-between items-center cursor-pointer">
              <p className="text-base leading-4 text-gray-800">Description</p>
              <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded ml-4" aria-label="show or hide">
                <svg className={"transform " + (show2 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show2 ? "block" : "hidden")}>
              {image.description}
            </div>
            <hr className='my-6 w-full border-gray-500 sm:mx-auto dark:border-gray-900 lg:my-2' />
            <div onClick={() => setShow2(!show2)} className="flex justify-between items-center cursor-pointer">
              <p className="text-base leading-14 text-gray-800">Price</p>
              <button className="cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 rounded" aria-label="show or hide">
                <svg className={"transform " + (show2 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show2 ? "block" : "hidden")}>
              {image.price}
            </div>
          </div>
        </div>
      </div> <br></br>

      <div className="justify-center grid md:grid-cols-2">
        <div className="float-left max-md:px-2, max-[360px]:py-1, min-2xl:border sm:120px"><button className=' edt  bg-[#3582a7] w-[200px] rounded-md font-medium py-2 text-black md:block'>Edit Product</button></div>

        <div className="float-right max-md:px-2, max-[360px]:py-1, min-2xl:border sm:120px"><button className=' dlt  bg-[#c44949] w-[200px] rounded-md font-medium py-2 text-black md:block' onClick={handleDelete}>Delete Product</button></div>
      </div>

    </div>
  )
}

export default Details