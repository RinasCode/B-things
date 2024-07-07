import { useState } from 'react';
import axios from 'axios';
import Toastify from 'toastify-js';
import { useNavigate } from 'react-router-dom';
import video from '../components/assets/video.mp4'; 

export default function LoginPage({ url }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    try {
      const addedData = { email, password };
      console.log('Logging in with:', addedData); 
      const { data } = await axios.post(`${url}/login`, addedData);
      console.log('Server response:', data); 

      localStorage.setItem('access_token', data.access_token);

      Toastify({
        text: 'Success Login',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'left',
        stopOnFocus: true,
        style: {
          background: '#00B29F',
          color: '#17202A',
          boxShadow: '0 5px 10px black',
          fontWeight: 'bold',
        },
      }).showToast();

      navigate('/');
    } catch (error) {
      console.error('Login error:', error); 
      Toastify({
        text: error.response?.data?.error || 'Login failed',
        duration: 2000,
        newWindow: true,
        close: true,
        gravity: 'top',
        position: 'left',
        stopOnFocus: true,
        style: {
          background: '#EF4C54',
          color: '#17202A',
          boxShadow: '0 5px 10px black',
          fontWeight: 'bold',
        },
      }).showToast();
    }
  }

  function emailOnChange(event) {
    setEmail(event.target.value);
  }

  function passwordOnChange(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <div className="relative min-h-screen flex items-center justify-center bg-base-200">
        <video
          autoPlay
          loop
          muted
          className="absolute w-full h-full object-cover"
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="hero-content flex-col lg:flex-row-reverse z-10">
          <div className="text-center lg:text-left text-white">
            <h1 className="text-5xl font-bold">B-things</h1>
            <p className="py-6">
              We are committed to providing top-quality branded products with a seamless shopping experience, ensuring our customers enjoy the best in style, comfort, and convenience
            </p>
          </div>
          <div className="card bg-grey w-full max-w-sm shrink-0 shadow-2xl">
            <form className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter email"
                  className="input input-bordered"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label className="label">
                  <a href="#" className="label-text text-white">
                    Forgot password?
                  </a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button onClick={handleLogin} className="btn btn-accent">Log In</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
