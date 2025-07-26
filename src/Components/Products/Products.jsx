import React, { useContext, useState } from 'react';
import useQueryHooks from './../../hooks/useQuery';
import { addProductToCart, getProducts } from '../../lib/api';
import { Link } from 'react-router-dom';
import { SearchIcon, Star } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { CartContext } from '../../Context/cartContext';

export default function Products() {
  const { data: allProducts = [], isError } = useQueryHooks(getProducts);
  const { addToCart } = useContext(CartContext);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortType, setSortType] = useState('');

  const filteredAndSortedProducts = allProducts
    .filter((product) =>
      product.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortType === 'price-low') return a.price - b.price;
      if (sortType === 'price-high') return b.price - a.price;
      if (sortType === 'name-az')
        return a.title.localeCompare(b.title, undefined, { sensitivity: 'base' });
      return 0;
    });

  return (
    <div className="px-4">
      <div className='mx-4 mb-8'>
        <h1 className='text-3xl font-bold mb-1'>Products Gallery</h1>
        <p className='text-sm text-gray-600'>Discover amazing products from our collection</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-8">
        <div className="relative w-full flex-1 max-w-md mx-4">
          <input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>

        <select
          className="p-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg w-full md:w-[15%] mx-4"
          value={sortType}
          onChange={(e) => setSortType(e.target.value)}
        >
          <option value="">Sort By</option>
          <option value="price-low">Price: Low to High</option>
          <option value="price-high">Price: High to Low</option>
          <option value="name-az">Name: A–Z</option>
        </select>
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
        {filteredAndSortedProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className='my-2 product p-2 shadow-lg hover:shadow-lg hover:shadow-blue-500 relative mx-4 mb-4'
          >
            <Link to={`/productdetails/${product.id}`}>
              <img
                src={product.image}
                className='w-full h-[200px]'
                alt={product.title}
              />
              <h3 className='font-bold mb-1 mt-4 ml-3'>
                {product.title.split(" ").slice(0, 1).join(" ")}
              </h3>
              <div className='flex justify-between p-3'>
                <span>{product.price} EGP</span>
                <div className="flex items-center gap-1">
                  <span className="bg-yellow-400 rounded-full p-1 flex items-center justify-center">
                    <Star className="text-white size-5" />
                  </span>
                  <span>{product.rating?.rate}</span>
                </div>
              </div>
            </Link>

            <button
              onClick={() => {
                addToCart(product.id);
                toast.success("Product added successfully");
              }}
              className='btn bg-blue-500 text-white w-full p-2 rounded-lg'
            >
              Add to cart
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
