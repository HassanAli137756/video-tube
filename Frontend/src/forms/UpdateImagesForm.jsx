import React from 'react'
import { useState } from 'react'
import { CustomInput } from '../utils/CustomInput'
import { useForm } from 'react-hook-form'
import { SelectInput } from '../utils/CustomSelectInput'
import { CustomImageInput } from '../utils/CustomImageInput'
import { CustomButton } from '../utils/CustomButton'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useDispatch } from 'react-redux'
import {setUserInfo} from '../Redux/userSlice'

function UpdateImagesForm({avatar="", coverImage= ""}) {

    const { register, handleSubmit, formState: { errors } } = useForm()
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    
    const [avatarFile, setAvatarFile] = useState(avatar.length > 0 ? "Existing file already" : "")
    const [coverFile, setCoverFile] = useState(coverImage.length > 0 ? "Existing file already" : "")
    const [msg, setMsg] = useState("")
    const navigate = useNavigate()


    
  
  const removeMsg = () => {
      setTimeout(() => {
          setMsg("")
      }, 2500);
  }


    const updateAccountDetails = async (data) => 
    {
        

        try {
            setMsg("")
            setLoading(true)

            const formData = new FormData()

            formData.append("avatar", data.avatar?.[0])
            formData.append("coverImage", data.coverImage?.[0])


            const res = await api.post(`/users/update-account-images`, formData)

            if ((res.data.status == 200 || 201) && res.data.success) {
                console.log("Request have reached to set activities");

                dispatch(setUserInfo({isAuthorized: true, isLoading: false, userData: res.data.data}))

                setMsg("Successfully updated images")

                setTimeout(() => {
                    navigate("/settings")
                }, 2000);

            }
            else {
                setMsg("Something went wrong, failed to update images")
            }

        }
        catch (error) {
            setMsg(error.response?.data?.message || "Something went wrong, failed to update images")
        }
        finally {
            setLoading(false)
            removeMsg()
        }
    }


    return (
        <div className='relative'>

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


                <div className="grid gap-6 lg:grid-cols-2">


                    <CustomImageInput
                        onChange={(file) => setAvatarFile(file?.name)}
                        fileName={`${avatarFile || "No File"} selected`}
                        errors={errors}
                        register={register}
                        acceptingFileNames='PNG, JPG or WEBP'
                        label='Avatar'
                        logo={"👤"}
                        name='avatar'
                        title='Upload Avatar'

                    />


                    <CustomImageInput
                        onChange={(file) => setCoverFile(file?.name)}
                        fileName={`${coverFile || "No File "} Selected`}
                        register={register}
                        errors={errors}
                        acceptingFileNames='Recommended size: 1600 × 500 pixels'
                        label='Cover Image'
                        logo={"🖼️"}
                        name='coverImage'
                        title='Upload Cover'

                    />



                </div>

               


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

export { UpdateImagesForm }