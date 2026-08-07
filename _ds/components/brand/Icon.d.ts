import * as React from "react";
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon name in kebab-case, e.g. "package", "factory", "truck". */
  name: string;
  /** Pixel box. 14 in tables, 16 in UI, 20 in nav, 24+ in marketing. */
  size?: number;
}
export declare function Icon(props: IconProps): JSX.Element;
