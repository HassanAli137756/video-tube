import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

import { NoInternet } from '../utils/InternetError'
import { Login } from '../authServices/Login'
import { Layout } from './Layout'
import { Header } from './Header'


function UnAuthorizedUserLayout() {


    
    const userInfo = useSelector(
        state => state.userReducer.userInfo
    )
    
    if (userInfo.isLoadingUser) {

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70">

                <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>

            </div>
        )

    }


    if (!userInfo.isAuthorized && !userInfo.userData?._id) {

        return <Outlet />

    }


    return <Navigate to={'/'} replace />

}


export { UnAuthorizedUserLayout }