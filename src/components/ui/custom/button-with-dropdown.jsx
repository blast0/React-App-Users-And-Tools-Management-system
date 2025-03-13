import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../dropdown-menu";
import { cn } from "@/lib/utils";

const ButtonWithDropdown = ({
  label = "Save",
  options,
  onClick,
  className,
  popoverClass,
  style,
  bgColor,
  onSelect = () => {},
}) => {
  return (
    <div
      className={cn(
        "flex h-7 bg-white rounded-sm shadow-sm border border-slate-200",
        {
          "border-none": bgColor === "primary",
        },
        className
      )}
      style={style}
    >
      <p
        className={cn(
          "flex-1 hover:bg-gray-50 cursor-pointer flex gap-2 items-center justify-center",
          {
            "bg-primary-dark-100 text-white rounded-tl-sm rounded-bl-sm hover:bg-primary-dark-100/95":
              bgColor === "primary",
          }
        )}
        onClick={onClick}
      >
        {label}
      </p>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            className={cn(
              "w-4 cursor-pointer hover:bg-gray-100 flex items-center justify-center bg-slate-100",
              {
                "bg-[#297b75] text-white hover:bg-[#1d6c66] rounded-tr-sm rounded-br-sm":
                  bgColor === "primary",
              }
            )}
          >
            <i className="icon-down text-[8px]" />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className={popoverClass}>
          {options &&
            options.map((item, i) => {
              return (
                <DropdownMenuItem key={i} onClick={() => onSelect(item.value)}>
                  {item.name}
                </DropdownMenuItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ButtonWithDropdown;
