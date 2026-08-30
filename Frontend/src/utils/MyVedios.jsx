import React from "react";



const MyVideos = () => {
  const videos = [
    {
      id: 1,
      thumbnail: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4",
      title: "Beautiful Nature and Mountain Views",
      channel: "Hassan Ali",
      views: "1.2K",
      time: "2 days ago",
      duration: "12:45",
    },
    {/*  */
      id: 2,
      thumbnail: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
      title: "Exploring the Beautiful Mountains",
      channel: "Hassan Ali",
      views: "856",
      time: "5 days ago",
      duration: "08:32",
    },
    {
      id: 3,
      thumbnail: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
      title: "A Peaceful Journey Through Nature",
      channel: "Hassan Ali",
      views: "2.4K",
      time: "1 week ago",
      duration: "15:20",
    },
    {
      id: 4,
      thumbnail: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
      title: "Amazing Places You Should Visit",
      channel: "Hassan Ali",
      views: "3.1K",
      time: "2 weeks ago",
      duration: "10:18",
    },
    {
      id: 5,
      thumbnail: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      title: "The Beauty of Mountains",
      channel: "Hassan Ali",
      views: "945",
      time: "3 weeks ago",
      duration: "07:41",
    },
    {
      id: 6,
      thumbnail: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
      title: "Relaxing Nature Experience",
      channel: "Hassan Ali",
      views: "1.8K",
      time: "1 month ago",
      duration: "11:05",
    },
  ];

  return (
    <div className="min-h-screen bg-white px-6 py-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-2xl font-bold text-gray-900">
            My Videos
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Videos uploaded by you
          </p>

        </div>


        {/* Videos Grid */}
        <div className="
          grid
          grid-cols-1
          gap-x-5
          gap-y-8
          sm:grid-cols-2
          lg:grid-cols-3
        ">

          {videos.map((video) => (

            <div
              key={video.id}
              className="
                group cursor-pointer
              "
            >

              {/* Thumbnail */}
              <div className="
                relative
                aspect-video
                overflow-hidden
                rounded-xl
                bg-gray-100
              ">

                <img
                  src={video.thumbnail}
                  alt={video.title}
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
                <span className="
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
                ">
                  {video.duration}
                </span>


                {/* Play Overlay */}
                <div className="
                  absolute
                  inset-0
                  flex
                  items-center
                  justify-center
                  bg-black/0
                  transition-all
                  duration-200
                  group-hover:bg-black/20
                ">

                  <div className="
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
                  ">
                    ▶
                  </div>

                </div>

              </div>


              {/* Video Info */}
              <div className="mt-3 flex gap-3">

                {/* Channel Avatar */}
                <div className="
                  flex
                  h-9
                  w-9
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  bg-green-100
                  text-xs
                  font-bold
                  text-green-700
                ">
                  HA
                </div>


                {/* Text */}
                <div className="min-w-0 flex-1">

                  <h2 className="
                    line-clamp-2
                    text-sm
                    font-semibold
                    leading-5
                    text-gray-900
                    transition-colors
                    group-hover:text-green-600
                  ">
                    {video.title}
                  </h2>


                  <p className="
                    mt-1
                    text-xs
                    text-gray-500
                  ">
                    {video.channel}
                  </p>


                  <p className="
                    mt-0.5
                    text-xs
                    text-gray-500
                  ">
                    {video.views} views • {video.time}
                  </p>

                </div>


                {/* More Button */}
                <button
                  className="
                    h-8
                    w-8
                    shrink-0
                    rounded-full
                    text-lg
                    text-gray-400
                    transition-colors
                    hover:bg-gray-100
                    hover:text-gray-700
                  "
                >
                  ⋮
                </button>

              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
};

export {MyVideos};