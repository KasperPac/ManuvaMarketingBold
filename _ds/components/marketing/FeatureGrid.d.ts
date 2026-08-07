import * as React from "react";
export interface FeatureGridItem {
  title: React.ReactNode;
  body?: React.ReactNode;
  icon?: React.ReactNode;
  /** Pin a field instead of taking the rotation — use when the tile IS a product module. */
  field?: "cobalt" | "violet" | "flare" | "amber" | "mint" | "aqua";
}
export interface FeatureGridProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: FeatureGridItem[];
  columns?: number;
  numbered?: boolean;
}
/**
 * Field tiles, one per feature. Colour rotates for rhythm.
 * @startingPoint section="Marketing" subtitle="Six field tiles" viewport="1100x620"
 */
export declare function FeatureGrid(props: FeatureGridProps): JSX.Element;
