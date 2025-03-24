import React from 'react'
import { FaUserCog } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const AdminSidebar = () => {
  {/* Fetching admin from redux store */}
  const admin = useSelector(state => state?.user?.user)

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
    <aside className="min-h-full w-full max-w-70 bg-white shadow-lg flex flex-col justify-between py-5 px-4">
            {/* Navigation */}
            <div>
               <nav>
                    <Link to="/admin" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Dashboard</Link>
                    <Link to="/admin/pet-listings" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Pet Listings</Link>
                    <Link to="/admin/adoption-requests" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Adoption Requests</Link>
                    <Link to="/admin/volunteers" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Volunteers</Link>
                    <Link to="/admin/donations" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Donations</Link>
                    <Link to="/admin/blogs" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Blogs</Link>
                    <Link to="/admin/users" className='block py-2 px-4 rounded-md hover:bg-gray-100 transition-all'>Users</Link>
                    <hr />
               </nav>
            </div>

            {/* Admin Profile Section */}
            <div>
                {/* Login/Logout Button */}
                <button
                onClick={
                    admin? (
                        {handleLogout}
                    ) : (
                        () => window.location.replace('/login')
                    )
                }
                className='w-full bg-red-500 font-extrabold text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all cursor-pointer'>
                    {
                        admin? (
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
                            admin?.profilePicture? (
                                <img src={admin.profilePicture} alt="admin Profile" className='h-8 w-8 rounded-full' />
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
                                admin?.name ? (
                                    admin?.name
                                ) : (
                                    'Admin'
                                )
                            }
                        </h1>

                        {/* Email */}
                        <p className='font-extralight'>
                            {
                                admin?.email ? (
                                    admin.email
                                ) : (
                                    "admin@email.com"
                                )
                            }
                        </p>
                    </div>
                </div>
            </div>
        </aside>
  )
}

export default AdminSidebar
