import * as React from "react";
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Shipped API: default | success | warning | danger | info. Meaning is fixed. */
  variant?: "default" | "success" | "warning" | "danger" | "info";
  /** Alias accepted for convenience: neutral | ok | warn | danger | info. */
  tone?: "neutral" | "ok" | "warn" | "danger" | "info";
  size?: "sm" | "md";
  dot?: boolean;
}
/**
 * Status chip.
 * @startingPoint section="Data" subtitle="Status badges in every variant" viewport="700x120"
 */
export declare function StatusBadge(props: StatusBadgeProps): JSX.Element;
