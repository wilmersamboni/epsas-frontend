import React from "react";

type Props = {
    id: string;
    value?: string; 
    name?: string;
    type: string;
    placeholder: string;
    onChange?:any;
}

const Input = React.forwardRef<HTMLInputElement, Props>(
  ({ id, name, value, placeholder, type, onChange, ...rest }, ref) => {
    return (
        <input
            id={id}
            value={value}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
            ref={ref}
            {...rest}
            className="border-1 rounded block min-w-0 grow bg-white py-1.5 pr-3 pl-1 text-base text-gray-900 placeholder:text-gray-400 focus:outline-none sm:text-sm/6 mb-4"
        />
    )
}

);
Input.displayName = "Input";
export default Input;