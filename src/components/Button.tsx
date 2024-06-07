import clsx from "clsx";
import { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: any;
  size?: "lg" | "xl" | "md" | "default";
  className?: string;
  containerClass?: string;
  compact?: boolean;
  loading?: boolean;
}

export default function Button({
  className = "",
  children,
  containerClass = "",
  disabled,
  compact = true,
  loading = false,
  size,
  ...props
}: ButtonProps) {
  return (
    <div
      className={clsx(
        compact ? "max-w-[100px]" : "",
        "w-full rounded-full h-[52px]",
        disabled ? "opacity-70" : "",
        containerClass,
      )}
    >
      <button
        {...props}
        disabled={disabled || loading}
        className={clsx(
          "whitespace-nowrap p-[10px] outline-none transition-all w-full flex items-center gap-2 justify-center border border-white rounded text-white hover:opacity-70",
          className,
        )}
      >
        {loading ? (
          <div className="flex items-center gap-2">
            <span>Loading...</span>
          </div>
        ) : (
          children
        )}
      </button>
    </div>
  );
}
