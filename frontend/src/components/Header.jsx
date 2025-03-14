import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/Home4Tails_logo.svg";
import { FaBars, FaUserCircle, FaTimes } from "react-icons/fa";
import { useSelector } from "react-redux";
import summaryAPI from "../common";
import { toast } from "react-toastify";

const Header = () => {
    const user = useSelector((state) => state?.user?.user);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropDownOpen, setIsDropDownOpen] = useState(false);

    {/* Logout a user */}
    const handleLogout = async () => {
        const dataResponse = await fetch(summaryAPI.Logout.url, {
            method: summaryAPI.Logout.method,
            credentials: 'include'
        })

        const dataResult = await dataResponse.json()
        if(dataResult.success) {
            window.location.reload()
        }

        if(dataResult.error) {
            toast.error(dataResult.message)
        }
    }

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
                        {["Home", "About", "Adopt", "Donate", "Volunteer"].map((item) => (
                            <Link
                                key={item}
                                to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="relative text-gray-700 hover:text-gray-900 transition duration-300 group"
                            >
                                {item}
                                <span className="absolute left-1/2 bottom-0 w-0 h-0.5 bg-gray-900 transition-all duration-300 group-hover:w-full group-hover:left-0"></span>
                            </Link>
                        ))}
                    </nav>

                    {/* User Profile*/}
                    <div className="hidden md:flex items-center space-x-4">
                        <div className="relative group flex justify-content center">
                            <div onClick={() => setIsDropDownOpen(!isDropDownOpen)}>
                                {
                                    user?.profilePicture ? (
                                        <img
                                            src={user?.profilePicture}
                                            alt={user?.name}
                                            className="h-10 w-10 rounded-full cursor-pointer"
                                        />
                                    ) : (
                                        <FaUserCircle className="text-3xl text-dark-gray-400 cursor-pointer" />
                                    )
                                }
                            </div>

                            {/* Dropdown */}
                            {isDropDownOpen && (
                                <div className="absolute bg-white bottom-0 top-7 p-2 shadow-lg h-fit rounded">
                                <nav>
                                    <Link to='/profile' className="py-1.5 px-2 hover:bg-[#F4E1D2] text-nowrap block text-gray-700 hover:text-gray-900 transition">
                                        Profile
                                    </Link>

                                    <Link to="/favorites" className="py-1.5 px-2 hover:bg-[#F4E1D2] text-nowrap block text-gray-700 hover:text-gray-900 transition">
                                        Favorites
                                    </Link>

                                    <Link to="/my-adoptions" className="py-1.5 px-2 hover:bg-[#F4E1D2] text-nowrap block text-gray-700 hover:text-gray-900 transition">
                                        My Adoptions
                                    </Link>

                                    {
                                        user?.role === "volunteer" && (
                                            <Link to="/settings" className="py-1.5 px-2 hover:bg-[#F4E1D2] text-nowrap block text-gray-700 hover:text-gray-900 transition">
                                                Volunteer Dashboard
                                            </Link>
                                        )
                                    }

                                    <Link to="/settings" className="py-1.5 px-2 hover:bg-[#F4E1D2] text-nowrap block text-gray-700 hover:text-gray-900 transition">
                                        Settings
                                    </Link>

                                    <Link to="/help" className="py-1.5 px-2 hover:bg-[#F4E1D2] text-nowrap block text-gray-700 hover:text-gray-900 transition">
                                        Help & Support
                                    </Link>
                                </nav>
                            </div>
                            )}
                        </div>


                        {/* Login and Logout */}
                        {
                            user?._id ?(
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-[#F4E1D2] text-gray-700 rounded-full hover:text-black hover:bg-[#E0C3A7] transition cursor-pointer"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-4 py-2 bg-[#ff8c42] text-white rounded-full hover:bg-[#E76F51] transition"
                                >
                                    Login
                                </Link>
                            )
                        }
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
                                className="text-gray-700 hover:text-gray-900 text-lg w-fit nav-link"
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
                        {
                            user?._id ? (
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 bg-[#FF8C42] text-white text-center rounded-md hover:bg-[#E76F51] transition font-bold cursor-pointer"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/login"
                                    className="px-4 py-2 bg-[#FF8C42] text-white text-center rounded-md hover:bg-[#E76F51] transition font-bold"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                            )
                        }

                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
