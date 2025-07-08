import React, { useEffect, useState } from 'react';

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editUser, setEditUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await fetch('http://localhost:3000/users');
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error('Error fetching users:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user by username
  const handleDelete = async (username) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${username}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        fetchUsers(); // Refresh
      }
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  // Update user password
  const handleUpdate = async (username) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${username}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword }),
      });
      if (res.ok) {
        setEditUser(null);
        setNewPassword('');
        fetchUsers(); // Refresh
      }
    } catch (err) {
      console.error('Error updating password:', err);
    }
  };

  // Filtered users
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 max-w-3xl mx-auto">

      <input
        type="text"
        placeholder="Search by username"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="p-2 border mb-4 w-full rounded"
      />

      <table className="w-full border-collapse border text-left">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">Username</th>
            <th className="border p-2">Password</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td className="border p-2">{user.username}</td>
              <td className="border p-2">
                {editUser === user.username ? (
                  <input
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border p-1"
                  />
                ) : (
                  user.password
                )}
              </td>
              <td className="border p-2">
                {editUser === user.username ? (
                  <>
                    <button
                      onClick={() => handleUpdate(user.username)}
                      className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditUser(null)}
                      className="bg-gray-400 text-white px-2 py-1 rounded"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditUser(user.username);
                        setNewPassword(user.password);
                      }}
                      className="bg-yellow-500 text-white px-2 py-1 rounded mr-2"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(user.username)}
                      className="bg-red-500 text-white px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {filteredUsers.length === 0 && (
        <p className="text-center mt-4 text-gray-600">No users found.</p>
      )}
    </div>
  );
};

export default UsersTable;
