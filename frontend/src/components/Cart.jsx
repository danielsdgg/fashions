import React from 'react'

const Cart = ({cartItems, handleAddProduct, handleRemoveProduct, handleCartClearance}) => {

    const totalPrice = cartItems.reduce((price, item) => price + item.quantity * item.price, 0);


  return (
    <div className='cart-items'>
        <h2 className='cart-header'>Cart Items</h2>
        <div className='clear-cart'>
            {cartItems.length >= 1 && (
                <button className='clear-button' onClick={handleCartClearance}>
                    Clear Cart
                </button>
            )}
        </div>
        {cartItems.length === 0 && (
            <div className='empty-card'>No Items added</div>
        )}
        <div>
            {cartItems.map((item) =>(
                <div key={item.id} className='cart-list'>
                    <img className='item-image' src={item.image} alt={item.name}/>
                    <div className='item-name'>{item.name}</div>
                    <div className='cart-item-function'>
                        <button className='items-add' onClick={() => handleAddProduct(item)}>+</button>
                        <button className='items-remove' onClick={() => handleRemoveProduct(item)}>-</button>
                    </div>
                    <div className='item-price'>
                        {item.quantity} * Ksh{item.price}

                    </div>
                </div>
            ))}
        </div>
        <div className='items-total-pricename'>
            Total Price
        </div>
        <div className='items-total-price'>Kshs {totalPrice}</div>
    </div>
  )
}

export default Cart