/* eslint-disable react/prop-types */
import clsx from "clsx";
import { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  description?: string;
  flex?: boolean;
  error?: any;
  touched?: boolean;
  containerClass?: string;
  copyToastText?: string;
}
const Input = ({
  className = "",
  value = "",
  label = "",
  description = "",
  error,
  touched = false,
  containerClass = "",
  type = "text",
  copyToastText,
  disabled,
  onChange,
  ...props
}: InputProps) => {
  return (
    <div className={containerClass}>
      <div
        className={clsx(
          "border rounded-[5px] transition-all group",
          type === "hidden" ? "!border-none" : "",
          touched && error ? "!border-danger" : "",
        )}
      >
        {label ? <div className="font-medium text-sm mb-1">{label}</div> : null}
        <input
          type={type}
          value={value}
          disabled={disabled}
          onChange={onChange}
          className={clsx(
            "w-full p-3 outline-none focus:bg-gray-200",
            "border-grey-dark disabled:text-placeholder",
            "placeholder:text-placeholder text-ellipsis text-sm text-black",
            className,
          )}
          {...props}
        />
      </div>
      {description && type !== "hidden" ? (
        <div className="my-2 text-sm">{description}</div>
      ) : null}
      {touched && error ? (
        <div className="my-2 text-xs absolute">
          {error.message || typeof error === "string" ? error : null}
        </div>
      ) : null}
    </div>
  );
};
export default Input;
