import * as React from "react";
export interface MetricProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The number. Always tabular. Never wrap it in a sentence. */
  value: React.ReactNode;
  /** Unit, set small and uppercase beside the numeral: "ea", "days", "%". */
  unit?: React.ReactNode;
  /** Eyebrow above the number — uppercase, 11px. */
  label?: React.ReactNode;
  /** Signed change string, e.g. "+12 vs last week". */
  delta?: string;
  tone?: "neutral" | "accent" | "ok" | "warn" | "danger";
  /** sm/md are for app cards; lg/xl/hero are poster sizes. */
  size?: "sm" | "md" | "lg" | "xl" | "hero";
  align?: "left" | "right";
  /** Trims the numeral's leading so the digits crop tight to the box. */
  crop?: boolean;
}
/**
 * The hero-numeral device.
 * @startingPoint section="Brand" subtitle="Oversized numerals with label and unit" viewport="700x220"
 */
export declare function Metric(props: MetricProps): JSX.Element;
