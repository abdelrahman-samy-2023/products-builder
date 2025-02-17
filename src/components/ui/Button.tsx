import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    width?: "w-full" | "w-fit";
}

const Button = ({ children, className, width = "w-full", ...rest }: IProps) => {
    return (
        <button 
            className={clsx("p-2 rounded-md text-white cursor-pointer", width, className)} 
            {...rest}
        >
            {children}
        </button>
    );
};

export default Button;