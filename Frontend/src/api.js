
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
        console.log("Response of api", response);
        

        return Promise.resolve(response)
    },




    async (error) => {



        

        const originalRequest = error.config

        console.log("Error of api", error.response.data);
        


        if (error.response?.status === 401 && error.response?.data?.message == "jwt have expired") 
        {
            console.log("If Part Executed");
            


            try {
                await api.post("/users/refresh-access-token")

                
                console.log("Try part of have started");

                
                return api(originalRequest)



            }


            catch (error) 
            {


                console.log("catch of refreshing request is sending error");
                

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