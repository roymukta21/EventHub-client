"use client";

import { GripVerticalIcon } from "lucide-react";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-explicit-any
const { PanelGroup, Panel, PanelResizeHandle } = require("react-resizable-panels") as any;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ResizablePanelGroup({ className, ...props }: any) {
  return (
    <PanelGroup
      className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
      {...props}
    />
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ResizablePanel({ ...props }: any) {
  return <Panel {...props} />;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function ResizableHandle({ withHandle, className, ...props }: any) {
  return (
    <PanelResizeHandle
      className={cn(
        "bg-border relative flex w-px items-center justify-center after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:-translate-y-1/2 data-[panel-group-direction=vertical]:after:translate-x-0",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="bg-border z-10 flex h-4 w-3 items-center justify-center rounded-sm border">
          <GripVerticalIcon className="size-2.5" />
        </div>
      )}
    </PanelResizeHandle>
  );
}

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };