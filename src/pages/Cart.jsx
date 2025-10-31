import React, { useState } from 'react'
import CartItem from '../components/CartItem'
import { div, h1 } from 'framer-motion/client'
import products from '../data/products'



const Cart = () => {
    const [isEmpty,setIsEmpty] = useState(true)
    let itemCount = 0
    let price = 0;

  return (

    <div className=' flex mx-auto min-h-screen'>
       <div className=' justify-center items-center bg-amber-50 my-6 min-h-min  lg:w-6xl  '> 
        {
            isEmpty?
            <div className='flex justify-between '>
                <div>
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTt1ZYFPzkdoZoCN7CRWUXMDAiQOhb4GP1g2w&s" alt="" />
                </div>
                <div className='mx-auto p-4 items-center'>
                    <div className='p-6'>
                        <h2 className='text-3xl mx-auto '>Cart is Empty</h2>

                    </div>
                   
                    <div className="flex justify-around gap-5">
                        <button className='bg-yellow-400 px-6 py-2 rounded-xl'>Sign In</button>
                        <button className='bg-yellow-400 px-6 py-2 rounded-xl'>Shop</button>
                    </div>
                </div>
            </div>:
            <>
            <h2 className='text-3xl p-4'>
                Shopping Cart
            </h2>
                <hr className='text-gray-300 shadow mx-2'/>

                <div className='flex px-4 py-3 flex-col'>

                    { products.map((p) => {
                        if (p.cart) { 
                            price = price + p.currentPrice;
                            itemCount= itemCount + 1;
                            return <CartItem key={p.id} product={p} />
                            
                        }
                        
                    })}

                </div>
                <hr className='text-gray-300 shadow mx-2'/>
                <div className="flex justify-between">
                    <div className='p-4 text-xl' >
                        <span>Subtotal ({itemCount} item): 
                            <span>
                                ₹{price}
                            </span>
                        </span>
                    </div>

                    <div className='my-auto px-4'> 
                        <button className='bg-yellow-400 rounded-xl px-6 py-2' >
                            Place Order
                        </button>
                </div>
            </div>
            </>
            
            
        }
        
        
       </div>
    </div>
  )
}

export default Cart