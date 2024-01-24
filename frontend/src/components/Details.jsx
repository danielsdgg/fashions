import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const Details = () => {

  const {id} = useParams()
  const [show2, setShow2] = useState(false);


  const [image, setImage] = useState([])
  const data = []
  var image1 = ""
  var image2 = ""
  var image3 = ""

  data.push(image)
  console.log(id)

  // data.map(info => {
  //   console.log(info)
  //   console.log(info.images)
  //   //  info.images.map(image => {
  //   // console.log(image.image1)
  //   // image1 = image.image1
  //   // image2 = image.image2
  //   // image3 = image.image3
  // //})
  // })


  //fetching images data 
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch(`http://127.0.0.1:8000/product/${id}`)
      const data = await response.json()
      return setImage(data)
    }
    fetching()
  },[id])

  // mapping
  image.images?.map(image => {
    console.log(image.image1)
    image1 = image.image1
    image2 = image.image2
    image3 = image.image3
  })

  return (
    <div className='max-w-[100%]'>

      <div className="max-w-[100%] mx-auto grid md:grid-cols-3">
      <img className="" alt={image.name} src={image1} />
        <img className="mt-3 " alt={image.name} src={image2} />
        <img className="mt-3" alt={image.name} src={image3} />
      </div>
      <br></br>
      <div className="flex flex-col justify-center items-center bg-slate-200">
                <div className="border-b border-gray-200 pb-6">
                    {/* <p className="text-sm leading-none text-gray-600">{product.name}</p> */}
                    <h1 className="lg:text-2xl text-xl font-semibold lg:leading-6 leading-7 text-gray-800 mt-2 ">
                        {image.name}
                    </h1>
                </div>
                <div className="max-w-[100%] mx-auto grid items-center justify-between">
                </div>

                <div>
                    <div className="border-b py-4 border-gray-200">
                        <div onClick={() => setShow2(!show2)} className="flex justify-between items-center cursor-pointer">
                            <p className="text-base leading-4 text-gray-800">Description</p>
                            <button
                                className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                                aria-label="show or hide"
                            >
                                <svg className={"transform " + (show2 ? "rotate-180" : "rotate-0")} width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9 1L5 5L1 1" stroke="#4B5563" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </button>
                        </div>
                         <div className={"pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " + (show2 ? "block" : "hidden")} id="sect">
                            {image.description}
                        </div> 
                    </div>
                </div>
                {/* <button className='bg-[#ed3e3e] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black' onClick={handleDelete}>Delete Property</button> */}
            </div> <br></br>


    </div>
  )
}

export default Details