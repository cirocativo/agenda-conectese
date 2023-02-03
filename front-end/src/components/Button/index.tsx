import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";

interface IButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  text: string;
  classProps?: string;
  onClick?: () => void;
  icon?: ReactNode;
}

export const Button = ({
  text,
  classProps,
  onClick,
  icon,
  type,
  ...rest
}: IButtonProps) => (
  <button
    type={type}
    onClick={onClick}
    className={`mb-5 mt-10 p-2 w-80 h-12 border-2 rounded-lg flex gap-2 items-center justify-center font-bold hover:scale-105 transition-all ${classProps}`}
    {...rest}
  >
    {icon}
    {text}
  </button>
);
