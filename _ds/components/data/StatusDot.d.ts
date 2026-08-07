import * as React from "react";
export interface StatusDotProps extends React.HTMLAttributes<HTMLSpanElement> {
  tone?: "neutral" | "ok" | "warn" | "danger" | "info";
  label?: React.ReactNode;
  /** Slow pulse — reserved for genuinely live data. */
  live?: boolean;
  size?: number;
}
export declare function StatusDot(props: StatusDotProps): JSX.Element;
