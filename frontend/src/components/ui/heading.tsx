import { cn } from "@/lib/utils";
import React from "react";
export const Heading = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "z-10 bg-clip-text text-transparent bg-gradient-to-b from-textmain to-tertiary font-bold text-center",
        className,
      )}
    >
      {children}
    </div>
  );
};
