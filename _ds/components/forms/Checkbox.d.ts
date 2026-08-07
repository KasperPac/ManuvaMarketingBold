import * as React from "react";
export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> {
  checked?: boolean;
  /** Mixed state — used by table select-all headers. */
  indeterminate?: boolean;
  label?: React.ReactNode;
}
export declare function Checkbox(props: CheckboxProps): JSX.Element;
