import React from 'react'

function MobileLogo() 
{
  return (
    <div className="mb-10 flex justify-center lg:hidden">

                <div className="flex items-center gap-3">

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-2xl text-white shadow-lg">

                    🎥

                  </div>

                  <div>

                    <h2 className="text-3xl font-black text-green-700">

                      VideoTube

                    </h2>

                    <p className="text-sm text-gray-500">

                      Create your account

                    </p>

                  </div>

                </div>

              </div>
  )
}

export { MobileLogo}