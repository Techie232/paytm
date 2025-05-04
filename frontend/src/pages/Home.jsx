import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
   return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 animate-fadeIn">
         <div className="bg-white rounded-2xl shadow-2xl p-10 max-w-md w-full text-center transform transition duration-500 hover:scale-105">
            <h1 className="text-4xl font-extrabold mb-4 text-gray-800">Welcome!</h1>
            <p className="mb-4 text-gray-600">We’re excited to have you here.</p>
            <div className="space-y-4">
               <Link to="/signin" className="inline-block w-full px-6 py-3 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600 transition">Sign In to Your Account</Link>
               <span className="block text-sm text-gray-500">— or —</span>
               <Link to="/signup" className="inline-block w-full px-6 py-3 bg-green-500 text-white rounded-full shadow hover:bg-green-600 transition">Create a New Account</Link>
            </div>
         </div>
      </div>
   )
}

export default Home