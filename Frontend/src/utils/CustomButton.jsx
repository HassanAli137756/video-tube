import React from 'react'

function CustomButton(
{
    name='Click',
    isArrowAllowed=false,
    onClick,
    type="button",
    classes="",
    isDefaultCassessAllowed=true,
    isDisable=false
}



) 
{
    
    return (
        <div>
            
        <button
            onClick={() => (onClick ? onClick() : null)}
            disabled={isDisable}
            type={type}
            className={`
            ${isDefaultCassessAllowed ? 
            "group mt-2 flex w-full items-center justify-center gap-3 rounded-2xl  bg-linear-to-br from-green-600 to-green-400 px-6  py-4 text-base font-semibold text-white shadow-lg shadow-green-200/60 transition-all duration-300 hover:-translate-y-0.5 hover:from-green-700 hover:to-green-800 hover:shadow-xl hover:shadow-green-300/50 active:translate-y-0  active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-green-200" 
            : ""}
            
            ${isDisable ? "bg-gray-500 line-through" : ""}

            ${classes}
            `}
        >

            <span>

                {name}

            </span>

            {/* Arrow Icon */}
            {
                isArrowAllowed &&
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="
                    h-5
                    w-5
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                    "
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >

                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 12h14m-6-6l6 6-6 6"
                    />

                </svg>
            }

        </button>
        </div>
    )
}

export {CustomButton}