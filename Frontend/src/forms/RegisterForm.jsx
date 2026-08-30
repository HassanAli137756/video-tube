import React, { useState } from 'react'
import { CustomButton } from '../utils/CustomButton'
import { CustomInput } from '../utils/CustomInput'
import { CustomImageInput } from '../utils/CustomImageInput'
import { useForm } from 'react-hook-form'
import { api } from '../api'
import { useNavigate } from 'react-router-dom'


function RegisterForm() 
{
  const [avatarFile, setAvatarFile] = useState({})
  const [coverFile, setCoverFile] = useState({})
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const [disable, setDisable] = useState(false)
  const [isPasswordHidden, setIsPasswordHidden] = useState(true)
  const [isConfrimPasswordHidden, setIsConfirmPasswordHidden] = useState(true)
  const { register, handleSubmit, formState: { errors } } = useForm()


  
  console.log("All Files", avatarFile, coverFile);
  
  

  const createAccount = async (data) => 
  {

    if (data.userName?.trim() === "" || data.fillName?.trim() === "" || data.email?.trim() === "" || data.password?.trim() === "" || data.avatar?.name == "") 
    {
      setMsg("Please provide all required fields highlighted by red star")
    }

    if(data.confirmPassword !== data.password)
    {
      setMsg("Confim and password should be same")
    }


    console.log("Actual Data of Hook Form", data);
    




    try 
    {
      setLoading(true)
      setMsg("")
      setDisable(true)

      const formData = new FormData()

      formData.append('userName', data.userName)
      formData.append('fullName', data.fullName)
      formData.append('email', data.email)
      formData.append('password', data.password)
      formData.append('avatar', data.avatar[0])
      formData.append('coverImage', data.coverImage ? data.coverImage[0] : null)


      const res = await api.post('/users/user-register', formData)

      if (res.status === 200 || 201 && res.data.success && res.data.data) 
      {
        setMsg("Account is successfully created")

        setTimeout(() => 
        {
          setMsg("")  
          navigate('/login', {state: res.data.data})
          
        }, 3000);
      }
      else 
      {
        setMsg("Something went wrong failed to create account")
        setDisable(false)
      }


      console.log("res in register form", res);
      

    }
    catch (error) 
    {
      console.log("Error in catch of createAccout", error);

      setMsg(error.response?.data?.message || "Some thing went wrong, failed to register user")

      setDisable(false)
    }
    finally {
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

      {
        !loading && msg.length > 0 && disable &&
          (<div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 ">
            <div>


              <div className='flex justify-center'>
                <p className=' italic text-lg text-red-600 '>
                  {msg}
                </p>
              </div>

            </div>
          </div>)
      }

      <form
        onSubmit={handleSubmit(createAccount)}
        className="mt-10 space-y-7">


        <div>
          <CustomInput
            register={register}
            errors={errors}
            label='UserName'
            id='username'
            type='text'
            placeHolder='@hassan_dev'
            message='User name should be unique'
            isRequired={true}
            name='userName'
          />
        </div>



        <div>
          <CustomInput
            register={register}
            errors={errors}
            label='Full Name'
            id='fullname'
            type='text'
            placeHolder='Hassan Ali'
            message='Enter your real name.'
            isRequired={true}
            name='fullName'

          />
        </div>


        <div>
          <CustomInput
            register={register}
            errors={errors}
            id='email'
            xmlns='http://www.w3.org/2000/svg'
            iconDesigne='M3 7l9 6 9-6M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z'
            label='Email Address'
            type='email'
            autoComplete='email'
            name='email'
            placeHolder='hassan@example.com'
            message="We'll use your email for accout recovery."
            isRequired={true}
          />
        </div>



        <div>
          <CustomInput
            register={register}
            errors={errors}
            label='Password'
            xmlns='http://www.w3.org/2000/svg'
            iconDesigne='M12 11c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6-2h-1V7a5 5 0 00-10 0v2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-9-2a3 3 0 116 0v2H9V7z'
            isRequired={true}
            id='password'
            name='password'
            isProvidedEyeIcon={true}
            type={isPasswordHidden ? "password" : "type"}
            onClick={() => setIsPasswordHidden(prev => !prev)}
          />
        </div>

        <div>
          <CustomInput
            register={register}
            errors={errors}
            label='Confirm Password'
            xmlns='http://www.w3.org/2000/svg'
            iconDesigne='M12 11c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6-2h-1V7a5 5 0 00-10 0v2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-9-2a3 3 0 116 0v2H9V7z'
            isRequired={true}
            id='confirmpassword'
            name='confirmpassword'
            isProvidedEyeIcon={true}
            type={isConfrimPasswordHidden ? "password" : "type"}
            onClick={() => setIsConfirmPasswordHidden(prev => !prev)}
          />
        </div>

        <div>




          <div className="grid gap-6 lg:grid-cols-2">


            <CustomImageInput
              onChange={(file) => setAvatarFile(file)}
              fileName={`${avatarFile?.name || "No File"} selected` }
              errors={errors}
              register={register}
              acceptingFileNames='PNG, JPG or WEBP'
              label='Avatar'
              isRequired={true}
              logo={"👤"}
              name='avatar'
              title='Upload Avatar'

            />


            <CustomImageInput
              onChange={(file) => setCoverFile(file)}
              fileName={`${coverFile?.name || "No File "} Selected`}
              register={register}
              errors={errors}
              acceptingFileNames='Recommended size: 1600 × 500 pixels'
              label='Cover Image'
              logo={"🖼️"}
              isOptional={true}
              name='coverImage'
              title='Upload Cover'

            />



          </div>

          
            <div className='flex justify-center'>
              <div className='w-full'>
                
              <CustomButton
                isDisable={disable}
                type='submit'
                name='Create Account'
                isArrowAllowed={true}
              />



              
              </div>
            </div>

            <div className='flex justify-center'>
              <div>
                
              {
                msg.length > 0 &&
                <div className='font-semibold text-lg text-red-500 italic '>
                  {msg}
                </div>
              }

              
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600">
                    Already have an account?{" "}
                    {/* <NavLink
                              className="font-semibold text-green-600 hover:text-green-700 transition-colors"
                            >
                              Login
                            </NavLink> */}
                  </p>
              </div>
              </div>
            </div>

        </div>

      </form>
    </div>

  )
}

export { RegisterForm }