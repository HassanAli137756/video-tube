import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { CustomButton } from '../utils/CustomButton'
import { Logout } from '../utils/Logout'



function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  

  const userInfo = useSelector(state => state.userReducer.userInfo)


  console.log("RTK UserInfo", userInfo);


  const navigationLinks = userInfo.isLoadingUser ?
    [] :
    userInfo.isAuthorized && userInfo.userData ?
      [
        {
          path: "/",
          name: "Home"
        },
        {
          path: "/my-content",
          name: "My Content"
        },
        {
          path: "/profile",
          name: "My Profile"
        },
        {
          path: "/my-activites",
          name: "My-Activites"
        },
        {
          path: "/settings",
          name: "Settings"
        },
      ]
      :
      [
        {
          path: "/",
          name: "Home"
        },
        {
          path: "/login",
          name: "Login"
        },
        {
          path: "/register",
          name: "Create Account"
        },

      ]


      
      console.log("Header rendered");
      




  return (
    <div>
      
    <header className=" relative mb-5  top-0 z-40 w-full border-b border-gray-200 bg-white/95 ">
      

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* ==================== LOGO ==================== */}

        <Link
          to="/"
          className="flex items-center gap-2.5"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-600 shadow-sm">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-5 w-5 text-white"
            >
              <path
                d="M8 5.5V18.5L18 12L8 5.5Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900">
            Video<span className="text-green-600">Tube</span>
          </span>
        </Link>

        {/* ==================== DESKTOP NAVIGATION ==================== */}

        <nav className="hidden items-center gap-3 md:flex">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `
                rounded-lg px-6 py-3 text-sm font-medium bg-green-100 transition-all duration-200
                ${isActive
                  ? "bg-green-200 text-green-700"
                  : "text-gray-600 hover:bg-green-200 hover:text-gray-900"
                }
                `
              }
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* ==================== RIGHT SIDE ==================== */}

        <div className="flex items-center gap-3">

          {/* Search button / future search area */}






          <div className="hidden sm:block">
             {
                userInfo.isAuthorized && !userInfo.isLoadingUser && userInfo.userData &&
                
                <Logout />
             }
          </div>

          {/* ==================== MOBILE MENU BUTTON ==================== */}

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            className="
              flex h-9 w-9
              items-center justify-center
              rounded-lg
              text-gray-600
              transition
              hover:bg-gray-100
              hover:text-gray-900
              md:hidden
            "
            aria-label="Toggle navigation menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
              >
                <path d="M6 6L18 18" />
                <path d="M18 6L6 18" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="h-6 w-6"
              >
                <path d="M4 6H20" />
                <path d="M4 12H20" />
                <path d="M4 18H20" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* ==================== MOBILE NAVIGATION ==================== */}

      {isMobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white md:hidden">
          <nav className="mx-auto max-w-7xl space-y-1 px-4 py-3 sm:px-6">

            {navigationLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `
                  block rounded-lg px-4 py-3 text-sm font-medium
                  transition-all duration-200
                  ${isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }
                  `
                }
              >
                {link.name}
              </NavLink>
            ))}

          </nav>
        </div>
      )}
    </header>
    </div>
  );
};


export { Header }