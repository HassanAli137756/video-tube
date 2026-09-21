import React from 'react'


function VedioPlayer(
    {
        vedioURL = "",
        thumbNailURL = "",
        vedioId = "",


    }) {
    return (
        <div>

            <section className="overflow-hidden rounded-2xl border border-slate-200 bg-black shadow-sm">
                <div className="aspect-video w-full">



                    <video
                        controls
                        preload="metadata"
                        playsInline
                        poster={thumbNailURL}
                        className="w-full h-full object-cover"
                    >
                        <source 
                        src={vedioURL}
                        type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>

                </div>
            </section>

        </div>
    )
}

export default React.memo(VedioPlayer)