import React from "react";
import { useLocation } from "react-router-dom";
import {VideoCards} from './VedioCards'
import { SubscriberCards } from "./SubscribedCards";


const MyStats = (

) => {
  

  const {
  header="",
  message="",
  data=[],
  purpose="",
  isAuthorized=false
} = useLocation().state || {}


console.log("Data in stats", data, purpose, isAuthorized);

  

  return (
    <div className="min-h-screen bg-white px-6 py-8">

      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">

          <h1 className="text-2xl font-bold text-gray-900">
            {header}
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            {message}
          </p>

        </div>


        {/* Videos Grid */}
        <div className="
          
        ">

          {
            purpose == "vedios" ? 
            <div className="">
              <VideoCards
              allVideos={data}
              isAllowedOwnerOperations={isAuthorized}
              />
            </div> 
            : 
              <div>
                <SubscriberCards
                subscribers={data}
                />
              </div>
            
          }

        </div>

      </div>

    </div>
  );
};

export {MyStats};