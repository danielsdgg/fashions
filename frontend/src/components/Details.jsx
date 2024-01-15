import React, { useState, useEffect } from 'react'

const Details = () => {

  const [image, setImage] = useState([])
  const data = []
  var image1 = ""
  var image2 = ""
  var image3 = ""

  data.push(image)
  // console.log(data)

  data.map(info => {
    console.log(info)
    console.log(info.images)
    //  info.images.map(image => {
    // console.log(image.image1)
    // image1 = image.image1
    // image2 = image.image2
    // image3 = image.image3
  //})
  })


  //fetching images data 
  useEffect(() => {
    const fetching = async () => {
      const response = await fetch("http://127.0.0.1:8000/images")
      const data = await response.json()
      return setImage(data)
    }
    fetching()
  },[])

  // mapping
  image.images?.map(image => {
    console.log(image.image1)
    image1 = image.image1
    image2 = image.image2
    image3 = image.image3
  })

  return (
    <div className='md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4'>
                  <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
                <img className="w-full" alt={image.name} src={image1} />
                <img className="mt-6 w-full" alt={image.name} src={image2} />
            </div>
            <div className="md:hidden">
                <img className="w-full" alt={image.name} src={image1}/>
                <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src={image1} />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src={image2} />
                    <img alt="img-tag-one" className="md:w-48 md:h-48 w-full" src={image3} />
                    
                </div>
            </div>

    </div>
  )
}

export default Details