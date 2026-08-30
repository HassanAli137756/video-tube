import React from 'react'
import UploadVedioForm from '../utils/UploadVedioForm'

function UploadVedio() {
  return (
  <div className="min-h-screen bg-[#f7f9f8] px-4 py-6 sm:px-6 lg:px-8">

    <div className="mx-auto max-w-6xl">

      {/* ================= HEADER ================= */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <div className="mb-2 flex items-center gap-2 text-sm font-medium text-green-600">
            <span className="h-2 w-2 rounded-full bg-green-500" />
            Creator Studio
          </div>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Upload video
          </h1>

          <p className="mt-2 max-w-xl text-sm leading-6 text-gray-500">
            Share your content with your audience by uploading a new video.
          </p>
        </div>

        <button
          type="button"
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-gray-700
            shadow-sm
            transition
            hover:bg-gray-50
          "
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.8"
              d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
            />
          </svg>

          Upload guidelines
        </button>

      </div>


      {/* ================= MAIN CONTENT ================= */}
      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">


        
        <div
          className="
            overflow-hidden
            rounded-2xl
            border
            border-gray-200
            bg-white
            shadow-sm
          "
        >

          {/* Card Header */}
          <div className="border-b border-gray-100 px-5 py-5 sm:px-7">

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50 text-green-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M12 16V4m0 0L8 8m4-4 4 4M5 12v6a2 2 0 002 2h10a2 2 0 002-2v-6"
                  />
                </svg>
              </div>

              <div>
                <h2 className="font-semibold text-gray-900">
                  Video details
                </h2>

                <p className="text-xs text-gray-500">
                  Add information about your video
                </p>
              </div>

            </div>

          </div>


          

          <div className="p-5 sm:p-7">

                  <UploadVedioForm />

          </div>

        </div>


        {/* ================= RIGHT SIDEBAR ================= */}
        <aside className="space-y-5">

          {/* Upload Tips */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <div className="mb-5 flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.8"
                    d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z"
                  />
                </svg>
              </div>

              <div>
                <h3 className="text-sm font-semibold text-gray-900">
                  Upload tips
                </h3>

                <p className="text-xs text-gray-500">
                  Before publishing
                </p>
              </div>

            </div>


            <div className="space-y-4">

              <div className="flex gap-3">

                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold text-green-600">
                  1
                </span>

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Use a clear title
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Give your audience a title that explains what
                    the video is about.
                  </p>
                </div>

              </div>


              <div className="flex gap-3">

                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold text-green-600">
                  2
                </span>

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Add a good thumbnail
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    A relevant thumbnail helps your video stand out.
                  </p>
                </div>

              </div>


              <div className="flex gap-3">

                <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-green-50 text-[10px] font-bold text-green-600">
                  3
                </span>

                <div>
                  <p className="text-sm font-medium text-gray-800">
                    Check your details
                  </p>

                  <p className="mt-1 text-xs leading-5 text-gray-500">
                    Review your description and visibility before
                    publishing.
                  </p>
                </div>

              </div>

            </div>

          </div>


          {/* Supported Formats */}
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">

            <h3 className="text-sm font-semibold text-gray-900">
              Supported content
            </h3>

            <div className="mt-4 space-y-3">

              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5">

                <span className="text-xs font-medium text-gray-600">
                  Video
                </span>

                <span className="text-xs text-gray-400">
                  MP4, WebM
                </span>

              </div>

              <div className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5">

                <span className="text-xs font-medium text-gray-600">
                  Thumbnail
                </span>

                <span className="text-xs text-gray-400">
                  JPG, PNG, WebP
                </span>

              </div>

            </div>

          </div>


          {/* Privacy Notice */}
          <div className="rounded-2xl border border-green-100 bg-green-50 p-5">

            <div className="flex gap-3">

              <svg
                className="mt-0.5 h-5 w-5 shrink-0 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 15v2m-6 3h12a2 2 0 002-2V9a8 8 0 10-16 0v9a2 2 0 002 2z"
                />
              </svg>

              <div>
                <p className="text-sm font-semibold text-green-800">
                  Your content is protected
                </p>

                <p className="mt-1 text-xs leading-5 text-green-700">
                  Make sure you only upload content that you have
                  permission to share.
                </p>
              </div>

            </div>

          </div>

        </aside>

      </div>


    </div>
    
  </div>
)
}

export {UploadVedio}