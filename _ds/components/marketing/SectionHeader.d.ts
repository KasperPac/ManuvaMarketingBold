import * as React from "react";
export interface SectionHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  lede?: React.ReactNode;
  align?: "left" | "center";
  /** `onField` inherits currentColor for use on a marketing field. */
  tone?: "ink" | "onField";
  actions?: React.ReactNode;
}
/**
 * Marketing section opener. The app uses PageHeader instead.
 * @startingPoint section="Marketing" subtitle="Eyebrow, display headline, lede" viewport="820x260"
 */
export declare function SectionHeader(props: SectionHeaderProps): JSX.Element;
