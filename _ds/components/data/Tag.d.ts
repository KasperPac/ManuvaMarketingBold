import * as React from "react";
export interface TagProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Tint with the surrounding data-domain accent. */
  accent?: boolean;
  onDismiss?: () => void;
}
export declare function Tag(props: TagProps): JSX.Element;
