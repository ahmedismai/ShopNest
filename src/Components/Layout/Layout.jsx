import React from 'react'
import Navbar from '../Navbar/Navbar.jsx';

export default function Layout({ children,showSidebar=false}) {
  return (
    <div className='min-h-screen bg-base-100 '>            
            <div className='flex-1 flex flex-col'>
                <Navbar/>
                <main className='flex-1 overflow-y-auto max-w-[96%] mx-auto my-24 '>
                    {children}
                </main>
            </div>
        </div>
  )
}
