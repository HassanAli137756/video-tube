import React from "react";
import { CustomButton } from "./CustomButton";



const NoInternet = () => {
  return (
    <main className="min-h-screen bg-white px-6">
      <div className="mx-auto flex min-h-screen max-w-2xl flex-col items-center justify-center text-center">

        {/* Icon */}
        <div className="relative mb-8 flex h-28 w-28 items-center justify-center rounded-full bg-green-50">
          <div className="absolute inset-3 rounded-full border border-green-100" />

          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            className="h-14 w-14 text-green-600"
          >
            <path d="M3 8.5C7.8 4.5 16.2 4.5 21 8.5" />
            <path d="M6 12C9.4 9.2 14.6 9.2 18 12" />
            <path d="M9.5 15.5C11 14.3 13 14.3 14.5 15.5" />
            <path d="M12 19h.01" />

            {/* Connection cut */}
            <path
              d="M4 4L20 20"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          No Internet Connection
        </h1>

        {/* Description */}
        <p className="mt-4 max-w-md text-sm leading-6 text-gray-500 sm:text-base">
          We couldn't connect to the internet. Please check your network
          connection and try again.
        </p>

        {/* Retry Button */}
        <CustomButton
          type="button"
          name="Reload"
          onClick={() => window.location.reload()}
          isDefaultCassessAllowed={false}
          classes="
            mt-8
            rounded-xl
            bg-green-600
            px-7
            py-3
            text-sm
            font-semibold
            text-white
            shadow-sm
            transition-all
            duration-200
            hover:bg-green-700
            hover:shadow-md
            active:scale-[0.98]
          "
          
        />
          
        {/* Branding */}
        <div className="mt-14 flex items-center gap-2 text-sm text-gray-400">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-green-600">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              className="h-4 w-4 text-white"
            >
              <path
                d="M8 5.5V18.5L18 12L8 5.5Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <span>
            Video<span className="font-semibold text-green-600">Tube</span>
          </span>
        </div>

      </div>
    </main>
  );
};

export {NoInternet};
