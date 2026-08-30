import React, {useState, useEffect} from 'react'
import {api} from '../api'
import {VideoCards} from '../utils/VedioCards'
import {CustomButton} from '../utils/CustomButton'



function CurrentUserVedios() {



    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")

    const getAllVedios = async () => {
        try {
            setMsg("")
            setLoading(true)

            const res = await api.get('/vedios/get-user-vedios')

            if ((res.data.status == 200 || 201) && res.data.success) 
            {
                
                console.log("Vedios: ", res.data.data);
                

                setVideos(res.data.data)

            }
            else {
                setMsg("Something went wrong, failed to fetched vedios")
            }

        }
        catch (error) {
            setMsg(error.response?.data?.message || "Something went wrong, failed to fetched vedios")
        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {

        getAllVedios()

    }, [])



    return (
        <div>
            <section className=" relative min-h-[calc(100vh-4rem)] bg-gray-50 mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">

                {loading && (
                    <div className="absolute inset-0 z-50  flex items-center justify-center bg-white/70 ">
                        <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                    </div>
                )}



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

                {videos.length > 0 ? 
                (
                    <VideoCards 
                    isAllowedOwnerOperations={true}
                    allVideos={videos}
                    />
                )
                    
                 : !msg ? (
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

        </div>

    )
}

export { CurrentUserVedios }