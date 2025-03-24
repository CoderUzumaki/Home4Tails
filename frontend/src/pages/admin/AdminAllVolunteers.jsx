import React, { useEffect, useState } from 'react';
import summaryAPI from '../../common';
import AdminSidebar from '../../components/admin/AdminSidebar';

const AdminAllVolunteers = () => {
    // Hooks
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [action, setAction] = useState(null); // edit, remove, assign
    const [editedUser, setEditedUser] = useState({});
    const [task, setTask] = useState(''); // Task input

    // Fetch Only Volunteers data
    const fetchAllVolunteers = async () => {
        try {
            const response = await fetch(summaryAPI.AllUsers.url, {
                method: summaryAPI.AllUsers.method,
                credentials: "include",
            });

            const result = await response.json();
            console.log("API Response:", result);

            if (result.success && Array.isArray(result.data)) {
                // Filter out only users with role "volunteer"
                const volunteers = result.data.filter(user => user.role === 'volunteer');
                setUsers(volunteers);
            }
        } catch (err) {
            console.error("Error fetching users:", err);
        }
    };

    useEffect(() => {
        fetchAllVolunteers();
    }, []);

    // Handle Edit User
    const handleEditUser = async () => {
        try {
            const response = await fetch(summaryAPI.EditUser.url, {
                method: summaryAPI.EditUser.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: selectedUser._id,
                    ...editedUser,
                }),
                credentials: "include",
            });

            const result = await response.json();
            if (result.success) {
                fetchAllVolunteers();
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
                fetchAllVolunteers();
                setAction(null);
                setSelectedUser(null);
            } else {
                console.error("Error removing user:", result.message);
            }
        } catch (error) {
            console.error("Error removing user:", error);
        }
    };

    // Handle Assign Task
    const handleAssignTask = async () => {
        try {
            const response = await fetch(`${summaryAPI.AssignTask.url}`, {
                method: summaryAPI.AssignTask.method,
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId: selectedUser._id,
                    task: task, // The task input
                }),
                credentials: "include",
            });

            const result = await response.json();
            if (result.success) {
                fetchAllVolunteers();
                setAction(null);
                setSelectedUser(null);
                setTask(''); // Clear task input
            } else {
                console.error("Error assigning task:", result.message);
            }
        } catch (error) {
            console.error("Error assigning task:", error);
        }
    };

    // UI
    return (
        <div className='flex min-h-[calc(100vh-65px)]'>
            <AdminSidebar />
            <div className="p-4 w-full">
                <h2 className="text-2xl font-semibold mb-4">All Volunteers</h2>

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
                            {users.length > 0 ? (
                                users.map((user) => (
                                    <tr key={user._id} className="text-center">
                                        <td className="border p-2">{user.name}</td>
                                        <td className="border p-2">{user.email}</td>
                                        <td className="border p-2">{user.role}</td>
                                        <td className="border p-2">{user.isVerified ? "✅" : "❌"}</td>
                                        <td className="border p-2">
                                            <button onClick={() => { setSelectedUser(user); setEditedUser(user); setAction('edit'); }} className="px-2 py-1 bg-blue-500 text-white rounded mr-2">Edit</button>
                                            <button onClick={() => { setSelectedUser(user); setAction('remove'); }} className="px-2 py-1 bg-red-500 text-white rounded mr-2">Remove</button>
                                            <button onClick={() => { setSelectedUser(user); setAction('assign'); }} className="px-2 py-1 bg-green-500 text-white rounded">Assign Task</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="5" className="border p-2 text-center">No volunteers found</td>
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

                        <label className="block mt-2 text-sm font-medium text-gray-600">Name</label>
                        <input
                            type="text"
                            className="border p-2 mt-1 w-full bg-gray-100 cursor-not-allowed"
                            value={selectedUser.name}
                            disabled
                        />

                        <label className="block mt-3 text-sm font-medium text-gray-600">Role</label>
                        <select
                            className="border p-2 mt-1 w-full"
                            value={editedUser.role}
                            onChange={(e) => setEditedUser({ ...editedUser, role: e.target.value })}
                        >
                            <option value="volunteer">Volunteer</option>
                            <option value="admin">Admin</option>
                        </select>

                        <div className="flex justify-end mt-4">
                            <button onClick={() => handleEditUser()} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Save</button>
                            <button onClick={() => setAction(null)} className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Remove User Confirmation */}
            {action === 'remove' && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <p>Are you sure you want to remove {selectedUser?.name}?</p>
                        <button onClick={() => handleRemoveUser()} className="bg-red-500 text-white px-4 py-2 rounded mt-2">Remove</button>
                        <button onClick={() => setAction(null)} className="bg-gray-400 px-4 py-2 rounded ml-2">Cancel</button>
                    </div>
                </div>
            )}

            {/* Assign Task Modal */}
            {action === 'assign' && selectedUser && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                    <div className="bg-white p-6 rounded shadow-md w-96">
                        <h3 className="text-lg font-semibold">Assign Task to {selectedUser.name}</h3>

                        <label className="block mt-2 text-sm font-medium text-gray-600">Task</label>
                        <input
                            type="text"
                            className="border p-2 mt-1 w-full"
                            value={task}
                            onChange={(e) => setTask(e.target.value)}
                            placeholder="Enter task description"
                        />

                        <div className="flex justify-end mt-4">
                            <button onClick={handleAssignTask} className="bg-green-500 text-white px-4 py-2 rounded mr-2">Assign</button>
                            <button onClick={() => setAction(null)} className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAllVolunteers;
