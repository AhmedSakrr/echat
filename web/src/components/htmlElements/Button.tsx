import React, { ButtonHTMLAttributes } from "react";
import { Loading } from "../utils/Loading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
  text: string;
  icon?: string;
  className?: string;
};

export const Button: React.FC<ButtonProps> = ({
  loading = false,
  icon,
  text,
  className = "",
  ...props
}) => {
  return loading ? (
    <Loading />
  ) : (
    <button
      {...props}
      className={`${className} flex justify-center  items-center py-2 px-20 border border-opacity-25 rounded-lg shadow-sm text-sm font-medium text-white bg-purple hover:bg-purple-dark `}
    >
      {icon && <FontAwesomeIcon className="mr-1" icon={icon as any} />}
      {text}
    </button>
  );
};
