import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {Link} from 'react-router-dom'
import { api } from '../api';
import { CustomButton } from './CustomButton';
import RemoveComment from './RemoveComment';



function CommentedVedioCards() 
{
    const currentUser = useSelector(state => state.userReducer.userInfo)
    const [commentId, setCommentId] = useState("")
    const navigate = useNavigate()

    
    
  const [allComments, setAllComments] = useState([]);
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  

  const getAllVedios = async () =>
  {
    if(!currentUser.userData?._id)
    {
        setMsg("Please Login to view your liked vedios")
        setTimeout(() => 
        {
            navigate("/login")
        }, 2500);
    }

    try 
    {
      setMsg("")
      setLoading(true)

      const res = await api.get('/comments/get-all-comments')

      if((res.data.status == 200 || 201) && res.data.success)
      {
        
        setAllComments(res.data.data)

      }
      else
      {
        setMsg("Something went wrong, failed to fetched vedios")
      }

    } 
    catch(error) 
    {
        setMsg(error.response?.data?.message || "Something went wrong, failed to fetched vedios")
    }
    finally
    {
      setLoading(false)
    }
  }


  useEffect(() =>
  {

    getAllVedios()
    
  }, [])
  

return (
  <div className="relative w-full min-h-screen bg-gray-50 px-4 py-6">

  
    {loading && (
    <div className="absolute inset-0 z-50  flex items-center justify-center bg-white/70 ">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
    </div>
  )}

    {
      msg.length > 0 &&
      <div className="flex min-h-60 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white">
        <div className="text-center">

          <div className="text-red-500 italic ">
            {msg}
          </div>
          <CustomButton
            type="button"
            name="Reload"
            onClick={() => getAllVedios()}
            isDefaultCassessAllowed={false}
            classes="
                mt-8
                rounded-xl
                bg-green-600
                px-7
                py-3
                text-sm
                font-semibold
                text-white
                shadow-sm
                transition-all
                duration-200
                hover:bg-green-700
                hover:shadow-md
                active:scale-[0.98]
              "

          />

        </div>
      </div>
    }

    <div className="max-w-6xl mx-auto space-y-6">

    {allComments.length > 0 ? (
            allComments.map((comment) => (

        <div
          key={comment._id}
          className="
            relative
            overflow-hidden
            rounded-2xl
            border border-gray-200
            bg-white
            shadow-sm
            transition-all duration-200
            hover:shadow-lg
          "
        >

          {/* ================= MAIN CONTENT ================= */}

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">

            {/* ================= VIDEO SIDE ================= */}

            <div className="p-4 sm:p-5">

              <article
                className="
                  group
                  overflow-hidden
                  rounded-xl
                  border border-gray-200
                  bg-white
                  shadow-sm
                "
              >

                {/* Thumbnail */}

                <Link
                  to={`/run-vedio/${comment.vedio._id}`}
                  className="block"
                >

                  <div
                    className="
                      relative
                      aspect-video
                      overflow-hidden
                      rounded-xl
                      bg-gray-100
                    "
                  >

                    <img
                      
                      src={comment.vedio.thumbNail}
                      alt="Video thumbnail"
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

                    <span
                      className="
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
                      "
                    >
                      {`${Math.floor(comment.vedio.duration / 3600)
                        .toString()
                        .padStart(2, "0")}:${Math.floor(
                        (comment.vedio.duration % 3600) / 60
                      )
                        .toString()
                        .padStart(2, "0")}:${(
                        Math.floor(comment.vedio.duration) % 60
                      )
                        .toString()
                        .padStart(2, "0")}`}
                    </span>


                    {/* Play Overlay */}

                    <div
                      className="
                        absolute
                        inset-0
                        flex
                        items-center
                        justify-center
                        bg-black/0
                        transition-all
                        duration-200
                        group-hover:bg-black/20
                      "
                    >

                      <div
                        className="
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
                        "
                      >
                        ▶
                      </div>

                    </div>

                  </div>

                </Link>


                {/* Video Owner */}

                <div
                  onClick={() =>
                    navigate("/profile", {
                      state: {
                        isOwnerProfile:
                          comment.vedio.owner._id ===
                          currentUser.userData?._id,
                        channelId: comment.vedio.owner._id,
                      },
                    })
                  }
                  className="
                    flex
                    items-center
                    gap-3
                    px-3
                    py-3
                    cursor-pointer
                  "
                >

                  <img
                  
                    src={comment.vedio.owner.avatar}
                    alt={comment.vedio.owner.userName}
                    className="
                      h-10
                      w-10
                      rounded-full
                      object-cover
                      ring-2
                      ring-green-100
                    "
                  />

                  <div className="min-w-0">

                    <p className="text-xs text-gray-500">
                      Video uploaded by
                    </p>

                    <p className="
                      truncate
                      text-sm
                      font-semibold
                      text-gray-900
                      transition-colors
                      hover:text-green-600
                    ">
                      {comment.vedio.owner.userName}
                    </p>

                  </div>

                </div>

              </article>

            </div>


            {/* ================= COMMENT SIDE ================= */}

            <div
              className="
                flex
                flex-col
                border-t
                border-gray-200
                bg-gray-50/70
                p-5
                lg:border-t-0
                lg:border-l
                lg:p-6
              "
            >

              {/* Comment Header */}

              <div className="flex items-start justify-between gap-3">

                <div>

                  <p className="
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wider
                    text-green-600
                  ">
                    Your Comment
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {new Date(comment.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }
                    )}
                  </p>

                </div>

                {/* Small Comment Icon */}

                <div
                  className="
                    flex
                    h-9
                    w-9
                    shrink-0
                    items-center
                    justify-center
                    rounded-full
                    bg-green-100
                    text-green-600
                  "
                >
                  💬
                </div>

              </div>


              {/* Divider */}

              <div className="my-5 h-px bg-gray-200" />


              {/* Comment Content */}

              <div className="flex flex-1 items-center">

                <p className="
                  text-base
                  leading-7
                  text-gray-700
                  sm:text-lg
                ">
                  {comment.content}
                </p>

              </div>


              {/* Actions */}

              <div className="
                
                w-full
                mt-6
                flex
                items-center
                justify-end
                gap-3
                border-t
                border-gray-200
                pt-5
              ">


                <RemoveComment
                callBack={setAllComments}
                commentId={comment._id}
                
                />

              </div>

            </div>

          </div>

        </div>

      ))
        ) : !msg && !loading  ? (
            <div className="flex min-h-60 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white">
                <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">
                        No Commented Vedio Found
                    </p>

                    <p className="mt-1 text-sm text-gray-400">
                        There is no comment on any vedio.
                    </p>
                </div>
            </div>
        ) : null
        }


    </div>

  </div>
);
}

export {CommentedVedioCards}