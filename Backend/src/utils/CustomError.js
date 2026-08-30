

export class ApiError extends Error
{

    constructor(statusCode, message, stack, errors )
    {
        
        super(message)
        this.statusCode = statusCode
        this.errors = errors
        this.data = null
        this.success = false
        
        if (!stack || stack === undefined) 
        {
            
            Error.captureStackTrace(this, this.constructor)
        }
    }
    
}