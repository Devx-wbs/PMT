import React, { useState } from 'react';
const Section_a = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const submitForm = (e) => {
    e.preventDefault(); 
    if (!email) {
      console.log("Please Enter a Email");
    } else if (!password) {
      console.log("Please Enter a Password");
    } else {
      console.log("User-Email:", email);
      console.log("User-Password:", password);
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="px-4 border rounded w-auto h-fit shadow-md item-center">
        <div className="heading text-2xl font-bold text-center py-3">
          <h3>Sign In To Your Account</h3>
        </div>
        <form onSubmit={submitForm}>
          <div className="py-2">
            <label htmlFor="name" className="block">Email</label>
            <input
              className="border w-full border-gray-400 rounded focus:outline-none py-1"
              type="email"
              id="name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="py-2">
            <label htmlFor="password" className="block">Password</label>
            <input
              className="border w-full border-gray-400 rounded focus:outline-none py-1"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="py-2">
            <button className="text-center bg-black rounded text-white w-full py-2" type="submit">
              Sign In
            </button>
          </div>
        </form>
        <div className="pt-2 pb-4">
          <a href="#" target="_blank" className="text-blue-600">
            Don't have an account? Register your company
          </a>
        </div>
      </div>
    </div>
  );
};
export default Section_a;
