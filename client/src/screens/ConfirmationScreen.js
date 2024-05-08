import React, { useState } from 'react';
import axios from 'axios';

function ConfirmationScreen() {
  const [email, setEmail] = useState('');
  const [ConfirmationCode, setConfirmationCode] = useState('');
  

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:8000/api/user/confirm', { email, ConfirmationCode });
      
     console.log(response.data);
      window.location.href = '/';
    } catch (error) {
      console.log('Verification failed');
    }
  };

  return (
    <div className='container2'>
      <div className= 'card'>
        <div className= 'card-head'>
      <h2>OTP Verification</h2>
      </div>
      <div className='card-body'>
      <input
        type="text"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Enter OTP"
        value={ConfirmationCode}
        onChange={(e) => setConfirmationCode(e.target.value)}
      />
      <br />
      <button  className= 'bttn' onClick={handleVerify}>Verify</button>
      </div>
      
      </div>
    </div>
  );
}

export default ConfirmationScreen;
