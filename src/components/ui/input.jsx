import * as React from "react";

import { cn } from "@/lib/utils";
import { Label } from "./label";

const Input = React.forwardRef(
  (
    {
      containerClassName,
      className,
      label = "",
      description = "",
      type,
      icon,
      iconPosition = "left",
      theme = "light",
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("relative", containerClassName)}>
        {label && (
          <Label className={`mb-1 ${theme === "dark" ? "text-white" : ""}`}>
            {label}
          </Label>
        )}
        <div className="relative">
          <input
            type={type}
            className={cn(
              "flex h-9 w-full rounded-md border border-slate-200 bg-transparent bg-white px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-[15px] file:font-medium file:text-slate-950 file:pt-1 file:rounded-sm file:transition-all file:cursor-pointer placeholder:text-slate-400 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-slate-800 dark:file:text-slate-50 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300",
              icon ? (iconPosition === "right" ? "pr-9" : "pl-9") : "",
              type === "file" ? "cursor-pointer hover:bg-slate-50" : "",
              className
            )}
            ref={ref}
            {...props}
          />
          {icon && (
            <span
              className={cn("absolute inset-y-0 flex items-center", {
                "left-3": iconPosition === "left",
                "right-3": iconPosition === "right",
              })}
            >
              {icon}
            </span>
          )}
        </div>
        <span className="text-xs text-slate-400">{description}</span>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
