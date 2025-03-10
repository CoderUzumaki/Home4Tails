import './App.css'
import Footer from './components/Footer'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
        {/* Add the Header component */}
        <Header />

        {/* Add the main content */}
        <main>
            <Outlet />
        </main>

        {/* Add the Footer component */}
        <Footer />
    </>
  )
}

export default App
