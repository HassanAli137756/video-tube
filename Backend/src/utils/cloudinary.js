
import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'
import { asyncHandler } from './asyncHandler.js'



cloudinary.config(
{
    cloud_name:  process.env.CLOUDINARY_CLOUD_NAME,
    api_key:  process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
}
)



const uploadImageOnCloundinary = async (localSavedFile) =>
{
    
    try 
    {
        if(!localSavedFile) return null

        const response = await cloudinary.uploader.upload(localSavedFile,
            {
                
                resource_type: 'image'
            }
        )

        console.log('file is successfully upload with name:', response.original_filename);

        fs.unlinkSync(localSavedFile)

        return response
        
    } 
    catch(error) 
    {
        console.log("Error in catch of uploadOnCloundinary", error);
        
        if(localSavedFile)
        {
            fs.unlinkSync(localSavedFile)
        }
        return null
    }
}


const uploadVedioOnCloundinary = async (localSavedFile) =>
{
    try 
    {
        if(!localSavedFile) return null

        const response = await cloudinary.uploader.upload(localSavedFile,
            {
                
                resource_type: 'video'
            }
        )

        console.log('file is successfully upload with name:', response);

        fs.unlinkSync(localSavedFile)

        return response
        
    } 
    catch(error) 
    {
        console.log("Error in catch of uploadOnCloundinary", error);
        
        if(localSavedFile)
        {
            fs.unlinkSync(localSavedFile)
        }
        return null
    }
}




const removeFromCloudinary = async function (oldFileURL)
{
    const removingInstance = await cloudinary.uploader.destroy(oldFileURL)

    if(!removingInstance)
    {
        console.log("Yes access is in if or removeFromcloudinary");
        
        return false
    }

    
    

    return removingInstance

}


export {uploadImageOnCloundinary, removeFromCloudinary, uploadVedioOnCloundinary}