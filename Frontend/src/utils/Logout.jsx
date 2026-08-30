import React, { useState } from 'react'
import {CustomButton} from './CustomButton'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {api} from '../api'
import {removeUserInfo} from '../Redux/userSlice'

function Logout() 
{
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [disable, setIsdisable] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    

    const userLogout = async () =>
    {
        console.log("UserLogout Executed");
        
        setLoading(true)
        setMsg("")

        try 
        {
            setIsdisable(true)

            const res = await api.get("/users/user-logout")

            if(res.data.status == 200 || 201 && res.data.success)
            {
                setMsg("Successfully logged out user")
                
                
                setTimeout(() => 
                {
                        setMsg("")
                        dispatch(removeUserInfo())

                    navigate('/login')
                }, 2500);
            }
            else
            {
                setMsg("Failed to logged out")
                setIsdisable(false)
            }


        } 
        catch (error) 
        {
            setIsdisable(false)
            setMsg(error.response?.data?.message || "Failed to logged out user")
        }
        finally
        {
            setLoading(false)
            setTimeout(() => 
            {
                setMsg("")
            }, 3000);
        }
    }


    return (
        <div>
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 ">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                </div>
            )}

            {!loading && !disable && msg.length > 0 && (
                <div className="fixed inset-0 z-500 flex items-center justify-center bg-white/70 ">
                    
                    <div className=' text-red-500 italic text-lg '>
                        {msg}
                    </div>
                    
                </div>
            )}

            {msg.length > 0 && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 ">
                    
                    <div className=' text-red-500 italic text-lg '>
                        {msg}
                    </div>
                    
                </div>
            )}

            <div>
                <CustomButton
                    onClick={() => userLogout()}
                    isDisable={disable}
                    isDefaultCassessAllowed={false}
                    classes='
                      hidden sm:flex
                      items-center gap-2
                      rounded-lg
                      border border-gray-200
                      bg-white
                      px-3.5 py-2
                      text-sm font-medium
                      text-gray-600
                      shadow-sm
                      transition-all duration-200
                      hover:border-red-200
                      hover:bg-red-50
                      hover:text-red-600
                      active:scale-95'
                    name='🚪 Logout'
                />
            </div>
        </div>
    )
}

export { Logout }