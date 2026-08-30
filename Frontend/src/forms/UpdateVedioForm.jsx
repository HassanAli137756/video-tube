import React from 'react'
import { useState } from 'react'
import { CustomInput } from '../utils/CustomInput'
import { useForm } from 'react-hook-form'
import { SelectInput } from '../utils/CustomSelectInput'
import { CustomImageInput } from '../utils/CustomImageInput'
import { CustomButton } from '../utils/CustomButton'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'


function UpdateVedioForm(
{
    title="",
    description="",
    isPublished=true,
    routePath="/my-content",
    vedioId=""

}) {
    
    const { register, handleSubmit, formState: { errors } } = useForm()
    const [msg, setMsg] = useState("")
    const [fileName, setFileName] = useState("Uploaded Thumbnail have already")
    const [loading, setLoading] = useState(false)
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate()

    

    const updateVedio = async (data) => 
    {
        console.log("Uploading Data", data);

        if(data.title?.trim() == "" || data.description?.trim() == "" || typeof data.isPublished !== "boolean" )
        {
            setMsg("Fields can't be empty")
        }

        try 
        {
            setDisable(true)
            setLoading(true)
            setMsg("")


            const formData = new FormData()

            formData.append("title", data.title?.trim())
            formData.append("description", data.description?.trim())
            formData.append("isPublished", data.isPublished)
            formData.append("thumbNail", data.thumbNail[0]?.name ? data.thumbNail[0] : null)


            const res = await api.patch(`/vedios/update-vedio/${vedioId}`, formData)

            if((res.status == 200 || 201) && res.data.success)
            {
                setMsg("Successfully saved changes")

                setTimeout(() => 
                {
                    navigate(routePath)
                }, 2000);

            }
            else
            {
                setMsg("Failed to save changes")
                setDisable(false)
            }



        } catch (error) 
        {
            setMsg(error.response?.data?.message || "Failed to save changes")
            setDisable(false)
        }
        finally
        {
            setLoading(false)
        }

    }


    return (
        <div className='relative'>

            {loading && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/70 ">
                    <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
                </div>
            )}

            

            <form
                onSubmit={handleSubmit(updateVedio)}
                className="mt-10 space-y-7">

                {msg.length > 0 && (
                    <div className="flex justify-center items-center">
                        <p className='text-red-500 italic'>
                            {msg}
                        </p>
                    </div>
                )}

                <CustomInput
                    defaulValue={title}
                    errors={errors}
                    register={register}
                    isRequired={true}
                    label='Vedio Title'
                    message='Provide a short updated title'
                    name='title'
                    placeHolder='Type Title...'

                />
                <CustomInput
                    errors={errors}
                    defaulValue={description}
                    register={register}
                    isRequired={true}
                    label='Vedio Description'
                    message='Provide a deep updated description'
                    name='description'
                    placeHolder='Type Purposes...'

                />
                <SelectInput
                    defaultValue={isPublished}
                    error={errors}
                    label={"Visibility Status"}
                    name={'isPublished'}
                    register={register}
                    options={[{ label: "YES, will be published", value: true }, { label: "NO, will not be published", value: false }]}
                    placeholder='is this vedio will be published?'

                />

                <CustomImageInput
                    onChange={(file) => setFileName(file?.name)}
                    fileName={`${fileName ? fileName : "No File"} Selected`}
                    errors={errors}
                    register={register}
                    acceptingFileNames='PNG, JPG or WEBP'
                    label='Thumb-Nail'
                    logo={"🖼️"}
                    name='thumbNail'
                    title='Upload Thumb-Nail'


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
                    isDisable={disable}
                    onClick={() => navigate(routePath)}
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
                    isDisable={disable}
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

export { UpdateVedioForm }