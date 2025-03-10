"use client"

import { Link, useNavigate } from "react-router-dom"
import useUserInfo from "../../hook/user/useUserInfo"
import { Avatar } from "antd"

const Header = () => {
  const user = useUserInfo()
  const navigate = useNavigate()

  // Custom color styles
  const primaryGreen = "#469B74"
  const primaryYellow = "#FCB80B"

  const handleGoProfile = () => {
    navigate("/profile")
  }

  const renderAvatar = () => {
    return (
      <div onClick={handleGoProfile} className="flex items-center user_avatar">
        <div className="group relative cursor-pointer">
          <div className="flex items-center justify-between">
            <Avatar size={40} src={user?.avatarUrl} />
            <span className="ml-3 text-black">{user?.fullName}</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <header className="fixed z-20 inset-x-0 bg-white shadow-md">
      <nav className="px-4 lg:px-8 py-3">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          {/* Logo Section */}
          <Link to="/" className="flex items-center">
            <img src="/logo.jpg" className="mr-3 h-8 sm:h-10" alt="Logo" />
            <span className="self-center text-xl font-semibold whitespace-nowrap" style={{ color: primaryGreen }}>
              EduVenture
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link to="/forum" className="nav-link">
              <span className="font-medium text-gray-700 hover:text-green-600 transition-colors">Community</span>
            </Link>
            <Link to="/test-library" className="nav-link">
              <span className="font-medium text-gray-700 hover:text-green-600 transition-colors">Test library</span>
            </Link>
            <Link to="/courses" className="nav-link">
              <span className="font-medium text-gray-700 hover:text-green-600 transition-colors">Course</span>
            </Link>
            <Link to="/flashcards" className="nav-link">
              <span className="font-medium text-gray-700 hover:text-green-600 transition-colors">Flashcards</span>
            </Link>
          
          </div>

          {/* User Section / Login Buttons */}
          <div className="flex items-center lg:order-2">
            {user ? (
              renderAvatar()
            ) : (
              <div className="flex space-x-2">
                <Link
                  to="/login"
                  className="text-white font-medium rounded-lg text-sm px-5 py-2.5 transition-colors hover:opacity-90"
                  style={{ backgroundColor: primaryGreen }}
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="font-medium rounded-lg text-sm px-5 py-2.5 transition-colors border hover:bg-opacity-10"
                  style={{
                    color: primaryYellow,
                    borderColor: primaryYellow,
                    backgroundColor: "rgba(252, 184, 11, 0.05)",
                  }}
                >
                  Sign up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              data-collapse-toggle="mobile-menu"
              type="button"
              className="inline-flex items-center p-2 ml-3 text-sm rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              style={{ color: primaryGreen }}
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open menu</span>
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <svg
                className="hidden w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          {/* Mobile Menu */}
          <div className="hidden w-full lg:hidden mt-4 pb-2" id="mobile-menu">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link
                  to="/forum"
                  className="block py-2 px-4 rounded-lg hover:bg-opacity-10"
                  style={{ color: primaryGreen, backgroundColor: "rgba(70, 155, 116, 0.05)" }}
                >
                  Community
                </Link>
              </li>
              <li>
                <Link
                  to="/test-library"
                  className="block py-2 px-4 rounded-lg hover:bg-opacity-10"
                  style={{ color: primaryGreen, backgroundColor: "rgba(70, 155, 116, 0.05)" }}
                >
                  Test library
                </Link>
              </li>
              <li>
                <Link
                  to="/courses"
                  className="block py-2 px-4 rounded-lg hover:bg-opacity-10"
                  style={{ color: primaryGreen, backgroundColor: "rgba(70, 155, 116, 0.05)" }}
                >
                  Course
                </Link>
              </li>
              <li>
                <Link
                  to="/flashcards"
                  className="block py-2 px-4 rounded-lg hover:bg-opacity-10"
                  style={{ color: primaryGreen, backgroundColor: "rgba(70, 155, 116, 0.05)" }}
                >
                  Flashcards
                </Link>
              </li>
          
            </ul>
          </div>
        </div>
      </nav>
    </header>
  )
}

export default Header

