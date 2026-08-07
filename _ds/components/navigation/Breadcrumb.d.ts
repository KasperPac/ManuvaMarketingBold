import * as React from "react";
export interface BreadcrumbItem { label: React.ReactNode; href?: string }
export interface BreadcrumbProps extends React.HTMLAttributes<HTMLElement> { items: BreadcrumbItem[] }
export declare function Breadcrumb(props: BreadcrumbProps): JSX.Element;
