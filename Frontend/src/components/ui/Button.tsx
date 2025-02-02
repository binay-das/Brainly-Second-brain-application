import { ReactElement } from "react";

type Variants = "primary" | "secondary";
type Sizes = "sm" | "md" | "lg";

interface ButtonProps {
  variant: Variants;
  size: Sizes;
  text: string;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
}

const variantStyles = {
  primary: "bg-[#4a46dd] text-[#d3d6ff]",
  secondary: "bg-[#dbe5fb] text-[#4f538d]",
};
const sizeStyles = {
  sm: "px-2 py-1",
  md: "px-4 py-2",
  lg: "px-6 py-3",
};
const commonStyles = 'flex gap-2 justify-center items-center rounded cursor-pointer';

export const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${commonStyles} ${variantStyles[props.variant]} ${sizeStyles[props.size]}`}
      onClick={props.onClick}
    >
      {props.startIcon}
      {props.text}
      {props.endIcon}
    </button>
  );
};
