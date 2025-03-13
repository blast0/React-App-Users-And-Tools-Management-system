import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";
import { Circle } from "lucide-react";

import { cn } from "@/lib/utils";

const RadioGroup = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  );
});
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const RadioGroupItem = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "aspect-square h-4 w-4 rounded-full border border-slate-900 text-primary-dark-100 shadow focus:outline-none focus-visible:ring-1 focus-visible:ring-primary-dark-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-50 dark:text-slate-50 dark:focus-visible:ring-slate-300",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="relative block">
        <Circle className="h-3 w-3 fill-primary-dark-100 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName;

export { RadioGroup, RadioGroupItem };
