import * as React from "react";
export interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size" | "prefix"> {
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  /** Use IBM Plex Mono — for SKUs, lot numbers, order references. */
  mono?: boolean;
  prefix?: React.ReactNode;
  /** Unit suffix, e.g. "kg", "ea". */
  suffix?: React.ReactNode;
  align?: "left" | "right";
}
export declare function Input(props: InputProps): JSX.Element;
