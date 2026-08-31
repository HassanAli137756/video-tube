import React, { useEffect, useState } from "react";
import { VideoCards } from "../utils/VedioCards";
import { api } from "../api";
import { CustomButton } from "../utils/CustomButton";
import {useSelector} from "react-redux"

function Home() 
{
  const currentUser = useSelector(state => state.userReducer.userInfo)
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")

  const getAllVedios = async () =>
  {
    try 
    {
      setMsg("")
      setLoading(true)

      const res = await api.get('/vedios/get-all-vedios')

      if((res.data.status == 200 || 201) && res.data.success)
      {
        
        setVideos(res.data.data)

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
    <div>
    <main className=" relative min-h-[calc(100vh-4rem)] bg-gray-50">
        {loading && (
          <div className="absolute inset-0 z-50  flex items-center justify-center bg-white/70 ">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
          </div>
        )}

      {/* ==================== HERO / WELCOME ==================== */}

      <section className="border-b border-gray-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          <div className="max-w-2xl">
            <p className="mb-2 text-sm font-semibold text-green-600">
              VideoTube
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Discover something worth watching.
            </h1>

            <p className="mt-3 text-base leading-7 text-gray-500">
              Explore videos from creators and discover new content
              you might enjoy.
            </p>
          </div>

        </div>
      </section>

      {/* ==================== VIDEOS SECTION ==================== */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

        {/* SECTION HEADER */}

        <div className="mb-6 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-bold text-gray-900">
              Latest Videos
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Recently uploaded videos
            </p>
          </div>

          <CustomButton
          onClick={() => getAllVedios()}
          classes="
          inline-flex items-center gap-2
          rounded-lg
          border border-gray-200
          bg-white
          px-4 py-2.5
          text-sm font-medium
          text-gray-700
          shadow-sm
          transition-all duration-200
          hover:border-green-200
          hover:bg-green-50
          active:scale-95"
          name="Refresh"
          />

        </div>

        {/* ==================== VIDEO LIST ==================== */}

        {videos.length > 0 ? (
          <VideoCards allVideos={videos} />
        ) : !msg ? (
          <div className="flex min-h-60 items-center justify-center rounded-xl border border-dashed border-gray-200 bg-white">
            <div className="text-center">
              <p className="text-sm font-medium text-gray-700">
                No videos found
              </p>

              <p className="mt-1 text-sm text-gray-400">
                There are no videos available right now.
              </p>
            </div>
          </div>
        ) : null}

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

      </section>

    </main>
    </div>

  );
}

export { Home };
