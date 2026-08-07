import * as React from "react";
export interface PricingPlan {
  name: string;
  price: React.ReactNode;
  period?: React.ReactNode;
  summary?: React.ReactNode;
  features?: string[];
  action?: React.ReactNode;
  /** Inverts the column to the ink field. At most one plan. */
  featured?: boolean;
}
export interface PricingTableProps extends React.HTMLAttributes<HTMLDivElement> {
  plans?: PricingPlan[];
  footnote?: React.ReactNode;
}
/**
 * Plan columns, one optionally featured.
 * @startingPoint section="Marketing" subtitle="Three plans, one featured" viewport="1100x560"
 */
export declare function PricingTable(props: PricingTableProps): JSX.Element;
