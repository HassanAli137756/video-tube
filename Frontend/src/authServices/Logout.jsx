import React from 'react'

function Logout() {
  return (
  <div
    className="
      grid
      min-h-screen
      bg-white
      lg:grid-cols-2
    "
  >
    {/* =======================================================
                        LEFT BRANDING PANEL
    ======================================================= */}

    <div
      className="
        hidden
        lg:flex
        relative
        overflow-hidden
        flex-col
        justify-between
        bg-linear-to-br
        from-red-600
        via-red-500
        to-orange-500
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

        <p className="mt-4 text-lg text-red-100">
          Thanks for visiting today.
        </p>
      </div>

      {/* Hero Text */}

      <div>
        <h2 className="text-6xl font-extrabold leading-tight">
          See You
          <br />
          Soon 👋
        </h2>

        <p className="mt-6 max-w-md text-lg leading-8 text-red-100">
          Your account remains secure. Come back anytime
          to upload videos, manage your content and
          connect with your audience.
        </p>
      </div>

      {/* Bottom Cards */}

      <div className="grid grid-cols-2 gap-5">
        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
          <h3 className="text-4xl font-bold">
            Safe
          </h3>

          <p className="mt-2 text-red-100">
            Session Ended
          </p>
        </div>

        <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-md">
          <h3 className="text-4xl font-bold">
            ❤️
          </h3>

          <p className="mt-2 text-red-100">
            Come Back Anytime
          </p>
        </div>
      </div>
    </div>

    {/* =======================================================
                        RIGHT LOGOUT PANEL
    ======================================================= */}

    <div className="flex items-center justify-center px-6 py-12 sm:px-10 lg:px-14">
      <div className="w-full max-w-md">

        {/* Icon */}

        <div className="flex justify-center">
          <div
            className="
              flex
              h-24
              w-24
              items-center
              justify-center
              rounded-full
              bg-red-100
            "
          >
            {/* LOGOUT ICON HERE */}
          </div>
        </div>

        {/* Heading */}

        <div className="mt-8 text-center">
          <h2 className="text-5xl font-bold text-gray-900">
            Logged Out
          </h2>

          <p className="mt-4 text-gray-500 leading-7">
            You have successfully signed out of your
            account. We hope to see you again soon.
          </p>
        </div>

        {/* Status Card */}

        <div
          className="
            mt-8
            rounded-2xl
            border
            border-red-100
            bg-red-50
            p-5
            text-center
          "
        >
          <h3 className="font-semibold text-red-700">
            Session Ended Successfully
          </h3>

          <p className="mt-2 text-sm text-red-600">
            Your authentication token has been cleared
            and your session is now secure.
          </p>
        </div>

        {/* Buttons */}

        <div className="mt-8 space-y-4">

          {/* LOGIN BUTTON HERE */}

          {/* GO HOME BUTTON HERE */}

        </div>

      </div>
    </div>
  </div>
);
}

export default Logout