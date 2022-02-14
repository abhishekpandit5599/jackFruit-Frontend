import React,{useState} from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";

export default function Login() {

  const [creds,setCreds] = useState({email:'',password:''});
  let navigate = useNavigate();

  // API Call for Login
  const handleSubmit = async (e)=>{
    e.preventDefault();
    const host = 'http://localhost:5000';

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: creds.email, password: creds.password }),
    };
    const response = await fetch(`${host}/api/auth/login`, requestOptions);
    const responseData = await response.json();

    if(responseData.success){                  
      // Save the Auth Token in Local Storage and Redirect
      localStorage.setItem("auth-token", responseData.authtoken);
      navigate('/');
    }
  }

  // OnChange function
  const onChange =(e)=>{
    setCreds({...creds,[e.target.name]: e.target.value})
  }

  return (
    <div className='login-div-container'>
        <div className='login-container'>
            <div className='form-div-continer'>
                <div className='login-heading'><h2>Login</h2></div>
                <form className='form-container' onSubmit={handleSubmit}>
                    <input className='placeicon' name='email' onChange={onChange} value={creds.email} type='text' placeholder='&#xf007;  Email'/>
                    <input className='placeicon' name='password' onChange={onChange} value={creds.password} type='password' placeholder='&#xf13e;  Password'/>
                    <button className='login-button'>Login</button>
                </form>
            </div>
        </div>
    </div>
  );
}
