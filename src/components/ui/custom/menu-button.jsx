import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Title } from "@/components/ui/title";
import { Check } from "lucide-react";

export function MenuButton({
  title,
  options = [],
  onSelect,
  value = "",
  children,
  className,
}) {
  return (
    <DropdownMenu>
      {title ? (
        <Title title={title}>
          <DropdownMenuTrigger asChild className={className}>
            {children && children}
          </DropdownMenuTrigger>
        </Title>
      ) : (
        <DropdownMenuTrigger asChild className={className}>
          {children && children}
        </DropdownMenuTrigger>
      )}
      <DropdownMenuContent>
        <DropdownMenuGroup>
          {options &&
            options.map((item, i) => {
              if (item.separator) {
                return (
                  <div key={i} className="flex justify-center">
                    <div className="h-[1.7px] my-1 w-[80%] bg-slate-100" />
                  </div>
                );
              }
              return (
                <DropdownMenuItem
                  key={i}
                  onClick={() => onSelect(item)}
                  className={`flex text-xs justify-between items-center cursor-pointer ${
                    item?.value === value ? "bg-slate-100" : ""
                  }`}
                >
                  <div className="flex items-center gap-2">
                    {item?.icon && <i className={`${item.icon}`} />}
                    {item.name}
                  </div>
                  {/* {item?.value === value ? (
                    <Check size={20} className="text-slate-500" />
                  ) : null} */}
                </DropdownMenuItem>
              );
            })}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
