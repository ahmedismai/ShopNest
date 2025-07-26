import React from 'react'
import { LoaderIcon } from 'lucide-react'
import { useThemeStore } from '../../hooks/useThemeStore'
export default function LoadingPage() {
  const {theme} = useThemeStore()
  return (
    <div className='min-h-screen justify-center items-center flex' data-theme={theme}>
      <LoaderIcon className='animate-spin size-10 text-primary '/>
    </div>
  )
}
