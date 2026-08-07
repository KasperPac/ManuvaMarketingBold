import * as React from "react";
export interface SideNavItem {
  value: string; label: React.ReactNode; icon?: React.ReactNode; count?: number;
  /** Domain key — sets the active accent bar colour. */
  domain?: "inventory" | "products" | "production" | "purchasing" | "logistics" | "audit";
}
export interface SideNavSection { label?: React.ReactNode; items: SideNavItem[] }
export interface SideNavProps extends React.HTMLAttributes<HTMLElement> {
  sections: SideNavSection[];
  value?: string;
  onChange?: (value: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
}
export declare function SideNav(props: SideNavProps): JSX.Element;
