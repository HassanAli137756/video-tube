import React, { useEffect } from 'react'
import { Header } from './Header'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { api } from '../api'
import { setUserInfo, removeUserInfo } from '../Redux/userSlice'
import { NoInternet } from '../utils/InternetError'



function Layout() 
{

  
    const dispatch = useDispatch()

    const getCurrentUser = async () => {

        try {

            if (!window.navigator.onLine) {
                return
            }


            const res = await api.get('/users/get-user')


            if (
                (res?.status === 200 || res?.status === 201) &&
                res?.data?.success
            ) {

                dispatch(
                    setUserInfo({
                        isAuthorized: true,
                        userData: res?.data?.data,
                        isLoadingUser: false
                    })
                )

            }

            else {

                dispatch(removeUserInfo())

            }

        }

        catch (error) {

            dispatch(removeUserInfo())

            console.log(
                "Error in getCurrentUser:",
                error
            )

        }

    }

    useEffect(() => {

        getCurrentUser()

    }, [])

  console.log("Layout executed");

  if (window.navigator.onLine) {
    
    return (
      <div>
  
        <Header />
  
        <Outlet />
  
  
  
      </div>
    )
  }

  return(
    <div>
      <NoInternet />
    </div>
  )
}

export { Layout }