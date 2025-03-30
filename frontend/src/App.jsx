import './App.css'
import summaryAPI from './common';
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ToastContainer } from 'react-toastify';
import AppContext from './context';
import { setUserDetails } from './redux/userReducer';
import { useDispatch } from 'react-redux';
import PetCard from './components/PetCard';
import pets from './assets/pets';

const App = () => {
    const dispatch = useDispatch()
    const location = useLocation();
    const isHomePage = location.pathname === '/';

    const fetchUserDetails = async () => {
        const dataResponse = await fetch(summaryAPI.CurrentUser.url, {
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
                <main className='min-h-[calc(100vh-120px)] p-6 bg-gray-100'>
                    {isHomePage ? (
                        <div className="container mx-auto">
                            <h1 className="mb-8 text-center text-3xl font-bold text-gray-800">Pets Available for Adoption</h1>
                            <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
                                {pets.map((pet) => (
                                    <PetCard key={pet.id} pet={pet} />
                                ))}
                            </div>
                        </div>
                    ) : (
                        <Outlet />
                    )}
                </main>
                {/* Add the Footer component */}
                <Footer />
            </AppContext.Provider>
        </>
    )
}

export default App
