import { Handle, HandleProps } from "@xyflow/react";

import React from "react";
import { cn } from "../utils";

export const BaseHandle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & HandleProps
>(({ className, ...props }, ref) => (
  <Handle ref={ref} className={cn("", className)} {...props} />
));
BaseHandle.displayName = "BaseHandle";