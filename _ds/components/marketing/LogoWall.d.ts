import * as React from "react";
export interface LogoWallLogo {
  name: string;
  /** URL to a single-colour SVG — it is used as a mask, so its own fill is ignored. */
  src: string;
  height?: number;
}
export interface LogoWallProps extends React.HTMLAttributes<HTMLDivElement> {
  logos?: LogoWallLogo[];
  label?: React.ReactNode;
  columns?: number;
  tone?: "ink" | "onField";
}
/**
 * Customer proof, masked to one ink.
 * @startingPoint section="Marketing" subtitle="Five customer logos" viewport="900x180"
 */
export declare function LogoWall(props: LogoWallProps): JSX.Element;
