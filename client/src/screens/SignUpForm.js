import React, { useState } from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    firstname: '',
    lastname: '',
    mobileno: '',

     
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // First, send the registration data
      const registerResponse = await axios.post('http://localhost:8000/api/user/register', formData);
      console.log('Registration successful!', registerResponse.data);

      // Then, send the profile picture to the /upload route
      if (formData.profilePic) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', formData.profilePic);

        const uploadResponse = await axios.post('http://localhost:8000/api/user/upload', uploadFormData, {
          headers: {
            'Content-Type': 'image/jpeg',
            'filename': formData.profilePic.name 
          }
        });
        console.log('Upload successful!', uploadResponse.data);
      }

      window.location.href = '/confirm';
    } catch (error) {
      console.error('Registration or upload failed:', error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2>Register</h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username:</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>First Name:</label>
              <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Last Name:</label>
              <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Mobile No.:</label>
              <input type="number" name="mobileno" value={formData.mobileno} onChange={handleChange} required />
            </div>
          
            <div className="form-group">
              <label>Email:</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            {/* File Input for Profile Picture */}
          
            <button className="button" type="submit">Register</button>
             <p>Already have an account? <a href="/login">Sign In</a></p>
          </form>
        </div>
      </div>
      
    </div>
  );
};

export default SignUpForm;
