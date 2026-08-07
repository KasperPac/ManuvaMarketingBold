import * as React from "react";
export interface DialogProps extends React.HTMLAttributes<HTMLDivElement> {
  open?: boolean;
  /** Scope the scrim to the nearest positioned ancestor instead of the viewport. */
  inline?: boolean;
  title?: React.ReactNode;
  eyebrow?: React.ReactNode;
  footer?: React.ReactNode;
  width?: number;
  onClose?: () => void;
}
export declare function Dialog(props: DialogProps): JSX.Element | null;
