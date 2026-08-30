import React, { use } from "react";
import { useNavigate } from "react-router-dom";


const SubscriberCards = ({ subscribers=[] }) => 
{
  const navigate = useNavigate()
  console.log("All Subscribees", subscribers);
  

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {
        subscribers.length > 0 ?
        subscribers.map(user =>
        (
            <div 
            key={user._id}
            className="w-full max-w-md overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-lg">

      {/* Top Background */}
      <div className="h-24 bg-linear-to-r from-green-500 to-emerald-400" />

      {/* Profile Section */}
      <div className="px-6 pb-6">

        {/* Avatar */}
        <div className="-mt-14">
          <img
            src={user?.user?.avatar}
            alt={user?.user?.userName}
            className="h-28 w-28 rounded-full border-4 border-white object-cover shadow-lg"
          />
        </div>

        {/* User Info */}
        <div className="mt-4">
          <h2 className="text-2xl font-bold text-gray-900">
            {user?.user?.userName}
          </h2>

        </div>

        {/* Divider */}
        <div className="my-5 h-px bg-gray-200" />

        {/* User ID */}
        <div className="rounded-2xl bg-gray-50 p-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            User Email
          </p>

          <p className="mt-1 break-all text-sm font-medium text-gray-700">
            {user?.user?.email}
          </p>
        </div>

        {/* Action */}
        <button
          onClick={() => navigate(`/profile`, {state: {isOwnerProfile: false, channelId:user?.user?._id}})}
          className="
            mt-5 w-full rounded-xl
            bg-green-600 px-5 py-3
            font-semibold text-white
            shadow-md shadow-green-600/20
            transition
            hover:bg-green-700
            active:scale-[0.98]
          "
        >
          View Profile
        </button>

      </div>
    </div>
        )
    ) :
    (
        <div className="flex justify-center">
            <p className="text-red-500">
                There is no subscriber
            </p>
        </div>
    )
    }
    
    </div>
  );
};

export {SubscriberCards};