import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function Settings() 
{
  

  const currentUser = useSelector(state => state.userReducer.userInfo)
  const [isSave, setIsSave] = useState(Number(localStorage.getItem("localSaveStatus") == 1 ? true : false))
  const [msg, setMsg] = useState("")
  const navigate = useNavigate()


  const setLocalSave = () =>
  {
    localStorage.setItem("localSaveStatus", isSave ? 0 : 1)
    
    setIsSave(prev => !prev)
    
  }


  useEffect(() => {
    if (!currentUser.isAuthorized && !currentUser.userData?._id) {
      setMsg("Please login to access settings")
    }

    console.log("isSave: ", isSave);
    console.log("Local Save Status", localStorage.getItem("localSaveStatus"));
    

  }, [currentUser.userData, isSave])



  return (
  <div className="relative w-full max-w-4xl mx-auto px-4 py-6">
    {
        msg.length > 0 &&
          (<div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 ">
            <div>


              <div className='flex justify-center'>
                <p className=' italic text-lg text-red-600 '>
                  {msg}
                </p>
              </div>

            </div>
          </div>)
      }

    {/* Heading */}
    <div className="mb-7">
      <h1 className="text-2xl font-bold text-gray-900">
        Settings
      </h1>

      <p className="mt-1 text-sm text-gray-500">
        Manage your account and control your VideoTube experience.
      </p>
    </div>

    {/* Settings Cards */}
    <div className="space-y-4">

      {/* Update Password */}
      <button
        onClick={() => navigate('/update-password')}
        type="button"
        className="group w-full flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl text-left transition-all duration-200 hover:border-green-500 hover:shadow-md"
      >
        <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 text-green-600">
          {/* Password Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M15 7a3 3 0 10-6 0c0 1.3.83 2.4 2 2.83V12h2V9.83A3 3 0 0015 7z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M5 12h14v7H5z"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-gray-900">
            Update Password
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Change your password to keep your account secure.
          </p>
        </div>

        <svg
          className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>


      {/* Update Profile */}
      <button
        onClick={() => navigate('/update-profile')}
        type="button"
        className="group w-full flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl text-left transition-all duration-200 hover:border-green-500 hover:shadow-md"
      >
        <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 text-green-600">
          {/* Profile Icon */}
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M15.5 7.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M4.5 20a7.5 7.5 0 0115 0"
            />
          </svg>
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-gray-900">
            Update Profile
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update your personal information, avatar and profile details.
          </p>
        </div>

        <svg
          className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <button
        onClick={() => navigate('/update-account-images')}
        type="button"
        className="group w-full flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl text-left transition-all duration-200 hover:border-green-500 hover:shadow-md"
      >
        <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 text-green-600">
          {/* Activity Icon */}
          <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <rect
            x="3"
            y="3"
            width="18"
            height="18"
            rx="2"
            strokeWidth="1.8"
          />

          <circle
            cx="8.5"
            cy="8.5"
            r="1.5"
            strokeWidth="1.8"
          />

          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.8"
            d="M3 16l5-5 4 4 2.5-2.5L21 19"
          />
        </svg>
        
        </div>

        <div className="flex-1 min-w-0">
          <h2 className="text-base font-semibold text-gray-900">
            Update Account Images
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            Update your avatar and cover images
          </p>
        </div>

        <svg
          className="w-5 h-5 text-gray-400 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-green-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>


      {/* Control Activities */}
      <div
        type="button"
        className="group w-full flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl text-left "
      >
        <div className="shrink-0 w-12 h-12 flex items-center justify-center rounded-xl bg-green-50 text-green-600">
          
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M4 19V9m5 10V5m5 14v-7m5 7V3"
            />
          </svg>
        </div>

        <div 
        onClick={() => (setLocalSave())}
        className="flex justify-between w-full">
          <div>
          <h2 className="text-base font-semibold text-gray-900">
            Save Watch History
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {isSave ? "Your watched vedios will save now" : "Your watched vedios will not save now"}
          </p>
          </div>
            <div>
              <button
                type="button"
                className={`relative w-12 h-6 rounded-full transition-colors duration-300
                ${isSave ? "bg-green-500" : "bg-gray-300"}
                `}
              >
                <span
                  className={`absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm
                  transition-transform duration-300
                  ${isSave ? "translate-x-6" : "translate-x-0"}
                `}
                />
              </button>
          </div>
        </div>

       
      </div>

        


    </div>
  </div>
);
}

export {Settings}