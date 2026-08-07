import * as React from "react";
export interface BannerProps extends React.HTMLAttributes<HTMLDivElement> {
  tone?: "neutral" | "ok" | "warn" | "danger" | "info";
  title?: React.ReactNode;
  action?: React.ReactNode;
  onClose?: () => void;
}
export declare function Banner(props: BannerProps): JSX.Element;
