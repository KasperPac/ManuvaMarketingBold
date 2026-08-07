import * as React from "react";
export interface ToastProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "neutral" | "ok" | "warn" | "danger" | "info";
  title?: React.ReactNode;
  detail?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
}
export declare function Toast(props: ToastProps): JSX.Element;
