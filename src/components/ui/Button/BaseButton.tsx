"use client";

import { Button, type ButtonProps } from "@chakra-ui/react";

interface BaseButtonProps extends ButtonProps {
  text?: React.ReactNode;
}

export default function BaseButton({
  colorPalette = "brand",
  size = "md",
  rounded = "lg",
  text,
  children,
  ...props
}: BaseButtonProps) {
  return (
    <Button colorPalette={colorPalette} size={size} rounded={rounded} {...props}>
      {text ?? children}
    </Button>
  );
}
