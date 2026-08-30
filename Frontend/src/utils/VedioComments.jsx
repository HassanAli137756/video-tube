import React, { useEffect } from 'react'
import { CommentForm } from '../forms/CommentForm'
import { useState } from 'react';
import { CustomButton } from './CustomButton';
import { api } from '../api';

function VedioComments(
    {
        vedioId,
        comments =
        [

        ],
        userId
    }
) {

    const [allComments, setAllComments] = useState(comments)
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [commentId, setCommentId] = useState("")


    const addNewLocalComment = (comment) => {

        setAllComments(prev => [...prev, comment])
    }

    const removeMsg = () =>
    {
        setTimeout(() => 
        {
            setMsg("")
        }, 2500);
    }

    const removeComment = async (commentId) =>
    {
        setCommentId(commentId)

        if(!commentId)
        {
            setMsg("Something went wrong, comment-Id isn't provided")

            removeMsg()

        }

        try 
        {
            setLoading(true)
            setMsg("")


            const res = await api.delete(`/comments/delete-comment/${commentId}`)


            if((res.data.status == 200 || 201) && res.data.success) 
            {

                setMsg("Successfully deleted comment")

                setTimeout(() => 
                {
                    setMsg("")
                    setAllComments(prev => (prev.filter(comment => comment._id !== commentId)))

                }, 2500);

            }

            else 
            {
                setMsg("Something went wrong, failed to delete comment")


                removeMsg()
            }

        }

        catch (error) 
        {
            setMsg(error.response?.data?.message || "Something went wrong, failed to delete comment")

            removeMsg()
        }

        finally
        {
            setLoading(false)
        }

    }


    return (
        <div>

            <section className="mt-6 rounded-2xl border border-slate-200 bg-white shadow-sm">

                {/* COMMENTS HEADER */}

                <div className="border-b border-slate-200 px-5 py-5 sm:px-6">

                    <h2 className="text-lg font-bold text-slate-900">
                        Comments
                    </h2>

                    <p className="mt-1 text-sm text-slate-500">
                        Join the conversation about this video.
                    </p>

                </div>


                {/* COMMENT FORM */}

                <div className="border-b border-slate-100 p-5 sm:p-6">

                    <CommentForm
                        addLocalNewComment={addNewLocalComment}
                        vedioId={vedioId}
                    />

                    <div className="rounded-xl border  border-slate-300 bg-slate-50 p-5 text-center">

                        <div className="space-y-5">
                            {
                                allComments.length > 0 ?

                                    allComments.map((comment) => (
                                        <div
                                            key={comment._id}
                                            className="flex relative gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                                        >
                                            {/* User Avatar */}
                                            <img
                                                src={comment.commenter?.avatar}
                                                alt={comment.commenter?.userName || "User"}
                                                className="h-11 w-11 shrink-0 rounded-full object-cover"
                                            />

                                            {/* Comment Content */}
                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-center gap-2">
                                                    <h4 className="font-semibold text-gray-900">
                                                        {comment.commenter?.userName}
                                                    </h4>

                                                    <span className="text-xs text-gray-400">
                                                        • {new Date(comment.createdAt).toLocaleDateString()}
                                                    </span>
                                                </div>

                                                <div className='flex justify-start'>
                                                    <p className="mt-1 text-sm leading-6 text-gray-700">
                                                        {comment.content}
                                                    </p>
                                                </div>
                                                

                                                <div className='flex justify-end pr-4'>

                                                    {
                                                        userId && userId === comment.commenter._id &&

                                                        <CustomButton
                                                        onClick={() => removeComment(comment._id)}
                                                        isDefaultCassessAllowed={false}
                                                        classes='
                                                        hidden sm:flex
                                                        items-center gap-2
                                                        rounded-lg
                                                        border border-gray-200
                                                        bg-white
                                                        px-3.5 py-2
                                                        text-sm font-medium
                                                        text-gray-600
                                                        shadow-sm
                                                        transition-all duration-200
                                                        hover:border-red-200
                                                        hover:bg-red-50
                                                        hover:text-red-600
                                                        active:scale-95'
                                                        name='Remove'
                                                        />
                                                    }

                                                </div>

                                                {
                                                    commentId == comment._id && loading && (
                                                    <div className="absolute inset-0 z-50  flex items-center justify-center bg-white/70  ">
                                                        <div className="h-9 w-9 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                                                    </div>
                                                )}

                                                {
                                                    commentId == comment._id &&msg.length > 0 && (
                                                    <div className="absolute inset-0 z-50  flex items-center justify-center bg-white/70  ">
                                                        
                                                        <p className=' text-red-600 '>
                                                            {msg}
                                                        </p>
                                                        
                                                    </div>
                                                )}

                                            </div>
                                        </div>
                                    )) :

                                    <div>
                                        No Comment Found, add first comment
                                    </div>

                            }
                        </div>

                    </div>

                </div>


                {/* COMMENTS LIST */}


            </section>
        </div>
    )
}

export { VedioComments }