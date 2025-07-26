import React, { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { ArrowBigLeft, Star } from 'lucide-react';

import { getProductDetails } from '../../lib/api';
import useQueryHooks from '../../hooks/useQuery';
import { CartContext } from '../../Context/cartContext';
import { useThemeStore } from '../../hooks/useThemeStore';

export default function ProductDetails() {
  const { id } = useParams();
  const { data: singleProduct = {} } = useQueryHooks(() => getProductDetails(id), 'singleProduct');
  const { addToCart } = useContext(CartContext);
  const { theme } = useThemeStore();

  const handleAddToCart = () => {
    addToCart(singleProduct);
    toast.success('Product added to cart!');
  };

  return (
    <>
    <Link to={"/products"} className='mx-8'>
        <button className='btn btn-primary'>
            <ArrowBigLeft/>
            Back to product
        </button>
    </Link>
    
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-10 max-w-7xl mx-auto">
        
      <motion.img
        src={singleProduct.image}
        alt={singleProduct.title}
        className={`w-full h-[700px] object-contain shadow-md rounded-lg p-6 ${
          theme === 'dark' ? 'shadow-gray-900 bg-gray-900' : 'bg-white'
        }`}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      />

      <motion.div
        className="flex flex-col"
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <span
          className={`inline-block w-fit px-3 py-1 text-xs rounded-full font-medium mb-4 ${
            theme === 'dark' ? 'bg-gray-700 text-green-400' : 'bg-gray-100 text-gray-600'
          }`}
        >
          {singleProduct.category}
        </span>

        <h2 className="text-2xl md:text-3xl font-bold mb-3">{singleProduct.title}</h2>

        <div className="flex items-center gap-2 mb-3">
          <Star className="text-yellow-500 size-5" />
          <span className={`${theme === 'dark' ? 'text-green-400' : 'text-gray-800'}`}>
            {singleProduct.rating?.rate}
          </span>
          <span className="text-gray-500 text-sm">({singleProduct.rating?.count} reviews)</span>
        </div>

        <h3 className={`text-2xl font-semibold mb-6 ${theme === 'dark' ? 'text-green-500' : 'text-black'}`}>
          ${singleProduct.price}
        </h3>

        <div className="mb-6 border p-4">
          <h4 className="text-lg font-semibold mb-2">Description</h4>
          <p className="text-gray-600 leading-relaxed tracking-wide">
            {singleProduct.description}
          </p>
        </div>
        <span className='text-lg font-semibold mb-4'>Product Details</span>
        <div className='flex justify-between items-center gap-2 mb-4'>
        <div className='shadow-lg w-1/2 p-6 flex flex-col'>
            <span className='text-gray-500 text-sm'>Category</span>
            <span className='text-lg font-semibold'>{singleProduct.category}</span>
        </div>
        <div className='shadow-lg w-1/2 p-6 flex flex-col'>
            <span className='text-gray-500 text-sm'>Rating</span>
            <span className='text-lg font-semibold'>
            {singleProduct.rating?.rate}/5
            </span>
        </div>
        </div>

        <div>
          <button
            onClick={handleAddToCart}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
          >
            Add to Cart
          </button>
        </div>
      </motion.div>
    </div>
    </>
  );
}
