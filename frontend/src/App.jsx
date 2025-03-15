import './App.css'
import summaryAPI from './common';
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import AppContext from './context';
import { setUserDetails } from './redux/userReducer';
import { useDispatch } from 'react-redux';

const App = () => {
    const dispatch = useDispatch()
    const fetchUserDetails = async () => {
        const dataResponse  = await fetch(summaryAPI.CurrentUser.url, {
            method: summaryAPI.CurrentUser.method,
            credentials: 'include'
        })

        const dataResult = await dataResponse.json()
        if (dataResult.success) {
            dispatch(setUserDetails(dataResult.data))
        }
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
        <ToastContainer />

        {/* Add the main content */}
        <main className='min-h-[calc(100vh-120px)]'>

            <Outlet/>
        </main>

        {/* Add the Footer component */}
        <Footer />
        </AppContext.Provider>
    </>
  )
}

export default App
