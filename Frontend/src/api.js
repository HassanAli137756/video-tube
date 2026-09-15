
import axios, { AxiosError } from 'axios'


const api = axios.create(
    {
        baseURL: "https://video-tube-34ly.vercel.app/api/v1",
        withCredentials: true
    }
)



api.interceptors.response.use(



    
    
    (response) => 
    {
        

        return Promise.resolve(response)
    },




    async (error) => {



        

        const originalRequest = error.config

        


        if (error.response?.status === 401 && error.response?.data?.message == "jwt have expired") 
        {
            


            try {
                await api.post("/users/refresh-access-token")

                

                
                return api(originalRequest)



            }


            catch (error) 
            {


                

                return Promise.reject(error)

            }

            





        }
        else
        {
            return Promise.reject(error)
        }
        
    },


)


export { api }