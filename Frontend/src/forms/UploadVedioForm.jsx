import React from 'react'
import {useState} from 'react'
import { CustomInput } from '../utils/CustomInput'
import { useForm } from 'react-hook-form'
import { SelectInput } from '../utils/CustomSelectInput'
import { CustomImageInput } from '../utils/CustomImageInput'
import { CustomButton } from '../utils/CustomButton'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'

function UploadvideoForm() 
{
    const {register, handleSubmit, formState:{errors}} = useForm()
    const [thumbNailFile, setThumbNailFile] = useState({})
    const [videoFile, setvideoFile] = useState({})
    const [loading, setLoading] = useState(false)
    const [msg, setMsg] = useState("")
    const [disable, setDisable] = useState(false)
    const navigate = useNavigate()



    const uploadvideo = async (data) =>
    {

      if(data.title?.trim() == "" || data.description?.trim() == "" || data.thumbNail[0]?.path == "" || data.video[0]?.path == "" )
      {
        setMsg("Please provide all required fields")
      }

      
      
      
      try 
      {
          setMsg("")
          setDisable(true)
          setLoading(true)

          const formData = new FormData()

          formData.append("title", data.title)
          formData.append("description", data.description)
          formData.append("isPublished", data.isPublished)
          formData.append("thumbNail", data.thumbNail[0])
          formData.append("video", data.video[0])

          const res = await api.post("/videos/upload-video", formData)


          if((res.status == 200 || 201) && res.data.success)
          {
            setMsg("video uploaded successfully")

            setTimeout(() => 
            {
              setMsg("")
              
              navigate("/my-content")
            }, 1000);

          }
          else
          {
            setMsg("Something went wrong, failed to upload video")

            setDisable(false)
          }

      } 

      catch(error) 
      {
        setMsg(error.response?.data?.message)

        setDisable(false)

      }
      finally
      {
        setLoading(false)
      }
      
        
    }


  return (
   <div>

      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 ">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
        </div>
      )}

      {!loading && disable && msg.length > 0 && 
      (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 ">
          
          <div className='flex items-center justify-center'>
          <p className='text-red-500 italic text-lg font-semibold '>
            {msg}
          </p>
        </div>
          
        </div>
      )}

      {
        msg.length > 0 && !disable &&
        <div className='flex items-center justify-center'>
          <p className='text-red-500 italic text-lg font-semibold '>
            {msg}
          </p>
        </div>
      }

      <form
        onSubmit={handleSubmit(uploadvideo)}
        className="mt-10 space-y-7">


            
        <CustomInput
        errors={errors}
        register={register}
        isRequired={true}
        label='video Title'
        message='Provide a short title'
        name='title'
        placeHolder='Type Title...'
        
        />
        <CustomInput
        errors={errors}
        register={register}
        isRequired={true}
        label='video Description'
        message='Provide a deep description'
        name='description'
        placeHolder='Type Purposes...'

        />
        <SelectInput
        defaultValue={true}
        error={errors}
        label={"Visibility Status"}
        name={'isPublished'}
        register={register}
        options={[{label: "YES, will be published", value:true}, {label: "NO, will not be published", value:false}]}
        placeholder='is this video will be published?'

        />

        <CustomImageInput
        onChange={(file) => setThumbNailFile(file)}
        fileName={`${thumbNailFile?.name || "No File "} Selected`}
        errors={errors}
        register={register}
        acceptingFileNames='PNG, JPG or WEBP'
        isRequired={true}
        label='Thumb-Nail'
        logo={"🖼️"}
        name='thumbNail'
        title='Upload Thumb-Nail'
        
        
        />

        <CustomImageInput
        onChange={(file) => setvideoFile(file)}
        fileName={`${videoFile?.name || "No File "} Selected`}
        errors={errors}
        register={register}
        acceptingFileNames='MP4, WebM'
        isRequired={true}
        label='video'
        logo={"▶️"}
        name='video'
        title='Upload video'

        
        />

        <CustomButton
        name='Upload'
        type='submit'
        />

        </form>
    </div>
  )
}

export {UploadvideoForm}