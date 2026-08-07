import * as React from "react";
export interface HelpLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  /** Help article slug, e.g. "purchasing/create-po". */
  slug?: string;
  label?: React.ReactNode;
}
export declare function HelpLink(props: HelpLinkProps): JSX.Element;
