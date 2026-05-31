import { type InputHTMLAttributes, forwardRef, useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, id, ...props }, ref) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const errorId = error ? `${inputId}-error` : undefined;
    return (
      <div className="flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-[var(--color-foreground)]"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-describedby={errorId}
          aria-invalid={!!error}
          className={`w-full px-4 py-2.5 bg-[var(--color-card)] border border-[var(--color-border)] rounded-xl text-[var(--color-foreground)] placeholder:text-[var(--color-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors ${className}`}
          {...props}
        />
        {error && (
          <span id={errorId} role="alert" className="text-sm text-red-500">
            {error}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
