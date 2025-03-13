import './App.css'
import summaryAPI from './common';
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import AppContext from './context';

const App = () => {
    const fetchUserDetails = async () => {
        const dataResponse  = await fetch(summaryAPI.CurrentUser.url, {
            method: summaryAPI.CurrentUser.method,
            credentials: 'include'
        })

        const dataResult = await dataResponse.json()
        console.log("User Data: ", dataResult)
    }
    useEffect(() => {
        /** User Details */
        fetchUserDetails()
    }, []);
  return (
    <>
        <AppContext.Provider value={{
            fetchUserDetails // user details fetch
        }}>
        {/* Add the Header component */}
        <Header />

        {/* Add the main content */}
        <main className='min-h-[calc(100vh-120px)]'>
            <ToastContainer />
            <Outlet />
        </main>

        {/* Add the Footer component */}
        <Footer />
        </AppContext.Provider>
    </>
  )
}

export default App
