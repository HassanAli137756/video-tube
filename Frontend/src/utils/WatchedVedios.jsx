import React, { useEffect, useState } from "react";
import { VideoCards } from "../utils/VedioCards";
import { api } from "../api";
import { CustomButton } from "./CustomButton";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";



function WatchedVideos() 
{
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false)
  const currentUser = useSelector(state => state.userReducer.userInfo)
  const [msg, setMsg] = useState("")
  const navigate = useNavigate("")

  

  const getAllVedios = async () =>
  {
    if(!currentUser.userData?._id)
    {
        setMsg("Please Login to view your watched vedios")
        setTimeout(() => 
        {
            navigate("/login")
        }, 2500);
    }

    try 
    {
      setMsg("")
      setLoading(true)

      const res = await api.get(`/vedios/get-watch-history/${currentUser.userData?._id}`)

      if((res.data.status == 200 || 201) && res.data.success)
      {
        
        setVideos(res.data.data.watchHistory)

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

    getAllVedios()
    
  }, [])
  
    
    
   return (
    <div className="relative w-full px-4 py-6">

         {loading && (
          <div className="absolute inset-0 z-50  flex items-center justify-center bg-white/70 ">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
          </div>
        )}


        <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900">
                
            </h1>

            <p className="text-sm text-gray-500 mt-1">
                Videos you have watched
            </p>
        </div>

        {videos.length > 0 ? (
            <VideoCards 
            allVideos={videos}
            isAllowedRemoveVedioButton={true}
            
            />
        ) : !msg ? (
            <div className="flex min-h-60 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white">
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                        No videos found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                        There are no videos watched by you.
                    </p>
                </div>
            </div>
        ) : null
        }
        {
          msg.length > 0 &&
          <div className="flex min-h-60 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white">
            <div className="text-center">
              
              <div className="text-red-500 italic ">
                {msg}
              </div>
              <CustomButton
              type="button"
              name="Reload"
              onClick={() => getAllVedios()}
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
              
            </div>
          </div>
        }

    </div>
);
}

export {WatchedVideos};