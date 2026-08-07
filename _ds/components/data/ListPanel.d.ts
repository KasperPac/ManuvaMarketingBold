import * as React from "react";
export interface ListPanelProps extends React.HTMLAttributes<HTMLElement> {
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  /** Optional header row: { template: "2fr 1fr 1fr", labels: ["SKU","Qty","Status"] }. */
  columns?: { template: string; labels: React.ReactNode[] };
}
export interface ListRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** grid-template-columns — must match the panel's columns.template. */
  template?: string;
}
export declare function ListPanel(props: ListPanelProps): JSX.Element;
export declare function ListRow(props: ListRowProps): JSX.Element;
