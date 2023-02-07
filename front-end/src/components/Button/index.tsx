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
    className={` my-button ${classProps}`}
    {...rest}
  >
    {icon}
    {text}
  </button>
);
