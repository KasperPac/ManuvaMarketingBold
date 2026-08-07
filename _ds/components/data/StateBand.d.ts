import * as React from "react";
export interface StateBandProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Module the band reports for — paints `--accent-loud` / `--accent-on`. */
  domain?: "inventory" | "products" | "production" | "purchasing" | "logistics" | "audit";
  /** `domain` is a module reporting; `notice` is the lime system band (Manuva speaking); `ink` is neutral. */
  tone?: "domain" | "notice" | "ink";
  eyebrow?: React.ReactNode;
  title?: React.ReactNode;
  /** The one number. Rendered in the display numeral. */
  metric?: React.ReactNode;
  unit?: React.ReactNode;
  actions?: React.ReactNode;
}
/**
 * The page's one number, in a solid field under the topbar.
 * @startingPoint section="Data" subtitle="Domain, notice and ink bands" viewport="820x260"
 */
export declare function StateBand(props: StateBandProps): JSX.Element;
