import * as React from "react";
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual weight. `ink` is the marketing/poster button; `accent` follows the surrounding data-domain. */
  variant?: "primary" | "secondary" | "ghost" | "danger" | "ink" | "accent";
  /** sm/md/lg are app sizes; xl is for marketing CTAs only. */
  size?: "sm" | "md" | "lg" | "xl";
  /** `pill` is the loud-layer shape — marketing CTAs, onboarding, posters. The app stays `default`. */
  shape?: "default" | "pill";
  /** Render as an anchor so a loud-layer CTA can be a real link. */
  as?: "button" | "a";
  block?: boolean;
  loading?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}
/**
 * The Manuva action control.
 * @startingPoint section="Forms" subtitle="Buttons in every variant and size" viewport="700x150"
 */
export declare function Button(props: ButtonProps): JSX.Element;
