import React, {useState} from 'react'

const Addproduct = ({prod,setProd}) => {
    // set initial state for form-data using the usestate hook
    const [formData, setFormdata] = useState({
        name:"",
        description:"",
        image:"",
        price:"",
        image1:"",
        image2:"",
        image3:""
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
            image1:formData.image1,
            image2:formData.image2,
            image3:formData.image3,
        };

        // send a post request to the server with the new-prod data
        fetch("http://127.0.0.1:8000/add_product",{
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
                image1:"",
                image2:"",
                image3:""
            })
        })
    }
    console.log(formData)

  return (
    <div className='add-product'>
        <form className='prod-form'>
            <h4 className='text-center font-bold underline'>Add a Product</h4>

            <label type='text'>Name:</label>
            <input type='text' id='name' value={formData.name} onChange={(e) => setFormdata({...formData,name:e.target.value})}/>

            <label type='text'>Description:</label>
            <input type='text' id='description' value={formData.description} onChange={(e) => setFormdata({...formData,description:e.target.value})}/>

            <label type='text'>Card Image:</label>
            <input type='text' id='image' value={formData.image} onChange={(e) => setFormdata({...formData,image:e.target.value})}/>

            <label type='text'>Price:</label>
            <input type='number' id='price' value={formData.price} onChange={(e) => setFormdata({...formData,price:e.target.value})}/>

            <label type='text'>First image:</label>
            <input type='text' id='image1' value={formData.image1} onChange={(e) => setFormdata({...formData,image1:e.target.value})}/>

            <label type='text'>Second image:</label>
            <input type='text' id='image2' value={formData.image2} onChange={(e) => setFormdata({...formData,image2:e.target.value})}/>

            <label type='text'>Third image:</label>
            <input type='text' id='image3' value={formData.image3} onChange={(e) => setFormdata({...formData,image3:e.target.value})}/>

            <br></br>

            <button className='ad-btn' type='submit' onClick={handleSubmit}>Add Product</button>

        </form>
    </div>
  )
}

export default Addproduct