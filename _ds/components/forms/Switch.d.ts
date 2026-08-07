import * as React from "react";
export interface SwitchProps {
  checked?: boolean; disabled?: boolean; size?: "sm" | "md";
  label?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
}
export declare function Switch(props: SwitchProps): JSX.Element;
