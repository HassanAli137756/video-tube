import React, { useState } from 'react'
import { CustomButton } from '../utils/CustomButton'
import { CustomInput } from '../utils/CustomInput'
import { useForm } from 'react-hook-form'
import { api } from '../api'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { setUserInfo } from '../Redux/userSlice'
function LoginForm() {
  const { state } = useLocation()
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)
  const [disable, setDisable] = useState(false)
  const [isPasswordHidden, setIsPasswordHiddle] = useState(true)
  const navigate = useNavigate()
  const dispatch = useDispatch()



  const loginUser = async (data) => 
  {

    


    if (data.userRefrence?.trim() === "" || data.password?.trim() === "") {
      setMsg("Please provide all required fields highlighted by red satar")
    }

    try {
      setDisable(true)
      setLoading(true)
      setMsg("")



      const res = await api.post("/users/user-login", data)


      if (res && res.data?.success && res.data?.data) 
      {
        await dispatch(setUserInfo({isLoading: false, isAuthorized: true, userData: res.data.data?.loggedInUser }))
        setMsg("Successfully logged-in user")

        setTimeout(() => {
          setMsg("")
          navigate("/")

        }, 3000);
      }
      else {
        setMsg("Something went wrong failed to login user")
        setDisable(false)
      }


    }
    catch (error) {
      setMsg(error.response?.data?.message || "Something went wrong failed to login user")
      setDisable(false)
    }
    finally {
      setLoading(false)
    }




  }


  return (
    <div>
      {loading &&
        (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/70 ">
          
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent">

              </div>
              
            
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
        onSubmit={handleSubmit(loginUser)}
        className="mt-10 space-y-7">


        <div>
          <CustomInput
            name='userRefrence'
            errors={errors}
            register={register}
            label='User-Name / Email'
            id='userRefrence'
            type='text'
            placeHolder='user name or email...'
            message='Provide user name or email address'
            isRequired={true}
            defaulValue={state?.email || ""}
          />
        </div>



        



        <div>
          <CustomInput
            onClick={() => setIsPasswordHiddle(prev => !prev)}
            errors={errors}
            register={register}
            label='Password'
            xmlns='http://www.w3.org/2000/svg'
            iconDesigne='M12 11c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm6-2h-1V7a5 5 0 00-10 0v2H6a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2v-8a2 2 0 00-2-2zm-9-2a3 3 0 116 0v2H9V7z'
            isRequired={true}
            type={isPasswordHidden ? "password" : "text"}
            id='password'
            name='password'
            isProvidedEyeIcon={true}
          />
        </div>

        <div>




          <div>


            <CustomButton
              isDisable={disable}
              type='submit'
              name='Login'
              isArrowAllowed={true}
            />




          </div>

          {
            msg &&
            <div className='flex justify-center'>
              <p className=' italic text-red-600 '>
                {msg}
              </p>
            </div>
          }


        </div>

      </form>

    </div>
  )
}

export default LoginForm