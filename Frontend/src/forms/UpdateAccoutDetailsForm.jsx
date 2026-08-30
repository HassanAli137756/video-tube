import React from 'react'
import { useState } from 'react'
import { CustomInput } from '../utils/CustomInput'
import { useForm } from 'react-hook-form'
import { SelectInput } from '../utils/CustomSelectInput'
import { CustomImageInput } from '../utils/CustomImageInput'
import { CustomButton } from '../utils/CustomButton'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import {setUserInfo} from '../Redux/userSlice'
import { api } from '../api'

function UpdateAccountDetailsForm({existingEmail="", existingFullName= ""}) {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isPasswordHidden, setIsPasswordHidden] = useState(true)



  
    const removeMsg = () => {
        setTimeout(() => {
            setMsg("")
        }, 2500);
    }

    

    const updateAccountDetails = async (data) => {
        console.log("Uploading Data", data);
        if(!(data.email?.trim() && data.fullName?.trim() && data.password?.trim()))
        {
            setMsg("All fields must be provided")
            removeMsg()
            return null
        }

        
        
        try {
            setMsg("")
            setLoading(true)

            const res = await api.patch('/users/update-account-details', data)

            if ((res.data.status == 200 || 201) && res.data.success) {
                console.log("Request have reached to set activities");
                console.log("Updated data", res);
                
                setMsg(res.data?.message || "Details updated successfully")
                dispatch(setUserInfo({isAuthorized: true, isLoading: false, userData: res.data.data}))

                
                setTimeout(() => {
                    navigate("/settings")
                }, 2000);

            }
            else {
                setMsg("Something went wrong, failed to update password")
            }

        }
        catch (error) {
            setMsg(error.response?.data?.message || "Something went wrong, failed to update password")
        }
        finally {
            setLoading(false)
            removeMsg()
        }

    }



    return (
        <div className=' relative '>

            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 ">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                </div>
            )}

            {msg.length > 0 && (
                <div className="absolute inset-0 z-30  flex items-center justify-center bg-white/70 ">
                    <div
                        className="text-red-500 italic"
                    >
                        <p>{msg}</p>


                    </div>
                </div>
            )}

            <form
                onSubmit={handleSubmit(updateAccountDetails)}
                className="mt-10 space-y-7">


                <CustomInput
                    defaulValue={existingFullName}
                    register={register}
                    label='Full Name'
                    name='fullName'
                    placeHolder='Your Full Name...'

                />


                <CustomInput
                    xmlns='http://www.w3.org/2000/svg'
                    iconDesigne='M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
                    defaulValue={existingEmail}
                    register={register}
                    label='Email'
                    message='Provide new email'
                    name='email'
                    placeHolder='Your New Email...'

                />

                <CustomInput
                    iconDesigne='M7 10V7a5 5 0 0 1 10 0v3M6 10h12a2 2 0 0 1 2 2v8H4v-8a2 2 0 0 1 2-2Z'
                    xmlns='http://www.w3.org/2000/svg'
                    isProvidedEyeIcon={true}
                    type={isPasswordHidden ? "password" : "text"}
                    onClick={() => setIsPasswordHidden(prev=> !prev)}
                    errors={errors}
                    register={register}
                    isRequired={true}
                    label='Password'
                    message='Provide exact account password'
                    name='password'
                    placeHolder='Your account password to save changes...'

                />



                <div className="
                        flex
                        flex-col-reverse
                        gap-3
                        
                        px-5
                        py-4
                        sm:flex-row
                        sm:items-center
                        sm:justify-end
                        sm:px-7
                    ">

                    <CustomButton
                        onClick={() => navigate("/settings")}
                        classes="
                                rounded-lg
                                border
                                border-gray-300
                                bg-white
                                px-5
                                py-2.5
                                text-sm
                                font-medium
                                text-gray-700
                                transition
                                hover:bg-gray-50
                            "
                        name='Cancel'
                        isDefaultCassessAllowed={false}

                    />

                    <CustomButton
                        classes="
                                rounded-lg
                                bg-green-600
                                px-5
                                py-2.5
                                text-sm
                                font-semibold
                                text-white
                                shadow-sm
                                transition
                                hover:bg-green-700
                                focus:outline-none
                                focus:ring-2
                                focus:ring-green-500
                                focus:ring-offset-2
                            "
                        name='Save Changes'
                        isDefaultCassessAllowed={false}
                        type='submit'
                    />



                </div>




            </form>
        </div>
    )
}

export { UpdateAccountDetailsForm }