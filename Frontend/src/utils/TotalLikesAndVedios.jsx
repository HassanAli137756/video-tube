import React, { useState, useEffect } from 'react'
import { api } from '../api'
import { VideoCards } from '../utils/VedioCards'
import { CustomButton } from '../utils/CustomButton'
import { useNavigate } from 'react-router-dom'



function TotalLikesAndVedios() {

  const navigate = useNavigate()


  const [channelInfo, setChannelInfo] = useState({});
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const getChannelInfo = async () => {
    try {
      setMsg("")
      setLoading(true)

      const res = await api.get('/likes/total-channel-likes')


      if ((res.data.status == 200 || 201) && res.data.success) {



        setChannelInfo(res.data.data)

        

      }
      else {
        setMsg("Something went wrong, failed to fetched data")
      }

    }
    catch (error) {
      setMsg(error.response?.data?.message || "Something went wrong, failed to fetched data")

      

    }
    finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    getChannelInfo()

  }, [])



  return (
    <div>
      <section className=" relative bg-gray-50 mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">


        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Videos
              </p>

                {loading && (
                  <div className=" flex items-center justify-center bg-white/70 ">
                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                  </div>
                )}
                {
                  !loading &&
                    <p className="mt-2 text-2xl font-bold text-slate-900">

                    {channelInfo?.totalVedios || 0}
                  </p>
                }
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50 text-green-600">
              <span className="text-lg">▶</span>
            </div>
          </div>
        </div>


        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Likes
              </p>

                {loading && (
                  <div className=" flex items-center justify-center bg-white/70 ">
                    <div className="h-9 w-9 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                  </div>
                )}
                {
                  !loading &&
                  <p className="mt-2 text-2xl font-bold text-slate-900">
                    {channelInfo?.totalLikes || 0}
                  </p>
                }
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <span className="text-lg">✓</span>
            </div>
          </div>
        </div>

        <div

          className="rounded-2xl border m-3 border-slate-200 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Create Content
              </p>

              <p className="mt-2 text-sm font-semibold text-slate-900">
                Upload a new video
              </p>
            </div>

            <div
              onClick={() => navigate("/upload-vedio")}
              className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600 hover:cursor-pointer hover:text-purple-500 transition-all duration-300 hover:bg-purple-100">
              <span className="text-lg">+</span>
            </div>
          </div>
        </div>

      </section>

    </div>
  )
}

export { TotalLikesAndVedios }