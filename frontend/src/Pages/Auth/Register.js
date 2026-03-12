import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Register = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f6f7f8] py-12 px-4 sm:px-6 lg:px-8 font-display">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-slate-100">
        <div className="flex flex-col items-center">
          {/* Consistent responsive logo size used in Login */}
          <img className="h-24 md:h-36 w-auto object-contain mb-2" src={logo} alt="PickUp Logo" />
          
          <h2 className="mt-4 text-center text-3xl font-extrabold text-slate-900">
            Create your account
          </h2>
          <p className="mt-2 text-center text-sm text-slate-600">
            Join PickUp today. It's free and always will be.
          </p>
        </div>

        <form className="mt-8 space-y-6" action="#" method="POST">
          {/* Container with space-y-4 for vertical breathing room [cite: 115] */}
          <div className="space-y-4">
            <div>
              <input 
                type="text" 
                required 
                className="appearance-none relative block w-full px-3 py-3 border border-slate-200 placeholder-slate-500 text-slate-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1c74e9] focus:z-10 sm:text-sm" 
                placeholder="Full Name" 
              />
            </div>
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

          <div className="text-xs text-slate-500 text-center">
            By signing up, you agree to our Terms of Service and Privacy Policy.
          </div>

          <div>
            <button 
              type="submit" 
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-[#1c74e9] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1c74e9] transition-all"
            >
              Sign up
            </button>
          </div>

          <div className="text-sm text-center">
            <Link to="/login" className="font-medium text-[#1c74e9] hover:underline">
              Already have an account? Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;