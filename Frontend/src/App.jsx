import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import DonorInfo from "./pages/DonorInfo";
import Reciver from "./pages/Reciver"
import Dashboard from "./pages/Dashboard";
import DonorDetails from "./pages/DonorDetails";
import PatientDetails from "./pages/PatientDetails";
import DonorProfile from "./pages/DonorProfile";
import Footer from "./pages/Footer";
function App() {
  return (
    <Router>
      <Navbar /> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home/>}> </Route>
        <Route path="/register" element={<Signup />} />
        <Route path="/donor" element={<DonorInfo />} />  
        <Route path="/patient" element={ <Reciver/> } /> 
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/donor/:id" element={<DonorDetails />} />
        <Route path="/donor/profile" element={<DonorProfile />} />
<Route path="/patient/:id" element={<PatientDetails />} />

              </Routes>
              <Footer/>
    </Router>
  );
}

export default App;
