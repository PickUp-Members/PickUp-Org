import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Login = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f7f8] py-12 px-4 sm:px-6 lg:px-8 font-display">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex flex-col items-center">
          {/* Using recommended responsive logo size [cite: 24] */}
          <img className="h-24 md:h-36 w-auto object-contain mb-2" src={logo} alt="PickUp Logo" />
          
          <h2 className="mt-4 text-center text-3xl font-extrabold text-slate-900">
            Welcome back 
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Sign in to continue to PickUp
          </p>
        </div>
        
        <form className="mt-8 space-y-6">
          {/* Changed container to space-y-4 to add breathing room between inputs */}
          <div className="space-y-4"> 
            <div>
              <input 
                type="email" 
                required 
                className="appearance-none relative block w-full px-3 py-3 border border-slate-200 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c74e9] focus:z-10 sm:text-sm" 
                placeholder="Email address" 
              />
            </div>
            <div>
              <input 
                type="password" 
                required 
                className="appearance-none relative block w-full px-3 py-3 border border-slate-200 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c74e9] focus:z-10 sm:text-sm" 
                placeholder="Password" 
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                className="h-4 w-4 text-[#1c74e9] focus:ring-[#1c74e9] border-slate-300 rounded" 
              />
              <label className="ml-2 block text-sm text-slate-900">Remember me</label>
            </div>

            <div className="text-sm">
              <Link to="/forgot-password" title="Forgot Password Feature" className="font-medium text-[#1c74e9] hover:underline">
                Forgot password? 
              </Link>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#1c74e9] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c74e9] transition-all"
            >
              Sign in 
            </button>
          </div>

          <div className="text-sm text-center">
            <Link to="/register" className="font-medium text-[#1c74e9] hover:underline">
              Don't have an account? Sign up 
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;