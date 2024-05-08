import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import SignUpForm from './screens/SignUpForm';
import ConfirmationScreen from './screens/ConfirmationScreen';
import Navbar from './components/Navbar';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  
  return (
    
    <Router>
      <div>
        <Navbar/>
      
      <Routes>
        <Route path= "/"  element= {<HomeScreen/>}/>
        <Route path="/signup"  element={<SignUpForm/>} />
        <Route path="/confirm" element={<ConfirmationScreen/>} />
        <Route path= "/login" element={<LoginScreen/>}/>
        <Route path="/profile" element={<ProfileScreen/>} />
        </Routes>
        
     </div> 
    </Router>
    
  );
}

export default App;


