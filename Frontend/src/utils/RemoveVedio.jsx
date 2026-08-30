import React, { useState } from 'react'
import { CustomButton } from './CustomButton'
import { api } from '../api';


function RemoveVedio(
{
    callBack=null,
    vedioId=""


}
) 
{

  const removeMsg = () =>
    {
        setTimeout(() => {
            setMsg("")
        }, 2000);
    } 


  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState("")
    
  
      const deleteComment 
      = async () =>
      {

          if(!vedioId || !callBack)
          {
              setMsg("Something went wrong, comment-Id or callBack isn't provided")
              removeMsg()
              return
  
          }
  
          try 
          {
              setLoading(true)
              setMsg("")
  
  
              const res = await api.delete(`/vedios/remove-vedio-from-history/${vedioId}`)
  
  
              if((res.data.status == 200 || 201) && res.data.success) 
              {
  
                  setMsg("Successfully deleted vedio")

                  callBack(prev => (prev.filter(vedio => vedio._id !== vedioId)))
  
                  setTimeout(() => 
                  {
                      setMsg("")
                      
  
                  }, 2500);
  
              }
  
              else 
              {
                  setMsg("Something went wrong, failed to delete comment")
  
  
                  removeMsg()
              }
  
          }
  
          catch (error) 
          {
              setMsg(error.response?.data?.message || "Something went wrong, failed to delete comment")
  
              removeMsg()
          }
  
          finally
          {
              setLoading(false)
          }
  
      }
  


  return (
    <div>
         {loading && (
          <div className="absolute inset-0 z-50  flex items-center justify-center bg-white/90 ">
            <div className="h-12 w-12 animate-spin rounded-full border-4 border-green-600 border-t-transparent"></div>
          </div>
        )}

        
        {
            msg.length > 0 &&
            <div className="absolute inset-0 z-50  flex items-center justify-center bg-white/90 ">
           
            <p className='text-red-500 '>
                {msg}
            </p>
          </div>
        }
        
        <CustomButton
        onClick={() => deleteComment()}
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
        name='Remove'
        />
    </div>
  )
}

export {RemoveVedio}