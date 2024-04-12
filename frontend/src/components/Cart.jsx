import React, { useEffect, useState } from 'react';
import CartItem from './CartItem';
import { Link, useParams } from 'react-router-dom';

const Cart = ({ handleShow }) => {
    const [products, setProduct] = useState([]);

    const { id } = useParams();

    useEffect(() => {
        getCart();
    }, []);

    const getCart = async () => {
        const response = await fetch('/cart');
        const data = await response.json();
        setProduct(data);
    };

    const updateCart = (name, description, price, image, quantity, total_price) => {
        const product = {
            name: name,
            description: description,
            price: price,
            image: image,
            quantity: quantity,
            total_price: total_price
        };

        fetch(`/cart/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        })
        .then(r => {
            if (r.status === 200) {
                getCart();
                return r.json();
            }
        });
    };

    let grandTotal = 0;
    if (Array.isArray(products) && products.length > 0) {
        grandTotal = products.reduce((accumulator, currentValue) => accumulator + currentValue.price, 0);
    }

    const displayCart = Array.isArray(products) ? products.map(item => (
        <CartItem
            key={item.id}
            id={item.id}
            image={item.image}
            description={item.description}
            name={item.name}
            price={item.price}
            updateCart={updateCart}
            quantity={item.quantity}
            total_price={item.total_price}
        />
    )) : null;

    // Check if the cart is empty
    const isCartEmpty = !Array.isArray(products) || products.length === 0;

    return (
        <div className="relative z-10" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            <div className="fixed inset-0 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                        <div className="pointer-events-auto w-screen max-w-md">
                            <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h2>
                                        <div className="ml-44 flex h-7 items-center">
                                            <button type="button" className="relative -m-2 p-2 text-gray-400 hover:text-gray-700" onClick={handleShow}>
                                                <span className="absolute -inset-0.5" />
                                                <span className="sr-only">Close panel</span>
                                                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul className="-my-6 divide-y divide-gray-200">
                                                {displayCart}
                                            </ul> 
                                        </div>
                                    </div>
                                </div>
                                <form>
                                    <p className='text-center font-semibold'>SHIPPING</p>
                                    <select>
                                        <option className="text-muted">Standard-Delivery- Kshs. 250</option>
                                    </select>
                                </form>
                                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                        <p>Subtotal</p>
                                        <p>Kshs. {grandTotal}</p>
                                    </div>
                                    <p className="mt-0.5 text-sm text-gray-500">Shipping and taxes are calculated at checkout.</p>
                                    <div className="mt-6">
                                        <Link to="/order">
                                            <button 
                                                className={`w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 ${isCartEmpty && 'cursor-not-allowed bg-gray-300'}`}
                                                disabled={isCartEmpty}
                                            >
                                                Checkout
                                            </button>
                                        </Link>
                                    </div>
                                    <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                        <p>
                                            {isCartEmpty ? (
                                                "Your cart is empty."
                                            ) : (
                                                <>
                                                    or
                                                    <Link to="/products">
                                                        <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500" onClick={handleShow}>
                                                            ← Continue Shopping
                                                        </button>
                                                    </Link>
                                                </>
                                            )}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
