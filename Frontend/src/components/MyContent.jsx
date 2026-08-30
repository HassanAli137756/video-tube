import React, { useState, useEffect } from "react"
import { CurrentUserVedios } from "../utils/CurrentUserVedios"
import { TotalLikesAndVedios } from "../utils/TotalLikesAndVedios"




function MyContent() 
{


  
  return (
    <main className="min-h-screen w-full bg-slate-50">
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8">

        {/* =========================================================
            PAGE HEADER
        ========================================================== */}
        <section className="mb-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-green-600">
                Creator Dashboard
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                My Content
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Manage your uploaded videos and publish new content
                from one place.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                <p className="text-xs font-medium text-slate-400">
                  Content Management
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  Your Videos
                </p>
              </div>
            </div>

          </div>
        </section>


        {/* =========================================================
            CONTENT OVERVIEW / QUICK STATS

            Agar baad mein RTK/API se total videos waghera mil jayein
            tou yahan dynamic stats easily connect ki ja sakti hain.
        ========================================================== */}
       
       <TotalLikesAndVedios />



        <section className=" relative min-h-[calc(100vh-4rem)] mb-10 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          

          {/* Section Header */}
          <div className="border-b border-slate-200 px-5 py-5 sm:px-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  My Uploaded Videos
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  View, update, and manage the videos you have uploaded.
                </p>
              </div>

              <div className="rounded-lg bg-slate-100 px-3 py-2 text-xs font-medium text-slate-600">
                Your Content
              </div>

            </div>
          </div>

          <CurrentUserVedios />


         

        </section>




        


      </div>
    </main>
  )
}

export { MyContent }