import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Home4Tails_logo.svg";
import { FaBars, FaUserCircle, FaTimes } from "react-icons/fa";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header className="w-full shadow-md bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link to="/" className="text-2xl font-bold text-gray-800">
                            <img src={logo} alt="Home4Tails" className="h-8 md:h-12" />
                        </Link>
                    </div>

                    {/* Nav Links */}
                    <nav className="hidden md:flex space-x-6">
                        {["home", "about", "adopt", "donate", "volunteer"].map((item) => (
                            <Link
                                key={item}
                                to={`/${item}`}
                                className="relative text-gray-700 hover:text-gray-900 transition duration-300 group"
                            >
                                {item.charAt(0).toUpperCase() + item.slice(1)}
                                <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* User Profile & Login */}
                    <div className="hidden md:flex items-center space-x-4">
                        <FaUserCircle className="text-3xl text-dark-gray-400 cursor-pointer" />
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-[#ff8c42] text-white rounded-md hover:bg-[#E76F51] transition"
                        >
                            Login
                        </Link>
                    </div>

                    {/* Hamburger Menu */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-700 text-2xl"
                        >
                            <FaBars />
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <div
                    className="fixed inset-0 z-50"
                    onClick={() => setIsMenuOpen(false)}
                >
                    <div
                        className="absolute right-0 w-64 h-full bg-white shadow-lg p-5 flex flex-col space-y-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => setIsMenuOpen(false)}
                            className="self-end text-gray-700 text-2xl transition-transform transform hover:rotate-90"
                        >
                            <FaTimes />
                        </button>

                        {/* Nav Links */}
                        {["Home", "About", "Adopt", "Donate", "Volunteer"].map((item) => (
                            <Link
                                key={item}
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-gray-700 hover:text-gray-900 text-lg"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <hr />

                        {/* Login and User Profile */}
                        <button className="text-center space-x-2 px-3 py-2 rounded-md bg-[#F4E1D2] text-gray-700 hover:text-black hover:bg-[#E0C3A7] transition font-bold">
                            Profile
                        </button>
                        <Link
                            to="/login"
                            className="px-4 py-2 bg-[#FF8C42] text-white text-center rounded-md hover:bg-[#E76F51] transition font-bold"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
