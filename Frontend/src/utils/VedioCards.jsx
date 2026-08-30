import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {CustomButton} from '../utils/CustomButton'
import { api } from "../api";
import { useSelector } from "react-redux";
import { Like } from "./Like";
import { RemoveVedio } from "./RemoveVedio";


function VideoCards({
  allVideos = [],
  isAllowedOwnerOperations = false,
  isAllowedLikeButton=false,
  isAllowedRemoveVedioButton = false
}) 

{
    const currentUser = useSelector(state => state.userReducer.userInfo)
    const [videos, setVideos] = useState(allVideos)
    const [loading, setLoading] = useState(false)
    const [isConfirmDeleting, setIsConfirmDeleting] = useState(false)
    const [disable, setDisable] = useState(false)
    const [vedioId, setVedioId] = useState("")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()

    const removeMsg = () =>
    {
      setTimeout(() => {
        setMsg("")
      }, 2055);
    }


    const deleteVedio = async () => 
    {
      setIsConfirmDeleting(false)

      if(!vedioId)
      {
        return setMsg("Vedio id is not provided")
      }

        try 
        {
          console.log("try of deleteVedio() executed", vedioId);
          
            setMsg("")
            setLoading(true)
            setDisable(true)

            const res = await api.delete(`/vedios/delete-vedio/${vedioId}`)


            if ((res.data.status == 200 || 201) && res.data.success) 
            {
                
                setMsg("Successfully deleted vedio")

                setVideos(prev => prev.filter(vedio => vedio._id !== vedioId))

            }
            else {
                setMsg("Something went wrong, failed to delete vedio")
            }

        }
        catch (error) {
            setMsg(error.response?.data?.message || "Something went wrong, failed to delete vedio")
            
            removeMsg()
        }
        finally {
            setLoading(false)
            setDisable(false)
            setVedioId("")
            removeMsg()
        }
    }


  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">


      {msg.length > 0 && (
        <div className="absolute inset-0 z-50  flex items-center justify-center bg-white/70 ">
          <div className="flex justify-center">
            <p className="text-red-500 italic">
              {msg}
            </p>
          </div>
        </div>
      )}

      {loading && (
        <div className="absolute inset-0 z-50  flex items-center justify-center bg-white/70 ">
          <div className="flex justify-center text-red-500 items-center italic">
            <p>Please wait deleting vedio...</p>
          </div>
        </div>
      )}

      {isConfirmDeleting && (
        <div className="absolute inset-0 z-50  flex items-center justify-center bg-white/70 ">
          <div className="flex items-center justify-end gap-3">

            <div className=" grid relative gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">

              <p className=" text-red-500 ">
              Are you sure you want to delete vedio
            </p>
            <div className="flex justify-evenly">
              <CustomButton
              disable={disable}
              onClick={() => (setIsConfirmDeleting(false), setVedioId(""))}
              classes="
                  flex-1
                  rounded-lg
                  w-full
                  border
                  border-green-200
                  bg-green-50
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-green-700
                  transition
                  hover:border-green-300
                  hover:bg-green-100
                "
              isDefaultCassessAllowed={false}
              name='No'
            />

            <CustomButton
              onClick={() => deleteVedio()}
              isDisable={disable}
              isDefaultCassessAllowed={false}
              classes="
                  flex-1
                  rounded-lg
                  border
                  border-red-200
                  w-full
                  bg-red-50
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-red-600
                  transition
                  hover:border-red-300
                  hover:bg-red-100
                "
              name='Yes'


            />
            </div>

            </div>

          </div>
        </div>
      )}



      {
        videos.length > 0 &&
        
        videos.map((video) => (
        <article
          key={video._id}
          className="
          relative
          group
          p-2
          overflow-hidden
          rounded-xl
          border
          border-gray-300
          bg-white
          shadow-sm
          transition-shadow
          hover:shadow-md
        "
        >
          {/* ==================== THUMBNAIL ==================== */}

          <Link to={`/run-vedio/${video._id}`} className="block">
            <div className="
                relative
                aspect-video
                overflow-hidden
                rounded-xl
                bg-gray-100
              ">

                <img
                  src={video.thumbNail}
                  alt={video.title}
                  className="
                    h-full
                    w-full
                    object-cover
                    transition-transform
                    duration-300
                    group-hover:scale-105
                  "
                />


                {/* Duration */}
                <span className="
                  absolute
                  bottom-2
                  right-2
                  rounded-md
                  bg-black/80
                  px-2
                  py-1
                  text-xs
                  font-medium
                  text-white
                ">
                  {`${Math.floor(video.duration / 3600).toString().padStart("2", 0)}:${Math.floor((video.duration % 3600) / 60).toString().padStart("2", 0)}:${(Math.floor(video.duration) % 60).toString().padStart("2", 0)}`}
                </span>


                {/* Play Overlay */}
                <div className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  bg-black/0
                  transition-all
                  duration-200
                  group-hover:bg-black/20
                ">

                  <div className="
                    flex
                    h-12
                    w-12
                    scale-75
                    items-center
                    justify-center
                    rounded-full
                    bg-green-600
                    text-white
                    opacity-0
                    transition-all
                    duration-200
                    group-hover:scale-100
                    group-hover:opacity-100
                  ">
                    ▶
                  </div>

                </div>

              </div>
          </Link>

          {/* ==================== VIDEO INFO ==================== */}

          <div className="flex gap-3 pt-3">

            {/* USER AVATAR */}

            {
              !isAllowedOwnerOperations &&
              <div
                onClick={()=> navigate(`/profile`, {state: {isOwnerProfile: video.owner._id === currentUser.userData?._id ? true : false, channelId: video.owner._id}})}
                className="shrink-0 hover:cursor-pointer"

              >
                <img
                  src={video.owner.avatar}
                  alt={video.owner.userName}
                  className="
                  h-10
                  w-10
                  rounded-full
                  object-cover
                  ring-1
                  ring-gray-200
                "
                />
              </div>
            }



            {/* TITLE + USERNAME */}

            <div className="min-w-0 flex-1">
              <Link
                to={`/run-vedio/${video._id}`}
                className="
                  line-clamp-2
                  text-sm
                  font-semibold
                  leading-5
                  text-gray-900
                  transition-colors
                  hover:text-green-600
                "
              >
                {video.title}
              </Link>

              {
                !isAllowedOwnerOperations &&
                <div
                onClick={()=> navigate(`/profile`, {state: {isOwnerProfile: video.owner._id === currentUser.userData?._id ? true : false, channelId: video.owner._id}})}
                  className="
                  mt-1
                  block
                  truncate
                  text-sm
                  text-gray-500
                  hover:text-gray-700
                  hover:cursor-pointer
                "
                >
                  {video.owner.userName}
                </div>
              }
            </div>
          </div>

          {/* ==================== OWNER OPERATIONS ==================== */}

          {isAllowedOwnerOperations && (
            <div className="mt-4 flex justify-evenly border-t border-gray-100 pt-3">

              <CustomButton
                onClick={() => navigate("/update-vedio", 
                {
                  state: 
                  {
                    title: video.title, 
                    description: video.description, 
                    isPublished: video.isPublished, 
                    vedioId: video._id, 
                    routePath:`/my-content`
                  }
                }
              )}
                name="Update"                
                isDefaultCassessAllowed={false}
                classes="
                  flex-1
                  rounded-lg
                  w-full
                  border
                  border-green-200
                  bg-green-50
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-green-700
                  transition
                  hover:border-green-300
                  hover:bg-green-100
                "
              />

              <CustomButton
                onClick={() => (setIsConfirmDeleting(true), setVedioId(video._id))}
                name="Delete"
                isDefaultCassessAllowed={false}
                classes="
                  flex-1
                  rounded-lg
                  border
                  border-red-200
                  w-full
                  bg-red-50
                  px-4
                  py-2
                  text-sm
                  font-semibold
                  text-red-600
                  transition
                  hover:border-red-300
                  hover:bg-red-100
                "
              />
                

            </div>
          )}


          {
            isAllowedLikeButton && currentUser.userData?._id &&
            <div className="relative flex justify-end pr-3">
            <div>
              <Like
              isAllowedLikesCout={false}
              isLiked={true}
              vedioId={video._id}
              />
            </div>
          </div>
          }

          {
            isAllowedRemoveVedioButton && currentUser.userData?._id &&
            <div className=" flex justify-end pr-3">
            <div>
              <RemoveVedio
              vedioId={video._id}
              callBack={setVideos}
              />
            </div>
          </div>
          }


        </article>
      ))}
    </div>
  );
}

export { VideoCards };