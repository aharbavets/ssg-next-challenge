import { FunctionComponent, PropsWithChildren } from "react";
import classNames from "classnames";

type ButtonProps = {
  onClick?: VoidFunction;
  className?: string;
};

export const Button: FunctionComponent<PropsWithChildren<ButtonProps>> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <button
      type="button"
      className={classNames("px-2 py-1 border border-black", className)}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
