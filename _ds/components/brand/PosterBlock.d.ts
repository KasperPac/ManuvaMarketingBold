import * as React from "react";
export interface PosterBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The hero number. Rendered twice: once cropped as a watermark, once live. */
  numeral?: React.ReactNode;
  unit?: React.ReactNode;
  eyebrow?: React.ReactNode;
  headline?: React.ReactNode;
  body?: React.ReactNode;
  footer?: React.ReactNode;
  /** Panel fill. `accent` follows the surrounding data-domain; the named
   *  fields are the marketing palette and carry their own AA-safe ink. */
  fill?: "ink" | "brand" | "accent" | "paper" | "cobalt" | "violet" | "flare" | "amber" | "mint" | "aqua";
  invert?: boolean;
  /** CSS aspect-ratio string, e.g. "1200/630" for an OG card. */
  ratio?: string;
  align?: "left" | "center";
}
/**
 * The Manuva poster device.
 * @startingPoint section="Brand" subtitle="Full-bleed poster panel with cropped numeral" viewport="700x400"
 */
export declare function PosterBlock(props: PosterBlockProps): JSX.Element;
