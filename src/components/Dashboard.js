import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; 

const Home = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [userForm, setUserForm] = useState({ name: '', phoneNo: '', profession: '' });
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await axios.get('http://localhost:2000/user');
      setUsers(response.data.data);
    };

    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setUserForm({ name: user.name, phoneNo: user.phoneNo, profession: user.profession });
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`http://localhost:2000/user/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserForm({ ...userForm, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:2000/user/${editingUser._id}`, userForm);
      setUsers(users.map(user => (user._id === editingUser._id ? { ...user, ...userForm } : user)));
      setEditingUser(null);
      setUserForm({ name: '', phoneNo: '', profession: '' });
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  const handleLogout = () => {
    navigate('/'); 
  };

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>All Users</h2>
        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <ul>
        {users.map(user => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.phoneNo} - {user.profession}
            <button className="btn btn-warning btn-sm ms-2" onClick={() => handleEdit(user)}>Edit</button>
            <button className="btn btn-danger btn-sm ms-2" onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>

      {editingUser && (
        <div className="mt-4">
          <h3>Edit User</h3>
          <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={userForm.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input
                type="text"
                className="form-control"
                name="phoneNo"
                value={userForm.phoneNo}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Profession</label>
              <input
                type="text"
                className="form-control"
                name="profession"
                value={userForm.profession}
                onChange={handleInputChange}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Update</button>
            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => { setEditingUser(null); setUserForm({ name: '', phoneNo: '', profession: '' }); }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Home;
