import { div, h2 } from 'framer-motion/client'
import { h1 } from 'framer-motion/m'
import React from 'react'
import products from '../data/products'

const CartItem = ({product}) => {
  return (
    
    <div className='flex  h-36 flex-row'>
        <div className=''>
            <img src={product.imageUrl} className='h-[110px] rounded-md' />
        </div>
        <div>
            <h3 className=''>{product.name}</h3>

        </div>
        <hr className='text-gray-300 shadow mx-2'/>
    </div>

        
  )
}

export default CartItem