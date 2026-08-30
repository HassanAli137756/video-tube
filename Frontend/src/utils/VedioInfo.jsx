import React, { useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";
import { CustomButton } from './CustomButton';
import { api } from '../api';
import {Like} from './Like';
import { Subscribe } from './Subscribe';


function VedioInfo(
    {
        subscriptionDoc={},
        title = "",
        ownerAvatar = "",
        ownerId = "",
        ownerName = "",
        isLiked = false,
        likesCount = 0,
        description = "",
        userData = {},
        vedioId = ""

    }
) {

    const [isLike, setIsLike] = useState(isLiked)
    const [totalLikes, setTotalLikes] = useState(likesCount)
    const [disable, setDisable] = useState(false)
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()


    const removeMsg = () => {
        setTimeout(() => {
            setMsg("")
        }, 2500);
    }


    
    return (
        <div>

            <section className="mt-5 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                {/* TITLE */}

                <div>
                    <h1 className="text-xl font-bold leading-7 text-slate-900 sm:text-2xl">
                        Title
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        {title}
                    </p>
                </div>


                {/* =====================================================
                      OWNER + ACTIONS
                  ====================================================== */}

                <div className="mt-5 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                    {/* OWNER */}

                    <div className="flex items-center gap-3">

                        <div
                        onClick={() => navigate(`/profile`, {state: {isOwnerProfile: ownerId == userData?._id ? true : false, channelId: ownerId}})}

                        className="shrink-0 hover:cursor-pointer"
                        >
                            <img
                                src={ownerAvatar}
                                alt={"Image not found"}
                                className="
                                h-11
                                w-11
                                rounded-full
                                object-cover
                                ring-1
                                ring-slate-200
                            "
                            />
                        </div>

                        <div className="min-w-0">
                            <div
                            onClick={() => navigate(`/profile`, {state: {isOwnerProfile: ownerId == userData?._id ? true : false, channelId: ownerId}})}
                            className="
                            block 
                            hover:cursor-pointer
                            truncate
                            text-sm
                            font-semibold
                            text-slate-900
                            hover:text-green-600
                          "
                            >
                                {ownerName}
                            </div>

                            <p className="text-xs text-slate-500">
                                Creator
                            </p>
                        </div>

                        <Subscribe 
                        subscribeDocId={subscriptionDoc?._id}
                        subscribeStatus={subscriptionDoc._id ? true: false}
                        vedioId={vedioId}
                        ownerId={ownerId}
                        />

                    </div>


                    {/* ACTIONS */}

                    <Like 
                    vedioId={vedioId}
                    isLiked={isLiked}
                    likesCount={likesCount}
                    />

                </div>

                


                {/* =====================================================
                      DESCRIPTION
                  ====================================================== */}

                <div className="mt-5 rounded-xl bg-slate-50 p-4">

                    <h2 className="text-sm font-semibold text-slate-900">
                        Description
                    </h2>

                    <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-600">
                        {/* Yahan video.description show karna */}
                        {description}
                    </p>

                </div>

            </section>

        </div>

    )
}

export { VedioInfo }