import React from 'react'
import { Link } from 'react-router-dom'
import {  SunIcon, MoonIcon, ShoppingBagIcon } from 'lucide-react'
import { useThemeStore } from '../../hooks/useThemeStore'

export default function Navbar() {
  const { theme, setTheme } = useThemeStore()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <nav className='bg-base-200 border-b border-base-300 sticky top-0 z-30 h-16 flex items-center'>
      <div className='container mx-auto sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between w-full'>
          <div className='pl-5'>
            <Link to={"/"} className='flex items-center gap-2.5'>
              <ShoppingBagIcon className='size-9 text-primary'/>
              <span className='text-3xl font-mono font-bold text-transparent 
                  bg-gradient-to-r from-indigo-500 to-amber-500  bg-clip-text'>
                ShopNest
              </span>
            </Link>
          </div>

          <div className='flex items-center gap-3 sm:gap-4 pr-5'>
            <Link to={'/'} className='font-semibold'>Home</Link>
            <Link to={'/products'} className='font-semibold'>Products</Link>
            <Link to={'/cart'} className='font-semibold'>Cart</Link>

            <button onClick={toggleTheme} className='btn btn-ghost btn-sm'>
              {theme === 'light' ? <MoonIcon className='w-5 h-5' /> : <SunIcon className='w-5 h-5' />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
