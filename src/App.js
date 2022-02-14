import './App.css';
import Home from './components/Home/Home';
import SignUp from './components/SignUp/SignUp';
import Login from './components/Login/Login';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
        <div className="app-container">
        
          <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/login" element={<Login />}/>
          <Route exact path="/signup" element={<SignUp/>}/>
                    
          </Routes>
        
        
        </div>
    </BrowserRouter>
  );
}

export default App;
