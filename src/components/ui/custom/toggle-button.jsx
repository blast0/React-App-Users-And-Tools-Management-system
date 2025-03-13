import { cn } from "@/lib/utils";
import { Button } from "../button";

const ToggleButton = ({
  value,
  btnArray,
  variant = "outline",
  size = "icon-xs",
  className,
  activeClassName = "bg-primary-dark-100 text-slate-50 hover:text-white shadow hover:bg-primary-dark-100/90 dark:bg-slate-50 dark:hover:bg-slate-50/90",
  onClick,
}) => {
  const btnStyle = (index) =>
    btnArray.length > 1
      ? index === 0
        ? "rounded-tr-none rounded-br-none"
        : index === btnArray.length - 1
        ? "rounded-tl-none rounded-bl-none border-l-0"
        : "rounded-none border-l-0"
      : "";

  return (
    <div className={cn("gap-0 flex items-center flex-nowrap", className)}>
      {btnArray &&
        btnArray.map((item, i) => (
          <Button
            key={i}
            variant={variant}
            size={size}
            value={item.value}
            title={item.title}
            className={cn(
              btnStyle(i),
              item.btnClassName,
              item.value === value ? activeClassName : ""
            )}
            onClick={() => onClick(item)}
          >
            {item.icon}
          </Button>
        ))}
    </div>
  );
};

export default ToggleButton;
