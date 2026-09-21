import React from "react";
import { UploadVedioForm } from "../forms/UploadVedioForm";





const VideoUpload = () => 
{
  return (
    <main className="min-h-screen bg-linear-to-br from-white via-green-50 to-green-100 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">

        {/* =========================================================
            PAGE HEADER
        ========================================================== */}
        <section className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-green-600">
                Creator Studio
              </p>

              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Upload Video
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600 sm:text-base">
                Share your content with your audience by uploading a new video
                to your channel.
              </p>
            </div>

            <div className="hidden rounded-2xl border border-green-100 bg-white px-5 py-4 shadow-sm sm:block">
              <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                Content
              </p>
              <p className="mt-1 text-sm font-semibold text-gray-800">
                New Video
              </p>
            </div>

          </div>
        </section>


        {/* =========================================================
            UPLOAD AREA
        ========================================================== */}
        <section className="overflow-hidden rounded-3xl border border-green-100 bg-white shadow-sm">

          {/* Section Header */}
          <div className="border-b border-gray-100 px-5 py-5 sm:px-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.8}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 16.5V3.75m0 0L7.5 8.25M12 3.75l4.5 4.5M4.5 15.75v1.125A3.375 3.375 0 007.875 20.25h8.25a3.375 3.375 0 003.375-3.375V15.75"
                  />
                </svg>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Video Details
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Add your video and provide the required information.
                </p>
              </div>

            </div>
          </div>


          {/* =======================================================
              VIDEO UPLOADING FORM

              IMPORTANT:
              Apna complete video-uploading-form yahan par
              place karna hai.

              Is section ke andar:
              - Video file input
              - Thumbnail / cover input
              - Video title
              - Description
              - Category
              - Visibility
              - Any other required fields
              - Upload / Submit button

              Apna form isi jagah replace / insert karna.
          ======================================================== */}

          <div className="px-5 py-8 sm:px-8 sm:py-10">

            <UploadVedioForm />

          </div>

        </section>


        {/* =========================================================
            BOTTOM INFORMATION
        ========================================================== */}
        <section className="mt-6 rounded-2xl border border-green-100 bg-white/80 px-5 py-4 shadow-sm sm:px-6">

          <div className="flex items-start gap-3">

            <div className="mt-0.5 shrink-0 text-green-600">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="h-5 w-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M11.25 11.25l.75.75v3.75m0-10.5h.007v.008H12V5.25z"
                />
              </svg>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-gray-800">
                Before uploading
              </h3>

              <p className="mt-1 text-sm leading-6 text-gray-500">
                Make sure your video contains accurate information and meets
                the platform's content requirements before publishing.
              </p>
            </div>

          </div>

        </section>

      </div>
    </main>
  );
};

export {VideoUpload};