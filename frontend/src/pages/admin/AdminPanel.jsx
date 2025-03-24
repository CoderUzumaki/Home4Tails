import React from 'react'
import { useSelector } from 'react-redux';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminPanel = () => {
  // Fetching admin from redux store
  const admin = useSelector(state => state?.user?.user)

  return (

    <div className='min-h-[calc(100vh-65px)] flex'>

        {/* Sidebar */}
        <AdminSidebar />

        <main className="flex-1">
            <div className='container mx-auto p-4'>
                <h1 className='text-2xl font-bold'>Admin Panel</h1>
            </div>
        </main>
    </div>
  )
}

export default AdminPanel
