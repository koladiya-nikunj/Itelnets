"use client"
import { useState } from 'react';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css'; // Import toastify CSS
import axios from 'axios';
import Link from 'next/link';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
 }
const notify = async () => {
  try {
    if (!email || !password) {
      toast.error('Fill all mandatory fields!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const response = await axios.post('http://localhost:5000/login', {
      email,
      password
    });

    if (response.data.success) {
      if (response.data.match) {
        // Successful login
        toast.success("Login Successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
        setEmail('');
        setPassword('');
      } else {
        // Email or password does not match
        toast.error('Invalid email or password!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        });
      }
    } else {
      // Error from the server
      toast.error(response.data.message, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  } catch (error) {
    // Network or other errors
    toast.error('Error logging in: ' + error, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  }
};


  return (
    <div className='flex items-center justify-center h-screen bg-gray-300'>
      <form className='bg-white shadow-md rounded-lg px-10 pt-8 pb-8 mb-4 w-1/4 ' onSubmit={handleSubmit}>
        <h1 className='font-bold text-3xl p-2 text-center'>Login</h1>
        <div className='mb-4'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email<span className="text-red-500">*</span> :
          </label>
          <input
            className='appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='text'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Enter your email'
          />
        </div>
        <div className='mb-6'>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
            Password<span className="text-red-500">*</span> :
          </label>
          <input
            className='appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            type='password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder='Enter your password'
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
            onClick={notify}
          >
           Sing In
          </button>
          <div className='pr-2'>Not registered ? <Link className=' text-blue-700 font-bold pl-1' href="/register">Register</Link></div>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
