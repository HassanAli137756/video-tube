import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from "react-router-dom";
import { CustomButton } from './CustomButton';
import { api } from '../api';

function Like(
{
    likesCount=0,
    isLiked=false,
    vedioId="",
    isAllowedLikesCout=true
}
) 
{
    const userData = useSelector(state => state.userReducer.userInfo.userData)

    const [isLike, setIsLike] = useState(isLiked)
    const [totalLikes, setTotalLikes] = useState(likesCount)
    const [disable, setDisable] = useState(false)
    const [msg, setMsg] = useState("")


    const removeMsg = () => {
        setTimeout(() => {
            setMsg("")
        }, 2500);
    }

    const handleLike = async () => {
        if (!userData._id) 
        {
            setMsg("Please login to perform like operations")
            return removeMsg()

        }

        if (!vedioId) 
        {
            setMsg("Vedio ID is not provided")
            return removeMsg()

        }

        try {
            setDisable(true)
            if (isLike) {

                const res = await api.delete(`/likes/remove-like/${vedioId}`)

                if ((res.status == 200 || 201) && res.data.success) {
                    setIsLike(false)
                    setTotalLikes(prev => --prev)
                    console.log("Successfully dislike a vedios");
                    
                }
                else {
                    setMsg("Failed to like vedio")
                    removeMsg()
                }

            }
            else {
                const res = await api.post(`/likes/add-like/${vedioId}`)

                if ((res.status == 200 || 201) && res.data.success) {
                    setIsLike(true)
                    setTotalLikes(prev => ++prev)
                }
                else {
                    setMsg("Failed to perform operation")
                    removeMsg()
                }

            }
        }
        catch (error) {
            setMsg(error.response?.data?.message || "Failed to perform operation")

            removeMsg()
        }
        finally {
            setDisable(false)
        }


    }


    return (
        <div className="flex flex-wrap items-center gap-2">

            <div>
                <div className='grid   items-center'>

                    <div className='flex flex-wrap items-end justify-center'>

                    <button
                        disabled={disable}
                        onClick={() => handleLike()}
                        className="transition-transform mr-1.5 active:scale-90"
                    >
                        <svg
                            className={`h-6 w-6 
                                ${isLike ? "fill-red-500 text-red-500" : "fill-transparent text-black"
                                }`}
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                    </button>
                    {
                        isAllowedLikesCout &&
                        <div className=' text-xl '>
                            {totalLikes}
                        </div>
                    }
                    </div>
                    



                {
                    msg.length > 0 &&

                    <div
                        className="mt-5 rounded-xl flex justify-center items-center bg-slate-50 p-4">

                        <h2 className="text-sm italic  font-semibold text-red-600">

                            {msg}

                        </h2>

                    </div>
                }




            </div>
                </div>

        </div>
    )
}

export {Like}