import * as React from "react";
export interface FieldProps {
  label?: React.ReactNode; hint?: React.ReactNode; error?: React.ReactNode;
  required?: boolean; htmlFor?: string; children?: React.ReactNode; style?: React.CSSProperties;
}
export declare function Field(props: FieldProps): JSX.Element;
