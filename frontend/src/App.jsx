import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

import { ToastContainer } from 'react-toastify';
const App = () => {
  return (
    <>
        {/* Add the Header component */}
        <Header />

        {/* Add the main content */}
        <main className='min-h-[calc(100vh-120px)]'>
            <ToastContainer />
            <Outlet />
        </main>

        {/* Add the Footer component */}
        <Footer />
    </>
  )
}

export default App
