



export const asyncHandler = (fn) =>
    
{
    return async (req, res, next) =>
        {

            
            
            try 
            {
                await fn(req, res, next)

                
                
                
            } 
            catch(error) 
            {
                console.log('There is an error in catch of asyncHandler', error)    
                next(error)
            }
        }
}


