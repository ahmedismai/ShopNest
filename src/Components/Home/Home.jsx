import React from 'react'
import { ShoppingBag, Users, Star, Boxes } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-10">
      <motion.section
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
          Welcome to ShopNest 🛒
        </h1>
        <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
          Discover a seamless shopping experience with our curated product collection,
          sorted and filtered to your liking.
        </p>
        <Link to="/products" className="mt-6 btn btn-primary btn-wide">
          Browse Products
        </Link>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {[
          { icon: ShoppingBag, title: '100+ Products', desc: 'Across all major categories' },
          { icon: Users, title: '1K+ Customers', desc: 'Happy shoppers and counting' },
          { icon: Star, title: '4.5+ Rating', desc: 'Average product reviews' },
          { icon: Boxes, title: 'Fast Delivery', desc: 'Reliable and quick shipping' },
        ].map(({ icon: Icon, title, desc }, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="card bg-base-200 shadow-md p-6 text-center"
          >
            <Icon className="mx-auto h-8 w-8 text-primary mb-3" />
            <h3 className="text-xl font-semibold">{title}</h3>
            <p className="text-sm text-base-content/70">{desc}</p>
          </motion.div>
        ))}
      </motion.section>

      <motion.section
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto bg-base-200 p-6 sm:p-10 rounded-2xl shadow-lg"
      >
        <h2 className="text-3xl font-semibold text-secondary mb-4">Who We Are</h2>
        <p className="text-base-content/80 leading-relaxed">
          ShopNest is your go-to online marketplace, built with love and passion for providing
          high-quality products and an amazing customer experience. Whether you're shopping for the
          latest gadgets, stylish fashion, or unique home decor — we’ve got you covered.
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-primary text-primary-content p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-1">High Quality</h3>
            <p className="text-sm">Every product is carefully selected for excellence.</p>
          </div>
          <div className="bg-secondary text-secondary-content p-4 rounded-xl shadow-md">
            <h3 className="text-xl font-bold mb-1">Fast Delivery</h3>
            <p className="text-sm">Get your orders quickly with reliable shipping.</p>
          </div>
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mt-16"
      >
        <h3 className="text-2xl font-bold mb-4">Ready to start shopping?</h3>
        <Link to="/products" className="btn btn-secondary btn-wide">
          Explore Now
        </Link>
      </motion.section>
    </main>
  )
}
