import React, {useState} from 'react'

const Addproduct = ({prod,setProd}) => {
    // set initial state for form-data using the usestate hook
    const [formData, setFormdata] = useState({
        name:"",
        description:"",
        image:"",
        price:"",

    })

    // function to handle form submission
    function handleSubmit(e){
        e.preventDefault();

        // create a new-prod object using the form-data
        const newProd = {
            name:formData.name,
            description:formData.description,
            image:formData.image,
            price:formData.price,

        };

        // send a post request to the server with the new-prod data
        fetch("/products",{
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(newProd)
        })
        .then((r) => r.json())
        .then((data) => {
            setProd([...prod,data]);
            // reset the form
            setFormdata({
                name:"",
                description:"",
                image:"",
                price:"",
            })
        })
    }
    console.log(formData)

  return (
    <div className='add-product'>
        <form className='prod-form'>
            <h4 className='text-center font-bold underline md:text-3xl sm:text-2xl text-1xl text-green-900'>Add a Product</h4>

            <label type='text'>Name:</label>
            <input type='text' id='name' placeholder='Name of product' value={formData.name} onChange={(e) => setFormdata({...formData,name:e.target.value})}/>

            <label type='text'>Description:</label>
            <input type='text' id='description' placeholder='product description' value={formData.description} onChange={(e) => setFormdata({...formData,description:e.target.value})}/>

            <label type='text'>Card Image:</label>
            <input type='text' id='image' placeholder='image of the product' value={formData.image} onChange={(e) => setFormdata({...formData,image:e.target.value})}/>

            <label type='text'>Price:</label>
            <input type='number' id='price' placeholder='price of the product' value={formData.price} onChange={(e) => setFormdata({...formData,price:e.target.value})}/>

            <br></br>

            <button className='link-btn' type='submit' onClick={handleSubmit}>Add Product</button>

        </form>
    </div>
  )
}

export default Addproduct