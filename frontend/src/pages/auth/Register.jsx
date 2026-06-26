import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import React, { useState , useEffect } from "react";

const Register = () => {
  const [userName, setuserName] = useState("");
  const [userEmail, setuserEmail] = useState("");
  const [userPassword, setuserPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);


  const handleOnRegister = async (e) => {
    e.preventDefault();
    console.log("Registered!");
    setisLoading(true);
    const body = {
      userName,
      userEmail,
      userPassword,
    };
    console.log(body);

    try {
      const response = await axios.post(
        "https://gosocially-production.up.railway.app/api/v1/auth/register",
        body,
      );
      if(response.data.success === true){
        navigate("/auth/login")
      }
    } catch (e) {
      console.log(e.message);
    }

   finally{
     setuserName("");
    setuserEmail("");
    setuserPassword("");
    setisLoading(false);
   }
  };

  const navigate = useNavigate();

  const checkAuth = async () => {
    const token = localStorage.getItem('token')
    if (token != null) {
      try {
        const responce = await axios.post("https://gosocially-production.up.railway.app/api/v1/auth/check-auth", {
          token
        })
        if (responce.data.success === true) {
          navigate("/")
        }
      } catch (error) {
        console.log(error.message);

      }
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-sky-100 to-pink-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl p-8 backdrop-blur-sm bg-opacity-95">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-block p-3 bg-gradient-to-r from-pink-400 to-sky-400 rounded-2xl mb-4">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent">
              Create Account
            </h2>
            <p className="text-gray-600 mt-2">Join us today and get started</p>
          </div>

          {/* Form */}
          <form className="space-y-5" onSubmit={(e) => handleOnRegister(e)}>
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Your Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <input
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                  type="text"
                  id="name"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                  placeholder="Enter your full name"
                  required
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-sky-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <input
                  value={userEmail}
                  onChange={(e) => setuserEmail(e.target.value)}
                  type="email"
                  id="email"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-sky-400 focus:ring-4 focus:ring-sky-100 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg
                    className="w-5 h-5 text-pink-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
                <input
                  value={userPassword}
                  onChange={(e) => setuserPassword(e.target.value)}
                  type="password"
                  id="password"
                  className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-400 focus:ring-4 focus:ring-pink-100 outline-none transition-all duration-200 text-gray-700 placeholder-gray-400"
                  placeholder="Enter your password"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
             disabled={isLoading}
              type="submit"
              className="disabled:bg-sky-200 w-full bg-gradient-to-r from-pink-500 to-sky-500 hover:from-pink-600 hover:to-sky-600 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 mt-6"
            >
              { isLoading ? "Registering" : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-sm">
              Already have an account?{" "}
              <Link
                to="/auth/login"
                className="font-semibold bg-gradient-to-r from-pink-500 to-sky-500 bg-clip-text text-transparent hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
