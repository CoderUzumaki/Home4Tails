import React, { useEffect, useState } from 'react';
import summaryAPI from '../../common';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminAllUsers = () => {
    // Hooks
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [roleFilter, setRoleFilter] = useState('');
    const [selectedUser, setSelectedUser] = useState(null);
    const [action, setAction] = useState(null); // edit or remove
    const [editedUser, setEditedUser] = useState({});

    // Fetch All Users data
    const fetchAllUsers = async () => {
        try {
          const response = await fetch(summaryAPI.AllUsers.url, {
            method: summaryAPI.AllUsers.method,
            credentials: "include",
          });

          const result = await response.json();
          console.log("API Response:", result);

          if (result.success && Array.isArray(result.data)) {
            setUsers(result.data);
            setFilteredUsers(result.data);
          }
        } catch (err) {
          console.error("Error fetching users:", err);
        }
    };

    useEffect(() => {
        fetchAllUsers();
    }, []);

    // Handle Search & Filter
    useEffect(() => {
        let updatedUsers = users;

        if (searchTerm) {
            updatedUsers = updatedUsers.filter(
                (user) =>
                    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (roleFilter) {
            updatedUsers = updatedUsers.filter((user) => user.role === roleFilter);
        }

        setFilteredUsers(updatedUsers);
    }, [searchTerm, roleFilter, users]);

    // Handle Edit User
    const handleEditUser = async () => {
        try {
            const response = await fetch(summaryAPI.EditUser.url, {  // Removed /${selectedUser._id}
                method: summaryAPI.EditUser.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: selectedUser._id,  // Send userId in request body
                    ...editedUser,  // Updated role
                }),
                credentials: "include",
            });

            const result = await response.json();
            if (result.success) {
                fetchAllUsers();
                setAction(null);
                setSelectedUser(null);
            } else {
                console.error("Error updating user:", result.message);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    // Handle Remove User
    const handleRemoveUser = async () => {
        try {
            const response = await fetch(`${summaryAPI.RemoveUser.url}`, {
                method: summaryAPI.RemoveUser.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: selectedUser._id,
                }),
                credentials: "include",
            });

            const result = await response.json();
            if (result.success) {
                fetchAllUsers();
                setAction(null);
                setSelectedUser(null);
            } else {
                console.error("Error removing user:", result.message);
            }
        } catch (error) {
            console.error("Error removing user:", error);
        }
    };

    // UI
    return (
        <div className='flex min-h-[calc(100vh-65px)]'>
            <AdminSidebar />
            <div className="p-4 w-full">
                <h2 className="text-2xl font-semibold mb-4">All Users</h2>

                {/* Search & Filter Section */}
                <div className="flex flex-wrap gap-4 mb-4">
                    <input type="text" placeholder="Search by Name or Email" className="p-2 border rounded-md" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                    <select className="p-2 border rounded-md" value={roleFilter} onChange={(e) => setRoleFilter(e.target.value)}>
                        <option value="">All Roles</option>
                        <option value="admin">Admin</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="adopter">Adopter</option>
                    </select>
                </div>

                {/* User Table */}
                <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr className="bg-gray-200 text-left">
                                <th className="border p-2">Name</th>
                                <th className="border p-2">Email</th>
                                <th className="border p-2">Role</th>
                                <th className="border p-2">Verified</th>
                                <th className="border p-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="text-center">
                                        <td className="border p-2">{user.name}</td>
                                        <td className="border p-2">{user.email}</td>
                                        <td className="border p-2">{user.role}</td>
                                        <td className="border p-2">{user.isVerified ? "✅" : "❌"}</td>
                                        <td className="border p-2">
                                            <button onClick={() => { setSelectedUser(user); setEditedUser(user); setAction('edit'); }} className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
                                            <button onClick={() => { setSelectedUser(user); setAction('remove'); }} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="border p-2 text-center">No users found</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Edit User Modal */}
            {action === 'edit' && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h3 className="text-lg font-semibold">Edit User</h3>

                        {/* Display User Name (Non-editable) */}
                        <label className="block mt-2 text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            className="border p-2 mt-1 w-full bg-gray-100 cursor-not-allowed"
                            value={selectedUser.name}
                            disabled
                        />

                        {/* Editable Role Field */}
                        <label className="block mt-3 text-sm font-medium text-gray-600">Role</label>
                        <select
                            className="border p-2 mt-1 w-full"
                            value={editedUser.role}
                            onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                        >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                            <option value="volunteer">Volunteer</option>
                        </select>

                        {/* Buttons */}
                        <div className="flex justify-end mt-4">
                            <button
                                onClick={() => handleEditUser()}
                                className="bg-green-500 text-white px-4 py-2 rounded mr-2"
                            >
                                Save
                            </button>
                            <button
                                onClick={() => setAction(null)}
                                className="bg-gray-400 px-4 py-2 rounded"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}


            {/* Remove User Confirmation */}
            {action === 'remove' && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <p>Are you sure you want to remove {selectedUser?.name}?</p>
                        <button onClick={() => handleRemoveUser()} className="bg-red-500 text-white px-4 py-2 rounded mt-2">
                            Remove
                        </button>
                        <button onClick={() => setAction(null)} className="bg-gray-400 px-4 py-2 rounded ml-2">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAllUsers;
