import { useThemeStore } from './hooks/useThemeStore'
import Layout from './Components/Layout/Layout'
import Home from './Components/Home/Home'
import { Route, Routes } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Products from './Components/Products/Products'
import { getProducts } from './lib/api'
import useQueryHooks from './hooks/useQuery'
import LoadingPage from './Components/LoadingPage/LoadingPage'
import ProductDetails from './Components/ProductDetails/ProductDetails'
import Cart from './Cart/Cart';
import NotFound from './Components/Notfound/Notfound'

function App() {
  const { theme } = useThemeStore()
  const { data, isLoading , isError , error} = useQueryHooks(getProducts);
  if (isLoading) {
    return <LoadingPage/>
  }
  if (isError) {
    return <ErrorPage message={error.response?.data?.message || error.message} />
}

  return (
    <div className='h-screen' data-theme={theme}>
      <Routes>
        <Route path='/' element={<Layout><Home /></Layout>} />
        <Route path='/products' element={<Layout><Products /></Layout>} />
        <Route path='/productdetails/:id' element={<Layout><ProductDetails /></Layout>} />
        <Route path='/cart' element={<Layout><Cart /></Layout>} />
        <Route path='*' element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
