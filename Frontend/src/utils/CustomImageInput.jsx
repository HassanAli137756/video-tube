import React from 'react'

function CustomImageInput(
    {
        fileName="",
        onChange,
        label = "",
        isRequired = false,
        isOptional = false,
        logo = null,
        name = 'Upload file',
        acceptingFileNames = "",
        register,
        errors,
        title = ""

    }
) 
{

    const field = register ? register(name, isRequired ? { required: "Please fill this field to proceed"} : "") : ""
    

    return (
        <div>

            <label
                htmlFor={name}
                className="mb-3 block text-sm font-semibold text-gray-700"
            >

                {label}
                {
                    isRequired &&
                    <span className="ml-1 text-red-500">*</span>

                }

                {
                    isOptional &&

                    <span className="ml-1 text-xs font-normal text-gray-400">

                        (Optional)

                    </span>

                }

            </label>

            <label
                htmlFor={name}
                className="
                      group
                      flex
                      min-h-[220px]
                      cursor-pointer
                      flex-col
                      items-center
                      justify-center
                      rounded-3xl
                      border-2
                      border-dashed
                      border-green-300
                      bg-linear-to-br
                      from-green-50
                      via-white
                      to-green-100
                      p-6
                      text-center
                      transition-all
                      duration-300
                      hover:border-green-600
                      hover:shadow-xl
                    "
            >

                {
                    logo &&
                    <div
                        className="
                        flex
                        h-20
                        w-20
                        items-center
                        justify-center
                        rounded-full
                        bg-green-600
                        text-4xl
                        text-white
                        shadow-lg
                        transition-transform
                        duration-300
                        group-hover:scale-110
                      "
                    >

                        {logo}

                    </div>
                }

                {
                    title.length > 0 &&
                    <h3 className="mt-6 text-lg font-bold text-gray-800">

                        {title}

                    </h3>
                }

                {
                    acceptingFileNames.length > 0 &&
                    <p className="mt-2 text-sm leading-6 text-gray-500">

                        {acceptingFileNames}
                    </p>
                }

                {
                    fileName.length > 0 &&
                    <p className="mt-2 text-sm leading-6 text-gray-500">

                        {fileName}
                    </p>
                }


                <input
                    {...field}
                    onChange={(e) =>
                    {
                        onChange?.(e.target.files[0]),
                        field.onChange?.(e)
                    }
                    }
                    id={name}
                    type="file"
                    accept="image/*"
                    className="hidden"
                />
                {
                    isRequired && errors[name]  &&
                    <p className=' text-red-500'>

                        {errors[name]?.message}

                    </p>
                }

            </label>

        </div>
    )
}

export { CustomImageInput }