import React from 'react'

const temp = () => {
      const [users, setUsers] = useState([]);
      const [search, setSearch] = useState('');
      const [editUser, setEditUser] = useState(null);
      const [newPassword, setNewPassword] = useState('');
    
        // Fetch all users
    const fetchUsers = async () => {
        const res = await fetch('http://localhost:3000/users');
        const data = await res.json();  
        setUsers(data);
    };
    
    useEffect(() => {
        fetchUsers();
    }, []);

    // Delete user by username
    const handleDelete = async (username) => {
        const res = await fetch(`http://localhost:3000/users/${username}`, {    
            method: 'DELETE',
        }); 
        if (res.ok) {
            fetchUsers(); // Refresh
        }
    }

    const updateUser = async (username) => {
    setEditUser(username);
    const user = users.find((u) => u.username === username);
    if (user) {
      setNewPassword(user.password);    
    } 
     if (res.ok) {
        setEditUser(null);
        setNewPassword('');
        fetchUsers(); // Refresh
      }
    }   

  return (
    <div>
      
    </div>
  )
}

export default temp
