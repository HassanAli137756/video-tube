import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import videoPlayer from "../utils/videoPlayer";
import { videoInfo } from "../utils/videoInfo";
import { videoComments } from "../utils/videoComments";
import { api } from "../api";
import { useSelector } from "react-redux";
import { CustomButton } from "../utils/CustomButton";


function RunVideo() {

  const { videoId } = useParams();
  const navigate = useNavigate()
  const [msg, setMsg] = useState("")
  const currentUser = useSelector(state => state.userReducer.userInfo)
  const [video, setvideo] = useState({})
  const [loading, setLoading] = useState(true)


  const navigation = (url="/") =>
  {
    setTimeout(() => 
    {
      setMsg("")

      navigate(url)
    }, 1000);
  }

  const addvideoToHistory = async (videoId) =>
  {
    
    const response = await api.post(`/videos/add-video-in-history/${videoId}`)

  }


  const getvideo = async () => 
  {
    
    if (videoId.length === 0) {
      setMsg("No video found please try again")

      
      navigation("/")
    }



    try 
    {
      setMsg("")
      setLoading(true)

      const res = await api.get(`/videos/get-video-info/${videoId}?userId=${currentUser.userData?._id || ""}`)

      if ((res.data.status == 200 || 201) && res.data.success) 
      {


        
        setvideo(res.data.data)

        if(localStorage.getItem("localSaveStatus") == 1 )
        {
          await addvideoToHistory(res.data.data._id)
        }

        
      }

      else 
      {
        setMsg("Something went wrong, failed to fetched video")

      }

    }

    catch(error) 
    {
      setMsg(error.response?.data?.message || "Something went wrong, failed to fetched video")
    }

    finally 
    {
      setLoading(false)
    }
  }

  useEffect(() => 
  {

    getvideo()

  }, [])

  


  return (
    <main className="relative min-h-[calc(100vh-4rem)]  w-full bg-slate-50">

      {loading && (
        <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
        </div>
      )}

      {
        !loading && msg.length > 0 && !video._id &&
        <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
          
          <div>
          <p className="font-semibold italic text-red-600 ">
            {msg} Failed to fetched video
          </p>

          <div className="leading-7 flex justify-center">
            <CustomButton
            onClick={() => getvideo()}
            name="Reload"

            />
          </div>
          </div>
          
        </div>
      }

      {
        !loading && video._id &&
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <videoPlayer
        thumbNailURL={video.thumbNail}
        videoId={video._id}
        videoURL={video.video}
        />


        <videoInfo
        subscriptionDoc={video.subscriptionDoc}
        videoId={video._id}
        description={video.description}
        isLiked={video.isLiked}
        ownerAvatar={video.owner.avatar}
        ownerId={video.owner._id}
        ownerName={video.owner.userName}
        title={video.title}
        likesCount={video.likesCounts}
        userData={currentUser.userData}
        />


        <videoComments 
        videoId={video._id}
        comments={video.allcomments}
        userId={currentUser?.userData?._id || "" }
        />

      </div>
      }
    </main>
  );
}

export { RunVideo };