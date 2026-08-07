import * as React from "react";
export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: "sm" | "md" | "lg";
  variant?: "ghost" | "outline" | "solid";
  /** Required — becomes aria-label and the tooltip. */
  label: string;
  active?: boolean;
}
export declare function IconButton(props: IconButtonProps): JSX.Element;
