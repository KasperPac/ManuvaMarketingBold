import * as React from "react";
export interface DataTableColumn {
  key: string;
  header: React.ReactNode;
  align?: "left" | "right" | "center";
  width?: number | string;
  /** Render in IBM Plex Mono at 12px — SKUs, lot codes, references. */
  mono?: boolean;
  muted?: boolean;
  render?: (row: any) => React.ReactNode;
}
export interface DataTableProps extends React.HTMLAttributes<HTMLDivElement> {
  columns: DataTableColumn[];
  rows: any[];
  /** compact 28px / default 34px / comfy 44px (floor terminals). */
  density?: "compact" | "default" | "comfy";
  selectable?: boolean;
  selected?: Array<string | number>;
  onToggle?: (key: string | number) => void;
  onToggleAll?: React.ChangeEventHandler<HTMLInputElement>;
  rowKey?: string;
  empty?: React.ReactNode;
}
/**
 * The dense working table.
 * @startingPoint section="Data" subtitle="Dense inventory table with selection" viewport="900x300"
 */
export declare function DataTable(props: DataTableProps): JSX.Element;
