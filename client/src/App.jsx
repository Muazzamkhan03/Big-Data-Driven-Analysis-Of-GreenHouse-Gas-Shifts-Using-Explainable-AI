import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Dashboard from './screens/GHGDashboard/Dashboard';
import Prediction from './screens/GHGDashboard/Prediction';
import UserHistory from './screens/UserDashboard/UserHistory';
import ForgotPass from './screens/ForgotPass';
import ResetPass from './screens/ResetPass';
import FAQs from './screens/FAQs';
import UserDashboard from './screens/UserDashboard/Dashboard';
import UpdatePassword from './screens/UserDashboard/UpdatePassword';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/forgot-password" element={<ForgotPass />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/faqs" element={<FAQs/>} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/prediction" element={<Prediction />} />
        <Route path="/userDashboard/userhistory" element={<UserHistory />} />
        <Route path="/userDashboard" element={< UserDashboard/>} />
        <Route path="/userDashboard/updatePassword" element={< UpdatePassword/>} />
        
      </Routes>
    </Router>
  );
}

export default App;
