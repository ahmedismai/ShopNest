import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  SunIcon,
  MoonIcon,
  ShoppingBagIcon,
  MenuIcon,
  XIcon,
} from 'lucide-react'
import { useThemeStore } from '../../hooks/useThemeStore'

export default function Navbar() {
  const { theme, setTheme } = useThemeStore()
  const [isScrolled, setIsScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const toggleMenu = () => setMenuOpen((prev) => !prev)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 z-30 w-full transition-all duration-300 ${
        isScrolled ? 'bg-base-200/80 backdrop-blur-sm shadow-md' : 'bg-base-200'
      } border-b border-base-300 h-16 flex items-center`}
    >
      <div className='container mx-auto sm:px-6 lg:px-8'>
        <div className='flex items-center justify-between w-full px-4'>
          <Link to={'/'} className='flex items-center gap-2.5'>
            <ShoppingBagIcon className='size-9 text-primary' />
            <span className='text-3xl font-mono font-bold text-transparent bg-gradient-to-r from-indigo-500 to-amber-500 bg-clip-text'>
              ShopNest
            </span>
          </Link>

          <div className='hidden sm:flex items-center gap-3'>
            <Link to='/' className='font-semibold'>
              Home
            </Link>
            <Link to='/products' className='font-semibold'>
              Products
            </Link>
            <Link to='/cart' className='font-semibold'>
              Cart
            </Link>
            <button onClick={toggleTheme} className='btn btn-ghost btn-sm'>
              {theme === 'light' ? <MoonIcon className='w-5 h-5' /> : <SunIcon className='w-5 h-5' />}
            </button>
          </div>

          <div className='sm:hidden flex items-center gap-2'>
            <button onClick={toggleTheme} className='btn btn-ghost btn-sm'>
              {theme === 'light' ? <MoonIcon className='w-5 h-5' /> : <SunIcon className='w-5 h-5' />}
            </button>
            <button onClick={toggleMenu} className='btn btn-ghost btn-sm'>
              {menuOpen ? <XIcon className='w-5 h-5' /> : <MenuIcon className='w-5 h-5' />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className='sm:hidden absolute top-16 left-0 w-full bg-base-200 shadow-md border-t border-base-300 flex flex-col items-center py-2 space-y-2'>
          <Link to='/' className='font-semibold' onClick={() => setMenuOpen(false)}>
            Home
          </Link>
          <Link to='/products' className='font-semibold' onClick={() => setMenuOpen(false)}>
            Products
          </Link>
          <Link to='/cart' className='font-semibold' onClick={() => setMenuOpen(false)}>
            Cart
          </Link>
        </div>
      )}
    </nav>
  )
}
