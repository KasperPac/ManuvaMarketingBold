import * as React from "react";
export interface TabItem { value: string; label: React.ReactNode; count?: number }
export interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  items: TabItem[];
  value?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md";
}
export declare function Tabs(props: TabsProps): JSX.Element;
