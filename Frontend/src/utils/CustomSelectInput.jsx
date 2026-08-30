
import React from "react"

const SelectInput = ({
  label,
  defaultValue="",
  name,
  options = [],
  register,
  error,
  placeholder = "Select an option",
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}

      <select
        defaultValue={defaultValue}
        id={name}
        {...(register ? register(name) : null)}
        {...props}
        className={`
          w-full
          rounded-xl
          border
          bg-white
          px-4
          py-3
          text-sm
          text-gray-700
          outline-none
          transition
          ${
            error
              ? "border-red-400 focus:border-red-500"
              : "border-gray-200 focus:border-green-500"
          }
        `}
      >
        <option value="" disabled>
          {placeholder}
        </option>

        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
          >
            {option.label}
          </option>
        ))}
      </select>

      {error && (
        <p className="mt-1.5 text-xs text-red-500">
          {error.message}
        </p>
      )}
    </div>
  );
};

export {SelectInput};