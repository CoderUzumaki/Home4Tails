import React from 'react'
import { FaUserCog } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  // Fetching user from redux store
  const user = useSelector(state => state?.user?.user)

  return (

    <div className='min-h-[calc(100vh-65px)] flex'>

        {/* Sidebar */}
        <aside className="min-h-full w-full max-w-70 bg-white shadow-lg flex flex-col justify-between py-5 px-4">
            {/* Navigation */}
            <div>
               <nav>
                    <Link to="/admin-panel" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Dashboard</Link>
                    <Link to="/admin-panel/pet-listings" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Pet Listings</Link>
                    <Link to="/admin-panel/adoption-requests" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Adoption Requests</Link>
                    <Link to="/admin-panel/volunteers" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Volunteers</Link>
                    <Link to="/admin-panel/donations" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Donations</Link>
                    <Link to="/admin-panel/blogs" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Blogs</Link>
                    <Link to="/admin-panel/user" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Users</Link>
                    <hr />
               </nav>
            </div>

            {/* Admin Profile Section */}
            <div>
                {/* Login/Logout Button */}
                <button className='w-full bg-red-500 font-extrabold text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all cursor-pointer'>
                    {
                        user? (
                            'Logout'
                        ) : (
                            'Login'
                        )
                    }
                </button>

                {/* Profile Card */}
                <div className='w-full mt-2 border-2 flex gap-5 items-center p-2 rounded-md bg-purple-50'>
                    {/* Profile Picture */}
                    <div className='h-10 w-10 rounded-full bg-black flex items-center justify-center'>
                        {
                            user?.profilePicture? (
                                <img src={user.profilePicture} alt="User Profile" className='h-8 w-8 rounded-full' />
                            ) : (
                                <FaUserCog className='text-3xl fill-white ml-0.5' />
                            )
                        }
                    </div>

                    {/* Profile Details */}
                    <div>
                        {/* Name */}
                        <h1 className='font-bold'>
                            {
                                user?.name ? (
                                    user?.name
                                ) : (
                                    'Admin'
                                )
                            }
                        </h1>

                        {/* Email */}
                        <p className='font-extralight'>
                            {
                                user?.email ? (
                                    user.email
                                ) : (
                                    "admin@email.com"
                                )
                            }
                        </p>
                    </div>
                </div>
            </div>
        </aside>

        <main className="flex-1">
            <div className='container mx-auto p-4'>
                <h1 className='text-2xl font-bold'>Admin Panel</h1>
            </div>
        </main>
    </div>
  )
}

export default AdminPanel
