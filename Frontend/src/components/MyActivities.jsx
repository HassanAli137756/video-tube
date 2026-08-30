import React, { useEffect, useId, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from '../api'
import ProfileCard from "../utils/ProfileCard";
import ActivitiesCard from "../utils/ActivitiesCard";



const MyActivities = () => {

    const currentUser = useSelector(state => state.userReducer.userInfo)
    const navigate = useNavigate()
    const [msg, setMsg] = useState("")


    


    useEffect(() => {
        if (!currentUser.userData._id) {
            setMsg("Please login to view your activities")
        }


    }, [currentUser.userData._id])


    
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

                {
                    currentUser.userData?._id &&
                    <div>
                        <ActivitiesCard
                            currentUser={currentUser.userData}
                            isAuthorized={currentUser.isAuthorized}
                        />
                    </div>
                }


            </div>
        </div>
    );
};

export { MyActivities };