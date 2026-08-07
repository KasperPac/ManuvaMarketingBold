import * as React from "react";
export interface EmptyStateProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Optional big grey numeral — usually 0. */
  numeral?: React.ReactNode;
  title?: React.ReactNode;
  /** Shipped prop name. `body` is accepted as an alias. */
  message?: React.ReactNode;
  body?: React.ReactNode;
  action?: React.ReactNode;
  align?: "left" | "center";
}
/**
 * Zero state — required whenever a table or list has no rows.
 * @startingPoint section="Feedback" subtitle="Zero state with hero numeral" viewport="700x220"
 */
export declare function EmptyState(props: EmptyStateProps): JSX.Element;
