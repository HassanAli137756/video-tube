
import axios, { AxiosError } from 'axios'
/* {
  "version": 2,
  "builds": [
    {
      "src": "src/index.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "src/index.js"
    }
  ]
}
 */

const api = axios.create(
    {
        baseURL: "http://localhost:3000/api/v1",
        withCredentials: true
    }
)

let isRefreshing_accessTokenFailed = false


api.interceptors.response.use(



    
    
    (response) => 
    {
        console.log("Response of api", response);
        

        return Promise.resolve(response)
    },




    async (error) => {



        

        const originalRequest = error.config

        console.log("Error of api", error.response.data, "value of isRefreshing_accessToken:", isRefreshing_accessTokenFailed);
        


        if (error.response?.status === 401 && error.response?.data?.message == "jwt have expired") 
        {
            console.log("If Part Executed");
            
            isRefreshing_accessTokenFailed = true


            try {
                await api.post("/users/refresh-access-token")

                
                console.log("Try part of have started");

                isRefreshing_accessTokenFailed = false

                return api(originalRequest)



            }


            catch (error) 
            {


                console.log("catch of refreshing request is sending error");
                
                isRefreshing_accessTokenFailed = false

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