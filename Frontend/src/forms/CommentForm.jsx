import React from 'react'
import { useSelector } from 'react-redux'
import { CustomButton } from '../utils/CustomButton'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { api } from '../api'



function CommentForm(
    {
        addLocalNewComment,
        vedioId
    }
) {
    const [comment, setComment] = useState("")
    const currentUser = useSelector(state => state.userReducer.userInfo)
    const navigate = useNavigate()
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(false)


    



    const addNewComment = async () => 
    {

        if (!addLocalNewComment || !vedioId) {
            return setMsg("Callback and vedioId must be provided")
        }

        

        try 
        {
            setDisable(true)
            setMsg("")
            setLoading(true)

            const res = await api.post(`/comments/add-comment/${vedioId}`, {comment, comment})

            if ((res.data.status == 200 || 201) && res.data.success) {


                addLocalNewComment(
                {
                    "_id": res.data?.data?._id,
                    "content": comment,
                    "commenter": 
                    {
                        "_id": currentUser.userData?._id,
                        "userName": currentUser.userData?.userName,
                        "avatar": currentUser.userData?.avatar
                    },
                    "vedio": vedioId,
                    "createdAt": res.data?.data?.createdAt,
                    "updatedAt": res.data?.data?.updatedAt,
                }
                )

                setMsg("Successfully added comment")


                setTimeout(() => 
                {
                    setMsg("")
                    setComment("")
                    setDisable(false)
                }, 2500);

            }

            else 
            {
                setMsg("Something went wrong, failed to add comment")
                setDisable(false)


            }

        }

        catch (error) 
        {
            setMsg(error.response?.data?.message || "Something went wrong, failed to add comment")
            setDisable(false)

        }

        finally 
        {
            setLoading(false)
        }
    }

    




    return (
        <div>
            <div className="w-full border-b border-gray-200 pb-6">
                <div className="flex items-start gap-4">
                    {/* Current User */}
                    <img
                        src={currentUser?.userData?.avatar}
                        alt={currentUser?.userData?.userName || "User"}
                        className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-gray-100"
                    />

                    {/* Comment Area */}
                    <div className="min-w-0 flex-1">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="text-sm font-semibold text-gray-900">
                                {currentUser?.userData?.userName}
                            </span>

                            <span className="text-xs text-gray-400">
                                Add a comment
                            </span>
                        </div>

                        <form
                            onSubmit={addNewComment} 
                            className="space-y-3">
                            <textarea
                                disabled={disable}
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Share your thoughts..."
                                rows={2}
                                className="w-full resize-none border-b border-gray-300 bg-transparent px-0 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-green-600"
                            />

                            {
                                
                                
                                currentUser.isAuthorized && currentUser.userData?.userName ?
                                    (
                                        <div className="flex items-center justify-end gap-3">


                                            <CustomButton
                                                disable={disable}
                                                onClick={() => setComment("")}
                                                classes="rounded-full px-5 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100"
                                                isDefaultCassessAllowed={false}
                                                name='Cancel'
                                            />

                                            <CustomButton
                                                onClick={() => addNewComment()}
                                                isDisable={!comment.trim() || disable}
                                                isDefaultCassessAllowed={false}
                                                classes={`rounded-full ${!comment.trim() ? "bg-gray-600 text-white/50" : "text-white  bg-green-600"}  px-5 py-2 text-sm font-semibold  transition hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50`}
                                                name='Comment'


                                            />


                                        </div>
                                    ) :
                                    (
                                        <div className='flex justify-end mr-4'>
                                            <div>
                                                <CustomButton
                                                    onClick={() => navigate("/login", {state: "/"})}
                                                    name='Login to add Comment'

                                                />
                                            </div>
                                        </div>
                                    )
                            }
                        </form>
                        <div className='flex justify-center'>
                            {loading && (
                                <div>


                                    <div >
                                        <p className=' font-semibold text-green-500  '>
                                            Please wait adding comment...
                                        </p>
                                    </div>
                                </div>

                            )}

                            { msg && (
                                <div>


                                    <div >
                                        <p className=' font-semibold text-green-500  '>
                                            {msg}
                                        </p>
                                    </div>
                                </div>

                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export { CommentForm }