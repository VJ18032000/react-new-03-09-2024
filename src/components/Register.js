import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNo: '',
    profession: ''
  });
  const navigate = useNavigate();

  const [alert, setAlert] = useState({ type: '', message: '', visible: false });

  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:2000/register', userData);
      setAlert({ type: 'success', message: response.data.message, visible: true });
      navigate('/dashboard'); 
    } catch (error) {
      setAlert({ type: 'danger', message: error.response.data.message, visible: true });
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      
      {alert.visible && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" aria-label="Close" onClick={() => setAlert({ ...alert, visible: false })}></button>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone No</label>
          <input type="text" className="form-control" name="phoneNo" onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Profession</label>
          <input type="text" className="form-control" name="profession" onChange={handleChange} required />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        <p>Already have an account? <Link to="/">Login here</Link></p>
      </form>
    </div>
  );
};

export default Register;
