import React, { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import {api} from '../api'
import { CustomButton } from "./CustomButton";



const ProfileCard = (
{
  isAuthorized=false,
  channelId="",
  currentUserId=""
}
) => 
{

  const navigate = useNavigate()
  const [msg, setMsg] = useState("")
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false)


  
  const removeMsg = () => {
      setTimeout(() => {
          setMsg("")
      }, 2500);
  }


  const getUserProfile = async () =>
  {
    try 
    {
      setMsg("")
      setLoading(true)

      const res = await api.post(`/users/user-channel-profile/${channelId}?userId=${currentUserId}`)

      if((res.data.status == 200 || 201) && res.data.success)
      {
        
        setUser(res.data.data)

      }
      else
      {
        setMsg("Something went wrong, failed to fetched vedios")
      }

    } 
    catch(error) 
    {
        setMsg(error.response?.data?.message || "Something went wrong, failed to fetched vedios")
    }
    finally
    {
      setLoading(false)
    }
  }




  useEffect(() =>
  {
    if(!channelId)
    {
      return setMsg("Channel-Id is not provided")
    }

    getUserProfile()

  }, [])

  const stats = [
    {
      title: "Total Likes",
      count: user?.totalLikes || 0,
      icon: "♥",
      path: "",
      header: "My Likes",
      message: "All users who liked you",
    },
    {
      title: "Uploaded Videos",
      count: user?.totalVedios ||0,
      icon: "▶",
      path:"/my-stats",
      data: user?.vedios || [],
      purpose: "vedios"

    },
    {
      title: "Subscribers",
      count: user?.subscriberCounts ||0,
      icon: "👥",
      path: "/my-stats",
      header: "My Subscribers",
      message: "All users who subscribed you",
      data: user?.subscribers || [],
      purpose: "subscribers"
    },
    {
      title: "Subscribed Channels",
      count: user?.subscribedChannelsCounts ||0,
      icon: "✓",
      path: "/my-stats",
      header: "My Subscribed Channels",
      message: "All users who subscribed by you",
      data: user?.subscribedChannels || [],
      purpose: "subscribedChannels"
    },
  ];

  return (
    <div className="relative bg-white px-6 py-10">

      {msg.length > 0 && !user?._id && (
        <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
          <div
          className="text-red-500 italic"
          >
            <p>{msg}</p>
            <br />
            <div>
              <CustomButton
              onClick={() => getUserProfile()}
              name="Reload"
              />
            </div>
          </div>
        </div>
      )}

      {msg.length > 0 && user?._id && (
        <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
          <div
          className="text-red-500 italic"
          >
            <p>{msg}</p>
          </div>
        </div>
      )}

       {loading && (
        <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
        </div>
      )}

      <div className="mx-auto max-w-6xl">

        {/* Heading */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage and view your activity
          </p>
        </div>


        {/* Profile Overview */}
        <div className="mb-10 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

            {/* Avatar */}
            
              <img 
              className="flex h-20 w-20 shrink-0
              items-center justify-center
              rounded-full
              bg-green-100
              text-2xl font-bold"
              src={user?.avatar} alt="No Preview" />
            


            {/* User Info */}
            <div className="flex-1">

              <h2 className="text-xl font-bold text-gray-900">
                {user?.userName}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your VideoTube activity at a glance
              </p>

            </div>


            {/* Mini Stats */}
            <div className="flex gap-8">



              <div
              >
                <p className="text-xl font-bold text-gray-900">
                  {user?.totalVedios || 0}
                </p>

                <p className="text-xs text-gray-500">
                  Videos
                </p>
              </div>


              <div>
                <p className="text-xl font-bold text-gray-900">
                  {user?.subscriberCounts || 0}
                </p>

                <p className="text-xs text-gray-500">
                  Subscribers
                </p>
              </div>


              <div>
                <p className="text-xl font-bold text-gray-900">
                  {user?.subscribedChannelsCounts || 0}
                </p>

                <p className="text-xs text-gray-500">
                  Subscribed
                </p>
              </div>

            </div>

          </div>

        </div>


        {/* Activity Heading */}
        <div className="mb-5">

          <h2 className="text-lg font-bold text-gray-900">
            Your Activity
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            View your activity statistics
          </p>

        </div>


        {/* Main Stats */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

          {stats.map((stat) => (

            <div
              onClick={() => ( (isAuthorized && stat.path.length > 0) || stat.purpose == "vedios"  ? navigate(stat.path, {state: {header: stat.header, message: stat.message, data: stat.data, isAuthorized: isAuthorized, purpose: stat.purpose}}) : null)}
              key={stat.title}
              className="
                group cursor-pointer
                rounded-2xl
                border border-gray-200
                bg-white
                p-6
                shadow-sm
                transition-all duration-200
                hover:-translate-y-1
                hover:border-green-400
                hover:shadow-md
              "
            >

              <div className="flex items-start justify-between">

                {/* Icon */}
                <div className="
                  flex h-12 w-12
                  items-center justify-center
                  rounded-xl
                  bg-green-50
                  text-lg
                  text-green-600
                ">
                  {stat.icon}
                </div>


                {/* Arrow */}
                <span className="
                  text-xl
                  text-gray-300
                  transition-all
                  group-hover:translate-x-1
                  group-hover:text-green-500
                ">
                  →
                </span>

              </div>


              {/* Count */}
              <div className="mt-7">

                <h3 className="
                  text-4xl
                  font-bold
                  text-gray-900
                ">
                  {stat.count}
                </h3>

                <p className="
                  mt-2
                  text-sm
                  font-medium
                  text-gray-500
                ">
                  {stat.title}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export default React.memo(ProfileCard)