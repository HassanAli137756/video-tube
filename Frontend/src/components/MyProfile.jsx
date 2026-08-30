import React, { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from '../api'
import ProfileCard from "../utils/ProfileCard";



const MyProfile = () => 
  {

  const currentUser = useSelector(state => state.userReducer.userInfo)
  const
    {
      channelId = currentUser.userData?._id,
      isOwnerProfile = currentUser.isAuthorized


    } = useLocation().state || {}

  const [msg, setMsg] = useState("")

  useEffect(() => {
    if (!channelId) {
      setMsg("UserId is not provided")
    }
  }, [useId])



  return (
    <div>
      <div className="relative">

        {msg.length > 0 && (
        <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
          <div
          className="text-red-500 italic"
          >
            <p>{msg}</p>
          </div>
        </div>
      )}

        <ProfileCard
          isAuthorized={isOwnerProfile && channelId == currentUser.userData?._id ? true : false}
          channelId={channelId}
          currentUserId={currentUser.userData?._id || ""}
        />
      </div>
    </div>
  );
};

export { MyProfile };