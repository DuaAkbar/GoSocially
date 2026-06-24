import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { getUserInitials } from "../../utils/utility.js";

export default function Header() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOnLogout = () => {
    localStorage.clear();
    navigate("/auth/login");
  };

  const userName = localStorage.getItem("userName");

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              SocialHub
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 font-semibold border-b-2 border-purple-600 transition"
                  : "text-gray-500 hover:text-purple-400 font-medium transition"
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/posts/my-posts"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 font-semibold border-b-2 border-purple-600 transition"
                  : "text-gray-500 hover:text-purple-400 font-medium transition"
              }
            >
              My Posts
            </NavLink>
            <NavLink
              to="/posts/create-posts"
              className={({ isActive }) =>
                isActive
                  ? "text-purple-600 font-semibold border-b-2 border-purple-600 transition"
                  : "text-gray-500 hover:text-purple-400 font-medium transition"
              }
            >
              Create Post
            </NavLink>
          </nav>

          {/* Right Side - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            {/* User Avatar + Name */}
            <div className="flex items-center space-x-2 pl-2 border-l border-gray-200">
              <div
                onClick={() => { navigate("/profile/update"); setMobileMenuOpen(false); }}
                className="cursor-pointer w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold shadow-sm flex-shrink-0"
              >
                {getUserInitials(userName)}
              </div>
              <span className="text-sm font-medium text-gray-800 max-w-[120px] truncate">
                {userName}
              </span>
            </div>

            <button
              onClick={handleOnLogout}
              className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
            >
              Logout
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-purple-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
              />
            </svg>
          </button>

        </div>{/* end flex row */}

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 space-y-2 px-2 pb-4">
            {/* Search Bar */}
            <div className="relative mb-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none transition"
              />
              <svg className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>

            <Link to="/" className="block text-purple-600 font-semibold hover:text-purple-700 transition">
              Home
            </Link>
            <Link to="/posts/my-posts" className="block text-gray-700 hover:text-purple-600 font-medium transition">
              My Posts
            </Link>
            <Link to="/posts/create-posts" className="block text-gray-700 hover:text-purple-600 font-medium transition">
              Create Post
            </Link>

            {/* User info in mobile */}
            <div className="flex items-center space-x-2 pt-2 border-t border-gray-200">
              <div
                onClick={() => { navigate("/profile/update/") }}
                className="cursor-pointer w-9 h-9 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-semibold"
              >
                {getUserInitials(userName)}
              </div>
              <span className="text-sm font-medium text-gray-800">{userName}</span>
            </div>

            <button
              onClick={handleOnLogout}
              className="w-full px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-pink-700 transition"
            >
              Logout
            </button>
          </div>
        )}

      </div>{/* end max-w container */}
    </header>
  );
}