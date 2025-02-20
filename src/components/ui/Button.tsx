import { ButtonHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
    width?: "w-full" | "w-fit";
    iconLeft?: ReactNode;
    iconRight?: ReactNode;
}

const Button = ({ children, className, width = "w-full", iconLeft, iconRight, ...rest }: IProps) => {
    return (
        <button
            className={clsx(
                "p-2 flex items-center justify-center gap-2 rounded-md text-white cursor-pointer",
                width,
                className,
                "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 active:scale-95"
            )}
            {...rest}
        >
            {iconLeft}
            {children}
            {iconRight}
        </button>
    );
};

export default Button;