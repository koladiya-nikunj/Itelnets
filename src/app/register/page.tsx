import Link from 'next/link';
import React from 'react';

const Register = () => {
  return (
    <div className='flex items-center justify-center h-screen bg-gray-300'>
      <form className='bg-white shadow-md rounded-lg px-10 pt-8 pb-8 mb-4 w-1/4 '>
        <h1 className='font-bold text-3xl p-2 text-center'>Register</h1>
        <div className='mb-4 '>
          <label className='block text-gray-700 text-sm font-bold mb-1' htmlFor='number'>
          Mobile<span className="text-red-500">*</span> :
          </label>
          <input
            className='appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            name='email'
            placeholder='Enter your mobile number'
          />
        </div>
        <div className='mb-4 '>
          <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
            Email<span className="text-red-500">*</span> :
          </label>
          <input
            className='appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            name='email'
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
            placeholder='Enter your password'
          />
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='button'
          >
            Register
          </button>
          <div className='pr-2'>Already have an account? <Link className=' text-blue-600 font-bold pl-1' href="/login">Log In</Link></div>
        </div>
      </form>
    </div>
  );
};

export default Register;
