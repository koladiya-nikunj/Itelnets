"use client"
import Link from 'next/link'
import React from 'react'

const Profile = () => {
  return (
    <div>
     <div className='header bg-green-800 w-full h-16 justify-start flex space-x-60 items-center pl-16 text-white text-xl'>
        <div>Home</div>
        <div>Product</div>
        <div>Card</div>
        <div>Contact Us</div>
        <div className='pl-96'>
          <Link href="/login">Logout</Link>
        </div>
     </div>
    
    </div>
  )
}

export default Profile
