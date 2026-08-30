import React, { useEffect, useState } from 'react'
import { UpdateAccountDetailsForm } from '../forms/UpdateAccoutDetailsForm'
import { useSelector } from 'react-redux'

function UpdateAccoutDetails() 
{
    const currentUser = useSelector(state => state.userReducer.userInfo)
    const [msg, setMsg] = useState("")


    useEffect(() =>
    {
      if(!currentUser.isAuthorized || !currentUser.userData?._id)
      {
        setMsg("Please login to update your account details")
      }
      else
      {
        setMsg("")
      }
    }, [currentUser.isAuthorized])
    


  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-10">

    {msg.length > 0  && (
        <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
          <div
          className="text-red-500 italic"
          >
            <p>{msg}</p>
            
            
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl bg-white rounded-3xl shadow-xl border border-green-100 overflow-hidden">

        {/* ================= HEADER ================= */}
        <div className="px-6 sm:px-10 pt-8 pb-6 border-b border-slate-100">

          <div className="flex items-center gap-4">

            <div className="
          w-14
          h-14
          shrink-0
          rounded-2xl
          bg-green-50
          text-green-600
          flex
          items-center
          justify-center
        ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="w-7 h-7"
              >
                <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM4 21a8 8 0 0 1 16 0M16.5 13.5l1.5 1.5 3-3" />
              </svg>
            </div>

            <div>
              <p className="text-sm font-semibold text-green-600">
                ACCOUNT SETTINGS
              </p>

              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Update Account Details
              </h1>

              <p className="text-sm text-slate-500 mt-1">
                Keep your personal information and profile updated.
              </p>
            </div>

          </div>

        </div>


        {/* ================= CONTENT ================= */}
        <div className="px-6 sm:px-10 py-8">

          {/* 70% WIDTH FORM AREA */}
          <div className="w-full lg:w-[70%] mx-auto">

            
            {
              currentUser.isAuthorized && currentUser.userData?._id &&
              <div>
                <UpdateAccountDetailsForm 
                  existingEmail={currentUser.userData?.email || ""}
                  existingFullName={currentUser.userData?.fullName || ""}
                />
              </div>
            }


            {/* ================= INFORMATION BOX ================= */}
            <div className="
          mt-8
          rounded-2xl
          border
          border-green-100
          bg-green-50/60
          p-4
        ">

              <div className="flex items-start gap-3">

                <div className="
              w-9
              h-9
              shrink-0
              rounded-xl
              bg-white
              text-green-600
              flex
              items-center
              justify-center
              shadow-sm
            ">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="w-5 h-5"
                  >
                    <path d="M12 8v4M12 16h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-slate-800">
                    Profile information
                  </h3>

                  <p className="text-xs text-slate-500 mt-1 leading-5">
                    Make sure your name and email address are correct.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export { UpdateAccoutDetails }