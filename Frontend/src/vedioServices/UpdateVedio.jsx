import React from 'react'
import { UpdateVedioForm } from '../forms/UpdateVedioForm'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'

const UpdateVideo = (

) => {

    const {title, description, isPublished, vedioId, routePath} = useLocation().state || {}
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    
    
    useEffect(() => {

        if (!vedioId) {
            setMsg("Vedio is not provided")
            
        }

    }, [])


    return (
        <div className="relative bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">

            <div className="mx-auto max-w-4xl">
                {msg.length > 0 && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 ">
                        <p className='text-red-500 font-semibold'>
                            {msg}
                        </p>
                    </div>
                )}

                {/* Page Header */}
                <div className="mb-8">
                    <div className="flex items-start gap-4">

                        <div className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-green-100
                            text-green-700
                        ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.8}
                                stroke="currentColor"
                                className="h-5 w-5"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M16.862 3.487a2.25 2.25 0 013.182 3.182L8.25 18.563 4.5 19.5l.938-3.75L16.862 3.487z"
                                />
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M19.5 7.125L16.875 4.5"
                                />
                            </svg>
                        </div>

                        <div>
                            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                                Update Video
                            </h1>

                            <p className="mt-1.5 text-sm leading-6 text-gray-500">
                                Update your video's information, thumbnail, and other details.
                            </p>
                        </div>

                    </div>
                </div>


                {/* Main Form Card */}
                <div className="
                    overflow-hidden
                    rounded-2xl
                    border
                    border-gray-200
                    bg-white
                    shadow-sm
                ">

                    {/* Card Header */}
                    <div className="border-b border-gray-200 px-5 py-5 sm:px-7">

                        <h2 className="text-base font-semibold text-gray-900">
                            Video Details
                        </h2>

                        <p className="mt-1 text-sm text-gray-500">
                            Make the necessary changes to your video below.
                        </p>

                    </div>



                    <div className="p-5 sm:p-7">


                        {
                            title && description && vedioId ?
                            <UpdateVedioForm
                            description={description}
                            isPublished={isPublished}
                            routePath={routePath}
                            title={title}
                            vedioId={vedioId}
                            /> :
                            <div className='flex justify-center items-center'>
                                <p className='text-red-500 italic'>
                                    Failed to get existing vedio data
                                </p>
                            </div>
                        }


                    </div>



                </div>


                {/* Small Bottom Note */}
                <p className="mt-4 text-center text-xs text-gray-400">
                    Your changes will be applied to this video after saving.
                </p>

            </div>

        </div>
    )
}

export { UpdateVideo }