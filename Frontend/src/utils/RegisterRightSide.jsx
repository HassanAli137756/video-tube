import React from 'react'

function RegisterRightSide() {
    return (

        <div className="relative hidden lg:flex flex-col justify-between overflow-hidden bg-linear-to-br from-green-700 via-green-600 to-green-500 p-12 text-white">

            {/* Decorative Circles */}
            <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-white/10"></div>

            <div className="absolute bottom-0 right-0 h-80 w-80 translate-x-24 translate-y-24 rounded-full bg-white/5"></div>

            <div className="absolute top-1/2 right-16 h-28 w-28 rounded-full border border-white/20"></div>

            {/* Logo */}
            <div className="relative z-10">

                <div className="flex items-center gap-4">

                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-3xl shadow-xl">

                        🎥

                    </div>

                    <div>

                        <h1 className="text-4xl font-black tracking-tight">

                            VideoTube

                        </h1>

                        <p className="mt-1 text-sm text-green-100">

                            Share. Watch. Connect.

                        </p>

                    </div>

                </div>

            </div>

            {/* Center Content */}
            <div className="relative z-10 mt-10 space-y-8">

                <h2 className="text-5xl font-extrabold leading-tight">

                    Join the next generation
                    <br />
                    of creators.

                </h2>

                <p className="max-w-md text-lg leading-8 text-green-100">

                    Upload videos, build your audience,
                    connect with creators and enjoy a modern
                    streaming experience inspired by the world's
                    biggest video platforms.

                </p>

                <div className="grid grid-cols-2 gap-5">

                    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">

                        <h3 className="text-3xl font-bold">

                            100K+

                        </h3>

                        <p className="mt-2 text-sm text-green-100">

                            Active Creators

                        </p>

                    </div>

                    <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur">

                        <h3 className="text-3xl font-bold">

                            5M+

                        </h3>

                        <p className="mt-2 text-sm text-green-100">

                            Monthly Views

                        </p>

                    </div>

                </div>

            </div>

            {/* Bottom */}
            <div className="relative z-10 mt-10 flex items-center gap-3 text-sm text-green-100">

                <span className="h-3 w-3 rounded-full bg-green-300"></span>

                Secure registration powered by modern authentication.

            </div>

        </div>
    )
}

export {RegisterRightSide}