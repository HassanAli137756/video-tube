import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import VedioPlayer from "../utils/VedioPlayer";
import { VedioInfo } from "../utils/VedioInfo";
import { VedioComments } from "../utils/VedioComments";
import { api } from "../api";
import { useSelector } from "react-redux";
import { CustomButton } from "../utils/CustomButton";


function RunVideo() {

  const { vedioId } = useParams();
  const navigate = useNavigate()
  const [msg, setMsg] = useState("")
  const currentUser = useSelector(state => state.userReducer.userInfo)
  const [vedio, setVedio] = useState({})
  const [loading, setLoading] = useState(true)


  const navigation = (url="/") =>
  {
    setTimeout(() => 
    {
      setMsg("")

      navigate(url)
    }, 2500);
  }

  const addVedioToHistory = async (vedioId) =>
  {
    
    const response = await api.post(`/vedios/add-vedio-in-history/${vedioId}`)
    console.log("is Vedios added to history", response);

  }


  const getVedio = async () => 
  {
    
    if (vedioId.length === 0) {
      setMsg("No vedio found please try again")

      
      navigation("/")
    }



    try 
    {
      setMsg("")
      setLoading(true)

      const res = await api.get(`/vedios/get-vedio-info/${vedioId}?userId=${currentUser.userData?._id || ""}`)

      if ((res.data.status == 200 || 201) && res.data.success) 
      {


        
        setVedio(res.data.data)

        if(localStorage.getItem("localSaveStatus") == 1 )
        {
          await addVedioToHistory(res.data.data._id)
        }

        
      }

      else 
      {
        setMsg("Something went wrong, failed to fetched vedio")

      }

    }

    catch(error) 
    {
      setMsg(error.response?.data?.message || "Something went wrong, failed to fetched vedio")
    }

    finally 
    {
      setLoading(false)
    }
  }

  useEffect(() => 
  {

    getVedio()

  }, [])

  


  return (
    <main className="relative min-h-[calc(100vh-4rem)]  w-full bg-slate-50">

      {loading && (
        <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
        </div>
      )}

      {
        !loading && msg.length > 0 && !vedio._id &&
        <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
          
          <div>
          <p className="font-semibold italic text-red-600 ">
            {msg} Failed to fetched vedio
          </p>

          <div className="leading-7 flex justify-center">
            <CustomButton
            onClick={() => getVedio()}
            name="Reload"

            />
          </div>
          </div>
          
        </div>
      }

      {
        !loading && vedio._id &&
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        <VedioPlayer
        thumbNailURL={vedio.thumbNail}
        vedioId={vedio._id}
        vedioURL={vedio.vedio}
        />


        <VedioInfo
        subscriptionDoc={vedio.subscriptionDoc}
        vedioId={vedio._id}
        description={vedio.description}
        isLiked={vedio.isLiked}
        ownerAvatar={vedio.owner.avatar}
        ownerId={vedio.owner._id}
        ownerName={vedio.owner.userName}
        title={vedio.title}
        likesCount={vedio.likesCounts}
        userData={currentUser.userData}
        />


        <VedioComments 
        vedioId={vedio._id}
        comments={vedio.allcomments}
        userId={currentUser?.userData?._id || "" }
        />

      </div>
      }
    </main>
  );
}

export { RunVideo };