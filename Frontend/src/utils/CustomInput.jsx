import React from 'react'

function CustomInput(
    {
        defaulValue="",
        name="",
        label="",
        placeHolder = "Please Type Here...",
        type = "text",
        register,
        id="",
        xmlns="",
        iconDesigne="",
        message="",
        isRequired=false,
        autoComplete= "off",
        onClick,
        isProvidedEyeIcon=false,
        errors,
        isOptional=false

    }) 
    {


        
    return (
        <div>
            
            <div>

            <label
                htmlFor={id}
                className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700"
            >


                {
                    xmlns && iconDesigne.length > 0 &&
                    <div>
                        <svg
                            xmlns={xmlns}
                            className="h-5 w-5 text-green-600"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={2}
                        >

                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d={iconDesigne}
                            />

                        </svg>
                    </div>
                }

                {label}
                {
                    isRequired &&
                    <span className="text-red-500">*</span>
                }

                {
                    isOptional &&

                    <span className="ml-1 text-xs font-normal text-gray-400">

                        (Optional)

                    </span>

                }

            </label>

            <div className='group relative'>

                <input
                    defaultValue={defaulValue}
                    id={id}
                    {...(register ? register(name, isRequired ? {required: `Please provide ${name} as it is required field`} : '') : "")}
                    name={name}
                    type={type}
                    autoComplete={autoComplete}
                    placeholder={placeHolder}
                    className="
                      w-full
                      rounded-2xl
                      border
                      border-gray-300
                      bg-linear-to-r
                      from-white
                      to-green-50/40
                      px-5
                      py-4
                      pr-14
                      text-gray-800
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-gray-400
                      hover:border-green-400
                      hover:shadow-md
                      focus:border-green-600
                      focus:bg-white
                      focus:ring-4
                    focus:ring-green-100
                    "
                />
                

                {
                    isProvidedEyeIcon &&
                    <button
                      onClick={() => onClick ? onClick() : null }
                      type="button"
                      className="
                      absolute
                      right-4
                      top-1/2
                      -translate-y-1/2
                      rounded-full
                      p-2
                      text-gray-400
                      transition-all
                      duration-300
                      hover:bg-green-50
                      hover:text-green-700
                    "
                    >

                      👁

                    </button>
                }

                


            </div>

            {
                    isRequired && errors[name]  &&
                    <p className='  text-red-500 italic'>

                        {errors[name]?.message}

                    </p>
                }

            {
                message.length > 0 &&
                
                  <div className="mt-2 flex items-center gap-2">

                    <span className="h-2 w-2 rounded-full bg-green-500"></span>

                    <p className="text-xs text-gray-500">

                      {message}

                    </p>

                  </div>
            }

        </div>
        </div>
    )
}

export {CustomInput}