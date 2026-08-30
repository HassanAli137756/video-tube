import React from 'react'
import { UpdatePasswordForm } from '../forms/UpdatePasswordForm'

function UpdatePassword() {
  return (
  <div className="min-h-screen bg-linear-to-br from-white via-green-50 to-green-100 flex items-center justify-center px-4 py-8">

    <div className="w-full max-w-5xl min-h-[620px] bg-white rounded-3xl shadow-2xl overflow-hidden flex">

      {/* Left Side */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col justify-between bg-linear-to-br from-green-700 via-green-600 to-emerald-500 p-10 text-white">

        {/* Decorative circles */}
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
        <div className="absolute -bottom-32 -left-20 w-80 h-80 rounded-full bg-white/10" />

        <div className="relative z-10">
          <div className="w-14 h-14 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-6">
            <span className="text-2xl font-bold">VT</span>
          </div>

          <h1 className="text-4xl font-bold tracking-tight">
            Keep Your Account
            <span className="block text-green-100">
              Secure
            </span>
          </h1>

          <p className="mt-5 max-w-md text-green-50 leading-7">
            Update your password regularly to keep your account
            protected and secure.
          </p>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-5">
            <div className="h-10 w-10 rounded-full bg-white/15 flex items-center justify-center">
              🔐
            </div>

            <div>
              <p className="font-semibold">
                Secure your account
              </p>

              <p className="text-sm text-green-100">
                Choose a strong and unique password
              </p>
            </div>
          </div>

          <p className="text-xs text-green-100/80">
            VideoTube • Account Security
          </p>
        </div>
      </div>


      {/* Right Side */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-10 sm:px-10 lg:px-12">

        {/* Mobile Logo */}
        <div className="lg:hidden flex justify-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-green-600 text-white flex items-center justify-center shadow-lg">
            <span className="text-xl font-bold">
              VT
            </span>
          </div>
        </div>


        <div className="max-w-md w-full mx-auto">

          <div className="mb-8">
            <p className="text-sm font-semibold text-green-600 mb-2">
              ACCOUNT SECURITY
            </p>

            <h2 className="text-3xl font-bold text-gray-900">
              Update Password
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Change your password to keep your account secure.
            </p>
          </div>


          
          <UpdatePasswordForm />


          <div className="mt-8 pt-6 border-t border-gray-100">

            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-green-600">
                🔒
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">
                  Password security tips
                </p>

                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Use a strong password containing a combination of
                  uppercase letters, lowercase letters, numbers,
                  and special characters.
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

export {UpdatePassword}