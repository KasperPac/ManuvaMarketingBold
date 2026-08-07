import * as React from "react";
export interface TestimonialProps extends React.HTMLAttributes<HTMLElement> {
  quote?: React.ReactNode;
  name?: React.ReactNode;
  role?: React.ReactNode;
  company?: React.ReactNode;
  /** The number the customer can point at. Leads the quote when present. */
  metric?: React.ReactNode;
  unit?: React.ReactNode;
  /** Render on a marketing field instead of a card. */
  field?: "cobalt" | "violet" | "flare" | "amber" | "mint" | "aqua" | "ink";
}
/**
 * One attributed quote, optionally led by a metric.
 * @startingPoint section="Marketing" subtitle="Card and field treatments" viewport="900x420"
 */
export declare function Testimonial(props: TestimonialProps): JSX.Element;
