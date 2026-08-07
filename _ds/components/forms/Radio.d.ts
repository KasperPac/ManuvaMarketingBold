import * as React from "react";
export interface RadioProps {
  checked?: boolean; disabled?: boolean; name?: string; value?: string;
  label?: React.ReactNode; description?: React.ReactNode;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  style?: React.CSSProperties;
}
export declare function Radio(props: RadioProps): JSX.Element;
