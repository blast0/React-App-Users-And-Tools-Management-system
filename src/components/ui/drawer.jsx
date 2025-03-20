import React from "react";
import { Drawer } from "vaul";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
const VaulDrawer = ({ theme, headerChildren, bodyChildren }) => {
  const [show, setShow] = useState(true);
  return (
    <Drawer.Root direction="right" modal={false} open={show} handleOnly={true}>
      <div
        className="flex absolute top-[115px] items-center justify-center"
        style={{
          left: `calc(100% - ${show ? "354px" : "34px"})`,
          backgroundColor: theme === "light" ? "white" : "black",
          color: theme !== "light" ? "#fff" : "#212529",
          border: "1px solid #989898",
          borderRadius: "5px 0 0 5px",
          transition: `left 150ms ease-in`,
          zIndex: 1,
        }}
        onClick={() => setShow(!show)}
      >
        <Drawer.Trigger className="cursor-pointer relative h-15 w-8 flex-shrink-0 items-center justify-center overflow-hidden px-1 text-sm font-medium shadow-sm transition-all">
          {show ? <ChevronRight /> : <ChevronLeft />}
        </Drawer.Trigger>
      </div>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content
          className={`border-l-1 ${
            theme === "dark" ? "border-zinc-50 bg-black" : ""
          } right-0 top-15 bottom-2 fixed z-10 outline-none w-[320px] flex`}
          // The gap between the edge of the screen and the drawer is 8px in this case.
          style={{ "--initial-transform": "calc(100% + 8px)" }}
        >
          <div
            className={`${
              theme === "light" ? "bg-zinc-50" : ""
            } h-full w-full grow p-2 flex flex-col rounded-[5px]`}
          >
            <div className="max-w-md mx-auto">
              <Drawer.Title className="font-medium mb-2 text-zinc-900">
                {headerChildren}
              </Drawer.Title>
              <Drawer.Description className="text-zinc-600 mb-2">
                {bodyChildren}
              </Drawer.Description>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
};

export default VaulDrawer;
