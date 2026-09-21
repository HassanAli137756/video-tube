import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'

import { Provider } from 'react-redux'
import { store } from './Redux/store'

import './index.css'


import { Layout } from './Routing/Layout'
import { AuthorizedUserLayout } from './Routing/AuthorizedLayout'



import { Home } from './components/Home'
import { Login } from './authServices/Login'
import { Register } from './authServices/Register'



import { MyProfile } from './components/MyProfile'
import { MyContent } from './components/MyContent'
import { VideoUpload } from './components/Uploadvideo'
import { MyActivities } from './components/MyActivities'

import { RunVideo } from './components/Runvideo'
import { UpdateVideo } from './videoservices/Updatevideo'

import { MyVideos } from './utils/Myvideos'
import { MyStats } from './utils/MyStats'
import { LikedVideos } from './utils/Likedvideos'
import { CommentedvideoCards } from './utils/CommentedvideoCards'
import { WatchedVideos } from './utils/Watchedvideos'

import { Settings } from './components/Settings'

import { UpdatePassword } from './authServices/UpdatePassword'
import { UpdateAccoutDetails } from './authServices/UpdateAccountDetails'
import { UpdateAccoutImages } from './authServices/UpdateAccountImages'
import { UnAuthorizedUserLayout } from './Routing/UnAuthorizedUserLayout'



const router = createBrowserRouter(

  createRoutesFromElements(


    <Route path='' element={<Layout />}>


      <Route path="/" element={<Home />} />
      
        <Route
          path="/run-video/:videoId"
          element={<RunVideo />}
        />

        <Route
          path="/profile"
          element={<MyProfile />}
        />
        
        <Route
          path="/upload-video"
          element={<VideoUpload />}
        />


      <Route element={<UnAuthorizedUserLayout />} >
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
      </Route>




      <Route element={<AuthorizedUserLayout />}>


        


        <Route
          path="/my-content"
          element={<MyContent />}
        />



        <Route
          path="/my-activites"
          element={<MyActivities />}
        />




        <Route
          path="/update-video"
          element={<UpdateVideo />}
        />


        <Route
          path="/my-videos"
          element={<MyVideos />}
        />


        <Route
          path="/my-stats"
          element={<MyStats />}
        />


        <Route
          path="/my-liked-videos"
          element={<LikedVideos />}
        />


        <Route
          path="/my-added-comments"
          element={<CommentedvideoCards />}
        />


        <Route
          path="/my-watched-videos"
          element={<WatchedVideos />}
        />


        <Route
          path="/settings"
          element={<Settings />}
        />


        <Route
          path="/update-password"
          element={<UpdatePassword />}
        />


        <Route
          path="/update-profile"
          element={<UpdateAccoutDetails />}
        />


        <Route
          path="/update-account-images"
          element={<UpdateAccoutImages />}
        />


      </Route>

    </Route>
  )
)



createRoot(
  document.getElementById('root')
).render(

  <StrictMode>

    <Provider store={store}>

      <RouterProvider router={router} />

    </Provider>

  </StrictMode>
)