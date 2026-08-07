import * as React from "react";
export interface CardProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  action?: React.ReactNode;
  padding?: string;
  /** 0 = flat (default). 1-4 map to --shadow-1..4; reserve 3+ for overlays. */
  elevation?: 0 | 1 | 2 | 3 | 4;
  /** 3px domain-accent rule across the top edge. */
  accentBar?: boolean;
}
export declare function Card(props: CardProps): JSX.Element;
