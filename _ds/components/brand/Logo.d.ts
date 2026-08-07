import * as React from "react";
export interface LogoProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "lockup" | "mark" | "wordmark";
  /** Height in px. Minimum: lockup 18px, mark 14px on screen. */
  height?: number;
  /** Path prefix to the project root, e.g. "../../" from a nested page. */
  base?: string;
}
/**
 * The Manuva identity.
 * @startingPoint section="Brand" subtitle="Lockup, mark and wordmark" viewport="700x150"
 */
export declare function Logo(props: LogoProps): JSX.Element;
