"use client";

import React, { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
import { cn } from "@/lib/utils";
import { SymbolIcon } from "@radix-ui/react-icons";
import { Button, type ButtonProps } from "./ui/button";

export function SubmitButton({ children, className, ...args }: ButtonProps) {
  const state = useFormStatus();

  return (
    <Button disabled={state.pending} {...args} className={cn(` ${className}`)}>
      {/* {state.pending ? <SymbolIcon className="animate-spin" /> : children} */}
      {children}
      {state.pending && <SymbolIcon className="animate-spin" />}
    </Button>
  );
}
