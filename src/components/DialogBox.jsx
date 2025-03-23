import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function DialogDemo({
  title = "title",
  trigger,
  desc,
  modalJsx = <></>,
  theme = "dark",
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className={`sm:max-w-[425px] p-[10px]`}>
        <DialogHeader>
          <DialogTitle className={`flex justify-center`}>{title}</DialogTitle>
          {desc ? <DialogDescription>{desc}</DialogDescription> : null}
        </DialogHeader>
        {/* <div className={theme === "dark" ? "bg-black" : "bg-white"}> */}
        {modalJsx}
        {/* </div> */}
        {/* <DialogFooter>
          <Button variant="outline">Save changes</Button>
        </DialogFooter> */}
      </DialogContent>
    </Dialog>
  );
}
