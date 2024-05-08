import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileScreen = ({ cognitoUserId }) => {
  const [user, setUser] = useState({ username: '', email: '', favoriteCities: [], profilePicture: '' });
  const [selectedFile, setSelectedFile] = useState(null);
  

  useEffect(() => {
    const fetchUserProfile = async () => {
      const accessToken = sessionStorage.getItem('accessToken');
      try {
        const response = await axios.get(`http://localhost:8000/api/user/profile/${user.cognitoUserId}`, {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            // 'Content-Type': 'application/json',
          }
        });
        setUser(response.data.user);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchUserProfile();
  }, [cognitoUserId]);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const accessToken = sessionStorage.getItem('accessToken');
    try {
      const formData = new FormData();
      formData.append('profilePicture', selectedFile);

      
     
      
      

      await axios.post(`http://localhost:8000/api/user/upload`, formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'filename': selectedFile.name,
          'Content-Type': selectedFile.type,
         
        }
      });

     
      const updatedUser = await axios.get(`http://localhost:8000/api/user/profile/${user.cognitoUserId}`, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          // 'Content-Type': 'application/json',
        }
      });
      setUser(updatedUser.data.user);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container3">
      <div className='card1'>
        <div className='card-head1'>
          <h2>User Profile</h2>
        </div>
        <div className='card-body1'>
          <div className="profile-info">
            <img src={`${"https://d25oh8z0ukhneq.cloudfront.net"}/${user.profileImageUrl}`} alt="Profile" className="profile-picture" />
            <div>
              <p>Username: {user.username}</p>
              <p>Email: {user.email}</p>
               <p>First Name: {user.firstname}</p>
                <p>Last Name: {user.lastname}</p>
                 <p>Mobile No.: {user.mobileno}</p>
              <p>Favorite Cities:</p>
              <div className="favorite-cities">
                {user.favoriteCities?.map((city, index) => (
                  <div className="city-card" key={index}>
                    <p>{city}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="file-input">
            <input type="file" name = "profilePicture" onChange={handleFileChange} />
            <button className="button" onClick={handleUpload}>Update Profile Picture</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
