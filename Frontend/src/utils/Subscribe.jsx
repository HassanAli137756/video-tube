import React, { useState } from 'react'
import { CustomButton } from './CustomButton';
import { api } from '../api';
import { useSelector } from 'react-redux';


function Subscribe(
{
    subscribeStatus=false,
    vedioId="",
    ownerId="",
    subscribeDocId=""
}
) 
{
    const userData = useSelector(state => state.userReducer.userInfo.userData)


    const [isSubscribed, setIsSubscribed] = useState(subscribeStatus)
    const [subscriptionId, setSubscriptionId] = useState(subscribeDocId)
    const [disable, setDisable] = useState(false)
    const [msg, setMsg] = useState("")


    const removeMsg = () => {
        setTimeout(() => {
            setMsg("")
        }, 2500);
    }
    

    const handleSubscribe = async () => {
        if (!userData._id) {
            setMsg("Please login to perform this action")
            return removeMsg()

        }

        if(userData._id == ownerId)
        {
            setMsg("You can't subscribe your channel")
            return removeMsg()
            
        }

        try {
            setDisable(true)
            if (isSubscribed) 
            {

                if(!subscriptionId)
                {
                    setMsg("Failed to find subscriptionId")
                    return removeMsg()
                }

                const res = await api.delete(`/subscriptions/un-subscribeAChannel/${subscriptionId}`)

                if ((res.status == 200 || 201) && res.data.success) 
                {
                    
                    setIsSubscribed(false)
                    setSubscriptionId("")
                }
                else {
                    setMsg("Failed to like vedio")
                    removeMsg()
                }

            }



            else {
                const res = await api.post(`/subscriptions/subscribeAChannel/${ownerId}`)

                if ((res.status == 200 || 201) && res.data.success) {

                    setIsSubscribed(true)
                    setSubscriptionId(res.data.data._id)
                    console.log("Result of subcribed channel", res);
                    
                }
                else {
                    setMsg("Failed to perform operation")
                    removeMsg()
                }

            }
        }
        catch (error) {
            setMsg(error.response?.data?.message || "Failed to perform operation")

            removeMsg()
        }
        finally {
            setDisable(false)
        }


    }



  return (
    <div>
        <div className='gird grid-cols-1'>
        {
            userData._id && ownerId !== userData._id &&
            <div>
            <CustomButton
            onClick={handleSubscribe}
            classes={`px-5 py-2.5 ml-10 rounded-full font-semibold text-sm
            transition-all duration-200 active:scale-95
            ${isSubscribed
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-black text-white hover:bg-gray-800"
            }`}

            isDefaultCassessAllowed={false}
            name={isSubscribed ? "✓ Subscribed" : "Subscribe"}
            />
                
            </div>
        }
        {
                    msg.length > 0 &&

                    <div
                        className="mt-5 rounded-xl flex justify-center items-center bg-slate-50 p-4">

                        <h2 className="text-sm italic  font-semibold text-red-600">

                            {msg}

                        </h2>

                    </div>
                }
    </div>
    </div>
  )
}

export {Subscribe}