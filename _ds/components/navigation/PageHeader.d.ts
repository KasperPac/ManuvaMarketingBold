import * as React from "react";
export interface Crumb { label: React.ReactNode; href?: string }
export interface PageHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section name from the eyebrow taxonomy — Products | Operations | Logistics | Orders | Admin | Audit. Required in the app. */
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  /** Detail pages only — replaces the eyebrow in display. */
  breadcrumbs?: Crumb[];
  actions?: React.ReactNode;
  /** Tints the eyebrow pill with a module accent. */
  domain?: "inventory" | "products" | "production" | "purchasing" | "logistics" | "audit";
}
/**
 * The required page header.
 * @startingPoint section="Navigation" subtitle="Eyebrow pill, display title, actions" viewport="700x200"
 */
export declare function PageHeader(props: PageHeaderProps): JSX.Element;
