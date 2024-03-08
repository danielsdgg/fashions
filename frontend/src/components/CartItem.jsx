import React from 'react'

const CartItem = ({id,name, description, price, image, quantity, total_price, updateCart}) => {

    const handleDelete = () => {
        fetch(`/cart/${id}`,{
            method:"DELETE",
            headers:{"Content-Type":"application/json", "Accept":"application"},
        })
        .then(r => {
            if (r.status === 200){
                // getCart()
                r.json()
            }
        })
    }

  return (
    <li className="flex py-6">
    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
      <img src={image} alt={name} className="h-full w-full object-cover object-center" />
    </div>
    <div className="ml-4 flex flex-1 flex-col">
      <div>
        <div className="flex justify-between text-base font-medium text-gray-900">
          <h3>
            {name}
          </h3>
          <p className="ml-4">{price}</p>
        </div>
        <p className="mt-1 text-sm text-gray-500">{description}</p>
      </div>
      <div className="flex flex-1 items-end justify-between text-sm">
        <p className="text-gray-500">{quantity}</p>
        <div className="flex">
          <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={handleDelete}>Remove</button>
        </div>
      </div>
    </div>
  </li>
  )
}

export default CartItem