import React from 'react'
import { useState } from 'react'
import { CustomInput } from '../utils/CustomInput'
import { useForm } from 'react-hook-form'
import { SelectInput } from '../utils/CustomSelectInput'
import { CustomImageInput } from '../utils/CustomImageInput'
import { CustomButton } from '../utils/CustomButton'
import { useNavigate } from 'react-router-dom'
import {api} from '../api'
function UpdatePasswordForm() {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const [isOldPasswordHidden, setIsOldPasswordHidden] = useState(true)
    const [isNewPasswordHidden, setIsNewPasswordHidden] = useState(true)
    const [isConfirmPasswordHidden, setIsConfirmPasswordHidden] = useState(true)


    const removeMsg = () => {
      setTimeout(() => {
          setMsg("")
      }, 2500);
  }

    const updatePassword = async (data) => {
        console.log("Uploading Data", data);
        if(!(data.password?.trim() && data.newPassword?.trim() && data.confirmPassword?.trim()))
        {
            setMsg("All passwords must be provided")
            removeMsg()
            return null
        }

        if(!(data.newPassword?.trim() === data.confirmPassword))
        {
            setMsg("New and confirm password must be same")
            removeMsg()
            return null
        }

        
        try {
            setMsg("")
            setLoading(true)

            const res = await api.post('/users/update-password', {oldPassword: data.password, newPassword: data.newPassword})

            if ((res.data.status == 200 || 201) && res.data.success) {
                console.log("Request have reached to set activities");

                setMsg(res.data?.message || "Password updated successfully")
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
                <div className=" absolute inset-0 z-50 flex items-center justify-center bg-white/70 ">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                </div>
            )}

            {msg.length > 0 && (
                <div className=" absolute inset-0 z-50 flex items-center justify-center bg-white/70 ">

                    <div className='flex justify-center items-center'>
                        <p className='text-red-600 italic'>
                            {msg}
                        </p>
                    </div>
                    
                </div>
            )}

            <form
                onSubmit={handleSubmit(updatePassword)}
                className="mt-10 space-y-7">



                <CustomInput
                    iconDesigne='M7 10V7a5 5 0 0 1 10 0v3M6 10h12a2 2 0 0 1 2 2v8H4v-8a2 2 0 0 1 2-2Z'
                    xmlns='http://www.w3.org/2000/svg'
                    isProvidedEyeIcon={true}
                    type={isOldPasswordHidden ? "password" : "text"}
                    onClick={() => setIsOldPasswordHidden(prev=> !prev)}
                    errors={errors}
                    register={register}
                    isRequired={true}
                    label='Old Password'
                    message='Provide exact perivous password'
                    name='password'
                    placeHolder='Your old password...'

                />

                <CustomInput
                    type={isNewPasswordHidden ? "password" : "text"}
                    onClick={() => setIsNewPasswordHidden(prev=> !prev)}
                    xmlns='http://www.w3.org/2000/svg'
                    iconDesigne='M15.5 7.5a4.5 4.5 0 1 0-4 4.46L20 20.5l1.5-1.5-2-2 1.5-1.5-2-2-1.5 1.5-2.54-2.54a4.5 4.5 0 0 0 .54-4.46Z'
                    errors={errors}
                    isProvidedEyeIcon={true}
                    register={register}
                    isRequired={true}
                    label='New Password'
                    message='Provide a new strong password'
                    name='newPassword'
                    placeHolder='Your updated password...'

                />


                <CustomInput
                    type={isConfirmPasswordHidden ? "password" : "text"}
                    onClick={() => setIsConfirmPasswordHidden(prev=> !prev)}
                    isProvidedEyeIcon={true}
                    xmlns='http://www.w3.org/2000/svg'
                    iconDesigne='M12 3 20 6v5c0 5-3.4 8.5-8 10-4.6-1.5-8-5-8-10V6l8-3Z M9 12l2 2 4-4'
                    errors={errors}
                    register={register}
                    isRequired={true}
                    label='Confirm New Password'
                    message='Write again new password'
                    name='confirmPassword'
                    placeHolder='Confirm your new password...'


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

export { UpdatePasswordForm }