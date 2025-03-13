import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";

import { cn } from "@/lib/utils";
import { Label } from "./label";

const Switch = React.forwardRef(
  ({ label = "", labelPosition = "left", className, ...props }, ref) => (
    <div
      className={cn(
        "flex items-center gap-2 w-fit",
        labelPosition === "right" ? "flex-row-reverse" : "flex-row"
      )}
    >
      <SwitchPrimitives.Root
        className={cn(
          "peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary-dark-100 data-[state=unchecked]:bg-slate-200 dark:focus-visible:ring-slate-300 dark:focus-visible:ring-offset-slate-950 dark:data-[state=checked]:bg-slate-50 dark:data-[state=unchecked]:bg-slate-800",
          className
        )}
        {...props}
        ref={ref}
      >
        <SwitchPrimitives.Thumb
          className={cn(
            "pointer-events-none block h-4 w-4 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0 dark:bg-slate-950"
          )}
        />
      </SwitchPrimitives.Root>
      <Label htmlFor={props?.id}>{label}</Label>
    </div>
  )
);
Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };
