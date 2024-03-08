import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Order = ({addShipping}) => {

    const [shipping, setShipping] = useState({
        full_name:"",
        address:"",
        city:""
    })

    const handleSubmit = (e) => {
        e.preventDefault()
        addShipping(shipping)
    }

    const handleChange = (e) => {
        const input = e.target.id
        const value = e.target.value

        setShipping(prev => {return {...prev, [input]:value}})
    }

  return (
    <div className="card">
    <div className="row d-flex justify-content-center">
    <div className="col-md-7 col-lg-8">
        <div className="card mb-4">
          <div className="card-header py-3">
            <h4 className="text-center md:text-4xl sm:text-3xl text-3xl">Shipping Address</h4>
          </div>
          <div className="card-body">
            <form className="needs-validation" noValidate onSubmit={handleSubmit}>
              <div className="row g-3">
              <div className="col-sm-6 my-1">
                  <label className="form-label">
                    Enter your Full names
                  </label>
                  <input type="text" className="form-control" id="full_name" placeholder="John doe" value={shipping.full_name} required onChange={handleChange}/>
                  <div className="invalid-feedback">
                    
                  </div>
                </div>

                <div className="col-12 my-1">
                  <label className="form-label">
                    Address
                  </label>
                  <input type="text" className="form-control" id="address" placeholder="1234 Main St" value={shipping.address} required onChange={handleChange}/>
                  <div className="invalid-feedback">

                  </div>
                </div>



                <div className="col-sm-6 my-1">
                  <label className="form-label">
                   Choose City
                  </label>
                  <br />
                  <select className="form-select" id="city" value={shipping.city} required onChange={handleChange}>
                    <option value="">Choose...</option>
                    <option>Nairobi</option>
                    <option>Thika</option>
                    <option>Kiambu</option>
                    <option>Rongai</option>
                  </select>
                  <div className="invalid-feedback">
            
                  </div>
                </div>
              </div>
              <hr className="my-4" />            

              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                    <Link to={''}>
                        <button type="button" className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            Save
                            <span aria-hidden="true"> →</span>
                        </button>
                    </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    
    </div>
  </div>
    
  )
}
// 0725835804
// arnold.martin@moringaschool.com

export default Order