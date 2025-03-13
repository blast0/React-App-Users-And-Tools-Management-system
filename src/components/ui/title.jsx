import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";

export function Title({ children, title, side, sideOffset, canCopy = false }) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyTitle = () => {
    navigator.clipboard.writeText(title);
    setIsCopied(true);
  };

  useEffect(() => {
    if (isCopied) {
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isCopied]);

  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          side={side}
          sideOffset={sideOffset}
          className={"z-50 flex gap-2 items-start"}
        >
          <div className="text-wrap text-justify max-w-96 ">
            <p className="text-xs p-1">{title}</p>
          </div>
          {canCopy ? (
            isCopied ? (
              <Check className="mt-1" />
            ) : (
              <Copy
                size={18}
                className="cursor-pointer mt-1"
                onClick={handleCopyTitle}
              />
            )
          ) : null}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
