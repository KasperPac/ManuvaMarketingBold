import * as React from "react";
export interface TopBarProps extends React.HTMLAttributes<HTMLElement> {
  title?: React.ReactNode;
  /** Uppercase module label, tinted with the domain accent. */
  eyebrow?: React.ReactNode;
  domain?: "inventory" | "products" | "production" | "purchasing" | "logistics" | "audit";
  search?: React.ReactNode;
  actions?: React.ReactNode;
  tabs?: React.ReactNode;
}
export declare function TopBar(props: TopBarProps): JSX.Element;
