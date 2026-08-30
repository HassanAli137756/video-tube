import React from 'react'
import LoginForm from '../forms/LoginForm';

function Login() {
  return (
  <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-green-100 flex items-center justify-center px-4 py-10">
    <div
      className="
        w-full
        max-w-6xl
        overflow-hidden
        rounded-3xl
        bg-white
        shadow-2xl
        grid
        lg:grid-cols-2
      "
    >

      <div
        className="
          hidden
          lg:flex
          relative
          overflow-hidden
          flex-col
          justify-between
          bg-linear-to-br
          from-green-700
          via-green-600
          to-emerald-700
          p-12
          text-white
        "
      >
        {/* Decorative Shapes */}

        <div className="absolute -top-16 -right-16 h-56 w-56 rounded-full bg-white/10"></div>

        <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-white/10"></div>

        {/* Logo */}

        <div>
          <h1 className="text-4xl font-bold tracking-wide">
            VideoTube
          </h1>

          <p className="mt-4 text-lg text-green-100">
            Secure. Fast. Built for creators.
          </p>
        </div>

        {/* Hero Text */}

        <div>
          <h2 className="text-6xl font-extrabold leading-tight">
            Welcome
            <br />
            Back 👋
          </h2>

          <p className="mt-6 max-w-md text-lg leading-8 text-green-100">
            Continue your creator journey. Upload videos,
            manage your content and stay connected with
            your audience.
          </p>
        </div>

        {/* Bottom Stats */}

        <div className="grid grid-cols-2 gap-5">
          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
            <h3 className="text-4xl font-bold">
              100%
            </h3>

            <p className="mt-2 text-green-100">
              Secure Authentication
            </p>
          </div>

          <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
            <h3 className="text-4xl font-bold">
              24/7
            </h3>

            <p className="mt-2 text-green-100">
              Instant Access
            </p>
          </div>
        </div>
      </div>


      <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14">
        <div className="w-full max-w-md">

          {/* Heading */}

          <div className="text-center">
            <h2 className="text-5xl font-bold text-gray-900">
              Sign In
            </h2>

            <p className="mt-4 text-gray-500">
              Welcome back! Login to continue.
            </p>
          </div>

         
            <LoginForm />



          <div className="mt-4 text-right">
            <button className="text-sm font-medium text-green-700 hover:text-green-800">
              Forgot Password?
            </button>
          </div>


          <div className="mt-6">
            
          </div>

          {/* Divider */}

          <div className="my-8 flex items-center">
            <div className="h-px flex-1 bg-gray-200"></div>

            <span className="px-4 text-sm text-gray-400">
              OR
            </span>

            <div className="h-px flex-1 bg-gray-200"></div>
          </div>






          <div className="mt-8 text-center">
            <p className="text-gray-500">
              Don't have an account?
            </p>

            <button className="mt-2 font-semibold text-green-700 transition-colors hover:text-green-800">
              Create Account
            </button>
          </div>

        </div>
      </div>
    </div>
  </div>
);
}

export { Login}