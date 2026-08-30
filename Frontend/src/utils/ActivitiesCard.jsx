import React, { act, use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { data, useNavigate } from "react-router-dom";
import {api} from '../api'
import { CustomButton } from "./CustomButton";



const ActivitiesCard = (
{
  isAuthorized=false,
  currentUser={}
}
) => 
{

  const navigate = useNavigate()
  const [msg, setMsg] = useState("")
  const [activities, setActivities] = useState({});
  const [loading, setLoading] = useState(false)


  
  const removeMsg = () => {
      setTimeout(() => {
          setMsg("")
      }, 2500);
  }


  const getUserActivities = async () =>
  {
    try 
    {
      setMsg("")
      setLoading(true)

      const res = await api.get(`/users/get-activities-count/${currentUser?._id}`)

      if((res.data.status == 200 || 201) && res.data.success)
      {
        console.log("Request have reached to set activities");
        
        setActivities(res.data.data)

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
    if(!currentUser?._id)
    {
      return setMsg("Please login to view your activities")
    }

    getUserActivities()

  }, [])


  console.log("activities:", activities);



  const activitiesBoxes = [
    {
      title: "All vedios liked by me",
      count: activities?.likedVediosCount || 0,
      icon: "♥",
      path: "/my-liked-vedios",
      userId: currentUser?._id || "",
      header: "My Liked Vedio"
    },
    {
      title: "All comments added by me",
      count: activities?.commentsCount || 0 ,
      icon: "💬",
      path:"/my-added-comments",
      userId: currentUser?._id || "",
      header: "My Added Comments"
    },
    {
      title: "All vedios watched by me",
      count: activities?.watchedVediosCount ||0,
      icon: "▶",
      path: "/my-watched-vedios",      
      userId: currentUser?._id || "",
      header: "My Watched Vedios"
    },
  ];

  return (
    <div className="relative bg-white px-6 py-10">

      {msg.length > 0  && (
        <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
          <div
          className="text-red-500 italic"
          >
            <p>{msg}</p>
            
            
          </div>
        </div>
      )}

      {msg.length > 0 && currentUser?._id && (
        <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
          <div
          className="text-red-500 italic"
          >
            <p>{msg}</p>
            <br />
            <div>
              <CustomButton
              onClick={() => getUserActivities()}
              name="Reload"
              />
            </div>
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
            My Activities
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
              src={currentUser?.avatar} alt="No Preview" />
            


            {/* User Info */}
            <div className="flex-1">

              <h2 className="text-xl font-bold text-gray-900">
                {currentUser?.userName}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Your VideoTube activity at a glance
              </p>

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
        <div className="grid grid-cols-1 gap-5 ">

          {activitiesBoxes.map((stat) => (

            <div
              onClick={() => navigate(stat.path, {state: {userId: stat.userId, title: stat.title, header: stat.header}})}
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

export default React.memo(ActivitiesCard)