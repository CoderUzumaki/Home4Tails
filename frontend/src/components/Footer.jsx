import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/Home4Tails_logo.svg'

function Footer() {
  return (
    <footer>
            {/* <div className='bg-white relative z-10'>
            <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className='h-[50px] w-full'>
                <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-gray-300">
                </path>
            </svg>
            </div> */}
        <div className="bg-gray-300 p-6">

            <div className="container mx-auto flex flex-col lg:flex-row justify-between gap-6">

                {/* Left Section: Logo & Links */}
                <div>
                    <Link to="/" className="text-black text-2xl font-bold">
                        <img src={Logo} className="w-72" alt="Home4Tails" />
                    </Link>

                    <div className="flex flex-col md:flex-row gap-5 md:items-center mt-4">
                        <Link to="/about" className="w-fit nav-link">About Us</Link>
                        <Link to="/adopt" className="w-fit nav-link">Adopt Today</Link>
                        <Link to="/success-stories" className="w-fit nav-link">Success Stories</Link>
                        <Link to="/get-involved" className="w-fit nav-link">Get Involved</Link>
                        <Link to="/donate" className="w-fit nav-link">Donate Now</Link>
                    </div>
                </div>

                {/* Right Section: Subscription Form */}
                <div>
                    <h1 className="text-black font-semibold">Join</h1>
                    <form method="post" className="mt-3 flex">
                        <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-60 py-2 px-4 outline-none bg-white border border-gray-300 rounded-l-md"
                        />
                        <button
                        type="submit"
                        className="bg-[#ff8c42] text-white px-4 rounded-r-md hover:bg-[#e67e30] transition">
                        Subscribe
                        </button>
                    </form>
                    <p className="text-gray-700 mt-2 text-sm">
                        By subscribing you agree to our <Link to="/privacy-policy" className="text-[#ff8c42] hover:underline">Privacy Policy</Link>.
                    </p>
                </div>
            </div>

                <hr className="my-6 border-gray-400" />

            {/* Footer Bottom */}
            <div className="container mx-auto flex flex-col gap-4 lg:flex-row justify-between lg:items-center text-gray-700 text-sm">
                <div className="flex flex-col md:flex-row gap-4">
                    <Link to="/privacy-policy" className="hover:text-gray-900">Privacy Policy</Link>
                    <Link to="/terms" className="hover:text-gray-900">Terms of Service</Link>
                    <Link to="/cookie-settings" className="hover:text-gray-900">Cookie Settings</Link>
                </div>
                <p>© Home4Tails 2025. All rights reserved.</p>
            </div>
        </div>
    </footer>
  )
}

export default Footer
