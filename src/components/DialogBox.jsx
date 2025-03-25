import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export function DialogBox({
  title = "title",
  trigger = <></>,
  desc = "",
  modalJsx = <></>,
  open = false,
}) {
  const [isOpen, setIsopen] = useState(open);
  return (
    <Dialog open={isOpen} onOpenChange={setIsopen} close={true}>
      <DialogTrigger
        className={
          "flex text-xs items-center cursor-pointer hover:bg-[#f9f3f4] "
        }
        onClick={() => {
          setIsopen((isOpen) => !isOpen);
        }}
        asChild
      >
        {trigger}
      </DialogTrigger>
      <DialogContent
        className={`sm:max-w-[425px] p-[10px] flex flex-wrap justify-center py-5`}
      >
        <DialogHeader>
          <DialogTitle className={`flex justify-center`}>{title}</DialogTitle>
          {desc ? <DialogDescription>{desc}</DialogDescription> : null}
        </DialogHeader>
        {modalJsx}
        <Button
          variant="outline"
          className="w-[100px] cursor-pointer h-[32px] hover:bg-red-400 hover:text-white  "
          onClick={() => {
            setIsopen(false);
          }}
        >
          Cancel
        </Button>
      </DialogContent>
    </Dialog>
  );
}
