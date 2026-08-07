import * as React from "react";
export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number; max?: number;
  tone?: "accent" | "ok" | "warn" | "danger" | "info";
  height?: number;
  label?: React.ReactNode;
  showValue?: boolean;
}
export declare function ProgressBar(props: ProgressBarProps): JSX.Element;
