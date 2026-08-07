import * as React from "react";
export interface FAQItem { q: string; a: React.ReactNode }
export interface FAQProps extends React.HTMLAttributes<HTMLDivElement> {
  items?: FAQItem[];
  /** Index open on mount; -1 for all closed. */
  defaultOpen?: number;
}
/**
 * Questions as rules, one open at a time.
 * @startingPoint section="Marketing" subtitle="Four questions, first open" viewport="900x420"
 */
export declare function FAQ(props: FAQProps): JSX.Element;
