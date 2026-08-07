/* @ds-bundle: {"format":4,"namespace":"ManuvaDesignSystem_169665","components":[{"name":"Icon","sourcePath":"components/brand/Icon.jsx"},{"name":"Logo","sourcePath":"components/brand/Logo.jsx"},{"name":"Metric","sourcePath":"components/brand/Metric.jsx"},{"name":"PosterBlock","sourcePath":"components/brand/PosterBlock.jsx"},{"name":"Card","sourcePath":"components/data/Card.jsx"},{"name":"DataTable","sourcePath":"components/data/DataTable.jsx"},{"name":"ListPanel","sourcePath":"components/data/ListPanel.jsx"},{"name":"ListRow","sourcePath":"components/data/ListPanel.jsx"},{"name":"ProgressBar","sourcePath":"components/data/ProgressBar.jsx"},{"name":"StateBand","sourcePath":"components/data/StateBand.jsx"},{"name":"StatusBadge","sourcePath":"components/data/StatusBadge.jsx"},{"name":"StatusDot","sourcePath":"components/data/StatusDot.jsx"},{"name":"Tag","sourcePath":"components/data/Tag.jsx"},{"name":"Banner","sourcePath":"components/feedback/Banner.jsx"},{"name":"Dialog","sourcePath":"components/feedback/Dialog.jsx"},{"name":"EmptyState","sourcePath":"components/feedback/EmptyState.jsx"},{"name":"Toast","sourcePath":"components/feedback/Toast.jsx"},{"name":"Tooltip","sourcePath":"components/feedback/Tooltip.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Radio","sourcePath":"components/forms/Radio.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Textarea","sourcePath":"components/forms/Textarea.jsx"},{"name":"FAQ","sourcePath":"components/marketing/FAQ.jsx"},{"name":"FeatureGrid","sourcePath":"components/marketing/FeatureGrid.jsx"},{"name":"LogoWall","sourcePath":"components/marketing/LogoWall.jsx"},{"name":"PricingTable","sourcePath":"components/marketing/PricingTable.jsx"},{"name":"SectionHeader","sourcePath":"components/marketing/SectionHeader.jsx"},{"name":"Testimonial","sourcePath":"components/marketing/Testimonial.jsx"},{"name":"Breadcrumb","sourcePath":"components/navigation/Breadcrumb.jsx"},{"name":"HelpLink","sourcePath":"components/navigation/HelpLink.jsx"},{"name":"PageHeader","sourcePath":"components/navigation/PageHeader.jsx"},{"name":"SideNav","sourcePath":"components/navigation/SideNav.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"},{"name":"TopBar","sourcePath":"components/navigation/TopBar.jsx"}],"sourceHashes":{"components/brand/Icon.jsx":"226ae72c2a31","components/brand/Logo.jsx":"a189e4cd606a","components/brand/Metric.jsx":"c214aafb3d6f","components/brand/PosterBlock.jsx":"bcd8c6a564ce","components/data/Card.jsx":"b8aaf4081d1c","components/data/DataTable.jsx":"3d59a81540a2","components/data/ListPanel.jsx":"8598c5663fe1","components/data/ProgressBar.jsx":"793071205638","components/data/StateBand.jsx":"199ea73ddabd","components/data/StatusBadge.jsx":"98e1480d317e","components/data/StatusDot.jsx":"5dfde3a85aaa","components/data/Tag.jsx":"99e0b3bda667","components/feedback/Banner.jsx":"73461d367ffe","components/feedback/Dialog.jsx":"ca7f253cf7aa","components/feedback/EmptyState.jsx":"32737141fd31","components/feedback/Toast.jsx":"e7532612d6f0","components/feedback/Tooltip.jsx":"912ab38d481f","components/forms/Button.jsx":"cc2fb46f9107","components/forms/Checkbox.jsx":"91565cb5a423","components/forms/Field.jsx":"c4220a800155","components/forms/IconButton.jsx":"44f8cc536e88","components/forms/Input.jsx":"e2338943fefd","components/forms/Radio.jsx":"43a4e13fc860","components/forms/Select.jsx":"3d784961a406","components/forms/Switch.jsx":"d43a761662b0","components/forms/Textarea.jsx":"d4f1b2b44fdc","components/marketing/FAQ.jsx":"6dfeb9a9e081","components/marketing/FeatureGrid.jsx":"8af2d3e6f484","components/marketing/LogoWall.jsx":"fab48961569a","components/marketing/PricingTable.jsx":"7e3f11b3e744","components/marketing/SectionHeader.jsx":"b5ca5381691a","components/marketing/Testimonial.jsx":"2e1c3ea58c64","components/navigation/Breadcrumb.jsx":"38ce01a1f622","components/navigation/HelpLink.jsx":"6b6dcff6d100","components/navigation/PageHeader.jsx":"ac9103dbd159","components/navigation/SideNav.jsx":"be7cb52026a1","components/navigation/Tabs.jsx":"d1d8a360c0f5","components/navigation/TopBar.jsx":"6244e530626f","ui_kits/app/Dashboard.jsx":"1fa729129ac5","ui_kits/app/Inventory.jsx":"748b7cf74b80","ui_kits/app/Production.jsx":"e42743bd7b97","ui_kits/app/Purchasing.jsx":"01bda3b4afc9","ui_kits/app/Shell.jsx":"488221553d05","ui_kits/app/data.js":"cdaa02a54de1","ui_kits/app/doc-page.js":"371bab66f42d","ui_kits/marketing/Alternative.jsx":"501261f02a76","ui_kits/marketing/Customers.jsx":"7cd837f5e6b8","ui_kits/marketing/Landing.jsx":"498edeb56b24","ui_kits/marketing/Pricing.jsx":"2fa1db24dec9","ui_kits/marketing/image-slot.js":"fff26d081c8d"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.ManuvaDesignSystem_169665 = window.ManuvaDesignSystem_169665 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/brand/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Lucide glyph rendered as a currentColor mask. No local sprite ships with
 *  this system — see readme.md ICONOGRAPHY for the substitution note. */
const CDN = "https://cdn.jsdelivr.net/npm/lucide-static@0.544.0/icons/";
function Icon({
  name,
  size = 16,
  strokeWidth,
  style,
  ...rest
}) {
  const url = `url("${CDN}${name}.svg")`;
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true",
    "data-icon": name
  }, rest, {
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flexShrink: 0,
      backgroundColor: "currentColor",
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon, __ds_default_components_brand_Icon_1q8wa2h: Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Icon.jsx", error: String((e && e.message) || e) }); }

// components/brand/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The Manuva lockup, mark, or wordmark. Inherits currentColor. */
function Logo({
  variant = "lockup",
  height = 28,
  base = "",
  title = "Manuva",
  style,
  ...rest
}) {
  const src = `${base}assets/logo-${variant === "lockup" ? "lockup" : variant === "mark" ? "mark" : "wordmark"}.svg`;
  const ratio = variant === "lockup" ? 2189.357 / 482.347 : variant === "mark" ? 741.242 / 482.347 : 1361.115 / 243.403;
  return /*#__PURE__*/React.createElement("span", _extends({
    role: "img",
    "aria-label": title
  }, rest, {
    style: {
      display: "inline-block",
      height,
      width: height * ratio,
      backgroundColor: "currentColor",
      WebkitMaskImage: `url("${src}")`,
      maskImage: `url("${src}")`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Logo, __ds_default_components_brand_Logo_1q8yv4x: Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Logo.jsx", error: String((e && e.message) || e) }); }

// components/brand/Metric.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: "var(--fs-display-1)",
  md: "var(--fs-display-2)",
  lg: "var(--fs-display-4)",
  xl: "var(--fs-display-6)",
  hero: "var(--fs-display-8)"
};
/** The Manuva numeral device: the number is the headline, the label is the caption. */
function Metric({
  value,
  unit,
  label,
  delta,
  tone = "neutral",
  size = "md",
  align = "left",
  crop = false,
  style,
  ...rest
}) {
  const toneColor = tone === "accent" ? "var(--accent-loud)" : tone === "ok" ? "var(--ok)" : tone === "warn" ? "var(--warning)" : tone === "danger" ? "var(--danger)" : "var(--ink-strong)";
  const big = size === "hero" || size === "xl";
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "grid",
      gap: big ? "var(--space-2)" : "var(--space-1)",
      justifyItems: align === "right" ? "end" : "start",
      textAlign: align,
      overflow: crop ? "hidden" : undefined,
      ...style
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    className: "mv-key",
    style: {
      color: "var(--ink-faint)"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: big ? "var(--space-2)" : "var(--space-1)",
      marginBlock: crop ? "-0.14em" : undefined
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mv-numeral",
    style: {
      fontSize: SIZES[size] || SIZES.md,
      color: toneColor
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-body)",
      fontWeight: "var(--fw-semibold)",
      fontSize: big ? "var(--fs-xl)" : "var(--fs-sm)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      color: "var(--ink-faint)"
    }
  }, unit)), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-mono)",
      fontSize: "var(--fs-sm)",
      color: delta.startsWith("-") ? "var(--danger)" : "var(--ok)"
    }
  }, delta));
}
Object.assign(__ds_scope, { Metric, __ds_default_components_brand_Metric_q9qbh0: Metric });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/Metric.jsx", error: String((e && e.message) || e) }); }

// components/brand/PosterBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The poster device: full-bleed panel, cropped hero numeral, hard edges.
 *  Advertising, OG cards, deck covers, campaign pages. Never inside the app. */
function PosterBlock({
  numeral,
  unit,
  eyebrow,
  headline,
  body,
  footer,
  invert = false,
  fill = "ink",
  ratio,
  align = "left",
  style,
  children,
  ...rest
}) {
  /* Marketing fields are first-class fills — the poster is a loud-layer device,
     so it reaches the same palette the site and social ads use. */
  const FIELDS = {
    cobalt: 1,
    violet: 1,
    flare: 1,
    amber: 1,
    mint: 1,
    aqua: 1
  };
  const isField = !!FIELDS[fill];
  const bg = isField ? `var(--field-${fill})` : fill === "ink" ? "var(--bg-ink)" : fill === "accent" ? "var(--accent-loud)" : fill === "brand" ? "var(--brand-1)" : "var(--bg-card)";
  const fg = isField ? `var(--on-${fill})` : fill === "paper" ? "var(--ink-strong)" : "#fff";
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      position: "relative",
      overflow: "hidden",
      background: bg,
      color: fg,
      borderRadius: "var(--radius-poster)",
      aspectRatio: ratio,
      padding: "var(--space-10)",
      display: "grid",
      alignContent: "space-between",
      gap: "var(--space-6)",
      textAlign: align,
      ...style
    }
  }), numeral != null && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    className: "mv-numeral",
    style: {
      position: "absolute",
      right: "-0.06em",
      bottom: "-0.22em",
      fontSize: "var(--fs-display-8)",
      lineHeight: .72,
      color: invert ? "rgb(255 255 255/.10)" : "rgb(255 255 255/.14)",
      pointerEvents: "none",
      userSelect: "none"
    }
  }, numeral), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gap: "var(--space-3)",
      justifyItems: align === "center" ? "center" : "start"
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "mv-eyebrow",
    style: {
      opacity: .72
    }
  }, eyebrow)), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "grid",
      gap: "var(--space-4)",
      justifyItems: align === "center" ? "center" : "start"
    }
  }, headline && /*#__PURE__*/React.createElement("h2", {
    className: "mv-display",
    style: {
      margin: 0,
      fontSize: "var(--fs-display-4)",
      maxWidth: "16ch"
    }
  }, headline), numeral != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-2)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mv-numeral",
    style: {
      fontSize: "var(--fs-display-6)"
    }
  }, numeral), unit && /*#__PURE__*/React.createElement("span", {
    className: "mv-eyebrow",
    style: {
      fontSize: "var(--fs-lg)",
      opacity: .7
    }
  }, unit)), body && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      maxWidth: "38ch",
      fontSize: "var(--fs-lg)",
      lineHeight: "var(--lh-normal)",
      opacity: .78,
      textWrap: "pretty"
    }
  }, body), children), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      borderTop: "var(--border-rule) solid currentColor",
      paddingTop: "var(--space-5)",
      opacity: .95
    }
  }, footer));
}
Object.assign(__ds_scope, { PosterBlock, __ds_default_components_brand_PosterBlock_xd0bmg: PosterBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/brand/PosterBlock.jsx", error: String((e && e.message) || e) }); }

// components/data/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Surface container. Flat by default — Manuva leans on strokes, not shadow. */
function Card({
  title,
  action,
  eyebrow,
  padding = "var(--space-6)",
  elevation = 0,
  accentBar = false,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      background: "var(--bg-card)",
      border: "1px solid var(--stroke-card)",
      borderRadius: "var(--radius-card)",
      boxShadow: elevation === 0 ? "none" : `var(--shadow-${elevation})`,
      overflow: "hidden",
      ...style
    }
  }), accentBar && /*#__PURE__*/React.createElement("div", {
    style: {
      height: "var(--border-rule)",
      background: "var(--accent-loud)"
    }
  }), (title || action || eyebrow) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: `var(--space-4) ${padding}`,
      borderBottom: "1px solid var(--stroke)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 2
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "mv-key"
  }, eyebrow), title && /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-md)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--ink-strong)",
      letterSpacing: "var(--ls-tight)"
    }
  }, title)), action), /*#__PURE__*/React.createElement("div", {
    style: {
      padding
    }
  }, children));
}
Object.assign(__ds_scope, { Card, __ds_default_components_data_Card_wz741p: Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Card.jsx", error: String((e && e.message) || e) }); }

// components/data/DataTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The dense working surface. Mirrors the shipped _ui/table.module.css:
 *  radius-xl card, --bg-card-alt header, 11px uppercase column keys,
 *  10px/16px header padding, 11px/16px cells, hairline --stroke rules,
 *  no zebra, last row unruled. */
function DataTable({
  columns = [],
  rows = [],
  density = "default",
  selectable = false,
  selected = [],
  onToggle,
  onToggleAll,
  rowKey = "id",
  empty,
  style,
  ...rest
}) {
  const pad = density === "compact" ? "8px 16px" : density === "comfy" ? "14px 16px" : "11px 16px";
  const allOn = selectable && rows.length > 0 && selected.length === rows.length;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      overflow: "auto",
      background: "var(--bg-card)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("table", {
    style: {
      width: "100%",
      borderCollapse: "collapse",
      fontFamily: "var(--font-body)",
      fontSize: "0.9rem"
    }
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, selectable && /*#__PURE__*/React.createElement("th", {
    style: {
      width: 40,
      padding: "10px 0 10px 16px",
      background: "var(--bg-card-alt)",
      borderBottom: "1px solid var(--stroke)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: allOn,
    onChange: onToggleAll,
    "aria-label": "Select all",
    style: {
      accentColor: "var(--brand-1)",
      width: 14,
      height: 14
    }
  })), columns.map(c => /*#__PURE__*/React.createElement("th", {
    key: c.key,
    style: {
      textAlign: c.align || "left",
      padding: "10px 16px",
      background: "var(--bg-card-alt)",
      borderBottom: "1px solid var(--stroke)",
      color: "var(--ink-muted)",
      fontWeight: 600,
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      whiteSpace: "nowrap",
      width: c.width,
      position: "sticky",
      top: 0,
      zIndex: 1
    }
  }, c.header)))), /*#__PURE__*/React.createElement("tbody", null, rows.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: columns.length + (selectable ? 1 : 0),
    style: {
      padding: "var(--space-6)"
    }
  }, empty)), rows.map((r, i) => {
    const key = r[rowKey] ?? i,
      on = selected.includes(key),
      last = i === rows.length - 1;
    return /*#__PURE__*/React.createElement("tr", {
      key: key,
      className: "mv-row",
      "data-on": on || undefined,
      style: {
        background: on ? "var(--brand-dim)" : "transparent"
      }
    }, selectable && /*#__PURE__*/React.createElement("td", {
      style: {
        padding: pad,
        paddingRight: 0,
        paddingLeft: 16,
        borderBottom: last ? "none" : "1px solid var(--stroke)"
      }
    }, /*#__PURE__*/React.createElement("input", {
      type: "checkbox",
      checked: on,
      onChange: () => onToggle && onToggle(key),
      "aria-label": "Select row",
      style: {
        accentColor: "var(--brand-1)",
        width: 14,
        height: 14
      }
    })), columns.map(c => /*#__PURE__*/React.createElement("td", {
      key: c.key,
      style: {
        padding: pad,
        textAlign: c.align || "left",
        verticalAlign: "middle",
        borderBottom: last ? "none" : "1px solid var(--stroke)",
        color: c.muted ? "var(--ink-muted)" : "var(--ink-strong)",
        fontFamily: c.mono ? "var(--font-mono)" : undefined,
        fontSize: c.mono ? "var(--fs-sm)" : undefined,
        fontVariantNumeric: c.align === "right" || c.mono ? "tabular-nums" : undefined,
        whiteSpace: "nowrap"
      }
    }, c.render ? c.render(r) : r[c.key])));
  }))), /*#__PURE__*/React.createElement("style", null, ".mv-row:hover td{background:var(--surface-hover)}.mv-row[data-on] td{background:var(--brand-dim)}"));
}
Object.assign(__ds_scope, { DataTable, __ds_default_components_data_DataTable_mk9kjp: DataTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/DataTable.jsx", error: String((e && e.message) || e) }); }

// components/data/ListPanel.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Card panel with an eyebrow/title header and a stack of rows.
 *  Mirrors the shipped _ui/list-panel: 22px padding, radius-xl, shadow-card. */
function ListPanel({
  eyebrow,
  title,
  description,
  action,
  columns,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "var(--space-4)",
      padding: "22px",
      border: "1px solid var(--stroke-card)",
      borderRadius: "var(--radius-xl)",
      background: "var(--bg-card)",
      boxShadow: "var(--shadow-card)",
      ...style
    }
  }), (eyebrow || title || action) && /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "14px"
    }
  }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 6px",
      fontSize: "var(--fs-xs)",
      fontWeight: "var(--fw-bold)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--ink-faint)"
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      color: "var(--ink-strong)",
      fontSize: "var(--fs-lg)",
      fontWeight: "var(--fw-bold)"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "8px 0 0",
      color: "var(--ink-muted)",
      fontSize: "var(--fs-base)",
      lineHeight: "var(--lh-snug)"
    }
  }, description)), action && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "12px",
      flexWrap: "wrap"
    }
  }, action)), columns && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "12px",
      alignItems: "center",
      gridTemplateColumns: columns.template,
      padding: "10px 16px",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-card-alt)",
      borderBottom: "1px solid var(--stroke)",
      color: "var(--ink-muted)",
      fontWeight: "var(--fw-semibold)",
      fontSize: "11px",
      textTransform: "uppercase",
      letterSpacing: "0.05em"
    }
  }, columns.labels.map((l, i) => /*#__PURE__*/React.createElement("span", {
    key: i
  }, l))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexDirection: "column",
      gap: "10px"
    }
  }, children));
}
/** A row inside a ListPanel — surface-1 fill, radius-lg, hover tint. */
function ListRow({
  template,
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    className: "mv-lrow"
  }, rest, {
    style: {
      display: "grid",
      gap: "12px",
      alignItems: "center",
      gridTemplateColumns: template,
      padding: "14px 16px",
      borderRadius: "var(--radius-lg)",
      background: "var(--surface-1)",
      border: "1px solid var(--stroke-card)",
      fontSize: "var(--fs-base)",
      color: "var(--ink-strong)",
      transition: "background var(--dur-base) var(--ease-out)",
      ...style
    }
  }), children, /*#__PURE__*/React.createElement("style", null, ".mv-lrow:hover{background:var(--surface-hover)}"));
}
Object.assign(__ds_scope, { ListPanel, ListRow, __ds_default_components_data_ListPanel_f2n0z3: ListPanel });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ListPanel.jsx", error: String((e && e.message) || e) }); }

// components/data/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE = {
  default: ["var(--surface-1)", "var(--ink-muted)", "var(--ink-faint)"],
  neutral: ["var(--surface-1)", "var(--ink-muted)", "var(--ink-faint)"],
  success: ["var(--ok-dim)", "var(--ok)", "var(--ok-dot)"],
  ok: ["var(--ok-dim)", "var(--ok)", "var(--ok-dot)"],
  warning: ["var(--warning-dim)", "var(--warning)", "var(--warning-dot)"],
  warn: ["var(--warning-dim)", "var(--warning)", "var(--warning-dot)"],
  danger: ["var(--danger-dim)", "var(--danger)", "var(--danger-dot)"],
  info: ["var(--info-dim)", "var(--info)", "var(--info-dot)"]
};
/** Square-ended completion bar for job progress and stock coverage. */
function ProgressBar({
  value = 0,
  max = 100,
  tone = "accent",
  height = 6,
  label,
  showValue = false,
  style,
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fill = tone === "accent" ? "var(--accent-loud)" : (TONE[tone] || TONE.default)[2];
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "grid",
      gap: 6,
      ...style
    }
  }), (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      gap: 8,
      fontSize: "var(--fs-sm)",
      color: "var(--ink-faint)"
    }
  }, /*#__PURE__*/React.createElement("span", null, label), showValue && /*#__PURE__*/React.createElement("span", {
    className: "mv-tnum",
    style: {
      color: "var(--ink-strong)"
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      height,
      background: "var(--surface-1)",
      borderRadius: "var(--radius-2)",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: "100%",
      background: fill,
      transition: "width var(--dur-slow) var(--ease-out)"
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar, __ds_default_components_data_ProgressBar_1iaejjh: ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/data/StateBand.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** The state band. Carries the page's one number in a solid field, directly
 *  under the topbar and above the calm working surface — the in-app form of
 *  the transactional email's header band.
 *
 *  Colour keeps its domain meaning here: `domain` paints --accent-loud with
 *  the matching --accent-on ink. `tone="notice"` is the lime system band,
 *  reserved for Manuva speaking rather than a module reporting. */
function StateBand({
  domain,
  tone = "domain",
  eyebrow,
  title,
  metric,
  unit,
  actions,
  style,
  ...rest
}) {
  const field = tone === "notice" ? "var(--field-lime)" : tone === "ink" ? "var(--field-ink)" : "var(--accent-loud)";
  const ink = tone === "notice" ? "var(--on-lime)" : tone === "ink" ? "var(--on-ink)" : "var(--accent-on)";
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-domain": tone === "domain" ? domain : undefined
  }, rest, {
    style: {
      background: field,
      color: ink,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "var(--space-6)",
      flexWrap: "wrap",
      padding: "var(--space-4) var(--space-6)",
      borderRadius: "var(--radius-2)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: "var(--space-4)",
      minWidth: 0
    }
  }, metric != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 3,
      flex: "none"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mv-numeral",
    style: {
      fontSize: "var(--fs-display-1)"
    }
  }, metric), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-md)",
      fontWeight: "var(--fw-bold)",
      opacity: .66
    }
  }, unit)), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      gap: 2,
      minWidth: 0
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "mv-eyebrow",
    style: {
      opacity: .7
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--font-display)",
      fontVariationSettings: '"wdth" 100,"wght" 700',
      fontWeight: 700,
      fontSize: "var(--fs-lg)",
      letterSpacing: "-.02em",
      lineHeight: 1.25,
      textWrap: "pretty"
    }
  }, title))), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      alignItems: "center",
      flexWrap: "wrap"
    }
  }, actions));
}
Object.assign(__ds_scope, { StateBand, __ds_default_components_data_StateBand_a3do55: StateBand });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StateBand.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusBadge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE = {
  default: ["var(--surface-1)", "var(--ink-muted)", "var(--ink-faint)"],
  neutral: ["var(--surface-1)", "var(--ink-muted)", "var(--ink-faint)"],
  success: ["var(--ok-dim)", "var(--ok)", "var(--ok-dot)"],
  ok: ["var(--ok-dim)", "var(--ok)", "var(--ok-dot)"],
  warning: ["var(--warning-dim)", "var(--warning)", "var(--warning-dot)"],
  warn: ["var(--warning-dim)", "var(--warning)", "var(--warning-dot)"],
  danger: ["var(--danger-dim)", "var(--danger)", "var(--danger-dot)"],
  info: ["var(--info-dim)", "var(--info)", "var(--info-dot)"]
};
/** Status chip. Mirrors the shipped _ui/status-badge: 22px min-height,
 *  radius-xs, 11px bold uppercase with --ls-caps, tinted 1px border. */
function StatusBadge({
  variant = "default",
  tone,
  children,
  dot = false,
  size = "md",
  style,
  ...rest
}) {
  const [bg, fg, dotc] = TONE[tone || variant] || TONE.default;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      minHeight: size === "sm" ? 18 : 22,
      padding: size === "sm" ? "0 6px" : "0 8px",
      background: bg,
      color: fg,
      border: `1px solid ${bg}`,
      borderRadius: "var(--radius-xs)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-xs)",
      fontWeight: "var(--fw-bold)",
      letterSpacing: "var(--ls-caps)",
      textTransform: "uppercase",
      whiteSpace: "nowrap",
      ...style
    }
  }), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: "50%",
      background: dotc,
      flexShrink: 0
    }
  }), children);
}
Object.assign(__ds_scope, { StatusBadge, __ds_default_components_data_StatusBadge_4kfqy: StatusBadge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusBadge.jsx", error: String((e && e.message) || e) }); }

// components/data/StatusDot.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE = {
  default: ["var(--surface-1)", "var(--ink-muted)", "var(--ink-faint)"],
  neutral: ["var(--surface-1)", "var(--ink-muted)", "var(--ink-faint)"],
  success: ["var(--ok-dim)", "var(--ok)", "var(--ok-dot)"],
  ok: ["var(--ok-dim)", "var(--ok)", "var(--ok-dot)"],
  warning: ["var(--warning-dim)", "var(--warning)", "var(--warning-dot)"],
  warn: ["var(--warning-dim)", "var(--warning)", "var(--warning-dot)"],
  danger: ["var(--danger-dim)", "var(--danger)", "var(--danger-dot)"],
  info: ["var(--info-dim)", "var(--info)", "var(--info-dot)"]
};
/** Broadcast-clarity state marker: readable across a workshop. */
function StatusDot({
  tone = "default",
  variant,
  label,
  live = false,
  size = 8,
  style,
  ...rest
}) {
  const [,, dotc] = TONE[variant || tone] || TONE.default;
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: size,
      height: size,
      borderRadius: "50%",
      flexShrink: 0,
      background: dotc,
      animation: live ? "mv-pulse var(--dur-live) var(--ease-inout) infinite" : undefined
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-base)",
      color: "var(--ink-strong)"
    }
  }, label));
}
Object.assign(__ds_scope, { StatusDot, __ds_default_components_data_StatusDot_afpfji: StatusDot });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatusDot.jsx", error: String((e && e.message) || e) }); }

// components/data/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Non-semantic label: categories, warehouses, domains. Optional dismiss. */
function Tag({
  children,
  onDismiss,
  accent = false,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-1)",
      height: 22,
      padding: onDismiss ? "0 4px 0 8px" : "0 8px",
      borderRadius: "var(--radius-2)",
      background: "var(--bg-card)",
      color: accent ? "var(--accent-text)" : "var(--ink-muted)",
      border: accent ? "1px solid var(--accent-text)" : "1px solid transparent",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-medium)",
      whiteSpace: "nowrap",
      ...style
    }
  }), children, onDismiss && /*#__PURE__*/React.createElement("button", {
    onClick: onDismiss,
    "aria-label": "Remove",
    style: {
      border: 0,
      background: "transparent",
      color: "inherit",
      cursor: "pointer",
      padding: 2,
      display: "flex",
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "9",
    height: "9",
    viewBox: "0 0 9 9",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M1.5 1.5l6 6M7.5 1.5l-6 6"
  }))));
}
Object.assign(__ds_scope, { Tag, __ds_default_components_data_Tag_xab6kf: Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Tag.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Banner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE = {
  default: ["var(--surface-1)", "var(--ink-muted)", "var(--ink-faint)"],
  neutral: ["var(--surface-1)", "var(--ink-muted)", "var(--ink-faint)"],
  success: ["var(--ok-dim)", "var(--ok)", "var(--ok-dot)"],
  ok: ["var(--ok-dim)", "var(--ok)", "var(--ok-dot)"],
  warning: ["var(--warning-dim)", "var(--warning)", "var(--warning-dot)"],
  warn: ["var(--warning-dim)", "var(--warning)", "var(--warning-dot)"],
  danger: ["var(--danger-dim)", "var(--danger)", "var(--danger-dot)"],
  info: ["var(--info-dim)", "var(--info)", "var(--info-dot)"]
};
/** Persistent in-page message: sync failures, stock shortages, plan limits. */
function Banner({
  tone = "info",
  variant,
  title,
  children,
  action,
  onClose,
  style,
  ...rest
}) {
  const [bg, fg, dotc] = TONE[variant || tone] || TONE.info;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "note"
  }, rest, {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--space-3)",
      padding: "var(--space-3) var(--space-4)",
      background: bg,
      color: fg,
      borderRadius: "var(--radius-lg)",
      borderLeft: `var(--border-rule) solid ${dotc}`,
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "grid",
      gap: 2
    }
  }, title && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-base)",
      fontWeight: "var(--fw-semibold)"
    }
  }, title), children && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-sm)",
      opacity: .9
    }
  }, children)), action, onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 0,
      background: "transparent",
      color: "inherit",
      opacity: .6,
      cursor: "pointer",
      padding: 2,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 2l7 7M9 2l-7 7"
  }))));
}
Object.assign(__ds_scope, { Banner, __ds_default_components_feedback_Banner_2q95tw: Banner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Banner.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Dialog.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Modal. Scrim is warm-black at 56%; panel is flat with a hard top rule.
 *  `inline` scopes the scrim to the nearest positioned ancestor instead of the
 *  viewport — for embedded confirm panels and specimen cards. */
function Dialog({
  open = true,
  inline = false,
  title,
  eyebrow,
  footer,
  width = 520,
  onClose,
  children,
  style,
  ...rest
}) {
  if (!open) return null;
  return /*#__PURE__*/React.createElement("div", {
    role: "dialog",
    "aria-modal": inline ? undefined : "true",
    "aria-label": typeof title === "string" ? title : undefined,
    style: {
      position: inline ? "absolute" : "fixed",
      inset: 0,
      zIndex: 100,
      display: "grid",
      placeItems: "center",
      padding: "var(--space-6)",
      background: "rgb(20 20 19/.56)",
      animation: "mv-rise var(--dur-base) var(--ease-out)"
    },
    onClick: onClose
  }, /*#__PURE__*/React.createElement("div", _extends({
    onClick: e => e.stopPropagation()
  }, rest, {
    style: {
      width: "100%",
      maxWidth: width,
      background: "var(--bg-card)",
      border: "1px solid var(--stroke-card)",
      borderRadius: "var(--radius-xl)",
      boxShadow: "var(--shadow-lg)",
      overflow: "hidden",
      ...style
    }
  }), /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "space-between",
      gap: "var(--space-4)",
      padding: "var(--space-6) var(--space-6) var(--space-3)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 2
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "mv-key"
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontVariationSettings: '"wdth" 100,"wght" 700',
      fontSize: "var(--fs-xl)",
      letterSpacing: "var(--ls-tight)",
      color: "var(--ink-strong)"
    }
  }, title)), onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Close",
    style: {
      border: 0,
      background: "transparent",
      cursor: "pointer",
      color: "var(--ink-faint)",
      padding: 4,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "14",
    height: "14",
    viewBox: "0 0 14 14",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 2l10 10M12 2L2 12"
  })))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--space-6) var(--space-6)",
      fontSize: "var(--fs-md)",
      color: "var(--ink-muted)",
      lineHeight: "var(--lh-normal)"
    }
  }, children), footer && /*#__PURE__*/React.createElement("footer", {
    style: {
      display: "flex",
      justifyContent: "flex-end",
      gap: "var(--space-3)",
      padding: "var(--space-4) var(--space-6)",
      background: "var(--bg-card-alt)",
      borderTop: "1px solid var(--stroke)"
    }
  }, footer)));
}
Object.assign(__ds_scope, { Dialog, __ds_default_components_feedback_Dialog_4682ji: Dialog });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Dialog.jsx", error: String((e && e.message) || e) }); }

// components/feedback/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Zero state. Mirrors the shipped _ui/empty-state (dashed --stroke border,
 *  radius-lg, 20px/18px padding) with an optional hero numeral — the one
 *  place the app is allowed poster energy. */
function EmptyState({
  numeral,
  title,
  message,
  body,
  action,
  align = "left",
  style,
  ...rest
}) {
  const text = message ?? body;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "grid",
      gap: "10px",
      padding: "20px 18px",
      border: "1px dashed var(--stroke)",
      borderRadius: "var(--radius-lg)",
      background: "var(--bg-card)",
      justifyItems: align === "center" ? "center" : "start",
      textAlign: align,
      ...style
    }
  }), numeral && /*#__PURE__*/React.createElement("span", {
    className: "mv-numeral",
    style: {
      fontSize: "var(--fs-display-4)",
      color: "var(--stroke-strong)"
    }
  }, numeral), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--fs-md)",
      fontWeight: "var(--fw-bold)",
      color: "var(--ink-strong)"
    }
  }, title), text && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--fs-base)",
      lineHeight: "var(--lh-normal)",
      color: "var(--ink-muted)",
      maxWidth: "52ch",
      textWrap: "pretty"
    }
  }, text), action && /*#__PURE__*/React.createElement("div", {
    style: {
      width: "fit-content"
    }
  }, action));
}
Object.assign(__ds_scope, { EmptyState, __ds_default_components_feedback_EmptyState_biap9a: EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Toast.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const TONE = {
  default: ["var(--surface-1)", "var(--ink-muted)", "var(--ink-faint)"],
  neutral: ["var(--surface-1)", "var(--ink-muted)", "var(--ink-faint)"],
  success: ["var(--ok-dim)", "var(--ok)", "var(--ok-dot)"],
  ok: ["var(--ok-dim)", "var(--ok)", "var(--ok-dot)"],
  warning: ["var(--warning-dim)", "var(--warning)", "var(--warning-dot)"],
  warn: ["var(--warning-dim)", "var(--warning)", "var(--warning-dot)"],
  danger: ["var(--danger-dim)", "var(--danger)", "var(--danger-dot)"],
  info: ["var(--info-dim)", "var(--info)", "var(--info-dot)"]
};
/** Transient confirmation. Bottom-left, above the sidebar, never centre-screen. */
function Toast({
  tone = "default",
  variant,
  title,
  detail,
  action,
  onClose,
  style,
  ...rest
}) {
  const [,, dotc] = TONE[variant || tone] || TONE.default;
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "status"
  }, rest, {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: "var(--space-3)",
      minWidth: 280,
      maxWidth: 400,
      padding: "var(--space-3) var(--space-4)",
      background: "var(--bg-ink)",
      color: "var(--bg-card)",
      borderRadius: "var(--radius-lg)",
      boxShadow: "var(--shadow-md)",
      borderLeft: `var(--border-rule) solid ${dotc}`,
      animation: "mv-rise var(--dur-base) var(--ease-out)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: "grid",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-base)",
      fontWeight: "var(--fw-semibold)"
    }
  }, title), detail && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-sm)",
      opacity: .7
    }
  }, detail)), action, onClose && /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    "aria-label": "Dismiss",
    style: {
      border: 0,
      background: "transparent",
      color: "inherit",
      opacity: .6,
      cursor: "pointer",
      padding: 2,
      lineHeight: 0
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 2l7 7M9 2l-7 7"
  }))));
}
Object.assign(__ds_scope, { Toast, __ds_default_components_feedback_Toast_sfbpi1: Toast });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Toast.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tooltip.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Hover label. CSS-only; wraps its child. */
function Tooltip({
  content,
  side = "top",
  children,
  style,
  ...rest
}) {
  const pos = side === "top" ? {
    bottom: "calc(100% + 6px)",
    left: "50%",
    transform: "translateX(-50%)"
  } : side === "bottom" ? {
    top: "calc(100% + 6px)",
    left: "50%",
    transform: "translateX(-50%)"
  } : side === "left" ? {
    right: "calc(100% + 6px)",
    top: "50%",
    transform: "translateY(-50%)"
  } : {
    left: "calc(100% + 6px)",
    top: "50%",
    transform: "translateY(-50%)"
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    className: "mv-tip"
  }, rest, {
    style: {
      position: "relative",
      display: "inline-flex",
      ...style
    }
  }), children, /*#__PURE__*/React.createElement("span", {
    className: "mv-tip-b",
    style: {
      position: "absolute",
      ...pos,
      zIndex: 60,
      pointerEvents: "none",
      opacity: 0,
      padding: "4px 7px",
      background: "var(--bg-ink)",
      color: "var(--ink-on-brand)",
      borderRadius: "var(--radius-2)",
      fontSize: "var(--fs-xs)",
      fontWeight: "var(--fw-medium)",
      whiteSpace: "nowrap",
      boxShadow: "var(--shadow-card)",
      transition: "opacity var(--dur-fast) var(--ease-out)"
    }
  }, content), /*#__PURE__*/React.createElement("style", null, ".mv-tip:hover .mv-tip-b,.mv-tip:focus-within .mv-tip-b{opacity:1}"));
}
Object.assign(__ds_scope, { Tooltip, __ds_default_components_feedback_Tooltip_1lex2m1: Tooltip });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tooltip.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const SIZES = {
  sm: {
    h: "var(--control-sm)",
    px: "12px",
    fs: "var(--fs-sm)"
  },
  md: {
    h: "var(--control-md)",
    px: "18px",
    fs: "var(--fs-md)"
  },
  lg: {
    h: "var(--control-lg)",
    px: "20px",
    fs: "var(--fs-md)"
  },
  xl: {
    h: "var(--control-xl)",
    px: "26px",
    fs: "var(--fs-lg)"
  }
};
const VARIANTS = {
  primary: {
    background: "var(--brand-2)",
    color: "var(--ink-on-brand)",
    border: "1px solid var(--brand-2)"
  },
  secondary: {
    background: "var(--bg-card)",
    color: "var(--ink-strong)",
    border: "1px solid var(--stroke-strong)"
  },
  ghost: {
    background: "transparent",
    color: "var(--ink-muted)",
    border: "1px solid transparent"
  },
  danger: {
    background: "var(--danger-dim)",
    color: "var(--danger)",
    border: "1px solid var(--danger-dim)"
  },
  ink: {
    background: "var(--bg-ink)",
    color: "var(--bg-card)",
    border: "1px solid var(--bg-ink)"
  },
  accent: {
    background: "var(--accent-loud)",
    color: "#fff",
    border: "1px solid var(--accent-loud)"
  }
};

/** Action control. Geometry mirrors the shipped _ui/buttons.module.css.
 *  `shape="pill"` is the loud-layer shape — marketing CTAs, onboarding, poster
 *  blocks. `as="a"` renders an anchor so those CTAs can be real links. */
function Button({
  as: Tag = "button",
  variant = "primary",
  size = "md",
  shape = "default",
  block = false,
  disabled = false,
  loading = false,
  iconLeft,
  iconRight,
  children,
  className,
  style,
  ...rest
}) {
  const s = SIZES[size] || SIZES.md,
    v = VARIANTS[variant] || VARIANTS.primary;
  const native = Tag === "button";
  return /*#__PURE__*/React.createElement(Tag, _extends({}, native ? {
    disabled: disabled || loading
  } : {
    "aria-disabled": disabled || loading || undefined
  }, {
    "data-variant": variant,
    className: ["mv-btn", className].filter(Boolean).join(" "),
    style: {
      display: block ? "flex" : "inline-flex",
      width: block ? "100%" : undefined,
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      height: s.h,
      padding: `0 ${s.px}`,
      fontFamily: "var(--font-body)",
      fontSize: s.fs,
      fontWeight: "var(--fw-semibold)",
      letterSpacing: size === "xl" ? "var(--ls-tight)" : "0",
      borderRadius: shape === "pill" ? "var(--radius-pill)" : "var(--radius-lg)",
      cursor: disabled || loading ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      whiteSpace: "nowrap",
      textDecoration: "none",
      transition: "filter var(--dur-fast) ease, background var(--dur-fast) ease, border-color var(--dur-fast) ease, box-shadow var(--dur-fast) ease",
      ...v,
      ...style
    }
  }, rest), loading && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 12,
      height: 12,
      border: "2px solid currentColor",
      borderTopColor: "transparent",
      borderRadius: "50%",
      animation: "mv-spin .7s linear infinite"
    }
  }), !loading && iconLeft, children, iconRight, /*#__PURE__*/React.createElement("style", null, ".mv-btn:hover:not(:disabled){filter:brightness(1.06)}.mv-btn[data-variant='secondary']:hover:not(:disabled),.mv-btn[data-variant='ghost']:hover:not(:disabled){filter:none;background:var(--surface-hover)}.mv-btn[data-variant='danger']:hover:not(:disabled){filter:none;background:var(--danger);color:#fff}.mv-btn:active:not(:disabled){transform:translateY(1px)}.mv-btn:focus-visible{outline:none;box-shadow:var(--shadow-focus)}"));
}
Object.assign(__ds_scope, { Button, __ds_default_components_forms_Button_9f0yek: Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Checkbox with optional indeterminate state (table select-all). */
function Checkbox({
  checked = false,
  indeterminate = false,
  disabled = false,
  label,
  onChange,
  style,
  ...rest
}) {
  const on = checked || indeterminate;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-2)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-md)",
      color: "var(--ink-strong)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mv-cbx",
    style: {
      width: 16,
      height: 16,
      flexShrink: 0,
      display: "grid",
      placeItems: "center",
      background: on ? "var(--brand-2)" : "var(--bg-card)",
      border: `1px solid ${on ? "var(--brand-2)" : "var(--stroke-strong)"}`,
      borderRadius: "var(--radius-2)",
      transition: "var(--transition-control)"
    }
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange
  }, rest, {
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  })), indeterminate ? /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 10 10",
    stroke: "#fff",
    strokeWidth: "2"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 5h6"
  })) : checked && /*#__PURE__*/React.createElement("svg", {
    width: "11",
    height: "11",
    viewBox: "0 0 11 11",
    fill: "none",
    stroke: "#fff",
    strokeWidth: "2",
    strokeLinecap: "square"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 5.6L4.2 8 9 2.8"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-base)",
      color: "var(--ink)"
    }
  }, label), /*#__PURE__*/React.createElement("style", null, ".mv-cbx:has(input:focus-visible){box-shadow:var(--shadow-focus)}"));
}
Object.assign(__ds_scope, { Checkbox, __ds_default_components_forms_Checkbox_i1jt6f: Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
/** Label + help/error wrapper for any form control. */
function Field({
  label,
  hint,
  error,
  required = false,
  htmlFor,
  children,
  style
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)",
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: htmlFor,
    style: {
      fontSize: "var(--fs-sm)",
      fontWeight: "var(--fw-semibold)",
      color: "var(--ink-muted)",
      letterSpacing: "var(--ls-caps)"
    }
  }, label, required && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--danger)",
      marginLeft: 3
    }
  }, "*")), children, (error || hint) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-sm)",
      color: error ? "var(--danger)" : "var(--ink-faint)"
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Field, __ds_default_components_forms_Field_jq849g: Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const H = {
  sm: 26,
  md: 32,
  lg: 40
};
/** Square icon-only control for toolbars and table row actions. */
function IconButton({
  size = "md",
  variant = "ghost",
  label,
  active = false,
  disabled = false,
  children,
  style,
  ...rest
}) {
  const h = H[size] || 32;
  const bg = active ? "var(--surface-active)" : variant === "solid" ? "var(--bg-ink)" : variant === "outline" ? "var(--bg-card)" : "transparent";
  return /*#__PURE__*/React.createElement("button", _extends({
    "aria-label": label,
    title: label,
    disabled: disabled,
    className: "mv-ibtn",
    style: {
      width: h,
      height: h,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      background: bg,
      color: variant === "solid" ? "var(--ink-on-brand)" : "var(--ink-muted)",
      border: variant === "outline" ? "1px solid var(--stroke-card)" : "1px solid transparent",
      borderRadius: "var(--radius-lg)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .4 : 1,
      transition: "var(--transition-control)",
      ...style
    }
  }, rest), children, /*#__PURE__*/React.createElement("style", null, ".mv-ibtn:hover:not(:disabled){background:var(--surface-hover);color:var(--ink-strong)}.mv-ibtn:focus-visible{outline:none;box-shadow:var(--shadow-focus)}"));
}
Object.assign(__ds_scope, { IconButton, __ds_default_components_forms_IconButton_17hrz3p: IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const H = {
  sm: "var(--control-sm)",
  md: "var(--control-md)",
  lg: "var(--control-lg)"
};
/** Single-line text field. Mono variant for SKUs, lot codes and quantities. */
function Input({
  size = "md",
  invalid = false,
  mono = false,
  prefix,
  suffix,
  align = "left",
  style,
  ...rest
}) {
  const box = {
    display: "flex",
    alignItems: "center",
    gap: "var(--space-2)",
    height: H[size] || H.md,
    padding: "0 10px",
    background: "var(--bg-card)",
    border: `1px solid ${invalid ? "var(--danger)" : "var(--stroke-card)"}`,
    borderRadius: "var(--radius-lg)",
    transition: "var(--transition-control)"
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "mv-field",
    "data-invalid": invalid || undefined,
    style: {
      ...box,
      ...style
    }
  }, prefix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-faint)",
      display: "flex",
      flexShrink: 0
    }
  }, prefix), /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    style: {
      flex: 1,
      minWidth: 0,
      border: 0,
      outline: "none",
      background: "transparent",
      color: "var(--ink-strong)",
      fontFamily: mono ? "var(--font-mono)" : "var(--font-body)",
      fontSize: size === "sm" ? "var(--fs-sm)" : "var(--fs-md)",
      textAlign: align,
      fontVariantNumeric: mono || align === "right" ? "tabular-nums" : "normal"
    }
  })), suffix && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-faint)",
      fontSize: "var(--fs-sm)",
      flexShrink: 0
    }
  }, suffix), /*#__PURE__*/React.createElement("style", null, ".mv-field:focus-within{border-color:var(--focus-border);box-shadow:var(--shadow-focus)}.mv-field[data-invalid]:focus-within{box-shadow:var(--shadow-focus)}.mv-field input::placeholder{color:var(--ink-faint)}"));
}
Object.assign(__ds_scope, { Input, __ds_default_components_forms_Input_jsghkw: Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Radio.jsx
try { (() => {
/** Radio input. Use RadioGroup semantics via shared `name`. */
function Radio({
  checked = false,
  disabled = false,
  label,
  description,
  name,
  onChange,
  value,
  style
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: description ? "flex-start" : "center",
      gap: "var(--space-2)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-md)",
      color: "var(--ink-strong)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: 16,
      height: 16,
      flexShrink: 0,
      marginTop: description ? 2 : 0,
      display: "grid",
      placeItems: "center",
      background: "var(--bg-card)",
      border: `1px solid ${checked ? "var(--brand-2)" : "var(--stroke-strong)"}`,
      borderRadius: "50%",
      transition: "var(--transition-control)"
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "radio",
    name: name,
    value: value,
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), checked && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: "50%",
      background: "var(--brand-2)"
    }
  })), (label || description) && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "grid",
      gap: 2
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-base)",
      color: "var(--ink)"
    }
  }, label), description && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-sm)",
      color: "var(--ink-faint)"
    }
  }, description)));
}
Object.assign(__ds_scope, { Radio, __ds_default_components_forms_Radio_jyiy9r: Radio });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Radio.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const H = {
  sm: "var(--control-sm)",
  md: "var(--control-md)",
  lg: "var(--control-lg)"
};
/** Native select styled to match Input. */
function Select({
  size = "md",
  invalid = false,
  options = [],
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "mv-field",
    style: {
      position: "relative",
      display: "inline-flex",
      alignItems: "center",
      height: H[size] || H.md,
      background: "var(--bg-card)",
      border: `1px solid ${invalid ? "var(--danger)" : "var(--stroke-card)"}`,
      borderRadius: "var(--radius-lg)",
      transition: "var(--transition-control)",
      ...style
    }
  }, /*#__PURE__*/React.createElement("select", _extends({}, rest, {
    style: {
      appearance: "none",
      border: 0,
      outline: "none",
      background: "transparent",
      color: "var(--ink-strong)",
      fontFamily: "var(--font-body)",
      fontSize: size === "sm" ? "var(--fs-sm)" : "var(--fs-md)",
      padding: "0 28px 0 10px",
      height: "100%",
      width: "100%",
      cursor: "pointer"
    }
  }), children || options.map(o => typeof o === "string" ? /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o) : /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("svg", {
    width: "10",
    height: "10",
    viewBox: "0 0 10 10",
    style: {
      position: "absolute",
      right: 9,
      pointerEvents: "none",
      color: "var(--ink-faint)"
    },
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "1.6"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M2 4l3 3 3-3"
  })), /*#__PURE__*/React.createElement("style", null, ".mv-field:focus-within{border-color:var(--focus-border);box-shadow:var(--shadow-focus)}"));
}
Object.assign(__ds_scope, { Select, __ds_default_components_forms_Select_k3ngq8: Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
/** On/off toggle for settings that take effect immediately. */
function Switch({
  checked = false,
  disabled = false,
  label,
  onChange,
  size = "md",
  style
}) {
  const w = size === "sm" ? 30 : 38,
    h = size === "sm" ? 18 : 22,
    k = h - 6;
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-3)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-md)",
      color: "var(--ink-strong)",
      cursor: disabled ? "not-allowed" : "pointer",
      opacity: disabled ? .45 : 1,
      ...style
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: w,
      height: h,
      flexShrink: 0,
      padding: 3,
      borderRadius: "var(--radius-pill)",
      background: checked ? "var(--brand-2)" : "var(--stroke-strong)",
      display: "flex",
      transition: `background-color var(--dur-fast) var(--ease-snap)`
    }
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: checked,
    disabled: disabled,
    onChange: onChange,
    style: {
      position: "absolute",
      opacity: 0,
      width: 0,
      height: 0
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: k,
      height: k,
      borderRadius: "50%",
      background: "#fff",
      boxShadow: "var(--shadow-sm)",
      transform: checked ? `translateX(${w - k - 6}px)` : "none",
      transition: `transform var(--dur-fast) var(--ease-snap)`
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-base)",
      color: "var(--ink)"
    }
  }, label));
}
Object.assign(__ds_scope, { Switch, __ds_default_components_forms_Switch_kgb19e: Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/forms/Textarea.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Multi-line text. Used for notes on jobs, POs and audit entries. */
function Textarea({
  invalid = false,
  rows = 4,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows,
    className: "mv-ta"
  }, rest, {
    style: {
      width: "100%",
      padding: "8px 10px",
      background: "var(--bg-card)",
      border: `1px solid ${invalid ? "var(--danger)" : "var(--stroke-card)"}`,
      borderRadius: "var(--radius-lg)",
      color: "var(--ink-strong)",
      fontFamily: "var(--font-body)",
      fontSize: "var(--fs-md)",
      lineHeight: "var(--lh-normal)",
      resize: "vertical",
      outline: "none",
      transition: "var(--transition-control)",
      ...style
    }
  })), /*#__PURE__*/React.createElement("style", null, ".mv-ta:focus{border-color:var(--focus-border);box-shadow:var(--shadow-focus)}.mv-ta::placeholder{color:var(--ink-faint)}"));
}
Object.assign(__ds_scope, { Textarea, __ds_default_components_forms_Textarea_fj26by: Textarea });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Textarea.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FAQ.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Questions as rules, not cards. Open one at a time; the first is open by
 *  default so the pattern is legible without a click. */
function FAQ({
  items = [],
  defaultOpen = 0,
  style,
  ...rest
}) {
  const [open, setOpen] = React.useState(defaultOpen);
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "grid",
      ...style
    }
  }), items.map((it, i) => {
    const on = open === i;
    return /*#__PURE__*/React.createElement("div", {
      key: it.q,
      style: {
        borderTop: i ? "1px solid var(--stroke-strong)" : "3px solid var(--ink-strong)",
        borderBottom: i === items.length - 1 ? "3px solid var(--ink-strong)" : "0"
      }
    }, /*#__PURE__*/React.createElement("button", {
      onClick: () => setOpen(on ? -1 : i),
      "aria-expanded": on,
      style: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-6)",
        padding: "var(--space-6) 0",
        background: "transparent",
        border: 0,
        cursor: "pointer",
        fontFamily: "var(--font-display)",
        fontVariationSettings: '"wdth" 100,"wght" 700',
        fontWeight: 700,
        fontSize: "var(--fs-xl)",
        letterSpacing: "var(--ls-display)",
        color: "var(--ink-strong)",
        textAlign: "left"
      }
    }, it.q, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        flex: "none",
        width: 22,
        height: 22,
        display: "grid",
        placeItems: "center",
        color: "var(--accent-text, var(--brand-2))",
        transform: on ? "rotate(45deg)" : "none",
        transition: "transform var(--dur-base) var(--ease-out)"
      }
    }, /*#__PURE__*/React.createElement("svg", {
      width: "16",
      height: "16",
      viewBox: "0 0 16 16",
      stroke: "currentColor",
      strokeWidth: "2"
    }, /*#__PURE__*/React.createElement("path", {
      d: "M8 2v12M2 8h12"
    })))), on && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        padding: "0 0 var(--space-6)",
        maxWidth: "62ch",
        fontSize: "var(--fs-lg)",
        lineHeight: 1.6,
        color: "var(--ink-muted)",
        textWrap: "pretty"
      }
    }, it.a));
  }));
}
Object.assign(__ds_scope, { FAQ, __ds_default_components_marketing_FAQ_1l4vpgj: FAQ });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FAQ.jsx", error: String((e && e.message) || e) }); }

// components/marketing/FeatureGrid.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Field tiles, one per feature. Colour rotates for rhythm on the site;
 *  pass `domain` on an item to keep its product meaning instead. */
const ROTATION = ["cobalt", "violet", "flare", "amber", "mint", "aqua"];
function FeatureGrid({
  items = [],
  columns = 3,
  numbered = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns},1fr)`,
      gap: "var(--space-5)",
      ...style
    }
  }), items.map((it, i) => {
    const field = it.field || ROTATION[i % ROTATION.length];
    return /*#__PURE__*/React.createElement("div", {
      key: it.title || i,
      className: "mv-lift",
      style: {
        background: `var(--field-${field})`,
        color: `var(--on-${field})`,
        borderRadius: "var(--radius-tile)",
        padding: "var(--space-8)",
        minHeight: 260,
        display: "grid",
        gridTemplateRows: "auto auto 1fr",
        gap: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "var(--space-4)"
      }
    }, it.icon, numbered && /*#__PURE__*/React.createElement("span", {
      className: "mv-score",
      style: {
        fontSize: 52,
        opacity: .34
      }
    }, String(i + 1).padStart(2, "0"))), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontVariationSettings: '"wdth" 112,"wght" 800',
        fontSize: "var(--fs-2xl)",
        lineHeight: 1.02,
        letterSpacing: "-.025em",
        minHeight: "2.04em"
      }
    }, it.title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-lg)",
        lineHeight: 1.5,
        opacity: .82,
        textWrap: "pretty",
        alignSelf: "start"
      }
    }, it.body));
  }));
}
Object.assign(__ds_scope, { FeatureGrid, __ds_default_components_marketing_FeatureGrid_1eq24f1: FeatureGrid });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/FeatureGrid.jsx", error: String((e && e.message) || e) }); }

// components/marketing/LogoWall.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Customer proof. Logos are masked to a single ink so a wall of mismatched
 *  brand colours reads as one row. Supply real logos — never placeholders. */
function LogoWall({
  logos = [],
  label,
  columns = 5,
  tone = "ink",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "grid",
      gap: "var(--space-6)",
      justifyItems: "center",
      ...style
    }
  }), label && /*#__PURE__*/React.createElement("span", {
    className: "mv-eyebrow",
    style: {
      color: tone === "onField" ? "currentColor" : "var(--ink-faint)",
      opacity: tone === "onField" ? .6 : 1
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${columns},1fr)`,
      gap: "var(--space-10)",
      alignItems: "center",
      width: "100%"
    }
  }, logos.map(l => /*#__PURE__*/React.createElement("span", {
    key: l.name,
    role: "img",
    "aria-label": l.name,
    title: l.name,
    style: {
      height: l.height || 28,
      width: "100%",
      backgroundColor: tone === "onField" ? "currentColor" : "var(--ink-faint)",
      WebkitMaskImage: `url("${l.src}")`,
      maskImage: `url("${l.src}")`,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      opacity: tone === "onField" ? .72 : 1
    }
  }))));
}
Object.assign(__ds_scope, { LogoWall, __ds_default_components_marketing_LogoWall_123npyk: LogoWall });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/LogoWall.jsx", error: String((e && e.message) || e) }); }

// components/marketing/PricingTable.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Plan columns. One plan may be `featured` — it inverts to the ink field.
 *  Never put a colour field behind the feature list. */
function PricingTable({
  plans = [],
  footnote,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "grid",
      gap: "var(--space-5)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: `repeat(${plans.length},1fr)`,
      gap: "var(--space-4)",
      alignItems: "stretch"
    }
  }, plans.map(p => {
    const on = !!p.featured;
    return /*#__PURE__*/React.createElement("div", {
      key: p.name,
      style: {
        background: on ? "var(--field-ink)" : "var(--bg-card)",
        color: on ? "var(--on-ink)" : "var(--ink-strong)",
        border: on ? "1px solid var(--field-ink)" : "1px solid var(--stroke-card)",
        borderRadius: "var(--radius-tile)",
        padding: "var(--space-8)",
        display: "grid",
        gridTemplateRows: "auto auto auto 1fr auto",
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: on ? "var(--field-lime)" : "var(--ink-faint)"
      }
    }, p.name), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-numeral",
      style: {
        fontSize: "var(--fs-display-2)"
      }
    }, p.price), p.period && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-md)",
        opacity: .62
      }
    }, p.period)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-md)",
        lineHeight: 1.55,
        opacity: on ? .78 : 1,
        color: on ? "currentColor" : "var(--ink-muted)",
        textWrap: "pretty"
      }
    }, p.summary), /*#__PURE__*/React.createElement("ul", {
      style: {
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "grid",
        gap: "var(--space-3)",
        alignContent: "start"
      }
    }, (p.features || []).map(f => /*#__PURE__*/React.createElement("li", {
      key: f,
      style: {
        display: "flex",
        gap: "var(--space-3)",
        fontSize: "var(--fs-md)",
        lineHeight: 1.45,
        color: on ? "currentColor" : "var(--ink-muted)",
        opacity: on ? .86 : 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      style: {
        color: on ? "var(--field-lime)" : "var(--ok)",
        flex: "none"
      }
    }, "\u2713"), f))), p.action);
  })), footnote && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-sm)",
      color: "var(--ink-faint)"
    }
  }, footnote));
}
Object.assign(__ds_scope, { PricingTable, __ds_default_components_marketing_PricingTable_rd76kf: PricingTable });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/PricingTable.jsx", error: String((e && e.message) || e) }); }

// components/marketing/SectionHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Marketing section opener: eyebrow, display headline, optional lede.
 *  The app uses PageHeader; marketing uses this. */
function SectionHeader({
  eyebrow,
  title,
  lede,
  align = "left",
  tone = "ink",
  actions,
  style,
  ...rest
}) {
  const centred = align === "center";
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "grid",
      gap: "var(--space-4)",
      justifyItems: centred ? "center" : "start",
      textAlign: centred ? "center" : "left",
      maxWidth: centred ? "46ch" : undefined,
      marginInline: centred ? "auto" : undefined,
      ...style
    }
  }), eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "mv-eyebrow",
    style: {
      color: tone === "onField" ? "currentColor" : "var(--ink-faint)",
      opacity: tone === "onField" ? .72 : 1
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h2", {
    className: "mv-display",
    style: {
      margin: 0,
      fontSize: "var(--fs-display-3)",
      color: tone === "onField" ? "currentColor" : "var(--ink-strong)",
      maxWidth: "18ch"
    }
  }, title), lede && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      fontSize: "var(--fs-xl)",
      lineHeight: 1.5,
      maxWidth: "46ch",
      color: tone === "onField" ? "currentColor" : "var(--ink-muted)",
      opacity: tone === "onField" ? .82 : 1,
      textWrap: "pretty"
    }
  }, lede), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-3)",
      flexWrap: "wrap",
      marginTop: "var(--space-2)"
    }
  }, actions));
}
Object.assign(__ds_scope, { SectionHeader, __ds_default_components_marketing_SectionHeader_fodlmx: SectionHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/SectionHeader.jsx", error: String((e && e.message) || e) }); }

// components/marketing/Testimonial.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** One quote, attributed. Quotes carry a metric when there is one —
 *  a number the customer can point at beats an adjective. */
function Testimonial({
  quote,
  name,
  role,
  company,
  metric,
  unit,
  field,
  style,
  ...rest
}) {
  const on = !!field;
  return /*#__PURE__*/React.createElement("figure", _extends({}, rest, {
    style: {
      margin: 0,
      background: on ? `var(--field-${field})` : "var(--bg-card)",
      color: on ? `var(--on-${field})` : "var(--ink-strong)",
      border: on ? "0" : "1px solid var(--stroke-card)",
      borderRadius: "var(--radius-tile)",
      padding: "var(--space-10)",
      display: "grid",
      gap: "var(--space-8)",
      alignContent: "space-between",
      ...style
    }
  }), metric != null && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "mv-numeral",
    style: {
      fontSize: "var(--fs-display-3)"
    }
  }, metric), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: "var(--fs-lg)",
      fontWeight: "var(--fw-bold)",
      opacity: .62
    }
  }, unit)), /*#__PURE__*/React.createElement("blockquote", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontVariationSettings: '"wdth" 100,"wght" 700',
      fontWeight: 700,
      fontSize: "var(--fs-2xl)",
      lineHeight: 1.25,
      letterSpacing: "var(--ls-display)",
      textWrap: "pretty"
    }
  }, quote), /*#__PURE__*/React.createElement("figcaption", {
    style: {
      display: "grid",
      gap: 2,
      fontSize: "var(--fs-md)"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontWeight: "var(--fw-semibold)"
    }
  }, name), /*#__PURE__*/React.createElement("span", {
    style: {
      opacity: on ? .72 : 1,
      color: on ? "currentColor" : "var(--ink-muted)"
    }
  }, [role, company].filter(Boolean).join(", "))));
}
Object.assign(__ds_scope, { Testimonial, __ds_default_components_marketing_Testimonial_12upeqc: Testimonial });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/marketing/Testimonial.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Breadcrumb.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Trail for drill-down records: Inventory / Kingsgrove / SKU-4410. */
function Breadcrumb({
  items = [],
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({
    "aria-label": "Breadcrumb"
  }, rest, {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-2)",
      fontSize: "var(--fs-sm)",
      color: "var(--ink-faint)",
      ...style
    }
  }), items.map((it, i) => /*#__PURE__*/React.createElement(React.Fragment, {
    key: i
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-faint)"
    }
  }, "/"), i === items.length - 1 ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-strong)",
      fontWeight: "var(--fw-medium)"
    }
  }, it.label) : /*#__PURE__*/React.createElement("a", {
    href: it.href || "#",
    style: {
      color: "inherit",
      textDecoration: "none"
    }
  }, it.label))));
}
Object.assign(__ds_scope, { Breadcrumb, __ds_default_components_navigation_Breadcrumb_1j6vgds: Breadcrumb });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Breadcrumb.jsx", error: String((e && e.message) || e) }); }

// components/navigation/HelpLink.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Contextual help link. Mirrors the shipped _ui/help-link. */
function HelpLink({
  slug,
  label,
  href,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("a", _extends({
    href: href || `/app/help/${slug || ""}`,
    className: "mv-help"
  }, rest, {
    style: {
      display: "inline-flex",
      alignItems: "center",
      gap: "var(--space-1)",
      fontSize: "var(--fs-sm)",
      color: "var(--ink-muted)",
      textDecoration: "none",
      transition: "color .15s",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true",
    style: {
      fontSize: "var(--fs-md)",
      lineHeight: 1
    }
  }, "?"), label, /*#__PURE__*/React.createElement("style", null, ".mv-help:hover{color:var(--brand-1)}"));
}
Object.assign(__ds_scope, { HelpLink, __ds_default_components_navigation_HelpLink_jm3sy8: HelpLink });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/HelpLink.jsx", error: String((e && e.message) || e) }); }

// components/navigation/PageHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Required on every app page. Mirrors the shipped _ui/page-header:
 *  a brand-dim pill eyebrow, a clamped display title, optional breadcrumbs
 *  and a right-aligned actions slot. */
function PageHeader({
  breadcrumbs,
  eyebrow,
  title,
  description,
  actions,
  domain,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    "data-domain": domain
  }, rest, {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start",
      gap: "var(--space-4)",
      flexWrap: "wrap",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: "var(--space-2)"
    }
  }, breadcrumbs && breadcrumbs.length > 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      flexWrap: "wrap",
      gap: "var(--space-2)",
      alignItems: "center",
      fontSize: "var(--fs-xs)",
      textTransform: "uppercase",
      letterSpacing: "var(--ls-caps)",
      color: "var(--ink-faint)"
    }
  }, breadcrumbs.map((c, i) => /*#__PURE__*/React.createElement("span", {
    key: i,
    style: {
      display: "flex",
      gap: "var(--space-2)"
    }
  }, i > 0 && /*#__PURE__*/React.createElement("span", {
    "aria-hidden": "true"
  }, "/"), c.href ? /*#__PURE__*/React.createElement("a", {
    href: c.href,
    style: {
      color: "var(--ink-muted)",
      textDecoration: "none"
    }
  }, c.label) : /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-strong)"
    }
  }, c.label)))), eyebrow && /*#__PURE__*/React.createElement("span", {
    style: {
      display: "inline-flex",
      alignItems: "center",
      width: "fit-content",
      padding: "6px 10px",
      borderRadius: "var(--radius-pill)",
      background: domain ? "var(--accent-dim)" : "var(--brand-dim)",
      color: domain ? "var(--accent-text)" : "var(--brand-1)",
      fontSize: "10px",
      fontWeight: "var(--fw-bold)",
      textTransform: "uppercase",
      letterSpacing: "0.12em"
    }
  }, eyebrow), title && /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontVariationSettings: '"wdth" 100,"wght" 700',
      fontWeight: 700,
      fontSize: "clamp(1.5rem, 2vw, 2.2rem)",
      lineHeight: 1.03,
      letterSpacing: "-0.03em",
      color: "var(--ink-strong)"
    }
  }, title), description && /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      color: "var(--ink-muted)",
      fontSize: "var(--fs-md)",
      lineHeight: "var(--lh-normal)",
      maxWidth: "72ch",
      textWrap: "pretty"
    }
  }, description)), actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      alignItems: "center"
    }
  }, actions));
}
Object.assign(__ds_scope, { PageHeader, __ds_default_components_navigation_PageHeader_408gkf: PageHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/PageHeader.jsx", error: String((e && e.message) || e) }); }

// components/navigation/SideNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** App sidebar. Each item can carry a domain so the accent follows the module. */
function SideNav({
  sections = [],
  value,
  onChange,
  header,
  footer,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("nav", _extends({}, rest, {
    style: {
      width: "var(--sidebar-w)",
      flexShrink: 0,
      display: "flex",
      flexDirection: "column",
      background: "var(--bg-card-alt)",
      borderRight: "1px solid var(--stroke)",
      ...style
    }
  }), header && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4) var(--space-3)",
      borderBottom: "1px solid var(--stroke)"
    }
  }, header), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflow: "auto",
      padding: "var(--space-4) var(--space-3)",
      display: "grid",
      gap: "var(--space-4)",
      alignContent: "start"
    }
  }, sections.map((sec, si) => /*#__PURE__*/React.createElement("div", {
    key: si,
    style: {
      display: "grid",
      gap: 1
    }
  }, sec.label && /*#__PURE__*/React.createElement("span", {
    className: "mv-key",
    style: {
      padding: "var(--space-3) var(--space-3) var(--space-1)"
    }
  }, sec.label), sec.items.map(it => {
    const on = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      "data-domain": it.domain,
      onClick: () => onChange && onChange(it.value),
      className: "mv-nav",
      "data-on": on || undefined,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-3)",
        width: "100%",
        height: 30,
        padding: "0 var(--space-3)",
        border: 0,
        cursor: "pointer",
        background: on ? "var(--bg-card)" : "transparent",
        borderRadius: "var(--radius-lg)",
        boxShadow: on ? "inset 0 0 0 1px var(--stroke)" : "none",
        fontFamily: "var(--font-body)",
        fontSize: "var(--fs-base)",
        fontWeight: on ? "var(--fw-semibold)" : "var(--fw-medium)",
        color: on ? "var(--ink-strong)" : "var(--ink-muted)",
        textAlign: "left",
        transition: "var(--transition-control)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 3,
        height: 14,
        borderRadius: 1,
        flexShrink: 0,
        background: on ? "var(--accent-loud)" : "transparent"
      }
    }), it.icon, /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1,
        whiteSpace: "nowrap",
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
    }, it.label), it.count != null && /*#__PURE__*/React.createElement("span", {
      className: "mv-tnum",
      style: {
        fontSize: "var(--fs-xs)",
        color: "var(--ink-faint)"
      }
    }, it.count));
  })))), footer && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "var(--space-4) var(--space-3)",
      borderTop: "1px solid var(--stroke)"
    }
  }, footer), /*#__PURE__*/React.createElement("style", null, ".mv-nav:hover:not([data-on]){background:var(--surface-hover);color:var(--ink-strong)}"));
}
Object.assign(__ds_scope, { SideNav, __ds_default_components_navigation_SideNav_5hyfkz: SideNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/SideNav.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Underline tabs. The active rule is 2px ink — never a pill. */
function Tabs({
  items = [],
  value,
  onChange,
  size = "md",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    role: "tablist"
  }, rest, {
    style: {
      display: "flex",
      gap: "var(--space-6)",
      borderBottom: "1px solid var(--stroke)",
      ...style
    }
  }), items.map(it => {
    const on = it.value === value;
    return /*#__PURE__*/React.createElement("button", {
      key: it.value,
      role: "tab",
      "aria-selected": on,
      onClick: () => onChange && onChange(it.value),
      className: "mv-tab",
      style: {
        position: "relative",
        border: 0,
        background: "transparent",
        cursor: "pointer",
        padding: size === "sm" ? "6px 0" : "9px 0",
        fontFamily: "var(--font-body)",
        fontSize: size === "sm" ? "var(--fs-sm)" : "var(--fs-base)",
        fontWeight: on ? "var(--fw-semibold)" : "var(--fw-medium)",
        color: on ? "var(--ink-strong)" : "var(--ink-faint)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-2)",
        transition: "color var(--dur-instant) var(--ease-out)"
      }
    }, it.label, it.count != null && /*#__PURE__*/React.createElement("span", {
      className: "mv-tnum",
      style: {
        fontSize: "var(--fs-xs)",
        padding: "1px 5px",
        borderRadius: "var(--radius-2)",
        background: "var(--bg-card)",
        color: "var(--ink-muted)"
      }
    }, it.count), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        background: on ? "var(--ink-strong)" : "transparent",
        transition: "background-color var(--dur-fast) var(--ease-snap)"
      }
    }));
  }), /*#__PURE__*/React.createElement("style", null, ".mv-tab:hover{color:var(--ink-strong)}"));
}
Object.assign(__ds_scope, { Tabs, __ds_default_components_navigation_Tabs_14bb2wz: Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/navigation/TopBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/** Screen header: title, domain eyebrow, search and actions. */
function TopBar({
  title,
  eyebrow,
  domain,
  search,
  actions,
  tabs,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({
    "data-domain": domain
  }, rest, {
    style: {
      background: "var(--bg-card)",
      borderBottom: "1px solid var(--stroke)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: "var(--space-4)",
      minHeight: "var(--control-xl)",
      padding: "var(--space-3) var(--space-6)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 1,
      flex: 1,
      minWidth: 0
    }
  }, eyebrow && /*#__PURE__*/React.createElement("span", {
    className: "mv-key",
    style: {
      color: "var(--accent-text)"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: 0,
      fontFamily: "var(--font-display)",
      fontVariationSettings: '"wdth" 100,"wght" 700',
      fontSize: "var(--fs-2xl)",
      lineHeight: 1.1,
      letterSpacing: "var(--ls-display)",
      color: "var(--ink-strong)"
    }
  }, title)), search, actions && /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: "var(--space-2)",
      alignItems: "center"
    }
  }, actions)), tabs && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "0 var(--space-6)"
    }
  }, tabs));
}
Object.assign(__ds_scope, { TopBar, __ds_default_components_navigation_TopBar_58qv4x: TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Dashboard.jsx
try { (() => {
(function () {
  /* Components resolve at render time so this file is inert when the
     design-system compiler evaluates it, and a missing export degrades one
     element instead of unmounting the tree. */
  const __mv = n => {
    const C = props => {
      const R = (window.MV || {})[n];
      return R ? React.createElement(R, props) : null;
    };
    C.displayName = n;
    return C;
  };
  const PageHeader = __mv("PageHeader"),
    StatusBadge = __mv("StatusBadge"),
    StatusDot = __mv("StatusDot"),
    Button = __mv("Button"),
    Icon = __mv("Icon"),
    DataTable = __mv("DataTable"),
    ProgressBar = __mv("ProgressBar"),
    Banner = __mv("Banner"),
    HelpLink = __mv("HelpLink");

  /* Mirrors src/app/app/dashboard.module.css: quick-links pill bar, KPI chip
     grid (auto-fill minmax 150px), then a 1.5fr/1fr bottom row of cards. */
  function Card({
    eyebrow,
    title,
    action,
    children,
    style
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "22px 24px",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--stroke-card)",
        background: "var(--bg-card)",
        boxShadow: "var(--shadow-card)",
        ...style
      }
    }, /*#__PURE__*/React.createElement("header", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between",
        gap: "12px"
      }
    }, /*#__PURE__*/React.createElement("div", null, eyebrow && /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: "0.68rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.16em",
        color: "var(--ink-faint)"
      }
    }, eyebrow), /*#__PURE__*/React.createElement("h2", {
      style: {
        margin: "4px 0 0",
        fontSize: "1rem",
        fontWeight: 700,
        lineHeight: 1.2,
        color: "var(--ink-strong)"
      }
    }, title)), action), children);
  }
  function KpiChip({
    label,
    value,
    unit,
    sub,
    tone,
    domain
  }) {
    return /*#__PURE__*/React.createElement("div", {
      "data-domain": domain,
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "5px",
        padding: "16px 18px",
        borderRadius: "var(--radius-xl)",
        border: "1px solid var(--stroke-card)",
        background: "var(--bg-card)",
        boxShadow: "var(--shadow-card)",
        position: "relative",
        overflow: "hidden"
      }
    }, domain && /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        inset: "0 auto 0 0",
        width: 3,
        background: "var(--accent-loud)"
      }
    }), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: "0.69rem",
        fontWeight: 700,
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: "var(--ink-faint)"
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 5
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-numeral",
      style: {
        fontSize: "clamp(1.6rem,1.4vw+1.1rem,2.25rem)",
        color: tone || "var(--ink-strong)"
      }
    }, value), unit && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.72rem",
        fontWeight: 700,
        letterSpacing: "var(--ls-caps)",
        textTransform: "uppercase",
        color: "var(--ink-faint)"
      }
    }, unit)), sub && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.76rem",
        color: "var(--ink-muted)",
        lineHeight: 1.3
      }
    }, sub));
  }
  function Dashboard() {
    const D = window.MV_DATA;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        paddingBottom: 8,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement(PageHeader, {
      eyebrow: "Overview",
      title: "Today",
      description: "Live position across inventory, production and purchasing for Ridgeline Manufacturing.",
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "secondary",
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "download",
          size: 14
        })
      }, "Export"), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "plus",
          size: 14
        })
      }, "New job"))
    }), /*#__PURE__*/React.createElement(Banner, {
      variant: "danger",
      title: "WO-4192 is blocked \u2014 3 components short",
      action: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "secondary"
      }, "Create PO")
    }, "Powder coat satin black is 480 short. Southbank Coatings lead time is 6 days."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap"
      }
    }, [["Low stock", "9", true], ["Awaiting receipt", "2", false], ["Open POs", "7", false], ["Unallocated orders", "4", false]].map(([l, c, warn]) => /*#__PURE__*/React.createElement("span", {
      key: l,
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        padding: "8px 14px",
        borderRadius: "var(--radius-pill)",
        border: "1px solid " + (warn ? "var(--warning-dim)" : "var(--stroke-card)"),
        background: "var(--bg-card)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.84rem",
        fontWeight: 500,
        color: warn ? "var(--warning)" : "var(--ink-muted)"
      }
    }, l), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.82rem",
        fontWeight: 700,
        padding: "1px 7px",
        borderRadius: "var(--radius-pill)",
        lineHeight: 1.6,
        background: warn ? "var(--warning-dim)" : "var(--surface-1)",
        color: warn ? "var(--warning)" : "var(--ink-strong)"
      }
    }, c)))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))",
        gap: "12px"
      }
    }, /*#__PURE__*/React.createElement(KpiChip, {
      domain: "inventory",
      label: "Units on hand",
      value: "67,142",
      unit: "ea",
      sub: "Across 2 warehouses"
    }), /*#__PURE__*/React.createElement(KpiChip, {
      domain: "inventory",
      label: "Stock value",
      value: "$412k",
      sub: "+2.4% vs last month"
    }), /*#__PURE__*/React.createElement(KpiChip, {
      domain: "production",
      label: "Open jobs",
      value: "26",
      sub: "+4 this week"
    }), /*#__PURE__*/React.createElement(KpiChip, {
      domain: "inventory",
      label: "Below reorder",
      value: "9",
      tone: "var(--danger)",
      sub: "+3 today"
    }), /*#__PURE__*/React.createElement(KpiChip, {
      domain: "purchasing",
      label: "Committed spend",
      value: "$91k",
      sub: "-12% vs Jul"
    }), /*#__PURE__*/React.createElement(KpiChip, {
      domain: "logistics",
      label: "Awaiting despatch",
      value: "14",
      unit: "orders",
      sub: "2 overdue"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "minmax(0,1.5fr) minmax(0,1fr)",
        gap: "18px",
        alignItems: "start",
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      "data-domain": "production"
    }, /*#__PURE__*/React.createElement(Card, {
      eyebrow: "Operations",
      title: "Jobs on the floor",
      action: /*#__PURE__*/React.createElement("a", {
        href: "#",
        style: {
          fontSize: "0.84rem",
          fontWeight: 600,
          color: "var(--ink-muted)"
        }
      }, "View all"),
      style: {
        padding: 0,
        gap: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "22px 24px 0"
      }
    }), /*#__PURE__*/React.createElement(DataTable, {
      density: "default",
      columns: [{
        key: "id",
        header: "Job",
        mono: true,
        width: 92
      }, {
        key: "product",
        header: "Product"
      }, {
        key: "cell",
        header: "Cell",
        width: 118,
        muted: true
      }, {
        key: "p",
        header: "Progress",
        width: 130,
        render: r => /*#__PURE__*/React.createElement(ProgressBar, {
          value: r.done,
          max: r.qty,
          height: 4,
          tone: r.st[0] === "danger" ? "danger" : r.st[0] === "warn" ? "warn" : "accent"
        })
      }, {
        key: "qty",
        header: "Made",
        align: "right",
        width: 80,
        render: r => /*#__PURE__*/React.createElement("span", {
          className: "mv-tnum"
        }, r.done, "/", r.qty)
      }, {
        key: "due",
        header: "Due",
        width: 96,
        muted: true
      }, {
        key: "st",
        header: "Status",
        width: 150,
        render: r => /*#__PURE__*/React.createElement(StatusBadge, {
          tone: r.st[0],
          dot: true
        }, r.st[1])
      }],
      rows: D.jobs,
      style: {
        borderTop: "1px solid var(--stroke)",
        marginTop: 14
      }
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: "18px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      "data-domain": "purchasing"
    }, /*#__PURE__*/React.createElement(Card, {
      eyebrow: "Operations",
      title: "Incoming",
      style: {
        padding: "22px 24px",
        gap: 0
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexDirection: "column",
        marginTop: 14
      }
    }, D.pos.map((p, i) => /*#__PURE__*/React.createElement("div", {
      key: p.id,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "14px",
        padding: "12px 4px",
        borderBottom: i < D.pos.length - 1 ? "1px solid var(--stroke-card)" : "none"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-mono",
      style: {
        fontSize: "0.86rem",
        fontWeight: 700,
        color: "var(--ink-strong)",
        minWidth: 74
      }
    }, p.id), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.84rem",
        color: "var(--ink-muted)",
        flex: 1,
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap"
      }
    }, p.supplier), /*#__PURE__*/React.createElement(StatusBadge, {
      tone: p.st[0],
      size: "sm"
    }, p.st[1])))))), /*#__PURE__*/React.createElement("div", {
      "data-domain": "audit"
    }, /*#__PURE__*/React.createElement(Card, {
      eyebrow: "Audit",
      title: "Activity",
      action: /*#__PURE__*/React.createElement(HelpLink, {
        slug: "audit/activity-log",
        label: "What's logged?"
      }),
      style: {
        padding: "22px 24px"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: "12px"
      }
    }, D.audit.map((a, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      "data-domain": a.dom,
      style: {
        display: "flex",
        gap: "10px",
        alignItems: "flex-start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-mono",
      style: {
        fontSize: 11,
        color: "var(--ink-faint)",
        width: 34,
        flexShrink: 0,
        paddingTop: 2
      }
    }, a.t), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 3,
        alignSelf: "stretch",
        background: "var(--accent-loud)",
        borderRadius: 2,
        flexShrink: 0
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 1,
        minWidth: 0
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.84rem",
        color: "var(--ink-strong)"
      }
    }, a.what), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "0.76rem",
        color: "var(--ink-faint)"
      }
    }, a.who))))))))));
  }
  Object.assign(window, {
    Dashboard
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Inventory.jsx
try { (() => {
(function () {
  /* Components resolve at render time so this file is inert when the
     design-system compiler evaluates it, and a missing export degrades one
     element instead of unmounting the tree. */
  const __mv = n => {
    const C = props => {
      const R = (window.MV || {})[n];
      return R ? React.createElement(R, props) : null;
    };
    C.displayName = n;
    return C;
  };
  const StateBand = __mv("StateBand"),
    PageHeader = __mv("PageHeader"),
    Button = __mv("Button"),
    Icon = __mv("Icon"),
    Input = __mv("Input"),
    Select = __mv("Select"),
    DataTable = __mv("DataTable"),
    StatusBadge = __mv("StatusBadge"),
    Tag = __mv("Tag"),
    EmptyState = __mv("EmptyState"),
    IconButton = __mv("IconButton"),
    Tabs = __mv("Tabs"),
    HelpLink = __mv("HelpLink");
  function Inventory({
    tab,
    setTab
  }) {
    const D = window.MV_DATA;
    const [sel, setSel] = React.useState([]);
    const rows = tab === "low" ? D.stock.filter(r => r.st[0] !== "ok") : tab === "bins" ? [] : D.stock;
    return /*#__PURE__*/React.createElement("div", {
      "data-domain": "inventory",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "18px"
      }
    }, /*#__PURE__*/React.createElement(PageHeader, {
      eyebrow: "Operations",
      domain: "inventory",
      title: "Inventory",
      description: "Live stock on hand across every warehouse and bin. Updated from the floor as items are scanned.",
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "secondary",
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "download",
          size: 14
        })
      }, "Export"), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "plus",
          size: 14
        })
      }, "Goods inwards"))
    }), /*#__PURE__*/React.createElement(StateBand, {
      domain: "inventory",
      metric: "9",
      unit: "SKUs",
      eyebrow: "Below reorder point",
      title: "1,240 units short against live jobs",
      actions: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ink"
      }, "Create POs")
    }), /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      items: [{
        value: "all",
        label: "All stock",
        count: 412
      }, {
        value: "low",
        label: "Below reorder",
        count: 9
      }, {
        value: "alloc",
        label: "Allocated"
      }, {
        value: "bins",
        label: "Bin locations"
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement(Input, {
      size: "sm",
      placeholder: "Search SKUs",
      prefix: /*#__PURE__*/React.createElement(Icon, {
        name: "search",
        size: 13
      }),
      style: {
        width: 220
      }
    }), /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      options: ["All warehouses", "Kingsgrove", "Botany"]
    }), /*#__PURE__*/React.createElement(Select, {
      size: "sm",
      options: ["All categories", "Fabricated", "Fasteners", "Consumables"]
    }), /*#__PURE__*/React.createElement(Tag, {
      onDismiss: () => {}
    }, "On hand > 0"), /*#__PURE__*/React.createElement("span", {
      style: {
        flex: 1
      }
    }), sel.length > 0 && /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: "var(--ink-muted)"
      }
    }, sel.length, " selected"), sel.length > 0 && /*#__PURE__*/React.createElement(Button, {
      size: "sm",
      variant: "secondary"
    }, "Allocate"), /*#__PURE__*/React.createElement(IconButton, {
      label: "Density",
      variant: "outline",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "rows-3",
      size: 14
    })), /*#__PURE__*/React.createElement(IconButton, {
      label: "Columns",
      variant: "outline",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "columns-3",
      size: 14
    }))), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--bg-card)",
        border: "1px solid var(--stroke-card)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement(DataTable, {
      density: "default",
      selectable: true,
      selected: sel,
      rowKey: "id",
      onToggle: k => setSel(s => s.includes(k) ? s.filter(x => x !== k) : [...s, k]),
      onToggleAll: e => setSel(e.target.checked ? rows.map(r => r.id) : []),
      empty: /*#__PURE__*/React.createElement(EmptyState, {
        numeral: "0",
        title: "No bin locations yet",
        message: "Assign bins to a warehouse to track stock down to the shelf.",
        action: /*#__PURE__*/React.createElement(Button, {
          size: "sm"
        }, "Add bin location"),
        style: {
          border: "none",
          padding: 0
        }
      }),
      columns: [{
        key: "sku",
        header: "SKU",
        mono: true,
        width: 132
      }, {
        key: "name",
        header: "Component"
      }, {
        key: "wh",
        header: "Warehouse",
        width: 112,
        muted: true
      }, {
        key: "oh",
        header: "On hand",
        align: "right",
        width: 92,
        render: r => r.oh.toLocaleString()
      }, {
        key: "alloc",
        header: "Allocated",
        align: "right",
        width: 96,
        muted: true,
        render: r => r.alloc.toLocaleString()
      }, {
        key: "free",
        header: "Free",
        align: "right",
        width: 92,
        render: r => /*#__PURE__*/React.createElement("span", {
          style: {
            color: r.free < 0 ? "var(--danger)" : "var(--ink-strong)",
            fontWeight: r.free < 0 ? 700 : 400
          }
        }, r.free.toLocaleString())
      }, {
        key: "rop",
        header: "Reorder pt",
        align: "right",
        width: 96,
        muted: true,
        render: r => r.rop.toLocaleString()
      }, {
        key: "st",
        header: "Status",
        width: 132,
        render: r => /*#__PURE__*/React.createElement(StatusBadge, {
          tone: r.st[0],
          dot: true
        }, r.st[1])
      }],
      rows: rows
    })), /*#__PURE__*/React.createElement(HelpLink, {
      slug: "inventory/reorder-points",
      label: "How do reorder points work?"
    }));
  }
  Object.assign(window, {
    Inventory
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Inventory.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Production.jsx
try { (() => {
(function () {
  /* Components resolve at render time so this file is inert when the
     design-system compiler evaluates it, and a missing export degrades one
     element instead of unmounting the tree. */
  const __mv = n => {
    const C = props => {
      const R = (window.MV || {})[n];
      return R ? React.createElement(R, props) : null;
    };
    C.displayName = n;
    return C;
  };
  const PageHeader = __mv("PageHeader"),
    Tabs = __mv("Tabs"),
    Button = __mv("Button"),
    Icon = __mv("Icon"),
    DataTable = __mv("DataTable"),
    StatusBadge = __mv("StatusBadge"),
    ProgressBar = __mv("ProgressBar"),
    Banner = __mv("Banner"),
    StatusDot = __mv("StatusDot"),
    HelpLink = __mv("HelpLink");
  function FloorBoard() {
    const D = window.MV_DATA;
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "18px"
      }
    }, D.jobs.slice(0, 3).map(j => /*#__PURE__*/React.createElement("div", {
      key: j.id,
      style: {
        background: "var(--bg-ink)",
        color: "var(--bg-card)",
        borderRadius: "var(--radius-xl)",
        padding: "24px",
        display: "grid",
        gap: "12px",
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      className: "mv-numeral",
      style: {
        position: "absolute",
        right: -10,
        bottom: -34,
        fontSize: "var(--fs-display-6)",
        color: "rgb(255 255 255/.07)"
      }
    }, Math.round(j.done / j.qty * 100)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-mono",
      style: {
        fontSize: 13,
        opacity: .6
      }
    }, j.id), /*#__PURE__*/React.createElement(StatusDot, {
      tone: j.st[0],
      live: j.st[0] === "info",
      size: 10
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        fontSize: 17,
        fontWeight: 600,
        letterSpacing: "var(--ls-tight)"
      }
    }, j.product), /*#__PURE__*/React.createElement("span", {
      style: {
        position: "relative",
        display: "flex",
        alignItems: "baseline",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-numeral",
      style: {
        fontSize: "var(--fs-display-2)"
      }
    }, j.done), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 17,
        opacity: .5
      }
    }, "/ ", j.qty)), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        opacity: .65,
        borderTop: "var(--border-rule) solid rgb(255 255 255/.2)",
        paddingTop: 10
      }
    }, /*#__PURE__*/React.createElement("span", null, j.cell), /*#__PURE__*/React.createElement("span", null, j.due)))));
  }
  function Production({
    tab,
    setTab,
    onRelease
  }) {
    const D = window.MV_DATA;
    return /*#__PURE__*/React.createElement("div", {
      "data-domain": "production",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "18px"
      }
    }, /*#__PURE__*/React.createElement(PageHeader, {
      eyebrow: "Operations",
      domain: "production",
      title: "Production Orders",
      description: "Every job on the floor, with live component availability against its BOM.",
      actions: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "accent",
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "plus",
          size: 14
        })
      }, "New job")
    }), /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      items: [{
        value: "open",
        label: "Open",
        count: 26
      }, {
        value: "released",
        label: "Released",
        count: 9
      }, {
        value: "done",
        label: "Completed"
      }, {
        value: "board",
        label: "Floor board"
      }]
    }), tab === "board" ? /*#__PURE__*/React.createElement(FloorBoard, null) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Banner, {
      variant: "warning",
      title: "WO-4192 is short 3 components",
      action: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "secondary"
      }, "View shortages")
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--bg-card)",
        border: "1px solid var(--stroke-card)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement(DataTable, {
      density: "default",
      columns: [{
        key: "id",
        header: "Job",
        mono: true,
        width: 96
      }, {
        key: "product",
        header: "Product"
      }, {
        key: "cell",
        header: "Cell",
        width: 124,
        muted: true
      }, {
        key: "p",
        header: "Progress",
        width: 150,
        render: r => /*#__PURE__*/React.createElement(ProgressBar, {
          value: r.done,
          max: r.qty,
          height: 4,
          tone: r.st[0] === "danger" ? "danger" : r.st[0] === "warn" ? "warn" : "accent"
        })
      }, {
        key: "qty",
        header: "Made",
        align: "right",
        width: 92,
        render: r => /*#__PURE__*/React.createElement("span", {
          className: "mv-tnum"
        }, r.done, "/", r.qty)
      }, {
        key: "due",
        header: "Due",
        width: 104,
        muted: true
      }, {
        key: "st",
        header: "Status",
        width: 160,
        render: r => /*#__PURE__*/React.createElement(StatusBadge, {
          tone: r.st[0],
          dot: true
        }, r.st[1])
      }, {
        key: "a",
        header: "",
        width: 88,
        align: "right",
        render: r => r.st[0] === "neutral" ? /*#__PURE__*/React.createElement(Button, {
          size: "sm",
          variant: "secondary",
          onClick: onRelease
        }, "Release") : null
      }],
      rows: D.jobs
    })), /*#__PURE__*/React.createElement(HelpLink, {
      slug: "production/allocation",
      label: "How is stock allocated to a job?"
    })));
  }
  Object.assign(window, {
    Production
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Production.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Purchasing.jsx
try { (() => {
(function () {
  /* Components resolve at render time so this file is inert when the
     design-system compiler evaluates it, and a missing export degrades one
     element instead of unmounting the tree. */
  const __mv = n => {
    const C = props => {
      const R = (window.MV || {})[n];
      return R ? React.createElement(R, props) : null;
    };
    C.displayName = n;
    return C;
  };
  const PageHeader = __mv("PageHeader"),
    Tabs = __mv("Tabs"),
    Button = __mv("Button"),
    Icon = __mv("Icon"),
    Input = __mv("Input"),
    DataTable = __mv("DataTable"),
    StatusBadge = __mv("StatusBadge"),
    Field = __mv("Field"),
    Select = __mv("Select"),
    Textarea = __mv("Textarea"),
    ListPanel = __mv("ListPanel"),
    ListRow = __mv("ListRow"),
    HelpLink = __mv("HelpLink"),
    StateBand = __mv("StateBand");
  const TPL = "1.3fr 2fr 70px 80px 90px";
  function Purchasing({
    tab,
    setTab,
    onSend,
    detail,
    setDetail
  }) {
    const D = window.MV_DATA;
    if (detail) return /*#__PURE__*/React.createElement(PoDetail, {
      onBack: () => setDetail(null),
      onSend: onSend
    });
    return /*#__PURE__*/React.createElement("div", {
      "data-domain": "purchasing",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "18px"
      }
    }, /*#__PURE__*/React.createElement(PageHeader, {
      eyebrow: "Operations",
      domain: "purchasing",
      title: "Purchase Orders",
      description: "Supplier orders, expected receipts and receiving discrepancies.",
      actions: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "accent",
        iconLeft: /*#__PURE__*/React.createElement(Icon, {
          name: "plus",
          size: 14
        })
      }, "New PO")
    }), /*#__PURE__*/React.createElement(StateBand, {
      domain: "purchasing",
      metric: "7",
      unit: "open",
      eyebrow: "Awaiting receipt",
      title: "2 arrive today \u2014 Kingsgrove Metals and Alloy Supply Co.",
      actions: /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "ink"
      }, "Open receiving")
    }), /*#__PURE__*/React.createElement(Tabs, {
      value: tab,
      onChange: setTab,
      items: [{
        value: "open",
        label: "Open",
        count: 7
      }, {
        value: "receiving",
        label: "Receiving",
        count: 2
      }, {
        value: "suppliers",
        label: "Suppliers"
      }, {
        value: "draft",
        label: "Drafts",
        count: 1
      }]
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--bg-card)",
        border: "1px solid var(--stroke-card)",
        borderRadius: "var(--radius-xl)",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement(DataTable, {
      density: "default",
      columns: [{
        key: "id",
        header: "PO",
        mono: true,
        width: 96,
        render: r => /*#__PURE__*/React.createElement("a", {
          href: "#",
          onClick: e => {
            e.preventDefault();
            setDetail(r.id);
          },
          style: {
            color: "var(--brand-1)",
            fontWeight: 600
          }
        }, r.id)
      }, {
        key: "supplier",
        header: "Supplier"
      }, {
        key: "lines",
        header: "Lines",
        align: "right",
        width: 70,
        muted: true
      }, {
        key: "value",
        header: "Value",
        align: "right",
        width: 96
      }, {
        key: "eta",
        header: "Expected",
        width: 96,
        muted: true
      }, {
        key: "st",
        header: "Status",
        width: 170,
        render: r => /*#__PURE__*/React.createElement(StatusBadge, {
          tone: r.st[0],
          dot: true
        }, r.st[1])
      }, {
        key: "a",
        header: "",
        width: 78,
        align: "right",
        render: r => r.st[0] === "neutral" ? /*#__PURE__*/React.createElement(Button, {
          size: "sm",
          variant: "secondary",
          onClick: onSend
        }, "Send") : null
      }],
      rows: D.pos
    })), /*#__PURE__*/React.createElement(HelpLink, {
      slug: "purchasing/create-po",
      label: "How do purchase orders work?"
    }));
  }
  function PoDetail({
    onBack,
    onSend
  }) {
    const lines = [["SKU-4410-B", "Bracket, 6mm mild steel", "2,000", "$2.40", "$4,800.00"], ["SKU-1102", "M6 flange nut, zinc plated", "20,000", "$0.11", "$2,200.00"], ["SKU-3050-A", "Panel, 1200×600 alloy, 3mm", "400", "$9.60", "$3,840.00"], ["SKU-6612", "Weld wire ER70S-6, 15kg", "40", "$32.00", "$1,280.00"]];
    return /*#__PURE__*/React.createElement("div", {
      "data-domain": "purchasing",
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "18px"
      }
    }, /*#__PURE__*/React.createElement(PageHeader, {
      domain: "purchasing",
      breadcrumbs: [{
        label: "Purchase Orders",
        href: "#"
      }, {
        label: "PO-1042"
      }],
      title: "PO-1042",
      actions: /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "secondary"
      }, "Download PDF"), /*#__PURE__*/React.createElement(Button, {
        size: "sm",
        variant: "accent",
        onClick: onSend
      }, "Receive Goods \u2192"))
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        border: "1px solid var(--stroke-card)",
        borderRadius: "var(--radius-xl)",
        background: "var(--bg-card)",
        boxShadow: "var(--shadow-card)",
        padding: "18px",
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "18px"
      }
    }, [["Supplier", "Kingsgrove Metals"], ["Expected", "22 Aug 2026"], ["Payment terms", "Net 30"], ["Raised by", "Dana Reyes"]].map(([k, v]) => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        display: "grid",
        gap: 4
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-key"
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "var(--fs-md)",
        fontWeight: 600,
        color: "var(--ink-strong)"
      }
    }, v)))), /*#__PURE__*/React.createElement(ListPanel, {
      eyebrow: "Operations",
      title: "Order lines",
      columns: {
        template: TPL,
        labels: ["SKU", "Item", "Qty", "Unit", "Amount"]
      },
      action: /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          alignItems: "baseline",
          gap: 6
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "mv-key"
      }, "Total ex GST"), /*#__PURE__*/React.createElement("span", {
        className: "mv-numeral",
        style: {
          fontSize: "var(--fs-display-1)",
          color: "var(--ink-strong)"
        }
      }, "$12,480"))
    }, lines.map(l => /*#__PURE__*/React.createElement(ListRow, {
      key: l[0],
      template: TPL
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-mono",
      style: {
        fontSize: "var(--fs-sm)"
      }
    }, l[0]), /*#__PURE__*/React.createElement("span", null, l[1]), /*#__PURE__*/React.createElement("span", {
      className: "mv-tnum",
      style: {
        textAlign: "right"
      }
    }, l[2]), /*#__PURE__*/React.createElement("span", {
      className: "mv-tnum",
      style: {
        textAlign: "right",
        color: "var(--ink-muted)"
      }
    }, l[3]), /*#__PURE__*/React.createElement("span", {
      className: "mv-tnum",
      style: {
        textAlign: "right",
        fontWeight: 600
      }
    }, l[4])))), /*#__PURE__*/React.createElement("div", {
      style: {
        border: "1px solid var(--stroke-card)",
        borderRadius: "var(--radius-xl)",
        background: "var(--bg-card)",
        boxShadow: "var(--shadow-card)",
        padding: "18px",
        display: "grid",
        gap: "10px",
        maxWidth: 560
      }
    }, /*#__PURE__*/React.createElement(Field, {
      label: "Note to supplier",
      hint: "Printed on the PDF sent to Kingsgrove Metals."
    }, /*#__PURE__*/React.createElement(Textarea, {
      rows: 3,
      defaultValue: "Deliver to Kingsgrove dock B before 3pm. Reference PO-1042 on all packaging."
    }))), /*#__PURE__*/React.createElement("a", {
      href: "#",
      onClick: e => {
        e.preventDefault();
        onBack();
      },
      style: {
        fontSize: "var(--fs-base)",
        color: "var(--ink-muted)",
        display: "inline-flex",
        alignItems: "center",
        gap: 4
      }
    }, "\u2190 Back to purchase orders"));
  }
  Object.assign(window, {
    Purchasing
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Purchasing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/Shell.jsx
try { (() => {
(function () {
  /* Components resolve at render time so this file is inert when the
     design-system compiler evaluates it, and a missing export degrades one
     element instead of unmounting the tree. */
  const __mv = n => {
    const C = props => {
      const R = (window.MV || {})[n];
      return R ? React.createElement(R, props) : null;
    };
    C.displayName = n;
    return C;
  };
  const Logo = __mv("Logo"),
    Icon = __mv("Icon"),
    StatusDot = __mv("StatusDot");

  /* Mirrors src/app/app/shell.module.css: 240px sticky dark sidebar, brand
     centred at 32px, 10px/0.14em section labels, 10px/12px nav items with a
     brand-dim active pill, and a transparent topbar over --bg-page. */
  /* Sidebar sections, labels, order and icons transcribed from the shipped
     app (app.manuva.app, Aug 2026). The real nav carries no counts. */
  const NAV = [{
    label: "Operations",
    items: [["dashboard", "Dashboard", "layout-dashboard", null], ["products", "Products", "package", "products"], ["components", "Components", "layers", "inventory"], ["templates", "Templates", "copy", "products"], ["goods-inwards", "Goods Inwards", "package-open", "logistics"], ["orders", "Orders", "file-text", null], ["stocktake", "Stocktake", "list-checks", "inventory"], ["suppliers", "Suppliers", "building-2", "logistics"], ["reports", "Reports", "chart-column", "audit"], ["purchasing", "Purchasing", "shopping-bag", "purchasing"], ["inventory", "Inventory", "briefcase", "inventory"]]
  }, {
    label: "Warehouse",
    items: [["locations", "Locations", "house", "logistics"]]
  }, {
    label: "Workspace",
    items: [["activity-log", "Activity Log", "clock", "audit"], ["trash", "Trash", "trash-2", null]]
  }, {
    label: "Platform",
    items: [["tenants", "Tenants", "house", null], ["audit-log", "Audit log", "file-text", "audit"], ["team", "Team", "users", null]]
  }];
  const SIDEBAR_VARS = {
    "--ink-strong": "#F8F7F5",
    "--ink-muted": "#A8A79E",
    "--ink-faint": "#74746C",
    "--surface-1": "rgba(255,255,255,0.06)",
    "--surface-hover": "rgba(255,255,255,0.07)",
    "--stroke": "rgba(255,255,255,0.09)",
    "--stroke-strong": "rgba(255,255,255,0.16)",
    "--brand-1": "#8B9BFF",
    "--brand-dim": "rgba(139,155,255,0.18)"
  };
  function AppShell({
    view,
    setView,
    children,
    topbar,
    impersonating
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "var(--sidebar-w) 1fr",
        minHeight: "100vh",
        height: "100vh",
        overflow: "hidden",
        background: "var(--bg-page)",
        color: "var(--ink-strong)"
      }
    }, /*#__PURE__*/React.createElement("aside", {
      style: {
        ...SIDEBAR_VARS,
        background: "var(--bg-sidebar)",
        borderRight: "1px solid rgba(255,255,255,0.09)",
        display: "flex",
        flexDirection: "column",
        padding: "20px 16px",
        gap: "10px",
        height: "100vh",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "4px 10px 18px",
        display: "flex"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "lockup",
      height: 26,
      base: "../../",
      style: {
        color: "#F8F7F5"
      }
    })), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        padding: "0 4px",
        flex: "1 1 auto",
        minHeight: 0,
        overflowY: "auto",
        overflowX: "hidden"
      }
    }, NAV.map(sec => /*#__PURE__*/React.createElement("div", {
      key: sec.label,
      style: {
        display: "grid",
        gap: "4px"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        fontSize: "10px",
        textTransform: "uppercase",
        letterSpacing: "0.14em",
        color: "var(--ink-faint)",
        padding: "0 12px 6px",
        margin: 0
      }
    }, sec.label), sec.items.map(([v, label, icon, domain]) => {
      const on = v === view;
      return /*#__PURE__*/React.createElement("button", {
        key: v,
        "data-domain": domain || undefined,
        onClick: () => setView(v),
        className: "mv-nav",
        "data-on": on || undefined,
        style: {
          display: "flex",
          alignItems: "center",
          gap: "12px",
          padding: "10px 12px",
          borderRadius: "10px",
          color: on ? "#F8F7F5" : "var(--ink-muted)",
          fontSize: "14px",
          fontWeight: 500,
          textAlign: "left",
          cursor: "pointer",
          width: "100%",
          fontFamily: "var(--font-body)",
          background: on ? domain ? "var(--accent-dim)" : "var(--brand-dim)" : "transparent",
          border: "1px solid " + (on ? domain ? "var(--accent-dim)" : "var(--brand-dim)" : "transparent"),
          transition: "background .15s ease,color .15s ease,border-color .15s ease"
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: icon,
        size: 20,
        style: {
          opacity: on ? 1 : .6,
          color: on ? domain ? "var(--accent-loud)" : "var(--brand-1)" : "currentColor"
        }
      }), /*#__PURE__*/React.createElement("span", {
        style: {
          flex: 1,
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis"
        }
      }, label));
    })))), /*#__PURE__*/React.createElement("style", null, ".mv-nav:hover:not([data-on]){background:rgba(255,255,255,.07);color:#F8F7F5;border-color:rgba(255,255,255,.07)}")), /*#__PURE__*/React.createElement("main", {
      style: {
        display: "flex",
        flexDirection: "column",
        minHeight: 0,
        overflow: "hidden"
      }
    }, topbar, impersonating && /*#__PURE__*/React.createElement(ImpersonationBar, {
      tenant: impersonating
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        padding: "var(--content-pad)",
        overflowY: "auto"
      }
    }, children)));
  }

  /* "Viewing as <tenant>" — a support user is inside a customer's workspace.
     Warning-toned, full width, never dismissible: only Exit clears it. */
  function ImpersonationBar({
    tenant,
    onExit
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "var(--space-4)",
        padding: "10px var(--space-6)",
        background: "var(--warning-dim)",
        borderBlock: "1px solid rgb(224 134 0/.28)",
        fontSize: "var(--fs-md)",
        color: "var(--warning)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "Viewing as ", /*#__PURE__*/React.createElement("strong", {
      style: {
        color: "var(--warning)"
      }
    }, tenant)), /*#__PURE__*/React.createElement("button", {
      onClick: onExit,
      style: {
        padding: "3px 12px",
        borderRadius: "var(--radius-1)",
        border: "1px solid rgb(224 134 0/.45)",
        background: "transparent",
        color: "var(--warning)",
        fontFamily: "var(--font-body)",
        fontSize: "var(--fs-sm)",
        fontWeight: 600,
        cursor: "pointer"
      }
    }, "Exit"));
  }
  function TopBar({
    tenant = "Ridgeline Mfg",
    user = "DR",
    children
  }) {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        padding: "16px 28px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-start",
        gap: "16px",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        flex: 1,
        minWidth: 0
      }
    }, children), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        gap: "8px",
        flexWrap: "wrap"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        minHeight: 40,
        padding: "0 14px",
        borderRadius: "10px",
        border: "1px solid var(--stroke)",
        background: "var(--bg-card)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: "10px",
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--ink-faint)",
        lineHeight: 1
      }
    }, "Tenant"), /*#__PURE__*/React.createElement("strong", {
      style: {
        fontSize: "13px",
        lineHeight: 1,
        color: "var(--ink-strong)"
      }
    }, tenant)), /*#__PURE__*/React.createElement(StatusDot, {
      tone: "success",
      live: true,
      size: 7,
      label: /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "var(--ink-muted)"
        }
      }, "Shopify live")
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        width: 40,
        height: 40,
        borderRadius: "50%",
        background: "var(--brand-dim)",
        color: "var(--brand-1)",
        display: "grid",
        placeItems: "center",
        fontWeight: 700,
        fontSize: 14,
        border: "2px solid var(--stroke)",
        flexShrink: 0
      }
    }, user)));
  }
  Object.assign(window, {
    AppShell,
    ShellTopBar: TopBar,
    ImpersonationBar
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/Shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/app/data.js
try { (() => {
window.MV_DATA = {
  stock: [{
    id: 1,
    sku: "SKU-4410-B",
    name: "Bracket, 6mm mild steel",
    wh: "Kingsgrove",
    oh: 8412,
    alloc: 1200,
    free: 7212,
    rop: 2000,
    st: ["ok", "In stock"]
  }, {
    id: 2,
    sku: "SKU-2288",
    name: "Hinge assembly, left",
    wh: "Kingsgrove",
    oh: 240,
    alloc: 240,
    free: 0,
    rop: 500,
    st: ["warn", "Low"]
  }, {
    id: 3,
    sku: "SKU-9014-C",
    name: "Powder coat, satin black 20L",
    wh: "Botany",
    oh: 0,
    alloc: 480,
    free: -480,
    rop: 120,
    st: ["danger", "Short 480"]
  }, {
    id: 4,
    sku: "SKU-1102",
    name: "M6 flange nut, zinc",
    wh: "Kingsgrove",
    oh: 54800,
    alloc: 12000,
    free: 42800,
    rop: 10000,
    st: ["ok", "In stock"]
  }, {
    id: 5,
    sku: "SKU-7731",
    name: "Gas strut 250N",
    wh: "Botany",
    oh: 1180,
    alloc: 900,
    free: 280,
    rop: 400,
    st: ["warn", "Low"]
  }, {
    id: 6,
    sku: "SKU-3050-A",
    name: "Panel, 1200×600 alloy",
    wh: "Kingsgrove",
    oh: 326,
    alloc: 120,
    free: 206,
    rop: 150,
    st: ["ok", "In stock"]
  }, {
    id: 7,
    sku: "SKU-6612",
    name: "Weld wire ER70S-6, 15kg",
    wh: "Botany",
    oh: 44,
    alloc: 44,
    free: 0,
    rop: 20,
    st: ["warn", "Low"]
  }, {
    id: 8,
    sku: "SKU-8890-D",
    name: "Castor, braked 100mm",
    wh: "Kingsgrove",
    oh: 2140,
    alloc: 400,
    free: 1740,
    rop: 600,
    st: ["ok", "In stock"]
  }],
  jobs: [{
    id: "WO-4192",
    product: "Trolley, heavy duty",
    qty: 120,
    done: 74,
    due: "Fri 14 Aug",
    cell: "Assembly 2",
    st: ["danger", "Blocked · 3 short"]
  }, {
    id: "WO-4193",
    product: "Bench, 1800 stainless",
    qty: 40,
    done: 40,
    due: "Thu 13 Aug",
    cell: "Fabrication",
    st: ["ok", "Complete"]
  }, {
    id: "WO-4194",
    product: "Trolley, light duty",
    qty: 200,
    done: 96,
    due: "Mon 17 Aug",
    cell: "Assembly 1",
    st: ["info", "In progress"]
  }, {
    id: "WO-4195",
    product: "Shelf kit, 4-tier",
    qty: 80,
    done: 0,
    due: "Wed 19 Aug",
    cell: "Assembly 2",
    st: ["neutral", "Planned"]
  }, {
    id: "WO-4196",
    product: "Cabinet, lockable",
    qty: 25,
    done: 11,
    due: "Tue 18 Aug",
    cell: "Fabrication",
    st: ["warn", "At risk"]
  }],
  pos: [{
    id: "PO-1042",
    supplier: "Kingsgrove Metals",
    lines: 14,
    value: "$12,480",
    eta: "22 Aug",
    st: ["info", "Sent"]
  }, {
    id: "PO-1041",
    supplier: "Southbank Coatings",
    lines: 3,
    value: "$2,140",
    eta: "15 Aug",
    st: ["ok", "Confirmed"]
  }, {
    id: "PO-1040",
    supplier: "Fastener Direct",
    lines: 22,
    value: "$6,905",
    eta: "12 Aug",
    st: ["warn", "Partially received"]
  }, {
    id: "PO-1039",
    supplier: "Gasflow Pty Ltd",
    lines: 2,
    value: "$1,320",
    eta: "—",
    st: ["neutral", "Draft"]
  }],
  audit: [{
    t: "09:41",
    who: "Dana R.",
    what: "Released WO-4194",
    obj: "WO-4194",
    dom: "production"
  }, {
    t: "09:38",
    who: "System",
    what: "Synced 12 orders from Shopify",
    obj: "Orders",
    dom: "inventory"
  }, {
    t: "09:12",
    who: "Sam K.",
    what: "Received 480 of SKU-1102 against PO-1040",
    obj: "PO-1040",
    dom: "purchasing"
  }, {
    t: "08:55",
    who: "Dana R.",
    what: "Changed reorder point 400 → 500 on SKU-2288",
    obj: "SKU-2288",
    dom: "inventory"
  }, {
    t: "08:30",
    who: "Priya N.",
    what: "Created BOM v3.2 for Trolley, heavy duty",
    obj: "BOM v3.2",
    dom: "products"
  }]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/data.js", error: String((e && e.message) || e) }); }

// ui_kits/app/doc-page.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <doc-page> — paged-document shell for printable HTML.
 *
 * FIRST, decide how the document paginates — up front, before building:
 *
 * - FLOWING document (the default): write the whole document as one
 *   normal HTML flow inside <doc-page>; the browser's print engine
 *   splits it onto pages at export. Use for long-form documents with a
 *   single text flow: reports, memos, letters, essays.
 * - EXPLICIT pagination: a fixed set of pre-paginated pages, one
 *   <section class="page"> child per page. Use when the user asks for a
 *   specific page count, or the design implies one: a one-page resume, a
 *   two-sided flier, a poster, a certificate, a brochure — any richly
 *   laid-out document without a single text flow.
 * - If in doubt, ask the user as part of the build.
 *
 * PAGE SIZING — paper differs by country (letter vs A4), so the printed
 * sheet is not one fixed truth:
 * - FLOWING documents pin NO paper size: the print engine paginates
 *   onto the user's real paper, and the content reflows to it.
 * - EXPLICITLY PAGINATED documents print each page at a FIXED page box
 *   with overflow hidden — letter by default, size="a4" for a clearly
 *   metric user, the user's chosen paper when they export. Design each
 *   page to FILL that box, fitting letter and A4 alike without overlap.
 * - width/height pin an explicit fixed size, ONLY when the user gives
 *   one.
 * Never write your own @page rule or hard-code paper dimensions in the
 * content.
 *
 * Sizing modes (attributes):
 *   (none)                      — portrait: flowing docs use the user's
 *           paper; explicitly paginated pages use the named size box
 *           (letter unless size="a4")
 *   orientation="landscape"     — the same, landscape
 *   width / height              — explicit fixed size, ONLY when the user
 *           gives one (e.g. width="22in" height="30in" for a 22×30
 *           poster): the page IS the design's size, printed at true
 *           dimensions (or scaled onto the user's paper at print time).
 *           Any absolute CSS length: px/in/mm/cm/pt/pc.
 * The component announces the chosen mode to the host app at runtime (a
 * meta tag it injects), so the print path can inject the user's true
 * paper size.
 *
 * On screen the document renders on a desk background: a flowing
 * document as one tall scrolling sheet (Google Docs' pageless view);
 * explicitly paginated documents as one card per page.
 *
 * EXPLICIT pagination usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page>
 *     <section class="page" id="p1">…one page's design…</section>
 *     <section class="page" id="p2">…</section>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * How the page box works, concretely: each .page prints as ONE full-bleed
 * sheet at a FIXED physical size — letter by default (set size="a4" for
 * a clearly metric user), the user's chosen paper when they export —
 * with overflow hidden. Nothing scrolls and nothing reflows onto a next
 * sheet: content that misses the box is CLIPPED. Design each page to
 * FILL that page box, and to fit it — letter and A4 alike — without
 * overlap. Each page is a size container; don't size anything in
 * viewport units (they track the window, not the page), and never set
 * width or height on the .page section itself (the component sizes the
 * page box; an authored height like 100% is meaningless at print and is
 * overridden). The component owns the page box, the screen card chrome,
 * and the page breaks (never add your own break-before/after). Don't mix
 * .page sections with flowing content or header/footer slots in the same
 * document.
 *
 * FLOWING usage:
 *   <style>doc-page:not(:defined){visibility:hidden}</style>
 *   <doc-page margin="0.75in">
 *     <h1>Title</h1>
 *     <p>…body…</p>
 *   </doc-page>
 *   <script src="doc-page.js"></script>
 * There is no manual page-splitting — the browser's print engine
 * paginates at export. Standard break-hygiene rules (`break-inside:
 * avoid` on figures, code blocks, images and table rows; `orphans/
 * widows: 3`) are applied so paragraphs and groups split cleanly. On
 * screen and at print, headings default to `text-wrap: balance` and
 * body text to `text-wrap: pretty`; the defaults have zero specificity,
 * so any text-wrap you declare wins.
 *
 * Other attributes:
 *   size    — letter | a4 | legal (default letter). Flowing documents:
 *           preview proportion only — it does NOT pin their printed
 *           paper (the print dialog's paper governs); leave it alone
 *           there. Explicitly paginated documents: it sets the page box
 *           the cards and the pinned @page share (the export dialog's
 *           choice overrides both at print) — set size="a4" for a
 *           clearly metric user. Scaled-fit: names the sheet the fit is
 *           computed against, same a4-for-metric-users advice.
 *   content-width / content-height — the design's own fixed dimensions
 *           (CSS lengths), for scaling a fixed-size design ONTO the
 *           named sheet: content lays out at exactly this size, and the
 *           component scales it to fit that sheet's printable area
 *           (centered horizontally, top-aligned; the export dialog
 *           re-fits to the user's actual paper choice where available).
 *           Both must be set; they do not change the page box. For pages
 *           WITHOUT running header/footer slots.
 *   margin  — printable inset on every page of a FLOWING document
 *           (default 0.75in); margin="0" makes pages full-bleed.
 *           Explicitly paginated pages are always full-bleed.
 *
 * Running header/footer (flowing documents only): give an element
 * `slot="header"` or `slot="footer"` and it repeats on every printed
 * page via `position: fixed`. To keep body text from sliding under it,
 * the component prints inside a single-cell table whose <thead>/<tfoot>
 * are spacers sized to the header/footer height — browsers repeat
 * thead/tfoot on every page, so each sheet's content starts below the
 * header and ends above the footer. On screen the header/footer render
 * once at the top/bottom of the sheet.
 *
 * At print the component injects `@page { margin: 0 }` (which leaves
 * Chrome no margin box to draw its date/URL/page-count header in) and
 * moves the visual margin onto the sheet's own padding. It also marks
 * the document as owning its print CSS (a
 * `meta[name="omelette-owns-print"]` it injects at runtime), so the
 * PDF export never injects page-geometry CSS of its own on top.
 *
 * Print best practices for the content you author:
 * - Multi-column text: use CSS columns (`column-count` +
 *   `column-gap`), never side-by-side flex/grid columns — only real
 *   CSS columns flow and break across pages. `column-span: all` lets
 *   a heading span the columns; `hyphens: auto` (needs `lang` on
 *   the html element) keeps narrow columns readable.
 * - Page breaks in flowing documents: `break-before: page` on an
 *   element that must start a new page (a chapter, an appendix). Add
 *   your own kept-together blocks (callouts, stat tiles, cards) to a
 *   `break-inside: avoid` rule, and keep each one shorter than a page.
 * - Extend `orphans: 3; widows: 3` to any custom text blocks you add
 *   (p and li are covered by default).
 * - Give long tables a <thead> — browsers repeat it on every printed
 *   page.
 * - No `position: fixed`/`sticky` and no viewport units in content:
 *   fixed elements stamp every printed page (running headers/footers go
 *   in the component's slots) and `100vh` mis-sizes at print.
 *
 * Author content as static HTML so the user can click-to-edit any text
 * directly. Do not set width/padding/background on the document body —
 * the component owns the sheet box.
 */
/* END USAGE */

(() => {
  const PAPER = {
    letter: ['8.5in', '11in'],
    a4: ['210mm', '297mm'],
    legal: ['8.5in', '14in']
  };
  const CSS_LENGTH = /^\d+(\.\d+)?(px|in|mm|cm|pt|pc)$/;
  // Unitless "0" is a valid CSS length and the natural way to write
  // margin="0"; normalise it to 0px so max()/calc() (which reject a bare
  // number) keep working.
  const safeLen = (v, fb) => {
    v = (v || '').trim();
    return v === '0' ? '0px' : CSS_LENGTH.test(v) ? v : fb;
  };
  // WebKit (Safari and every iOS browser shell) never repeats a table's
  // thead/tfoot on printed pages (WebKit bug 17205), so the spacer-borne
  // vertical margins of a FLOWING document reach only the first page
  // there. Engine check, not browser check: vendor is 'Apple Computer,
  // Inc.' exactly for WebKit and 'Google Inc.' for Blink.
  const WK_PRINT = /apple/i.test(navigator.vendor || '');
  // CSS length → px number (CSS absolute units are exact: 1in = 96px).
  // Returns NaN for anything safeLen would reject — callers gate on it.
  const PX_PER = {
    px: 1,
    in: 96,
    mm: 96 / 25.4,
    cm: 96 / 2.54,
    pt: 96 / 72,
    pc: 16
  };
  const toPx = v => {
    const m = /^(\d+(?:\.\d+)?)(px|in|mm|cm|pt|pc)$/.exec((v || '').trim());
    return m ? parseFloat(m[1]) * PX_PER[m[2]] : NaN;
  };
  const stylesheet = `
    :host {
      position: relative;
      display: block;
      /* When the viewport is narrower than the page, grow to wrap the
       * sheet (plus this padding) instead of staying viewport-width, so
       * the desk background and right margin reach the sheet's far edge
       * in the horizontal scroll. */
      min-width: max-content;
      min-height: 100vh;
      background: #f5f5f4;
      padding: 48px 24px;
      box-sizing: border-box;
      font-family: -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
      --doc-page-w: 8.5in;
      --doc-page-h: 11in;
      --doc-page-margin: 0.75in;
      --doc-hdr-h: 0px;
      --doc-ftr-h: 0px;
      --doc-hdr-pad: 0px;
      --doc-ftr-pad: 0px;
    }
    .sheet {
      width: var(--doc-page-w);
      margin: 0 auto;
      background: #fff;
      box-shadow: 0 2px 10px rgba(20, 20, 19, 0.12);
      border-radius: 7px;
      box-sizing: border-box;
      padding: var(--doc-page-margin);
    }
    .frame { width: 100%; border-collapse: collapse; }
    /* Scaled-fit mode (content-width/content-height): the inner .fit box
     * lays the content out at its authored fixed size and scales it onto
     * the printable area; .fit-box reserves the scaled footprint in flow
     * (transforms don't affect layout) and centers it. Without the mode,
     * both divs are unstyled block pass-throughs. */
    /* Explicit pagination: direct .page children are the pages. The sheet
     * becomes a transparent stack and each page carries the card look on
     * screen; at print each page is exactly one full-bleed sheet. The
     * ::slotted defaults are deliberately weak (document CSS wins), so
     * authored page styling can override any of this. */
    .sheet.paginated {
      background: transparent;
      box-shadow: none;
      border-radius: 0;
      padding: 0;
    }
    .paginated ::slotted(.page) {
      position: relative;
      display: block;
      width: 100%;
      aspect-ratio: var(--doc-page-ar);
      container-type: size;
      overflow: hidden;
      box-sizing: border-box;
      background: #fff;
      border-radius: 7px;
      box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
      print-color-adjust: exact;
      -webkit-print-color-adjust: exact;
      break-inside: avoid;
    }
    .paginated ::slotted(.page:not(:first-child)) { margin-top: 1rem; }
    @media print {
      .sheet.paginated { padding: 0; }
      /* The flowing-document vertical inset lives on the repeating
       * thead/tfoot spacers, not the sheet padding — they must go too,
       * or each full-sheet .page is pushed ~margin down and spills onto
       * a second sheet. Paginated pages are full-bleed by definition
       * (content owns its insets). */
      .sheet.paginated .hdr-space,
      .sheet.paginated .ftr-space { height: 0; }
      .paginated ::slotted(.page) {
        border-radius: 0 !important;
        box-shadow: none !important;
        margin: 0 !important;
        /* Physical page-box sizing, no viewport units: Safari resolves
         * 100vh against the window, not the page box, so a vh-sized card
         * paginates wrong there. --doc-page-w/h are the named size by
         * default and are overridden to the user's chosen paper by the
         * export path, so every card is exactly one sheet either way.
         * Width + height (same source values as @page size) rather than
         * width + aspect-ratio: the ratio is a 6-decimal rounding of the
         * same division, and a few millionths of overflow would spill a
         * blank sheet after every page. The screen-only aspect-ratio
         * (preview proportions) must not leak into print. cqh typography
         * tracks the same box.
         *
         * Every declaration is !important: per CSS Scoping, unimportant
         * shadow ::slotted rules LOSE to the document context, so a page
         * section's authored inline style would silently beat this print
         * geometry. A model-authored height:100% did exactly that — the
         * percentage resolves as auto in the all-auto print ancestry, the
         * base rule's size containment turns auto into ZERO, and
         * overflow:hidden then paints nothing: a blank PDF with perfect
         * page boxes. At print the component's geometry is the design's
         * whole contract, so it must win over any authored sizing. */
        aspect-ratio: auto !important;
        width: var(--doc-page-w) !important;
        height: var(--doc-page-h) !important;
        overflow: hidden !important;
      }
      .paginated ::slotted(.page:not(:first-child)) {
        break-before: page !important;
        margin-top: 0 !important;
      }
    }
    .fit-mode .fit-box {
      width: calc(var(--doc-fit-w) * var(--doc-fit-scale));
      height: calc(var(--doc-fit-h) * var(--doc-fit-scale));
      margin: 0 auto;
      break-inside: avoid;
    }
    .fit-mode .fit {
      width: var(--doc-fit-w);
      height: var(--doc-fit-h);
      transform: scale(var(--doc-fit-scale));
      transform-origin: top left;
    }
    .frame td, .frame th { padding: 0; text-align: left; font-weight: inherit; }
    .hdr-space { height: var(--doc-hdr-h); }
    .ftr-space { height: var(--doc-ftr-h); }
    ::slotted([slot="header"]),
    ::slotted([slot="footer"]) { display: block; box-sizing: border-box; }
    @media print {
      :host { background: none; padding: 0; min-width: 0; min-height: 0; }
      .sheet {
        width: auto; margin: 0; box-shadow: none; border-radius: 0;
        padding: 0 var(--doc-page-margin);
      }
      /* The thead/tfoot spacers repeat on every page, so they carry the
       * vertical page margin (which the sheet's own padding cannot, since
       * that padding is consumed once on the first/last page). The running
       * header/footer are fixed inside that band. */
      /* The 0.35in is breathing room between a running header/footer and
       * the body; without one the spacer is exactly the page margin, so a
       * margin="0" full-bleed document gets truly full-bleed pages. */
      .hdr-space { height: max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))); }
      .ftr-space { height: max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))); }
      /* WebKit flowing documents: @page carries the vertical margin (see
       * _syncPrintPageRule), so the spacers keep only whatever a running
       * header/footer needs BEYOND it — page 1 would otherwise double its
       * top inset. Paginated sheets already zero their spacers above. */
      .sheet.wk-print:not(.paginated) .hdr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-hdr-h) + var(--doc-hdr-pad))) - var(--doc-page-margin))); }
      .sheet.wk-print:not(.paginated) .ftr-space { height: max(0px, calc(max(var(--doc-page-margin), calc(var(--doc-ftr-h) + var(--doc-ftr-pad))) - var(--doc-page-margin))); }
      ::slotted([slot="header"]) {
        position: fixed; top: 0; left: 0; right: 0; margin: 0;
        padding: calc(var(--doc-page-margin) * 0.45) var(--doc-page-margin) 0;
      }
      ::slotted([slot="footer"]) {
        position: fixed; bottom: 0; left: 0; right: 0; margin: 0;
        padding: 0 var(--doc-page-margin) calc(var(--doc-page-margin) * 0.45);
      }
    }
  `;
  class DocPage extends HTMLElement {
    static get observedAttributes() {
      return ['size', 'width', 'height', 'margin', 'orientation', 'content-width', 'content-height'];
    }
    constructor() {
      super();
      this._root = this.attachShadow({
        mode: 'open'
      });
      this._mo = typeof MutationObserver === 'function' ? new MutationObserver(() => this._scheduleMeasure()) : null;
    }

    /** The named paper's [w, h], swapped when orientation="landscape".
     *  Only the named size swaps — explicit width/height are exact values
     *  the author already oriented. */
    _paperSize() {
      const named = PAPER[(this.getAttribute('size') || '').toLowerCase()] || PAPER.letter;
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? [named[1], named[0]] : named;
    }
    get pageWidth() {
      return safeLen(this.getAttribute('width'), this._paperSize()[0]);
    }
    get pageHeight() {
      return safeLen(this.getAttribute('height'), this._paperSize()[1]);
    }
    get pageMargin() {
      return safeLen(this.getAttribute('margin'), '0.75in');
    }

    /** Scaled-fit mode's content box [w, h] as CSS lengths, or null when
     *  the mode is off (either attribute missing/invalid/zero — a partial
     *  declaration falls back to normal flow rather than guessing). */
    _contentFit() {
      const w = safeLen(this.getAttribute('content-width'), null);
      const h = safeLen(this.getAttribute('content-height'), null);
      if (!w || !h) return null;
      const wPx = toPx(w),
        hPx = toPx(h);
      return wPx > 0 && hPx > 0 ? [w, h, wPx, hPx] : null;
    }
    connectedCallback() {
      if (!this._sheet) this._render();
      this._syncSize();
      this._syncPrintPageRule();
      this._ensureTextWrapDefaults();
      this._ensureOwnsPrintMeta();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      if (this._mo) this._mo.observe(this, {
        subtree: true,
        childList: true,
        characterData: true,
        attributes: true
      });
      this._onResize = () => this._scheduleMeasure();
      window.addEventListener('resize', this._onResize);
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => this._scheduleMeasure());
      }
      this._scheduleMeasure();
    }
    disconnectedCallback() {
      window.removeEventListener('resize', this._onResize);
      if (this._mo) this._mo.disconnect();
      if (this._raf) {
        cancelAnimationFrame(this._raf);
        this._raf = null;
      }
      // Drop the head rules when the last doc-page leaves, so a deleted
      // document's @page geometry and text-wrap defaults can't apply to
      // whatever replaces it.
      const survivor = document.querySelector('doc-page');
      if (!survivor) {
        ['doc-page-print', 'doc-page-text-wrap', 'doc-page-owns-print', 'doc-page-fixed-size', 'doc-page-print-sizing'].forEach(id => {
          const tag = document.getElementById(id);
          if (tag) tag.remove();
        });
        // A live deck-stage deferred its own print-sizing meta to ours —
        // hand the page-global meta over so the deck isn't left unmarked.
        const deck = document.querySelector('deck-stage');
        if (deck && typeof deck._ensurePrintSizingMeta === 'function') {
          deck._ensurePrintSizingMeta();
        }
      } else {
        // A departed owner hands each page-global meta to whatever
        // doc-page remains (or it's removed).
        if (typeof survivor._syncFixedSizeMeta === 'function') {
          survivor._syncFixedSizeMeta();
        }
        if (typeof survivor._syncPrintSizingMeta === 'function') {
          survivor._syncPrintSizingMeta();
        }
      }
    }
    attributeChangedCallback() {
      if (!this._sheet) return;
      this._syncSize();
      this._syncPrintPageRule();
      this._syncFixedSizeMeta();
      this._syncPrintSizingMeta();
      this._scheduleMeasure();
    }
    _render() {
      this._root.innerHTML = `
        <style>${stylesheet}</style>
        <style id="vars"></style>
        <div class="sheet" data-screen-label="Document">
          <table class="frame" role="presentation">
            <thead><tr><th><div class="hdr-space"><slot name="header"></slot></div></th></tr></thead>
            <tbody><tr><td class="body"><div class="fit-box"><div class="fit"><slot></slot></div></div></td></tr></tbody>
            <tfoot><tr><td><div class="ftr-space"><slot name="footer"></slot></div></td></tr></tfoot>
          </table>
        </div>`;
      this._sheet = this._root.querySelector('.sheet');
      this._vars = this._root.getElementById('vars');
    }

    /** Runtime sizing lives in a shadow <style> :host rule, never on the
     *  light-DOM host element, so serialize-persist can't write it back. */
    _syncSize(hdrH, ftrH) {
      // Scaled-fit mode: content at its authored size, scaled onto the
      // printable area (page minus margins on both axes). The factor is a
      // plain number var so calc(length * number) stays valid; 4 decimals
      // keeps the shadow style stable across re-measures. Upscaling is
      // allowed — print transforms are vector, so text and CSS stay crisp
      // (raster images soften, which the catalog bullet warns about).
      const fit = this._contentFit();
      let fitVars = '';
      if (fit) {
        const marginPx = toPx(this.pageMargin) || 0;
        const availW = toPx(this.pageWidth) - 2 * marginPx;
        const availH = toPx(this.pageHeight) - 2 * marginPx;
        const scale = Math.min(availW / fit[2], availH / fit[3]);
        if (scale > 0 && Number.isFinite(scale)) {
          fitVars = '--doc-fit-w:' + fit[0] + ';' + '--doc-fit-h:' + fit[1] + ';' + '--doc-fit-scale:' + scale.toFixed(4) + ';';
        }
      }
      this._sheet.classList.toggle('fit-mode', !!fitVars);
      // Numeric w/h ratio for the paginated page cards' aspect-ratio —
      // aspect-ratio takes a number, not a length ratio, so compute it
      // here (CSS length division isn't portable). 6 decimals keeps the
      // shadow style stable across re-syncs.
      const arW = toPx(this.pageWidth);
      const arH = toPx(this.pageHeight);
      const ar = arW > 0 && arH > 0 ? (arW / arH).toFixed(6) : '0.772727';
      this._vars.textContent = ':host{' + fitVars + '--doc-page-ar:' + ar + ';' + '--doc-page-w:' + this.pageWidth + ';' + '--doc-page-h:' + this.pageHeight + ';' + '--doc-page-margin:' + this.pageMargin + ';' + '--doc-hdr-h:' + (hdrH || 0) + 'px;' + '--doc-ftr-h:' + (ftrH || 0) + 'px;' + '--doc-hdr-pad:' + (hdrH ? '0.35in' : '0px') + ';' + '--doc-ftr-pad:' + (ftrH ? '0.35in' : '0px') + '}';
    }

    /** @page is a no-op inside shadow DOM, so the rule lives in <head>.
     *  Re-appended on every sync so it stays last in source order — the
     *  @page cascade is source-order per descriptor, so this rule wins
     *  over any other @page rule in the document.
     *
     *  The @page SIZE is pinned where the page box IS part of the design:
     *  explicit-fixed-size mode (width + height authored), scaled-fit
     *  mode (the named sheet the fit targets), and explicit pagination
     *  (the named size the cards share — so card and sheet agree on
     *  every print path, and the export path's chosen paper overrides
     *  BOTH with one later rule). For FLOWING documents no paper size is
     *  emitted at all — the true size comes from the user's preference,
     *  injected by the export path or chosen in the print dialog — so a
     *  flowing document never fights the paper it lands on.
     *  margin: 0 is emitted in every mode: it leaves Chrome no margin box
     *  to draw its date/URL/page-count header in, and the visual margin
     *  lives on the sheet's own padding. */
    _syncPrintPageRule() {
      const id = 'doc-page-print';
      let tag = document.getElementById(id);
      if (!tag) {
        tag = document.createElement('style');
        tag.id = id;
      }
      document.head.appendChild(tag);
      // Three print-geometry regimes:
      // - true-size: the page IS the design — pin its exact size.
      // - scaled-fit (content-width/height): the fit factor is computed
      //   against the NAMED paper's printable area, so that paper must
      //   stay pinned or the scaled content overflows a smaller sheet
      //   (the export path re-fits and re-pins at print time on top).
      // - default modes: no paper size — but landscape still needs the
      //   paper-agnostic 'size: landscape' keyword, because the size
      //   descriptor is what carries orientation; without it a landscape
      //   document prints portrait whenever nothing injects a size.
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      // Explicit pagination pins the page box to the SAME values that
      // size the cards (the named size by default, the export path's
      // chosen paper when its later rule overrides both) — card and
      // sheet agree on every print path, and a mismatched real paper
      // shrinks-to-fit in the dialog instead of clipping a Letter card
      // on A4. Declared before the paginated read below so both derive
      // from one check.
      const paginatedNow = this.querySelector(':scope > .page') !== null;
      const sizeDescriptor = this._trueSizePx() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : this._contentFit() ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : paginatedNow ? 'size: ' + this.pageWidth + ' ' + this.pageHeight + '; ' : landscape ? 'size: landscape; ' : '';
      // WebKit never repeats the thead/tfoot spacers that carry a flowing
      // document's vertical page margins (see WK_PRINT above), so pages
      // after the first print edge-to-edge there. Carry the VERTICAL
      // margins on @page for WebKit instead, and the shadow print CSS
      // trims the first-page spacers by the same amount (.sheet.wk-print
      // rules). Horizontal inset stays on the sheet's own padding in
      // every engine. Blink keeps margin: 0 (a nonzero margin there
      // re-opens the box Chrome draws its header furniture in). One cost,
      // learned in testing: Safari's own date/URL headers are a USER
      // dialog setting ("Print headers and footers") that renders in the
      // margin area when room exists — margin: 0 only suppressed it by
      // leaving no room, and no CSS controls it. The export dialog's
      // Safari guide teaches turning the setting off for flowing
      // documents. Explicitly paginated and fixed-size documents keep
      // margin: 0 everywhere: their pages ARE the sheet.
      const wkFlowing = WK_PRINT && !paginatedNow && !this._trueSizePx() && !this._contentFit();
      const marginDescriptor = wkFlowing ? 'margin: ' + this.pageMargin + ' 0; ' : 'margin: 0; ';
      // Shadow-internal marker (never serialized), kept in lockstep with
      // the @page decision above: the print CSS trims the first-page
      // spacers ONLY while @page actually carries the margins — a
      // true-size or scaled-fit sheet keeps margin: 0 and must keep its
      // spacers too. Re-synced here so attribute changes and pagination
      // flips move both together.
      if (this._sheet) this._sheet.classList.toggle('wk-print', wkFlowing);
      tag.textContent = '@page { ' + sizeDescriptor + marginDescriptor + '} ' + '@media print { html, body { margin: 0 !important; padding: 0 !important; background: none !important; height: auto !important; overflow: visible !important; } ' + 'h1,h2,h3,h4,h5,h6 { break-after: avoid; } ' + 'figure,pre,blockquote,img,svg,tr { break-inside: avoid; } ' + 'p,li { orphans: 3; widows: 3; } ' + '* { -webkit-print-color-adjust: exact; print-color-adjust: exact; ' + 'backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } ' + '*, *::before, *::after { animation-delay: -99s !important; animation-duration: .001s !important; ' + 'animation-iteration-count: 1 !important; animation-fill-mode: both !important; ' + 'animation-play-state: running !important; transition-duration: 0s !important; } }';
    }

    /** Typographic defaults for document text: balance headings, avoid
     *  widowed/orphaned words in body copy (browsers without text-wrap
     *  support drop the declarations). Zero-specificity via :where() so
     *  any text-wrap authored on those elements wins; document-level so the
     *  rules reach the slotted (light DOM) content — shadow styles can't.
     *  data-omelette-injected marks the tag for the host editor to strip
     *  at serialize, so it is never written back as authored source. */
    _ensureTextWrapDefaults() {
      if (document.getElementById('doc-page-text-wrap')) return;
      const tag = document.createElement('style');
      tag.id = 'doc-page-text-wrap';
      tag.setAttribute('data-omelette-injected', '');
      tag.textContent = ':where(h1,h2,h3,h4,h5,h6){text-wrap:balance}' + ':where(p,li,blockquote,figcaption){text-wrap:pretty}';
      document.head.appendChild(tag);
    }

    /** Declares that this document owns its print CSS. The instant-PDF
     *  export checks for the meta by NAME PRESENCE alone (content is
     *  ignored) and skips its automatic print-CSS injections, so the
     *  component's @page geometry is never overridden by a heuristic.
     *  data-omelette-injected keeps it out of serialized source. */
    _ensureOwnsPrintMeta() {
      if (document.getElementById('doc-page-owns-print')) return;
      const tag = document.createElement('meta');
      tag.id = 'doc-page-owns-print';
      tag.name = 'omelette-owns-print';
      tag.content = 'true';
      tag.setAttribute('data-omelette-injected', '');
      document.head.appendChild(tag);
    }

    /** This page's valid true-size page box (explicit width AND height)
     *  as [w, h] px ints, or null when the mode is off. */
    _trueSizePx() {
      if (!safeLen(this.getAttribute('width'), null) || !safeLen(this.getAttribute('height'), null)) return null;
      const w = Math.round(toPx(this.pageWidth));
      const h = Math.round(toPx(this.pageHeight));
      return w > 0 && h > 0 ? [w, h] : null;
    }

    /** True-size pages (explicit width AND height) also declare the page
     *  box as the preview size: the in-app preview reads
     *  meta[name="omelette-fixed-size"] (content "W,H" in px ints) and
     *  scales the sheet into view — without it an 18in poster previews at
     *  true size with scrollbars. Never overrides an author-set meta
     *  (only the component's own id is managed). The meta is page-global
     *  while doc-page instances are not, so every sync recomputes the
     *  page-wide owner — the first connected true-size doc-page — and a
     *  non-true-size sibling's sync can never delete the owner's meta.
     *  Removed when no true-size page remains (the owner's disconnect
     *  re-syncs via any survivor) or when an author-set meta exists. */
    _syncFixedSizeMeta() {
      const id = 'doc-page-fixed-size';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-fixed-size"]:not([data-omelette-injected])');
      // The page-wide owner, not this instance: an upgraded true-size page
      // anywhere in the document keeps the meta alive and sized.
      let box = null;
      for (const el of document.querySelectorAll('doc-page')) {
        box = typeof el._trueSizePx === 'function' ? el._trueSizePx() : null;
        if (box) break;
      }
      if (!box || authored) {
        if (own) own.remove();
        return;
      }
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-fixed-size';
      tag.content = box[0] + ',' + box[1];
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }

    /** This page's print-sizing mode: 'fixed' when an explicit width AND
     *  height are authored (the page is the design's own size), else the
     *  default paper in the authored orientation. */
    _printSizingMode() {
      if (this._trueSizePx()) return 'fixed';
      const landscape = (this.getAttribute('orientation') || '').trim().toLowerCase() === 'landscape';
      return landscape ? 'default-landscape' : 'default-portrait';
    }

    /** Announces the print-sizing mode to the host app:
     *  meta[name="omelette-print-sizing"] with content 'default-portrait',
     *  'default-landscape', or 'fixed' (fixed pages also carry the
     *  omelette-fixed-size meta with the page box in px). The export path
     *  probes it to decide what true paper size to inject at print time —
     *  in the default modes the component emits no paper size of its own.
     *  Same page-global ownership rules as the fixed-size meta above:
     *  first connected doc-page owns it, an authored meta is never
     *  overridden, removed when no doc-page remains. */
    _syncPrintSizingMeta() {
      const id = 'doc-page-print-sizing';
      const own = document.getElementById(id);
      const authored = document.querySelector('meta[name="omelette-print-sizing"]:not([data-omelette-injected])');
      // A fixed page wins outright (mirroring the fixed-size loop above,
      // so the two metas can never contradict each other in a mixed
      // multi-page document); otherwise the first page's mode holds.
      let mode = null;
      for (const el of document.querySelectorAll('doc-page')) {
        if (typeof el._printSizingMode !== 'function') continue;
        const m = el._printSizingMode();
        if (m === 'fixed') {
          mode = m;
          break;
        }
        if (mode === null) mode = m;
      }
      if (!mode || authored) {
        if (own) own.remove();
        return;
      }
      // A deck-stage that connected first injected its own meta and
      // defers to any existing one — take it over, or the document ends
      // up with two conflicting injected metas (a doc-page page is the
      // document; the deck re-ensures its meta if every doc-page leaves).
      const deckMeta = document.getElementById('deck-stage-print-sizing');
      if (deckMeta) deckMeta.remove();
      const tag = own || document.createElement('meta');
      tag.id = id;
      tag.name = 'omelette-print-sizing';
      tag.content = mode;
      tag.setAttribute('data-omelette-injected', '');
      if (!own) document.head.appendChild(tag);
    }
    _scheduleMeasure() {
      if (this._raf) return;
      this._raf = requestAnimationFrame(() => {
        this._raf = null;
        this._measure();
      });
    }

    /** Slot heights feed the print spacers (--doc-hdr-h / --doc-ftr-h), so
     *  they re-measure on content mutation, resize, and font load. The
     *  same pass detects explicit pagination (direct .page children) and
     *  toggles the sheet between the flowing-document card and the
     *  page-per-card stack — content edits can add or remove pages at any
     *  time, so this tracks the same mutations the measurement does. */
    _measure() {
      const hdr = this.querySelector(':scope > [slot="header"]');
      const ftr = this.querySelector(':scope > [slot="footer"]');
      const wasPaginated = this._sheet.classList.contains('paginated');
      this._sheet.classList.toggle('paginated', this.querySelector(':scope > .page') !== null);
      // The WebKit @page margin is flowing-only, so a pagination flip
      // must re-emit the rule (content edits can add or remove .page
      // sections at any time).
      if (this._sheet.classList.contains('paginated') !== wasPaginated) {
        this._syncPrintPageRule();
      }
      this._syncSize(hdr ? hdr.offsetHeight : 0, ftr ? ftr.offsetHeight : 0);
    }
  }
  if (!customElements.get('doc-page')) {
    customElements.define('doc-page', DocPage);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/app/doc-page.js", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Alternative.jsx
try { (() => {
(function () {
  /* Layout for the /alternatives/* competitor-intercept pages.
     Headings, FAQ questions and feature claims are the LIVE SITE'S OWN
     (KasperPac/ManuvaMarketing @ alternatives/*.html + llms.txt).
     Body paragraphs marked TODO:copy are compressed for layout — pull the
     full text from the repo when building for production. Those pages rank;
     do not ship them thinner than they are today. */
  const __mv = n => {
    const C = props => {
      const R = (window.MV || {})[n];
      return R ? React.createElement(R, props) : null;
    };
    C.displayName = n;
    return C;
  };
  const Logo = __mv("Logo"),
    Icon = __mv("Icon"),
    Button = __mv("Button");
  const MAX = {
    maxWidth: "var(--page-max)",
    margin: "0 auto",
    padding: "0 var(--space-8)"
  };
  const DISPLAY = {
    fontFamily: "var(--font-display)",
    fontVariationSettings: '"wdth" 118,"wght" 800',
    fontWeight: 800,
    lineHeight: "var(--lh-display)",
    letterSpacing: "var(--ls-mega)",
    textWrap: "balance",
    margin: 0
  };
  const NAV = ["Features", "Pricing", "Compare", "About"];
  const DATA = {
    katana: {
      field: "violet",
      eyebrow: "Manuva vs Katana",
      h1: ["Katana alternatives for Shopify manufacturers:", " why teams switch to Manuva"],
      gapTitle: "What Katana doesn't do that Shopify manufacturers need",
      gapBody: "Katana covers the basics well. The gaps show up once your BOMs get real — when a component has scrap, when a recipe changes mid-season, when you need to know which PO ran late.",
      pillars: [["layers", "BOM versioning + side-by-side comparison", "Every change saved as a numbered version. Compare any two to see added, removed and modified components with cost and margin impact — then roll back."], ["package", "Yield % per component line", "Set a scrap allowance per component. A process that eats 10% more fabric plans for it, so purchasing reflects real consumption."], ["users", "Capacity planning with staff costing", "Model departments and staffing, plan against real capacity, and cost actual time against planned."]],
      matrix: [["Yield % per BOM line", 1, 0], ["BOM versioning & rollback", 1, 0], ["Side-by-side BOM compare", 1, 0], ["BOM templates", 1, 0], ["PO variance reporting", 1, 0], ["Lead-time accuracy reports", 1, 0], ["Profitability dashboard", 1, 0], ["Shopify sync", 1, 1], ["Multi-level BOMs", 1, 1]],
      matrixNote: "None of the above are offered by Katana at any price tier.",
      priceUs: ["Manuva Pro", "$499", "/mo flat", "Unlimited users and locations. Capacity planning, profitability dashboard and API included."],
      priceThem: ["Katana", "Per tier", "+ per user", "Advanced features sit behind higher tiers, and seats are counted."],
      faqs: ["Is Manuva a direct replacement for Katana?", "Can I import my data from Katana?", "Does Manuva work with Shopify the same way Katana does?", "What happens to my Katana account if I switch?"]
    },
    mrpeasy: {
      field: "flare",
      eyebrow: "Manuva vs MRPeasy",
      h1: ["MRPeasy alternative:", " flat-rate manufacturing software for growing teams"],
      gapTitle: "MRPeasy pricing scales with headcount, not capability",
      gapBody: "Per-user pricing punishes you for putting the system where the work happens. Every person on the floor who should see a work order is a line item.",
      pillars: [["refresh-cw", "Native Shopify webhook sync", "Real-time, webhook-driven, two-way. Orders cascade to production without a nightly batch or a CSV."], ["layers", "BOM versioning with diff", "Numbered versions with a true side-by-side diff — added, removed and modified lines, with cost and margin impact."], ["users", "Flat-rate unlimited users", "Growth and Pro include unlimited team members. Put it on every bench without doing seat maths."]],
      matrix: [["Flat-rate pricing", 1, 0], ["Unlimited users included", 1, 0], ["Native Shopify webhooks", 1, 0], ["BOM versioning with diff", 1, 0], ["Yield % per BOM line", 1, 0], ["PO variance reporting", 1, 0], ["Capacity planning", 1, 1], ["Multi-level BOMs", 1, 1], ["Stock control", 1, 1]],
      matrixNote: "MRPeasy charges per user — a 10-person team reaches $490/mo before advanced features.",
      priceUs: ["Manuva Growth", "$249", "/mo flat", "Unlimited users. Multi-level BOMs, versioning, costing, reports and Shopify sync."],
      priceThem: ["MRPeasy", "$490", "/mo at 10 users", "Per-user pricing, before advanced features are added."],
      faqs: ["Does Manuva have a per-user pricing tier like MRPeasy?", "How does Manuva's Shopify sync compare to MRPeasy?", "Can I migrate from MRPeasy to Manuva without downtime?", "What MRPeasy features does Manuva not yet have?"]
    }
  };
  function Nav() {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "var(--field-paper)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        height: 88,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "lockup",
      height: 24,
      base: "../../",
      style: {
        color: "var(--ink-strong)",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        gap: "var(--space-6)",
        flex: 1
      }
    }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
      key: n,
      href: "#",
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: "var(--ink-strong)",
        textDecoration: "none",
        whiteSpace: "nowrap"
      }
    }, n))), /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: "var(--ink-strong)",
        textDecoration: "none",
        whiteSpace: "nowrap"
      }
    }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "lg",
      shape: "pill",
      variant: "ink",
      className: "mv-press",
      style: {
        padding: "0 22px",
        fontSize: 15
      }
    }, "Start free")));
  }
  function Hero({
    d
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "0 var(--space-8) var(--space-8)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        background: `var(--field-${d.field})`,
        color: `var(--on-${d.field})`,
        borderRadius: "var(--radius-panel)",
        padding: "var(--space-20) var(--space-16)",
        display: "grid",
        gap: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "rgb(255 255 255/.72)"
      }
    }, d.eyebrow), /*#__PURE__*/React.createElement("h1", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-3)",
        maxWidth: "20ch"
      }
    }, d.h1[0], /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#C8FF2E"
      }
    }, d.h1[1])), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-3)",
        marginTop: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "xl",
      shape: "pill",
      className: "mv-press",
      style: {
        background: "#C8FF2E",
        borderColor: "#C8FF2E",
        color: "#141413",
        padding: "0 30px"
      }
    }, "Start free"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "xl",
      shape: "pill",
      variant: "ghost",
      className: "mv-press",
      style: {
        color: "#fff",
        borderColor: "rgb(255 255 255/.42)",
        padding: "0 30px"
      }
    }, "See pricing")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.7)"
      }
    }, "14 days free, full Pro access. No credit card.")));
  }
  function Gap({
    d
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "var(--space-20) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: "var(--space-4)",
        maxWidth: "62ch"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-2)",
        color: "var(--ink-strong)"
      }
    }, d.gapTitle), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 18,
        lineHeight: 1.6,
        color: "var(--ink-muted)",
        textWrap: "pretty"
      }
    }, d.gapBody)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "var(--space-4)"
      }
    }, d.pillars.map(([icon, title, body], i) => {
      const f = ["cobalt", "violet", "mint"][i];
      return /*#__PURE__*/React.createElement("div", {
        key: title,
        style: {
          background: `var(--tint-${f})`,
          borderRadius: "var(--radius-tile)",
          padding: "var(--space-8)",
          display: "grid",
          gap: "var(--space-4)",
          alignContent: "start"
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          width: 44,
          height: 44,
          display: "grid",
          placeItems: "center",
          borderRadius: "var(--radius-md)",
          background: `var(--field-${f})`,
          color: `var(--on-${f})`
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: icon,
        size: 22
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "var(--font-display)",
          fontVariationSettings: '"wdth" 108,"wght" 700',
          fontSize: 20,
          lineHeight: 1.15,
          letterSpacing: "-.02em",
          color: "var(--ink-strong)"
        }
      }, title), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          lineHeight: 1.55,
          color: "var(--ink-muted)",
          textWrap: "pretty"
        }
      }, body));
    }))));
  }
  function Matrix({
    d,
    them
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-ink)",
        color: "#fff",
        padding: "var(--space-20) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gap: "var(--space-8)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-2)",
        maxWidth: "18ch"
      }
    }, "Manuva vs ", them, " \u2014 feature comparison"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        padding: "0 0 var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "#C8FF2E",
        textAlign: "center"
      }
    }, "Manuva"), /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "rgb(255 255 255/.42)",
        textAlign: "center"
      }
    }, them)), d.matrix.map(([label, a, b]) => /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr",
        alignItems: "center",
        padding: "var(--space-4) 0",
        borderTop: "var(--border-rule) solid rgb(255 255 255/.14)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        color: "rgb(255 255 255/.8)"
      }
    }, label), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "grid",
        placeItems: "center",
        color: "#C8FF2E"
      }
    }, a ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 19
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: .35
      }
    }, "\u2014")), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "grid",
        placeItems: "center",
        color: "rgb(255 255 255/.5)"
      }
    }, b ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 19
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        opacity: .4
      }
    }, "\u2014"))))), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 15,
        color: "rgb(255 255 255/.6)",
        maxWidth: "58ch",
        textWrap: "pretty"
      }
    }, d.matrixNote)));
  }
  function Price({
    d,
    them
  }) {
    const card = (title, big, unit, body, mine) => /*#__PURE__*/React.createElement("div", {
      style: {
        background: mine ? "var(--field-cobalt)" : "var(--bg-card)",
        color: mine ? "#fff" : "var(--ink-strong)",
        border: mine ? "0" : "var(--border-rule) solid var(--stroke-card)",
        borderRadius: "var(--radius-tile)",
        padding: "var(--space-10)",
        display: "grid",
        gap: "var(--space-4)",
        alignContent: "start",
        minHeight: 260
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: mine ? "#C8FF2E" : "var(--ink-faint)"
      }
    }, title), /*#__PURE__*/React.createElement("span", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-numeral",
      style: {
        fontSize: 64,
        lineHeight: 1
      }
    }, big), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 600,
        opacity: .6
      }
    }, unit)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        lineHeight: 1.55,
        opacity: mine ? .85 : .7,
        textWrap: "pretty"
      }
    }, body));
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "var(--space-20) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gap: "var(--space-8)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-2)",
        color: "var(--ink-strong)"
      }
    }, "What you actually pay"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: "var(--space-4)"
      }
    }, card(d.priceUs[0], d.priceUs[1], d.priceUs[2], d.priceUs[3], true), card(d.priceThem[0], d.priceThem[1], d.priceThem[2], d.priceThem[3], false))));
  }
  function FAQ({
    d,
    them
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--tint-cobalt)",
        padding: "var(--space-20) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gridTemplateColumns: "1fr 1.6fr",
        gap: "var(--space-16)",
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-1)",
        color: "var(--ink-strong)",
        maxWidth: "12ch"
      }
    }, "Switching from ", them, " \u2014 common questions"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid"
      }
    }, d.faqs.map((q, i) => /*#__PURE__*/React.createElement("details", {
      key: q,
      open: i === 0,
      style: {
        borderTop: "var(--border-rule) solid var(--stroke-strong)",
        padding: "var(--space-5) 0"
      }
    }, /*#__PURE__*/React.createElement("summary", {
      style: {
        cursor: "pointer",
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        fontFamily: "var(--font-display)",
        fontVariationSettings: '"wdth" 106,"wght" 700',
        fontSize: 19,
        letterSpacing: "-.015em",
        color: "var(--ink-strong)"
      }
    }, q, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--field-cobalt)",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down",
      size: 20
    }))), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-4) 0 0",
        maxWidth: "62ch",
        fontSize: 15,
        lineHeight: 1.6,
        color: "var(--ink-muted)",
        textWrap: "pretty"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        background: "var(--warning-dim)",
        color: "var(--warning)",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        padding: "2px 7px",
        borderRadius: 4,
        marginRight: 8
      }
    }, "TODO: copy"), "Answer lives in ", /*#__PURE__*/React.createElement("span", {
      className: "mv-mono"
    }, "alternatives/", them.toLowerCase(), ".html"), " \u2014 carry it across verbatim."))))));
  }
  function CTA() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "0 var(--space-8) var(--space-8)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        background: "#C8FF2E",
        color: "#141413",
        borderRadius: "var(--radius-panel)",
        padding: "var(--space-20) var(--space-16)",
        textAlign: "center",
        display: "grid",
        justifyItems: "center",
        gap: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-4)",
        maxWidth: "14ch"
      }
    }, "Try Manuva free for 14 days"), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 19,
        lineHeight: 1.45,
        opacity: .72,
        maxWidth: "40ch",
        textWrap: "pretty"
      }
    }, "Full Pro access. No credit card, no migration fee, no kickoff call."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "xl",
      shape: "pill",
      variant: "ink",
      className: "mv-press",
      style: {
        padding: "0 32px"
      }
    }, "Start free"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "xl",
      shape: "pill",
      variant: "ghost",
      className: "mv-press",
      style: {
        color: "#141413",
        borderColor: "rgb(20 20 19/.3)",
        padding: "0 32px"
      }
    }, "Talk to us"))));
  }
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: "var(--field-ink)",
        color: "rgb(255 255 255/.62)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        padding: "var(--space-16) var(--space-8)",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: "var(--space-5)",
        alignContent: "start"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "lockup",
      height: 24,
      base: "../../",
      style: {
        color: "#fff"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        maxWidth: "28ch",
        lineHeight: 1.5
      }
    }, "Manufacturing operations, finally simple."), /*#__PURE__*/React.createElement("a", {
      href: "mailto:hello@manuva.app",
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.62)"
      }
    }, "hello@manuva.app")), [["Product", ["Features", "Pricing"]], ["Compare", ["vs Katana", "vs MRPeasy"]], ["Company", ["About", "Privacy", "Terms"]]].map(([h, items]) => /*#__PURE__*/React.createElement("div", {
      key: h,
      style: {
        display: "grid",
        gap: "var(--space-3)",
        alignContent: "start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "#C8FF2E",
        marginBottom: 4
      }
    }, h), items.map(i => /*#__PURE__*/React.createElement("a", {
      key: i,
      href: "#",
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.62)",
        textDecoration: "none"
      }
    }, i))))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "var(--border-rule) solid rgb(255 255 255/.12)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        padding: "var(--space-5) var(--space-8)",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        color: "rgb(255 255 255/.42)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Pac Technologies Pty Ltd"), /*#__PURE__*/React.createElement("span", {
      className: "mv-mono"
    }, "manuva.app/alternatives"))));
  }
  function Alternative({
    competitor = "katana"
  }) {
    const d = DATA[competitor];
    const them = competitor === "katana" ? "Katana" : "MRPeasy";
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--field-paper)"
      }
    }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, {
      d: d
    }), /*#__PURE__*/React.createElement(Gap, {
      d: d
    }), /*#__PURE__*/React.createElement(Matrix, {
      d: d,
      them: them
    }), /*#__PURE__*/React.createElement(Price, {
      d: d,
      them: them
    }), /*#__PURE__*/React.createElement(FAQ, {
      d: d,
      them: them
    }), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null));
  }
  Object.assign(window, {
    Alternative
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Alternative.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Customers.jsx
try { (() => {
(function () {
  /* Customers page. The LAYOUT is real; the CONTENT is not — there are no
     testimonials, logos or case studies anywhere in the live site repo.
     Every quote, name and metric here is a placeholder marked in the UI so
     it cannot be shipped by accident. Logos and photos are drop slots.
     Fill these before this page goes near production. */
  const __mv = n => {
    const C = props => {
      const R = (window.MV || {})[n];
      return R ? React.createElement(R, props) : null;
    };
    C.displayName = n;
    return C;
  };
  const Logo = __mv("Logo"),
    Icon = __mv("Icon"),
    Button = __mv("Button");
  const MAX = {
    maxWidth: "var(--page-max)",
    margin: "0 auto",
    padding: "0 var(--space-8)"
  };
  const DISPLAY = {
    fontFamily: "var(--font-display)",
    fontVariationSettings: '"wdth" 118,"wght" 800',
    fontWeight: 800,
    lineHeight: "var(--lh-display)",
    letterSpacing: "var(--ls-mega)",
    textWrap: "balance",
    margin: 0
  };
  const NAV = ["Features", "Pricing", "Compare", "About"];
  const STORIES = [{
    field: "cobalt",
    id: "cust-1",
    sector: "Apparel · Melbourne",
    quote: "Placeholder quote — one sentence on what changed, in the operator's own words.",
    who: "Name, Role",
    metric: ["—", "Stat worth quoting"]
  }, {
    field: "violet",
    id: "cust-2",
    sector: "Skincare · Auckland",
    quote: "Placeholder quote — keep these to a single concrete claim, not a testimonial cliché.",
    who: "Name, Role",
    metric: ["—", "Stat worth quoting"]
  }, {
    field: "mint",
    id: "cust-3",
    sector: "Furniture · Brisbane",
    quote: "Placeholder quote — the strongest one leads the page, so put your best story first.",
    who: "Name, Role",
    metric: ["—", "Stat worth quoting"]
  }];
  function Todo({
    children
  }) {
    return /*#__PURE__*/React.createElement("span", {
      style: {
        display: "inline-block",
        background: "var(--warning-dim)",
        color: "var(--warning)",
        fontSize: 11,
        fontWeight: 700,
        letterSpacing: ".08em",
        textTransform: "uppercase",
        padding: "2px 7px",
        borderRadius: 4,
        marginRight: 8,
        verticalAlign: "middle"
      }
    }, children);
  }
  function Nav() {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "var(--field-paper)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        height: 88,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "lockup",
      height: 24,
      base: "../../",
      style: {
        color: "var(--ink-strong)",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        gap: "var(--space-6)",
        flex: 1
      }
    }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
      key: n,
      href: "#",
      style: {
        fontSize: 15,
        fontWeight: n === "Customers" ? 800 : 600,
        color: "var(--ink-strong)",
        textDecoration: "none",
        whiteSpace: "nowrap"
      }
    }, n))), /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: "var(--ink-strong)",
        textDecoration: "none",
        whiteSpace: "nowrap"
      }
    }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "lg",
      shape: "pill",
      variant: "ink",
      className: "mv-press",
      style: {
        padding: "0 22px",
        fontSize: 15
      }
    }, "Start free")));
  }
  function Hero() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "0 var(--space-8) var(--space-8)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        background: "var(--field-ink)",
        color: "#fff",
        borderRadius: "var(--radius-panel)",
        padding: "var(--space-20) var(--space-16)",
        display: "grid",
        gap: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "#C8FF2E"
      }
    }, "Customers"), /*#__PURE__*/React.createElement("h1", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-5)",
        maxWidth: "14ch"
      }
    }, "People who ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#C8FF2E"
      }
    }, "make things.")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        maxWidth: "48ch",
        fontSize: 20,
        lineHeight: 1.45,
        color: "rgb(255 255 255/.78)",
        textWrap: "pretty"
      }
    }, "Shopify-first manufacturers running real production on Manuva \u2014 apparel, skincare, food, furniture.")));
  }
  function LogoWall() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "var(--space-16) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gap: "var(--space-6)",
        justifyItems: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "var(--ink-faint)"
      }
    }, /*#__PURE__*/React.createElement(Todo, null, "Needs real logos"), "Trusted by manufacturers across ANZ"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(6,1fr)",
        gap: "var(--space-4)",
        width: "100%"
      }
    }, [1, 2, 3, 4, 5, 6].map(i => /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        aspectRatio: "3/2",
        position: "relative"
      }
    }, /*#__PURE__*/React.createElement("image-slot", {
      id: `cust-logo-${i}`,
      shape: "rounded",
      radius: "12",
      fit: "contain",
      placeholder: `Customer logo ${i}`
    }))))));
  }
  function Stories() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "var(--space-12) 0 var(--space-20)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gap: "var(--space-5)"
      }
    }, STORIES.map((s, i) => /*#__PURE__*/React.createElement("article", {
      key: s.id,
      style: {
        display: "grid",
        gridTemplateColumns: i % 2 ? "1fr 1.1fr" : "1.1fr 1fr",
        background: `var(--field-${s.field})`,
        color: `var(--on-${s.field})`,
        borderRadius: "var(--radius-panel)",
        overflow: "hidden",
        minHeight: 420
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        order: i % 2 ? 2 : 1,
        minHeight: 320
      }
    }, /*#__PURE__*/React.createElement("image-slot", {
      id: s.id,
      shape: "rect",
      fit: "cover",
      placeholder: "Drop a photo \u2014 the floor, the product, the people"
    })), /*#__PURE__*/React.createElement("div", {
      style: {
        order: i % 2 ? 1 : 2,
        padding: "var(--space-16)",
        display: "grid",
        alignContent: "space-between",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        opacity: .72
      }
    }, s.sector), /*#__PURE__*/React.createElement("blockquote", {
      style: {
        margin: 0,
        display: "grid",
        gap: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontFamily: "var(--font-display)",
        fontVariationSettings: '"wdth" 106,"wght" 700',
        fontSize: 30,
        lineHeight: 1.18,
        letterSpacing: "-.025em",
        textWrap: "balance"
      }
    }, /*#__PURE__*/React.createElement(Todo, null, "Placeholder"), "\u201C", s.quote, "\u201D"), /*#__PURE__*/React.createElement("footer", {
      style: {
        fontSize: 15,
        opacity: .78
      }
    }, s.who)), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "baseline",
        gap: 12,
        borderTop: "var(--border-rule) solid rgb(255 255 255/.28)",
        paddingTop: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-numeral",
      style: {
        fontSize: 52,
        lineHeight: 1
      }
    }, s.metric[0]), /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        opacity: .7
      }
    }, s.metric[1])))))));
  }
  function Sectors() {
    const list = [["shirt", "Apparel & textiles"], ["flask", "Skincare & cosmetics"], ["cookie", "Food & beverage"], ["armchair", "Furniture & homewares"], ["wrench", "Hardware & tools"], ["package", "Contract manufacturing"]];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--tint-cobalt)",
        padding: "var(--space-20) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-2)",
        color: "var(--ink-strong)",
        maxWidth: "16ch"
      }
    }, "Built for people who make physical things."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "var(--space-4)"
      }
    }, list.map(([icon, label]) => /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        background: "var(--bg-card)",
        borderRadius: "var(--radius-tile)",
        padding: "var(--space-6)",
        display: "flex",
        alignItems: "center",
        gap: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 44,
        height: 44,
        flex: "none",
        display: "grid",
        placeItems: "center",
        borderRadius: "var(--radius-md)",
        background: "var(--field-cobalt)",
        color: "#fff"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 21
    })), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 600,
        color: "var(--ink-strong)"
      }
    }, label))))));
  }
  function CTA() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "var(--space-20) var(--space-8)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        background: "var(--field-cobalt)",
        color: "#fff",
        borderRadius: "var(--radius-panel)",
        padding: "var(--space-20) var(--space-16)",
        textAlign: "center",
        display: "grid",
        justifyItems: "center",
        gap: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-4)",
        maxWidth: "14ch"
      }
    }, "Add your floor to the list."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 19,
        lineHeight: 1.45,
        color: "rgb(255 255 255/.82)",
        maxWidth: "38ch",
        textWrap: "pretty"
      }
    }, "14 days free with full Pro access. No credit card required."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "xl",
      shape: "pill",
      className: "mv-press",
      style: {
        background: "#C8FF2E",
        borderColor: "#C8FF2E",
        color: "#141413",
        padding: "0 32px"
      }
    }, "Start free"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "xl",
      shape: "pill",
      variant: "ghost",
      className: "mv-press",
      style: {
        color: "#fff",
        borderColor: "rgb(255 255 255/.42)",
        padding: "0 32px"
      }
    }, "Book a demo"))));
  }
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: "var(--field-ink)",
        color: "rgb(255 255 255/.62)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        padding: "var(--space-16) var(--space-8)",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: "var(--space-5)",
        alignContent: "start"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "lockup",
      height: 24,
      base: "../../",
      style: {
        color: "#fff"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        maxWidth: "28ch",
        lineHeight: 1.5
      }
    }, "Manufacturing operations, finally simple."), /*#__PURE__*/React.createElement("a", {
      href: "mailto:hello@manuva.app",
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.62)"
      }
    }, "hello@manuva.app")), [["Product", ["Features", "Pricing"]], ["Compare", ["vs Katana", "vs MRPeasy"]], ["Company", ["About", "Privacy", "Terms"]]].map(([h, items]) => /*#__PURE__*/React.createElement("div", {
      key: h,
      style: {
        display: "grid",
        gap: "var(--space-3)",
        alignContent: "start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "#C8FF2E",
        marginBottom: 4
      }
    }, h), items.map(i => /*#__PURE__*/React.createElement("a", {
      key: i,
      href: "#",
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.62)",
        textDecoration: "none"
      }
    }, i))))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "var(--border-rule) solid rgb(255 255 255/.12)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        padding: "var(--space-5) var(--space-8)",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        color: "rgb(255 255 255/.42)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Pac Technologies Pty Ltd"), /*#__PURE__*/React.createElement("span", {
      className: "mv-mono"
    }, "manuva.app/customers"))));
  }
  function Customers() {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--field-paper)"
      }
    }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(LogoWall, null), /*#__PURE__*/React.createElement(Stories, null), /*#__PURE__*/React.createElement(Sectors, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null));
  }
  Object.assign(window, {
    Customers
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Customers.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Landing.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
(function () {
  /* Components resolve at render time so this file is inert when the
     design-system compiler evaluates it, and a missing export degrades one
     element instead of unmounting the tree. */
  const __mv = n => {
    const C = props => {
      const R = (window.MV || {})[n];
      return R ? React.createElement(R, props) : null;
    };
    C.displayName = n;
    return C;
  };
  const Logo = __mv("Logo"),
    Icon = __mv("Icon"),
    StatusBadge = __mv("StatusBadge"),
    DataTable = __mv("DataTable"),
    StatusDot = __mv("StatusDot"),
    Button = __mv("Button");
  const MAX = {
    maxWidth: "var(--page-max)",
    margin: "0 auto",
    padding: "0 var(--space-8)"
  };
  const DISPLAY = {
    fontFamily: "var(--font-display)",
    fontVariationSettings: '"wdth" 118,"wght" 800',
    fontWeight: 800,
    lineHeight: "var(--lh-display)",
    letterSpacing: "var(--ls-mega)",
    textWrap: "balance",
    margin: 0
  };
  const NAV = ["Features", "Pricing", "Compare", "About"];

  /* Field rotation on the site is for RHYTHM, not meaning — no two
     adjacent panels share a hue. In-app, colour keeps its domain
     meaning (data-domain). See guidelines/marketing-fields.card.html. */
  const DOMAINS = [["01", "package", "Inventory", "Stock, bins and goods inwards — counted once, true everywhere.", "cobalt"], ["02", "layers", "Products & BOMs", "Components, variants and bills of materials you can actually reuse.", "violet"], ["03", "factory", "Production", "Work orders, labour and stock allocation on one board.", "flare"], ["04", "shopping-cart", "Purchasing", "Suppliers, POs and receiving, with lead times that mean something.", "amber"], ["05", "truck", "Logistics", "Pack, despatch and carriers from a single screen.", "mint"], ["06", "history", "Audit", "Who moved what, when. Every movement, kept forever.", "aqua"]];
  function useReveal() {
    React.useEffect(() => {
      const root = document.documentElement;
      const els = Array.from(document.querySelectorAll(".mv-reveal"));
      const showAll = () => els.forEach(e => {
        e.dataset.in = "1";
      });
      if (!("IntersectionObserver" in window)) return;
      root.dataset.revealArmed = "1";
      const io = new IntersectionObserver(entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.dataset.in = "1";
          io.unobserve(e.target);
        }
      }), {
        threshold: 0
      });
      els.forEach(e => io.observe(e));
      /* Failsafe: anything still unrevealed after 2.5s — scroll restoration,
         a fragment jump, Cmd+End — is shown unconditionally. */
      const t = setTimeout(showAll, 2500);
      return () => {
        clearTimeout(t);
        io.disconnect();
      };
    }, []);
  }
  function Pill({
    bg = "var(--field-ink)",
    fg = "#fff",
    children,
    style,
    ...rest
  }) {
    return /*#__PURE__*/React.createElement(Button, _extends({
      as: "a",
      href: "#",
      size: "xl",
      shape: "pill",
      variant: "ink",
      className: "mv-press"
    }, rest, {
      style: {
        background: bg,
        color: fg,
        borderColor: bg,
        padding: "0 30px",
        ...style
      }
    }), children);
  }
  function Nav() {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "var(--field-paper)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        height: 88,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "lockup",
      height: 24,
      base: "../../",
      style: {
        color: "var(--ink-strong)",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        gap: "var(--space-6)",
        flex: 1
      }
    }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
      key: n,
      href: "#",
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: "var(--ink-strong)",
        textDecoration: "none",
        whiteSpace: "nowrap"
      }
    }, n))), /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: "var(--ink-strong)",
        textDecoration: "none",
        whiteSpace: "nowrap"
      }
    }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "lg",
      shape: "pill",
      variant: "ink",
      className: "mv-press",
      style: {
        padding: "0 22px",
        fontSize: 15
      }
    }, "Start free")));
  }
  function Hero() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "0 var(--space-8) var(--space-8)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        background: "var(--field-cobalt)",
        color: "var(--on-cobalt)",
        borderRadius: "var(--radius-panel)",
        padding: "var(--space-24) var(--space-16) var(--space-16)",
        position: "relative",
        overflow: "hidden"
      }
    }, /*#__PURE__*/React.createElement("span", {
      "aria-hidden": "true",
      className: "mv-numeral",
      style: {
        position: "absolute",
        right: "-.06em",
        bottom: "-.34em",
        fontSize: "var(--fs-display-8)",
        color: "rgb(255 255 255/.10)",
        pointerEvents: "none"
      }
    }, "1,240"), /*#__PURE__*/React.createElement("div", {
      style: {
        position: "relative",
        display: "grid",
        gap: "var(--space-8)",
        justifyItems: "start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "rgb(255 255 255/.72)"
      }
    }, "MRP for Shopify manufacturers"), /*#__PURE__*/React.createElement("h1", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-6)",
        maxWidth: "11ch"
      }
    }, "Make it.", " ", /*#__PURE__*/React.createElement("span", {
      style: {
        background: "var(--field-lime)",
        color: "var(--on-lime)",
        padding: "0 .12em .06em",
        borderRadius: 12,
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone"
      }
    }, "Track it."), " ", "Ship it."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        maxWidth: "46ch",
        fontSize: 22,
        lineHeight: 1.45,
        color: "rgb(255 255 255/.82)",
        textWrap: "pretty"
      }
    }, "Inventory, BOMs, work orders and stock control \u2014 connected, live, and built for people standing on a factory floor."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-4)",
        alignItems: "center",
        marginTop: "var(--space-2)"
      }
    }, /*#__PURE__*/React.createElement(Pill, {
      bg: "var(--field-lime)",
      fg: "var(--on-lime)"
    }, "Start free"), /*#__PURE__*/React.createElement(Pill, {
      bg: "rgb(255 255 255/.14)",
      fg: "#fff",
      style: {
        boxShadow: "inset 0 0 0 1.5px rgb(255 255 255/.4)"
      }
    }, "Book a demo")))));
  }
  function Marquee() {
    const words = ["Yield % on every BOM line", "BOM versioning with rollback", "Unlimited users on Growth", "Real-time Shopify webhooks", "14-day free trial"];
    return /*#__PURE__*/React.createElement("div", {
      className: "mv-field-lime",
      style: {
        overflow: "hidden",
        padding: "var(--space-5) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "mv-marquee-track"
    }, [...words, ...words].map((w, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        display: "flex",
        alignItems: "center",
        gap: "var(--space-8)",
        padding: "0 var(--space-8)",
        fontFamily: "var(--font-display)",
        fontVariationSettings: '"wdth" 100,"wght" 700',
        fontWeight: 700,
        fontSize: 20,
        letterSpacing: "-.01em",
        whiteSpace: "nowrap"
      }
    }, w, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 9,
        height: 9,
        borderRadius: "50%",
        background: "var(--on-lime)",
        flex: "none"
      }
    })))));
  }
  function ProductShot() {
    const rows = (window.MV_DATA ? window.MV_DATA.stock : []).slice(0, 5);
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--tint-cobalt)",
        padding: "var(--space-24) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gap: "var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "mv-reveal",
      style: {
        display: "grid",
        gap: "var(--space-4)",
        justifyItems: "center",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "var(--cobalt-700)"
      }
    }, "Live, not nightly"), /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-3)",
        color: "var(--ink-strong)",
        maxWidth: "16ch"
      }
    }, "One number, everywhere.")), /*#__PURE__*/React.createElement("div", {
      className: "mv-reveal",
      "data-domain": "inventory",
      style: {
        background: "var(--bg-card)",
        borderRadius: "var(--radius-tile)",
        overflow: "hidden",
        boxShadow: "0 24px 60px rgb(20 20 19/.16)",
        transitionDelay: "90ms"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "var(--space-5) var(--space-6)",
        borderBottom: "1px solid var(--stroke)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: 2
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-key",
      style: {
        color: "var(--accent-text)"
      }
    }, "Inventory"), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontVariationSettings: '"wdth" 100,"wght" 700',
        fontSize: 20,
        letterSpacing: "-.02em",
        color: "var(--ink-strong)"
      }
    }, "Stock on hand")), /*#__PURE__*/React.createElement(StatusDot, {
      tone: "info",
      live: true,
      label: /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 12,
          color: "var(--ink-muted)"
        }
      }, "Live from the floor")
    })), /*#__PURE__*/React.createElement(DataTable, {
      density: "compact",
      columns: [{
        key: "sku",
        header: "SKU",
        mono: true,
        width: 130
      }, {
        key: "name",
        header: "Product"
      }, {
        key: "wh",
        header: "Warehouse",
        width: 110,
        muted: true
      }, {
        key: "oh",
        header: "On hand",
        align: "right",
        width: 90,
        render: r => r.oh.toLocaleString()
      }, {
        key: "free",
        header: "Free",
        align: "right",
        width: 90,
        render: r => r.free.toLocaleString()
      }, {
        key: "st",
        header: "Status",
        width: 130,
        render: r => /*#__PURE__*/React.createElement(StatusBadge, {
          tone: r.st[0],
          dot: true
        }, r.st[1])
      }],
      rows: rows
    }))));
  }
  function Domains() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "var(--space-24) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gap: "var(--space-12)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      className: "mv-reveal",
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-4)",
        color: "var(--ink-strong)",
        maxWidth: "14ch"
      }
    }, "Six jobs. One system."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "repeat(3,1fr)",
        gap: "var(--space-5)"
      }
    }, DOMAINS.map(([num, icon, title, body, field], i) => /*#__PURE__*/React.createElement("div", {
      key: num,
      className: "mv-reveal mv-lift",
      style: {
        background: `var(--field-${field})`,
        color: `var(--on-${field})`,
        borderRadius: "var(--radius-tile)",
        padding: "var(--space-8)",
        minHeight: 280,
        display: "grid",
        gridTemplateRows: "auto auto 1fr",
        gap: "var(--space-6)",
        transitionDelay: `${i % 3 * 70}ms`
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "space-between"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: icon,
      size: 30
    }), /*#__PURE__*/React.createElement("span", {
      className: "mv-score",
      style: {
        fontSize: 52,
        opacity: .34
      }
    }, num)), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: "var(--font-display)",
        fontVariationSettings: '"wdth" 112,"wght" 800',
        fontSize: 30,
        lineHeight: 1.02,
        letterSpacing: "-.025em",
        minHeight: "2.04em"
      }
    }, title), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        lineHeight: 1.5,
        opacity: .82,
        textWrap: "pretty",
        alignSelf: "start"
      }
    }, body))))));
  }
  function Split() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "0 var(--space-8) var(--space-24)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1.25fr 1fr",
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "mv-reveal",
      style: {
        background: "var(--field-amber)",
        color: "var(--on-amber)",
        borderRadius: "var(--radius-panel)",
        padding: "var(--space-16)",
        display: "grid",
        alignContent: "space-between",
        gap: "var(--space-10)",
        minHeight: 400
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        opacity: .7
      }
    }, "Shortages"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-numeral",
      style: {
        fontSize: "var(--fs-display-6)"
      }
    }, "1,240"), /*#__PURE__*/React.createElement("h3", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-2)",
        maxWidth: "14ch"
      }
    }, "Know before the line stops."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        maxWidth: "40ch",
        fontSize: 17,
        lineHeight: 1.55,
        opacity: .78,
        textWrap: "pretty"
      }
    }, "Manuva checks every BOM against live stock and tells you what's short \u2014 before the job hits the floor, not after.")), /*#__PURE__*/React.createElement(Pill, {
      bg: "var(--field-ink)",
      fg: "#fff",
      style: {
        justifySelf: "start"
      }
    }, "See how it works")), /*#__PURE__*/React.createElement("div", {
      className: "mv-reveal",
      style: {
        background: "var(--field-violet)",
        color: "var(--on-violet)",
        borderRadius: "var(--radius-panel)",
        padding: "var(--space-16)",
        display: "grid",
        alignContent: "space-between",
        gap: "var(--space-10)",
        minHeight: 400,
        transitionDelay: "90ms"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        opacity: .7
      }
    }, "Purchasing"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-numeral",
      style: {
        fontSize: "var(--fs-display-5)"
      }
    }, "9", /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 28,
        opacity: .6,
        marginLeft: 8
      }
    }, "days")), /*#__PURE__*/React.createElement("h3", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-1)",
        maxWidth: "13ch"
      }
    }, "Reorder before you're asked.")), /*#__PURE__*/React.createElement(Logo, {
      variant: "lockup",
      height: 20,
      base: "../../",
      style: {
        color: "#fff",
        justifySelf: "start"
      }
    }))));
  }
  function Comparison() {
    const rows = [["Pricing model", "Flat per account", "Per user, per month"], ["A 10-person team", "$249/mo", "$490/mo"], ["Yield % per BOM line", "Included", "Not offered"], ["BOM versioning", "Compare + roll back", "Not offered"]];
    return /*#__PURE__*/React.createElement("section", {
      className: "mv-field-ink",
      style: {
        padding: "var(--space-24) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gridTemplateColumns: "1fr 1.25fr",
        gap: "var(--space-16)",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "mv-reveal",
      style: {
        display: "grid",
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "var(--field-amber)"
      }
    }, "Versus legacy MRP"), /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-3)"
      }
    }, "Priced for the shed, not the boardroom."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 17,
        lineHeight: 1.6,
        color: "rgb(255 255 255/.7)",
        maxWidth: "40ch",
        textWrap: "pretty"
      }
    }, "Flat pricing, unlimited users from Growth up. Connect Shopify, import your BOMs, run your first job today.")), /*#__PURE__*/React.createElement("div", {
      className: "mv-reveal",
      style: {
        display: "grid",
        borderRadius: "var(--radius-tile)",
        overflow: "hidden",
        transitionDelay: "90ms"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr",
        padding: "var(--space-4) var(--space-6)",
        background: "rgb(255 255 255/.06)"
      }
    }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "var(--field-amber)"
      }
    }, "Manuva"), /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "rgb(255 255 255/.42)"
      }
    }, "Legacy MRP")), rows.map(([k, a, b]) => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr",
        alignItems: "center",
        padding: "var(--space-5) var(--space-6)",
        borderTop: "1px solid rgb(255 255 255/.1)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.62)"
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 16,
        fontWeight: 700,
        color: "#fff"
      }
    }, a), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        color: "rgb(255 255 255/.4)"
      }
    }, b))))));
  }
  function CTA() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-ink)",
        padding: "0 var(--space-8) var(--space-8)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "mv-reveal",
      style: {
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        background: "var(--field-flare)",
        color: "var(--on-flare)",
        borderRadius: "var(--radius-panel)",
        padding: "var(--space-24) var(--space-16)",
        textAlign: "center",
        display: "grid",
        justifyItems: "center",
        gap: "var(--space-8)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-5)",
        maxWidth: "12ch"
      }
    }, "Run your first job today."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 20,
        lineHeight: 1.45,
        color: "rgb(255 255 255/.84)",
        maxWidth: "38ch",
        textWrap: "pretty"
      }
    }, "14 days free with full Pro access. No credit card required."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-4)"
      }
    }, /*#__PURE__*/React.createElement(Pill, {
      bg: "#fff",
      fg: "var(--field-flare)"
    }, "Start free"), /*#__PURE__*/React.createElement(Pill, {
      bg: "rgb(255 255 255/.16)",
      fg: "#fff",
      style: {
        boxShadow: "inset 0 0 0 1.5px rgb(255 255 255/.42)"
      }
    }, "Talk to us"))));
  }
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: "var(--field-ink)",
        color: "rgb(255 255 255/.62)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        padding: "var(--space-16) var(--space-8)",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: "var(--space-5)",
        alignContent: "start"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "lockup",
      height: 24,
      base: "../../",
      style: {
        color: "#fff"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        maxWidth: "28ch",
        lineHeight: 1.5
      }
    }, "Manufacturing operations, finally simple.")), [["Product", ["Features", "Pricing"]], ["Compare", ["vs Katana", "vs MRPeasy"]], ["Company", ["About", "Privacy", "Terms"]]].map(([h, items]) => /*#__PURE__*/React.createElement("div", {
      key: h,
      style: {
        display: "grid",
        gap: "var(--space-3)",
        alignContent: "start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "var(--field-amber)",
        marginBottom: 4
      }
    }, h), items.map(i => /*#__PURE__*/React.createElement("a", {
      key: i,
      href: "#",
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.62)",
        textDecoration: "none"
      }
    }, i))))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "1px solid rgb(255 255 255/.12)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        padding: "var(--space-5) var(--space-8)",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        color: "rgb(255 255 255/.42)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Manuva"), /*#__PURE__*/React.createElement("span", {
      className: "mv-mono"
    }, "manuva.app"))));
  }
  function Landing() {
    useReveal();
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--field-paper)"
      }
    }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, null), /*#__PURE__*/React.createElement(Marquee, null), /*#__PURE__*/React.createElement(ProductShot, null), /*#__PURE__*/React.createElement(Domains, null), /*#__PURE__*/React.createElement(Split, null), /*#__PURE__*/React.createElement(Comparison, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null));
  }
  Object.assign(window, {
    Landing
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Landing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/Pricing.jsx
try { (() => {
(function () {
  /* Every number and claim on this page comes from the live site repo
     (KasperPac/ManuvaMarketing @ llms.txt). Nothing here is invented —
     if a figure changes there, change it here. */
  const __mv = n => {
    const C = props => {
      const R = (window.MV || {})[n];
      return R ? React.createElement(R, props) : null;
    };
    C.displayName = n;
    return C;
  };
  const Logo = __mv("Logo"),
    Icon = __mv("Icon"),
    Button = __mv("Button"),
    StatusBadge = __mv("StatusBadge");
  const MAX = {
    maxWidth: "var(--page-max)",
    margin: "0 auto",
    padding: "0 var(--space-8)"
  };
  const DISPLAY = {
    fontFamily: "var(--font-display)",
    fontVariationSettings: '"wdth" 118,"wght" 800',
    fontWeight: 800,
    lineHeight: "var(--lh-display)",
    letterSpacing: "var(--ls-mega)",
    textWrap: "balance",
    margin: 0
  };
  const NAV = ["Features", "Pricing", "Compare", "About"];
  const PLANS = [{
    name: "Starter",
    mo: 99,
    yr: "1,188",
    moM: 119,
    field: "cobalt",
    limit: "1 location · up to 5 office seats",
    feats: ["Inventory & stock control", "Single-level BOMs", "Production orders", "Purchase orders", "Stocktake"]
  }, {
    name: "Growth",
    mo: 249,
    yr: "2,988",
    moM: 299,
    field: "violet",
    limit: "Multi-location · unlimited users",
    popular: true,
    feats: ["Everything in Starter", "Multi-level BOMs", "BOM versioning & compare", "Costing & reports", "Shopify sync"]
  }, {
    name: "Pro",
    mo: 499,
    yr: "5,988",
    moM: 599,
    field: "flare",
    limit: "Unlimited locations & users",
    feats: ["Everything in Growth", "Capacity planning", "Profitability dashboard", "API access", "Priority support"]
  }, {
    name: "Enterprise",
    custom: true,
    field: "ink",
    limit: "Unlimited everything",
    feats: ["Everything in Pro", "Multi-site", "SSO / SAML", "Dedicated CSM", "Custom SLAs"]
  }];
  const MATRIX = [["Inventory & stock control", 1, 1, 1, 1], ["Production orders", 1, 1, 1, 1], ["Multi-level BOMs", 0, 1, 1, 1], ["BOM versioning & rollback", 0, 1, 1, 1], ["Yield % per BOM line", 0, 1, 1, 1], ["Costing & profitability", 0, 1, 1, 1], ["Shopify sync", 0, 1, 1, 1], ["Capacity planning", 0, 0, 1, 1], ["PO variance reporting", 0, 0, 1, 1], ["API access", 0, 0, 1, 1], ["SSO / SAML", 0, 0, 0, 1]];
  const FAQS = [["What counts as a warehouse location?", "A location is any physical place you store components or finished goods — a warehouse, a storage room, a third-party facility. Bin and aisle areas within a single location do not count as additional locations."], ["Is pricing per seat?", "No. Manuva uses flat per-account pricing. Growth and above include unlimited team members."], ["What do I get during the free trial?", "Full Pro-level access for 14 days, no credit card required. At the end of the trial the account moves to the tier you selected at sign-up."], ["What is BOM versioning?", "Every change to a bill of materials is saved as a numbered, timestamped version. Draft changes, publish when ready, compare any two versions side by side to see added, removed and modified components with cost and margin impact — and roll back to any previous version."], ["What is yield % per BOM line?", "Yield % sets a scrap or loss allowance on each component. If a process consumes 10% more fabric than the nominal quantity, setting yield to 90% makes Manuva increase material requirements automatically — so purchasing and stock planning reflect real consumption, not theory."]];
  const INTEGRATIONS = ["Shopify", "WooCommerce", "Amazon", "Etsy", "Xero", "QuickBooks", "MYOB"];
  function Nav() {
    return /*#__PURE__*/React.createElement("header", {
      style: {
        position: "sticky",
        top: 0,
        zIndex: 40,
        background: "var(--field-paper)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        height: 88,
        display: "flex",
        alignItems: "center",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "lockup",
      height: 24,
      base: "../../",
      style: {
        color: "var(--ink-strong)",
        flex: "none"
      }
    }), /*#__PURE__*/React.createElement("nav", {
      style: {
        display: "flex",
        gap: "var(--space-6)",
        flex: 1
      }
    }, NAV.map(n => /*#__PURE__*/React.createElement("a", {
      key: n,
      href: "#",
      style: {
        fontSize: 15,
        fontWeight: n === "Pricing" ? 800 : 600,
        color: "var(--ink-strong)",
        textDecoration: "none",
        whiteSpace: "nowrap"
      }
    }, n))), /*#__PURE__*/React.createElement("a", {
      href: "#",
      style: {
        fontSize: 15,
        fontWeight: 600,
        color: "var(--ink-strong)",
        textDecoration: "none",
        whiteSpace: "nowrap"
      }
    }, "Sign in"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "lg",
      shape: "pill",
      variant: "ink",
      className: "mv-press",
      style: {
        padding: "0 22px",
        fontSize: 15
      }
    }, "Start free")));
  }
  function Hero({
    annual,
    setAnnual
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "0 var(--space-8) var(--space-8)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        background: "var(--field-cobalt)",
        color: "var(--on-cobalt)",
        borderRadius: "var(--radius-panel)",
        padding: "var(--space-20) var(--space-16)",
        display: "grid",
        justifyItems: "center",
        textAlign: "center",
        gap: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "rgb(255 255 255/.72)"
      }
    }, "Pricing"), /*#__PURE__*/React.createElement("h1", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-5)",
        maxWidth: "15ch"
      }
    }, "Flat pricing. ", /*#__PURE__*/React.createElement("span", {
      style: {
        color: "#C8FF2E"
      }
    }, "Unlimited users.")), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        maxWidth: "46ch",
        fontSize: 20,
        lineHeight: 1.45,
        color: "rgb(255 255 255/.82)",
        textWrap: "pretty"
      }
    }, "Every plan includes a 14-day free trial with full Pro access. No credit card required."), /*#__PURE__*/React.createElement("div", {
      role: "group",
      "aria-label": "Billing period",
      style: {
        display: "flex",
        gap: 4,
        padding: 4,
        marginTop: "var(--space-2)",
        background: "rgb(255 255 255/.16)",
        borderRadius: "var(--radius-pill)"
      }
    }, [["Annual", true], ["Monthly", false]].map(([label, val]) => /*#__PURE__*/React.createElement("button", {
      key: label,
      type: "button",
      onClick: () => setAnnual(val),
      "aria-pressed": annual === val,
      style: {
        height: 44,
        padding: "0 24px",
        border: 0,
        cursor: "pointer",
        borderRadius: "var(--radius-pill)",
        fontFamily: "var(--font-body)",
        fontSize: 15,
        fontWeight: 700,
        background: annual === val ? "#fff" : "transparent",
        color: annual === val ? "var(--field-cobalt)" : "#fff"
      }
    }, label, val && /*#__PURE__*/React.createElement("span", {
      style: {
        marginLeft: 8,
        fontSize: 12,
        fontWeight: 700,
        color: annual === val ? "var(--field-cobalt)" : "#C8FF2E"
      }
    }, "save 20%"))))));
  }
  function Plans({
    annual
  }) {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "var(--space-16) 0 var(--space-20)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gap: "var(--space-4)",
        alignItems: "start"
      }
    }, PLANS.map(p => {
      const dark = p.field === "ink" || p.popular;
      return /*#__PURE__*/React.createElement("div", {
        key: p.name,
        style: {
          position: "relative",
          background: p.popular ? "var(--field-ink)" : "var(--bg-card)",
          color: p.popular ? "#fff" : "var(--ink-strong)",
          borderRadius: "var(--radius-tile)",
          padding: "var(--space-8)",
          border: p.popular ? "0" : "var(--border-rule) solid var(--stroke-card)",
          display: "grid",
          gap: "var(--space-6)",
          minHeight: 520,
          gridTemplateRows: "auto auto auto 1fr auto",
          boxShadow: p.popular ? "0 24px 60px rgb(20 20 19/.24)" : "none"
        }
      }, /*#__PURE__*/React.createElement("div", {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 8
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          fontFamily: "var(--font-display)",
          fontVariationSettings: '"wdth" 112,"wght" 800',
          fontSize: 24,
          letterSpacing: "-.02em"
        }
      }, p.name), p.popular && /*#__PURE__*/React.createElement("span", {
        style: {
          background: "#C8FF2E",
          color: "#141413",
          padding: "4px 10px",
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: ".1em",
          textTransform: "uppercase",
          borderRadius: "var(--radius-pill)"
        }
      }, "Popular")), /*#__PURE__*/React.createElement("div", {
        style: {
          display: "grid",
          gap: 4
        }
      }, p.custom ? /*#__PURE__*/React.createElement("span", {
        className: "mv-numeral",
        style: {
          fontSize: 52,
          lineHeight: 1
        }
      }, "Custom") : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
        style: {
          display: "flex",
          alignItems: "baseline",
          gap: 2
        }
      }, /*#__PURE__*/React.createElement("span", {
        className: "mv-numeral",
        style: {
          fontSize: 30,
          opacity: .55
        }
      }, "$"), /*#__PURE__*/React.createElement("span", {
        className: "mv-numeral",
        style: {
          fontSize: 60,
          lineHeight: 1
        }
      }, annual ? p.mo : p.moM), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 15,
          fontWeight: 600,
          opacity: .55,
          marginLeft: 4
        }
      }, "/mo")), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          opacity: .6
        }
      }, annual ? `$${p.yr} billed yearly` : "billed monthly"))), /*#__PURE__*/React.createElement("span", {
        style: {
          fontSize: 13,
          lineHeight: 1.45,
          opacity: .7,
          borderTop: `var(--border-rule) solid ${p.popular ? "rgb(255 255 255/.16)" : "var(--stroke)"}`,
          paddingTop: "var(--space-4)"
        }
      }, p.limit), /*#__PURE__*/React.createElement("ul", {
        style: {
          margin: 0,
          padding: 0,
          listStyle: "none",
          display: "grid",
          gap: "var(--space-3)",
          alignContent: "start"
        }
      }, p.feats.map(f => /*#__PURE__*/React.createElement("li", {
        key: f,
        style: {
          display: "flex",
          gap: 10,
          alignItems: "flex-start",
          fontSize: 14,
          lineHeight: 1.4
        }
      }, /*#__PURE__*/React.createElement("span", {
        style: {
          color: p.popular ? "#C8FF2E" : `var(--field-${p.field})`,
          flex: "none",
          marginTop: 1
        }
      }, /*#__PURE__*/React.createElement(Icon, {
        name: "check",
        size: 16
      })), /*#__PURE__*/React.createElement("span", {
        style: {
          opacity: p.popular ? .9 : 1
        }
      }, f)))), /*#__PURE__*/React.createElement(Button, {
        as: "a",
        href: "#",
        size: "lg",
        shape: "pill",
        className: "mv-press",
        variant: p.popular ? "primary" : "secondary",
        style: p.popular ? {
          background: "#C8FF2E",
          borderColor: "#C8FF2E",
          color: "#141413",
          width: "100%"
        } : {
          width: "100%"
        }
      }, p.custom ? "Talk to sales" : "Start free"));
    })));
  }
  function Matrix() {
    const cell = v => v ? /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 17
    }) : /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--ink-faint)"
      }
    }, "\u2014");
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--tint-cobalt)",
        padding: "var(--space-20) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-2)",
        color: "var(--ink-strong)",
        maxWidth: "16ch"
      }
    }, "What's in each plan."), /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--bg-card)",
        borderRadius: "var(--radius-tile)",
        overflow: "hidden",
        boxShadow: "0 20px 50px rgb(20 20 19/.12)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "2fr repeat(4,1fr)",
        alignItems: "center",
        padding: "var(--space-5) var(--space-6)",
        borderBottom: "var(--border-rule) solid var(--stroke)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "var(--ink-faint)"
      }
    }, "Feature"), PLANS.map(p => /*#__PURE__*/React.createElement("span", {
      key: p.name,
      className: "mv-eyebrow",
      style: {
        textAlign: "center",
        color: p.popular ? "var(--field-violet)" : "var(--ink-muted)"
      }
    }, p.name))), MATRIX.map(([label, ...vals], i) => /*#__PURE__*/React.createElement("div", {
      key: label,
      style: {
        display: "grid",
        gridTemplateColumns: "2fr repeat(4,1fr)",
        alignItems: "center",
        padding: "var(--space-4) var(--space-6)",
        background: i % 2 ? "var(--bg-card-2)" : "transparent"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "var(--ink-strong)"
      }
    }, label), vals.map((v, j) => /*#__PURE__*/React.createElement("span", {
      key: j,
      style: {
        display: "grid",
        placeItems: "center",
        color: v ? "var(--success)" : "inherit"
      }
    }, cell(v))))))));
  }
  function Compare() {
    const rows = [["Pricing model", "Flat per account", "Per user, per month"], ["A 10-person team", "$249/mo", "$490/mo"], ["Yield % per BOM line", "Included", "Not offered"], ["BOM versioning & compare", "Included", "Not offered"], ["PO variance reporting", "Included", "Not offered"]];
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-ink)",
        color: "#fff",
        padding: "var(--space-20) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gridTemplateColumns: "1fr 1.25fr",
        gap: "var(--space-16)",
        alignItems: "center"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: "var(--space-5)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "#C8FF2E"
      }
    }, "Versus per-seat MRP"), /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-2)"
      }
    }, "Your team growing shouldn't cost more."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 17,
        lineHeight: 1.6,
        color: "rgb(255 255 255/.7)",
        maxWidth: "42ch",
        textWrap: "pretty"
      }
    }, "Tools that charge per user punish you for putting Manuva on the floor. Growth and Pro include unlimited team members at a flat rate.")), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr",
        padding: "0 0 var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "#C8FF2E"
      }
    }, "Manuva"), /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "rgb(255 255 255/.42)"
      }
    }, "Per-seat MRP")), rows.map(([k, a, b]) => /*#__PURE__*/React.createElement("div", {
      key: k,
      style: {
        display: "grid",
        gridTemplateColumns: "1.3fr 1fr 1fr",
        alignItems: "center",
        padding: "var(--space-4) 0",
        borderTop: "var(--border-rule) solid rgb(255 255 255/.14)"
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.62)"
      }
    }, k), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        fontWeight: 700
      }
    }, a), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.4)"
      }
    }, b))))));
  }
  function Integrations() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "var(--space-16) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gap: "var(--space-6)",
        justifyItems: "center",
        textAlign: "center"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "var(--ink-faint)"
      }
    }, "Connects with"), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        flexWrap: "wrap",
        gap: "var(--space-3)",
        justifyContent: "center"
      }
    }, INTEGRATIONS.map(i => /*#__PURE__*/React.createElement("span", {
      key: i,
      style: {
        padding: "10px 20px",
        borderRadius: "var(--radius-pill)",
        border: "var(--border-rule) solid var(--stroke-card)",
        fontSize: 15,
        fontWeight: 600,
        color: "var(--ink-strong)",
        background: "var(--bg-card)"
      }
    }, i)))));
  }
  function FAQ() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "var(--space-20) 0"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        display: "grid",
        gridTemplateColumns: "1fr 1.6fr",
        gap: "var(--space-16)",
        alignItems: "start"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-2)",
        color: "var(--ink-strong)",
        maxWidth: "11ch",
        position: "sticky",
        top: 120
      }
    }, "Questions, answered."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid"
      }
    }, FAQS.map(([q, a], i) => /*#__PURE__*/React.createElement("details", {
      key: q,
      open: i === 0,
      style: {
        borderTop: "var(--border-rule) solid var(--stroke-strong)",
        padding: "var(--space-5) 0"
      }
    }, /*#__PURE__*/React.createElement("summary", {
      style: {
        cursor: "pointer",
        listStyle: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        fontFamily: "var(--font-display)",
        fontVariationSettings: '"wdth" 106,"wght" 700',
        fontSize: 19,
        letterSpacing: "-.015em",
        color: "var(--ink-strong)"
      }
    }, q, /*#__PURE__*/React.createElement("span", {
      style: {
        color: "var(--field-cobalt)",
        flex: "none"
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down",
      size: 20
    }))), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: "var(--space-4) 0 0",
        maxWidth: "62ch",
        fontSize: 15,
        lineHeight: 1.6,
        color: "var(--ink-muted)",
        textWrap: "pretty"
      }
    }, a))))));
  }
  function CTA() {
    return /*#__PURE__*/React.createElement("section", {
      style: {
        background: "var(--field-paper)",
        padding: "0 var(--space-8) var(--space-8)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        maxWidth: "var(--page-max)",
        margin: "0 auto",
        background: "var(--field-flare)",
        color: "var(--on-flare)",
        borderRadius: "var(--radius-panel)",
        padding: "var(--space-20) var(--space-16)",
        textAlign: "center",
        display: "grid",
        justifyItems: "center",
        gap: "var(--space-6)"
      }
    }, /*#__PURE__*/React.createElement("h2", {
      style: {
        ...DISPLAY,
        fontSize: "var(--fs-display-4)",
        maxWidth: "13ch"
      }
    }, "Try the whole thing free."), /*#__PURE__*/React.createElement("p", {
      style: {
        margin: 0,
        fontSize: 19,
        lineHeight: 1.45,
        color: "rgb(255 255 255/.86)",
        maxWidth: "40ch",
        textWrap: "pretty"
      }
    }, "14 days of full Pro access. No credit card, no sales call to get started."), /*#__PURE__*/React.createElement("div", {
      style: {
        display: "flex",
        gap: "var(--space-3)"
      }
    }, /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "xl",
      shape: "pill",
      className: "mv-press",
      style: {
        background: "#fff",
        borderColor: "#fff",
        color: "var(--field-flare)",
        padding: "0 32px"
      }
    }, "Start free"), /*#__PURE__*/React.createElement(Button, {
      as: "a",
      href: "#",
      size: "xl",
      shape: "pill",
      variant: "ghost",
      className: "mv-press",
      style: {
        color: "#fff",
        borderColor: "rgb(255 255 255/.46)",
        padding: "0 32px"
      }
    }, "Talk to sales")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.72)"
      }
    }, "Questions? ", /*#__PURE__*/React.createElement("a", {
      href: "mailto:hello@manuva.app",
      style: {
        color: "#fff",
        fontWeight: 600
      }
    }, "hello@manuva.app"))));
  }
  function Footer() {
    return /*#__PURE__*/React.createElement("footer", {
      style: {
        background: "var(--field-ink)",
        color: "rgb(255 255 255/.62)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        padding: "var(--space-16) var(--space-8)",
        display: "grid",
        gridTemplateColumns: "2fr 1fr 1fr 1fr",
        gap: "var(--space-10)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        display: "grid",
        gap: "var(--space-5)",
        alignContent: "start"
      }
    }, /*#__PURE__*/React.createElement(Logo, {
      variant: "lockup",
      height: 24,
      base: "../../",
      style: {
        color: "#fff"
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 15,
        maxWidth: "28ch",
        lineHeight: 1.5
      }
    }, "Manufacturing operations, finally simple."), /*#__PURE__*/React.createElement("a", {
      href: "mailto:hello@manuva.app",
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.62)"
      }
    }, "hello@manuva.app")), [["Product", ["Features", "Pricing"]], ["Compare", ["vs Katana", "vs MRPeasy"]], ["Company", ["About", "Privacy", "Terms"]]].map(([h, items]) => /*#__PURE__*/React.createElement("div", {
      key: h,
      style: {
        display: "grid",
        gap: "var(--space-3)",
        alignContent: "start"
      }
    }, /*#__PURE__*/React.createElement("span", {
      className: "mv-eyebrow",
      style: {
        color: "#C8FF2E",
        marginBottom: 4
      }
    }, h), items.map(i => /*#__PURE__*/React.createElement("a", {
      key: i,
      href: "#",
      style: {
        fontSize: 14,
        color: "rgb(255 255 255/.62)",
        textDecoration: "none"
      }
    }, i))))), /*#__PURE__*/React.createElement("div", {
      style: {
        borderTop: "var(--border-rule) solid rgb(255 255 255/.12)"
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        ...MAX,
        padding: "var(--space-5) var(--space-8)",
        display: "flex",
        justifyContent: "space-between",
        fontSize: 12,
        color: "rgb(255 255 255/.42)"
      }
    }, /*#__PURE__*/React.createElement("span", null, "\xA9 2026 Pac Technologies Pty Ltd"), /*#__PURE__*/React.createElement("span", {
      className: "mv-mono"
    }, "manuva.app"))));
  }
  function Pricing() {
    const [annual, setAnnual] = React.useState(true);
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: "var(--field-paper)"
      }
    }, /*#__PURE__*/React.createElement(Nav, null), /*#__PURE__*/React.createElement(Hero, {
      annual: annual,
      setAnnual: setAnnual
    }), /*#__PURE__*/React.createElement(Plans, {
      annual: annual
    }), /*#__PURE__*/React.createElement(Matrix, null), /*#__PURE__*/React.createElement(Compare, null), /*#__PURE__*/React.createElement(Integrations, null), /*#__PURE__*/React.createElement(FAQ, null), /*#__PURE__*/React.createElement(CTA, null), /*#__PURE__*/React.createElement(Footer, null));
  }
  Object.assign(window, {
    Pricing
  });
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/Pricing.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing/image-slot.js
try { (() => {
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)
// Copied omelette starter. Re-running copy_starter_component with this kind overwrites this file with the latest version (page content is unaffected).
/* BEGIN USAGE */
/**
 * <image-slot> — user-fillable image placeholder.
 *
 * Drop this into a deck, mockup, or page wherever a design needs an image.
 * You control the slot's shape; it sizes to its container by default. When the search_stock_photos tool
 * is available, prefill the slot by default — write the photo's URL into
 * src (with credit/credit-href); the user can still fill or replace it
 * by dragging an image file onto it (or clicking to browse). The dropped
 * image persists across reloads via a .image-slots.state.json sidecar —
 * same read-via-fetch / write-via-window.omelette pattern as
 * design_canvas.jsx, so the filled slot shows on share links, downloaded
 * zips, and PPTX export. Outside the omelette runtime the slot is read-only.
 *
 * The sidecar is a SIBLING of the HTML file that uses this component: the
 * read is a document-relative fetch, and the host resolves the bridge's
 * sidecar writes into the previewed file's directory to match (same
 * contract as design_canvas.jsx). Pages in the same directory share one
 * sidecar; keep slot ids distinct across them.
 *
 * Attributes:
 *   id           Persistence key. REQUIRED for the drop to survive reload —
 *                every slot on the page needs a distinct id.
 *   shape        'rect' | 'rounded' | 'circle' | 'pill'   (default 'rounded')
 *                'circle' applies 50% border-radius; on a non-square slot
 *                that's an ellipse — set equal width and height for a true
 *                circle.
 *   radius       Corner radius in px for 'rounded'.       (default 12)
 *   mask         Any CSS clip-path value. Overrides `shape` — use this for
 *                hexagons, blobs, arbitrary polygons.
 *   fit          Initial framing baseline: cover | contain.   (default 'cover')
 *                cover starts the image filling the frame (overflow cropped);
 *                contain starts it fully visible (letterboxed). Either way the
 *                user can always pan/scale from there — double-click, or the
 *                Edit control, enters reframe mode (drag to move, scroll or
 *                corner-handles to scale; Escape / click-out commits). The
 *                crop persists alongside the image in the sidecar.
 *   placeholder  Empty-state caption.                      (default 'Drop an image')
 *   src          Optional initial/fallback image URL. Prefill it with a real
 *                photo via search_stock_photos when that tool is available
 *                (set credit/credit-href from the result). A user drop
 *                overrides it; clearing the drop reveals src again.
 *   credit       Attribution text shown as a small overlay at the
 *                bottom-left of the filled slot. REQUIRED whenever src
 *                points at any Unsplash host (images.unsplash.com,
 *                plus.unsplash.com, …): an Unsplash src with no credit
 *                renders an error tile INSTEAD of the photo (Unsplash
 *                terms forbid showing their photos unattributed). Use the
 *                exact form 'Photo by {photographer name} on Unsplash' —
 *                the overlay then links the name to credit-href and
 *                'Unsplash' to the Unsplash homepage, and links back to
 *                unsplash.com automatically get the required utm referral
 *                params appended at render time. The credit belongs to
 *                the src image, so it only shows while src is what's
 *                displayed — a user-dropped image hides it.
 *   credit-href  Link for the photographer's name in the credit overlay
 *                (their Unsplash profile URL from the stock-photo search
 *                results). http(s) URLs only — anything else renders the
 *                name as plain text.
 *
 * Sizing: the slot fills its container by default (width/height 100%).
 * Put it in a sized wrapper — absolutely positioned, a grid cell, a fixed
 * frame — and it takes exactly that box. When the parent's height is
 * indefinite (ordinary flow), it falls back to full width at a 3:2 aspect
 * ratio instead of collapsing. In a shrink-to-fit parent (a float,
 * width:max-content, an unsized absolute wrapper), percentages have
 * nothing to resolve against — size the slot or its wrapper explicitly
 * there. For a fixed-size slot, set
 * width/height on the element itself (inline style), which overrides the
 * default. When
 * layering content above a slot (full-bleed layouts), make the overlay
 * click-through — pointer-events: none on scrims/text plates, re-enabled
 * on interactive children — so the slot's hover controls stay reachable.
 * Keep the slot's bottom-left corner visually clear as well: the credit
 * overlay renders there, and a dark fade or text plate covering it hides
 * the attribution Unsplash's terms require — end the fade above that
 * corner, or keep it nearly transparent where the credit sits.
 *
 * Usage:
 *   <div style="position:relative;width:100%;height:100%">      <!-- full-bleed: -->
 *     <image-slot id="bg" shape="rect"></image-slot>            <!-- fills the wrapper -->
 *   </div>
 *   <image-slot id="hero"   style="width:800px;height:450px" shape="rounded" radius="20"
 *               placeholder="Drop a hero image"></image-slot>
 *   <image-slot id="avatar" style="width:120px;height:120px" shape="circle"></image-slot>
 *   <image-slot id="kite"   style="width:300px;height:300px"
 *               mask="polygon(50% 0, 100% 50%, 50% 100%, 0 50%)"></image-slot>
 */
/* END USAGE */

(() => {
  const STATE_FILE = '.image-slots.state.json';

  // Unsplash terms require visible attribution wherever their photos
  // display, and every link back to unsplash.com must carry utm referral
  // params. Two render-time rules enforce that here:
  //  - an Unsplash-src slot with NO credit attribute renders an error
  //    tile INSTEAD of the photo (an uncredited Unsplash photo on screen
  //    is itself the terms violation, so it never renders bare);
  //  - rendered credit links pointing at unsplash.com get the referral
  //    params appended when absent (credit-href values live in page
  //    content that can't be edited after the fact).
  // Keep the utm_source value in sync with UTM_SOURCE in
  // platform/web-agent/unsplash.ts — this file is a project-local
  // artifact and cannot import it (equality is pinned by tests).
  const UNSPLASH_HOMEPAGE_HREF = 'https://unsplash.com/?utm_source=claude_design&utm_medium=referral';
  // Host rule mirrors the hotlink validator that admits Unsplash srcs into
  // pages in the first place (cdn$ in unsplash.ts: apex or any subdomain)
  // — Unsplash+ results serve from plus.unsplash.com, not just images.*,
  // and an admitted-but-uncredited photo must error whatever unsplash
  // host it rides on.
  // Trailing-dot FQDNs (images.unsplash.com.) are the same host to the
  // browser but would miss the regex — strip one dot so the check fails
  // CLOSED (unrecognized-but-real Unsplash srcs must error, not render).
  const isUnsplashHost = u => {
    try {
      return /(^|\.)unsplash\.com$/.test(new URL(u, document.baseURI).hostname.replace(/\.$/, ''));
    } catch {
      return false;
    }
  };
  // Render-time referral normalization for links back to Unsplash:
  // appends utm_source/utm_medium when absent, preserves every existing
  // query param, never overwrites an existing utm_source, and passes
  // non-Unsplash URLs through untouched. Input is an ABSOLUTE validated
  // http(s) URL (the credit render funnel resolves + validates first).
  const withReferral = href => {
    try {
      const u = new URL(href);
      if (!/(^|\.)unsplash\.com$/.test(u.hostname.replace(/\.$/, ''))) {
        return href;
      }
      if (!u.searchParams.has('utm_source')) {
        u.searchParams.set('utm_source', 'claude_design');
      }
      if (!u.searchParams.has('utm_medium')) {
        u.searchParams.set('utm_medium', 'referral');
      }
      return u.toString();
    } catch (e) {
      return href;
    }
  };
  // 2× a ~600px slot in a 1920-wide deck — retina-sharp without making the
  // sidecar enormous. A 1200px WebP at q=0.85 is ~150-300KB.
  const MAX_DIM = 1200;
  // Raster formats only. SVG is excluded (can carry script; createImageBitmap
  // on SVG blobs is inconsistent). GIF is excluded because the canvas
  // re-encode keeps only the first frame, so an animated GIF would silently
  // go still — better to reject than surprise.
  const ACCEPT = ['image/png', 'image/jpeg', 'image/webp', 'image/avif'];

  // ── Shared sidecar store ────────────────────────────────────────────────
  // One fetch + immediate write-on-change for every <image-slot> on the
  // page. Reads via fetch() so viewing works anywhere the HTML and sidecar
  // are served together; writes go through window.omelette.writeFile, which
  // the host allowlists to *.state.json basenames only.
  const subs = new Set();
  let slots = {};
  // ids explicitly cleared before the sidecar fetch resolved — otherwise
  // the merge below can't tell "never set" from "just deleted" and would
  // resurrect the sidecar's stale value.
  const tombstones = new Set();
  let loaded = false;
  let loadP = null;
  function load() {
    if (loadP) return loadP;
    loadP = fetch(STATE_FILE).then(r => r.ok ? r.json() : null).then(j => {
      // Merge: sidecar loses to any in-memory change that raced ahead of
      // the fetch (drop or clear) so neither is clobbered by hydration.
      if (j && typeof j === 'object') {
        const merged = Object.assign({}, j, slots);
        // A framing-only write that raced ahead of hydration must not
        // drop a user image that's only on disk — inherit u from the
        // sidecar for any in-memory entry that lacks one.
        for (const k in slots) {
          if (merged[k] && !merged[k].u && j[k]) {
            merged[k].u = typeof j[k] === 'string' ? j[k] : j[k].u;
          }
        }
        for (const id of tombstones) delete merged[id];
        slots = merged;
      }
      tombstones.clear();
    }).catch(() => {}).then(() => {
      loaded = true;
      subs.forEach(fn => fn());
    });
    return loadP;
  }

  // Serialize writes so two near-simultaneous drops on different slots
  // can't reorder at the backend and leave the sidecar with only the
  // first. A save requested mid-flight just marks dirty and re-fires on
  // completion with the then-current slots.
  let saving = false;
  let saveDirty = false;
  // Unload-time flush: save()'s serialization defers a mid-RTT re-fire to a
  // .then that never runs in an unloading document, silently dropping a
  // pagehide commit. Post the current slots immediately instead — content
  // is a superset snapshot of any in-flight save's, the write is a
  // whole-file last-writer-wins replace, and postMessage FIFO delivers it
  // to the host after the in-flight one, so a backend-side reorder at
  // worst reproduces the dropped-commit outcome this flush improves on.
  // Guarded on the initial sidecar read: pre-hydration slots can miss
  // other slots' persisted entries, and flushing it would clobber them —
  // that narrow case stays best-effort (the in-memory merge in load()
  // cannot happen in an unloading document anyway).
  function flushNow() {
    if (!loaded) return;
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    try {
      Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {});
    } catch (e) {}
  }
  function save() {
    if (saving) {
      saveDirty = true;
      return;
    }
    const w = window.omelette && window.omelette.writeFile;
    if (!w) return;
    saving = true;
    Promise.resolve(w(STATE_FILE, JSON.stringify(slots))).catch(() => {}).then(() => {
      saving = false;
      if (saveDirty) {
        saveDirty = false;
        save();
      }
    });
  }
  const S_MAX = 5;
  const clampS = s => Math.max(1, Math.min(S_MAX, s));

  // Normalize a stored slot value. Pre-reframe sidecars stored a bare
  // data-URL string; newer ones store {u, s, x, y}. Either shape is valid.
  function getSlot(id) {
    const v = slots[id];
    if (!v) return null;
    return typeof v === 'string' ? {
      u: v,
      s: 1,
      x: 0,
      y: 0
    } : v;
  }
  function setSlot(id, val) {
    if (!id) return;
    if (val) {
      slots[id] = val;
      tombstones.delete(id);
    } else {
      delete slots[id];
      if (!loaded) tombstones.add(id);
    }
    subs.forEach(fn => fn());
    // A drop is rare + high-value — write immediately so nav-away can't lose
    // it. Gate on the initial read so we don't overwrite a sidecar we haven't
    // merged yet; the merge in load() keeps this change once the read lands.
    if (loaded) save();else load().then(save);
  }

  // ── Image downscale ─────────────────────────────────────────────────────
  // Encode through a canvas so the sidecar carries resized bytes, not the
  // raw upload. Longest side is capped at 2× the slot's rendered width
  // (retina) and at MAX_DIM. WebP keeps alpha and is ~10× smaller than PNG
  // for photos, so there's no need for per-image format picking.
  async function toDataUrl(file, targetW) {
    const bitmap = await createImageBitmap(file);
    try {
      const cap = Math.min(MAX_DIM, Math.max(1, Math.round(targetW * 2)) || MAX_DIM);
      const scale = Math.min(1, cap / Math.max(bitmap.width, bitmap.height));
      const w = Math.max(1, Math.round(bitmap.width * scale));
      const h = Math.max(1, Math.round(bitmap.height * scale));
      const canvas = document.createElement('canvas');
      canvas.width = w;
      canvas.height = h;
      canvas.getContext('2d').drawImage(bitmap, 0, 0, w, h);
      return canvas.toDataURL('image/webp', 0.85);
    } finally {
      bitmap.close && bitmap.close();
    }
  }

  // ── Custom element ──────────────────────────────────────────────────────
  const stylesheet =
  // Fill the container by default: slots are usually placed inside a
  // sized wrapper (a hero frame, a grid cell, an inset:0 layer) and are
  // expected to take that box — a fixed intrinsic size would render as
  // a small tile in the corner of a full-bleed wrapper instead.
  // aspect-ratio is the companion fallback that keeps a bare slot
  // visible when the parent's height is indefinite: height:100%
  // resolves to auto there, and the ratio then derives height from
  // width instead of letting the slot collapse to zero height.
  // Explicit width/height on the element override all of this.
  // color:inherit (not a fixed near-black): the placeholder chrome —
  // empty-state icon/caption (currentColor) and the dashed ring — must
  // read on dark decks too, and the slide's own text color is the one
  // color guaranteed to contrast with the slide background. The soft
  // look comes from opacity on those parts, not from a baked-in alpha.
  ':host{display:block;position:relative;' + '  font:13px/1.3 system-ui,-apple-system,sans-serif;' + '  width:100%;height:100%;aspect-ratio:3/2}' + '.empty .cap,.empty .sub{opacity:.75}' + '.frame{position:absolute;inset:0;overflow:hidden;background:rgba(127,127,127,.08)}' +
  // .frame img (clipped) and .spill (unclipped ghost + handles) share the
  // same left/top/width/height in frame-%, computed by _applyView(), so the
  // inside-mask crop and the outside-mask spill stay pixel-aligned.
  '.frame img{position:absolute;max-width:none;transform:translate(-50%,-50%);' + '  -webkit-user-drag:none;user-select:none;touch-action:none}' +
  // Reframe mode (double-click): the full image spills past the mask. The
  // spill layer is sized to the IMAGE bounds so its corners are where the
  // resize handles belong. The ghost <img> inside is translucent; the real
  // clipped <img> underneath shows the opaque in-mask crop.
  // popover=manual promotes the spill to the top layer on reframe, so it is
  // not clipped by any overflow:hidden / clip-path / scroll-container
  // ancestor (a plain z-index can't escape overflow clipping). UA popover
  // defaults (inset:0;margin:auto) are reset; _applyView sets viewport px.
  '.spill{position:fixed;margin:0;inset:auto;border:0;padding:0;background:transparent;' + '  overflow:visible;transform:translate(-50%,-50%);z-index:1;cursor:grab;touch-action:none}' + ':host([data-panning]) .spill{cursor:grabbing}' + '.spill .ghost{position:absolute;inset:0;width:100%;height:100%;opacity:.35;' + '  pointer-events:none;-webkit-user-drag:none;user-select:none;' + '  box-shadow:0 0 0 1px rgba(0,0,0,.2),0 12px 32px rgba(0,0,0,.2)}' + '.spill .handle{position:absolute;width:12px;height:12px;border-radius:50%;' + '  background:#fff;box-shadow:0 0 0 1.5px #c96442,0 1px 3px rgba(0,0,0,.3);' + '  transform:translate(-50%,-50%)}' + '.spill .handle[data-c=nw]{left:0;top:0;cursor:nwse-resize}' + '.spill .handle[data-c=ne]{left:100%;top:0;cursor:nesw-resize}' + '.spill .handle[data-c=sw]{left:0;top:100%;cursor:nesw-resize}' + '.spill .handle[data-c=se]{left:100%;top:100%;cursor:nwse-resize}' + ':host([data-reframe]){z-index:10}' + ':host([data-reframe]) .frame{box-shadow:0 0 0 2px #c96442}' + '.empty{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  cursor:pointer;user-select:none}' + '.empty svg{opacity:.45}' + '.empty .cap{max-width:90%;font-weight:500;letter-spacing:.01em}' + '.empty .sub{font-size:11px}' + '.empty .sub u{text-underline-offset:2px}' + '.empty:hover .sub{opacity:1}' + ':host([data-over]) .frame{outline:2px solid #c96442;outline-offset:-2px;' + '  background:rgba(201,100,66,.10)}' + '.ring{position:absolute;inset:0;pointer-events:none;border:1.5px dashed currentColor;' + '  opacity:.35;transition:border-color .12s,opacity .12s}' + ':host([data-over]) .ring{border-color:#c96442;opacity:1}' + ':host([data-filled]) .ring{display:none}' +
  // Controls overlay INSIDE the frame, pinned to the top-right corner, so
  // a full-bleed slot in an overflow:hidden container still shows them
  // (the old below-mask placement got clipped). Credit sits bottom-left,
  // so top-right avoids collision. The blurred pill background keeps them
  // legible over the image.
  // The UA [popover] base rule styles the element in EVERY state (only
  // display:none is gated on :not(:popover-open), and the display:flex
  // below overrides that) — so the UA resets live HERE, like .spill's,
  // or the ordinary hover-state strip renders as a bordered Canvas box
  // centered by margin:auto. inset:auto precedes top/right (shorthand).
  '.ctl{position:absolute;inset:auto;top:8px;right:8px;margin:0;border:0;padding:0;' + '  background:transparent;overflow:visible;' + '  display:flex;gap:6px;opacity:0;pointer-events:none;transition:opacity .12s;z-index:2;' + '  white-space:nowrap}' +
  // While reframing, the spill owns the top layer and would swallow every
  // click on the in-frame controls. Promoting .ctl into the top layer
  // ABOVE the spill (shown after it — later popovers stack higher) keeps
  // Edit-as-toggle and Replace clickable mid-reframe. _applyView pins it
  // to the frame's top-right in viewport px (translateX(-100%)
  // right-aligns against the computed left edge); inset:auto clears the
  // base rule's top/right so the inline left/top position it alone.
  '.ctl:popover-open{position:fixed;inset:auto;transform:translateX(-100%)}' + ':host([data-filled][data-editable]:hover) .ctl,:host([data-reframe]) .ctl' + '  {opacity:1;pointer-events:auto}' + '.ctl button{appearance:none;border:0;border-radius:6px;padding:5px 10px;cursor:pointer;' + '  background:rgba(0,0,0,.65);color:#fff;font:11px/1 system-ui,-apple-system,sans-serif;' + '  backdrop-filter:blur(6px)}' + '.ctl button:hover{background:rgba(0,0,0,.8)}' + '.err{position:absolute;left:8px;bottom:8px;right:8px;color:#b3261e;font-size:11px;' + '  background:rgba(255,255,255,.85);padding:4px 6px;border-radius:5px;pointer-events:none}' +
  // Replacement in flight: after a src swap the browser keeps painting
  // the PREVIOUS image until the new one decodes, so a Replace would
  // flash the old photo and then pop. Hide the stale frame (visibility,
  // not display — _applyView geometry still applies) and spin until the
  // new image reports in (load/error clears data-swapping).
  ':host([data-swapping]) .frame img{visibility:hidden}' + '.loading{position:absolute;inset:0;display:none;align-items:center;' + '  justify-content:center;pointer-events:none}' + ':host([data-swapping]) .loading{display:flex}' + '.loading::after{content:"";width:22px;height:22px;border-radius:50%;' + '  border:2px solid rgba(127,127,127,.25);border-top-color:currentColor;' + '  animation:om-slot-spin .7s linear infinite}' + '@keyframes om-slot-spin{to{transform:rotate(360deg)}}' +
  // Reduced motion: the static two-tone ring still reads as "working".
  '@media (prefers-reduced-motion:reduce){.loading::after{animation:none}}' + '.credit{position:absolute;left:6px;bottom:6px;max-width:calc(100% - 12px);display:none;' + '  padding:3px 7px;border-radius:5px;background:rgba(0,0,0,.55);color:#fff;' + '  font:10px/1.2 system-ui,-apple-system,sans-serif;text-decoration:none;' + '  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;backdrop-filter:blur(6px)}' +
  // The credit is a SPAN holding one or two <a>s (Unsplash's prescribed
  // form links the photographer AND Unsplash) — anchors style inline so
  // the overlay reads as one line of text.
  '.credit a{color:inherit;text-decoration:none}' + '.credit a:hover,.credit a:focus-visible{text-decoration:underline}' + ':host([data-filled][data-credit]) .credit{display:block}' +
  // Exports must ship JUST the image — no hover controls, no credit chip
  // (the host marks <html data-om-exporting> for the capture window; the
  // page-level hide script can't reach shadow DOM, this rule can).
  ':host-context([data-om-exporting]) .ctl,' + ':host-context([data-om-exporting]) .credit{display:none !important}' +
  // Print must ship just the image too: the hover-gated controls can be
  // mid-hover when print() fires, and the credit chip is screen chrome —
  // the same rule the capture window gets, keyed on print media instead
  // of the host's data-om-exporting mark (the print path sets no mark).
  '@media print{.ctl,.credit{display:none !important}}' +
  // No export-window mask rules here on purpose: the export capture
  // releases the replacement mask by REMOVING data-swapping (the
  // shadow-root pass in pages/export/shared.ts HIDE_EXPORT_CHROME_SCRIPT)
  // — attribute removal works in every engine (:host-context is
  // Chromium-only), is scoped by construction to slots actually
  // mid-swap, and hides the spinner through the same gate. A masked img
  // would otherwise be silently dropped from PPTX decks (the capture
  // walk skips visibility:hidden imgs).
  // Attribution error tile: REPLACES the photo when an Unsplash src has
  // no credit attribute — rendering the photo uncredited is the terms
  // violation, so the photo must not appear at all.
  // Calm and neutral on purpose (review feedback): the tile informs the
  // user; the fix instructions are machine-facing (usage docblock, tool
  // description, and the turn-end scan's bounce copy name the attributes
  // for the agent).
  '.attr-error{position:absolute;inset:0;display:none;flex-direction:column;align-items:center;' + '  justify-content:center;gap:6px;text-align:center;padding:12px;box-sizing:border-box;' + '  background:#f2f1ef;color:#6e6c66;user-select:none;' + '  font:13px/1.45 system-ui,-apple-system,sans-serif}' + '.attr-error svg{opacity:.55}' + '.attr-error .cap{max-width:92%;font-weight:500;letter-spacing:.01em}' + ':host([data-attribution-error]) .attr-error{display:flex}' + ':host([data-attribution-error]) .ring{display:none}';
  const icon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/>' + '<path d="m21 15-5-5L5 21"/></svg>';
  const warnIcon = '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" ' + 'stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + '<path d="m21.73 18-8-14a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"/>' + '<path d="M12 9v4"/><path d="M12 17h.01"/></svg>';
  class ImageSlot extends HTMLElement {
    static get observedAttributes() {
      return ['shape', 'radius', 'mask', 'fit', 'placeholder', 'src', 'id', 'credit', 'credit-href'];
    }

    /** Duplicate-slide hook (called by deck-stage, see its
     *  _remintDuplicateIds): copy this id's stored image, if any, under a
     *  freshly minted key and return that key — so a duplicated slide's
     *  slot keeps its dropped photo instead of reverting to the
     *  placeholder. 'isFree' is the caller's uniqueness check (document
     *  ids); candidates must ALSO be unused in the sidecar, which can
     *  hold keys from other pages sharing the project root. (An EMPTY
     *  slot on another page leaves no sidecar entry, so its id is not
     *  detectable here — a minted key can collide with it and that slot
     *  would show this photo. Same blast radius as two pages reusing an
     *  id by hand, which the shared sidecar already permits.) Returns null
     *  when no id could be minted (caller strips the id, today's
     *  behavior). */
    static cloneSlot(fromId, isFree) {
      if (typeof fromId !== 'string' || !fromId) return null;
      // Pre-hydration the store can't veto candidates or source the copy
      // — degrade to the strip (today's behavior) rather than mint
      // against keys we can't see yet. Any rendered (= droppable) slot
      // means load() has already settled.
      if (!loaded) return null;
      const stem = fromId.replace(/-\d+$/, '') || fromId;
      for (let n = 2; n < 100; n++) {
        const toId = stem + '-' + n;
        if (toId === fromId) continue;
        if (slots[toId] !== undefined) {
          // Reuse a key holding this exact value (bytes AND crop) if no
          // live element here owns it — a duplicate op the host refused
          // after minting leaves such a key behind, and reusing keeps
          // refused retries from accumulating one orphaned copy per
          // attempt. Full equality (not just bytes) so a byte-identical
          // key another PAGE owns with its own crop is stepped past, not
          // adopted or rewritten. (Entries without .u never match.)
          const prev = getSlot(toId);
          const cur = getSlot(fromId);
          if (!(prev && cur && prev.u && prev.u === cur.u && prev.s === cur.s && prev.x === cur.x && prev.y === cur.y && (typeof isFree !== 'function' || isFree(toId)))) continue;
          return toId;
        }
        if (typeof isFree === 'function' && !isFree(toId)) continue;
        const v = getSlot(fromId);
        if (v) setSlot(toId, Object.assign({}, v));
        return toId;
      }
      return null;
    }
    constructor() {
      super();
      // clonable: rail thumbnails deep-clone slides and carry this shadow
      // along; reuse an already-cloned root so upgrade-after-clone works.
      // (Deliberately NOT serializable — a getHTML consumer would embed
      // multi-MB sidecar data-URLs into serialized page HTML.)
      const root = this.shadowRoot || this.attachShadow({
        mode: 'open',
        clonable: true
      });
      // .spill and .ctl sit OUTSIDE .frame so overflow:hidden + border-radius
      // on the frame (circle, pill, rounded) can't clip them.
      root.innerHTML = '<style>' + stylesheet + '</style>' + '<div class="frame" part="frame">' + '  <img part="image" alt="" draggable="false" style="display:none">' + '  <div class="empty" part="empty">' + icon + '    <div class="cap"></div>' + '    <div class="sub">or <u>browse files</u></div></div>' + '  <div class="attr-error" part="attribution-error">' + warnIcon + '    <div class="cap">This photo needs attribution</div></div>' + '  <div class="loading" part="loading"></div>' + '  <div class="ring" part="ring"></div>' + '</div>' +
      // Outside .frame, like .spill/.ctl — the frame's overflow:hidden +
      // border-radius/clip-path would cut the credit off on circle/pill/mask.
      // A SPAN, not an <a>: the prescribed Unsplash credit holds two links
      // (photographer + Unsplash), built per-render in _render().
      '<span class="credit" part="credit"></span>' + '<div class="spill" popover="manual" data-dc-edit-transparent>' + '  <img class="ghost" alt="" draggable="false">' + '  <div class="handle" data-c="nw"></div><div class="handle" data-c="ne"></div>' + '  <div class="handle" data-c="sw"></div><div class="handle" data-c="se"></div>' + '</div>' +
      // data-dc-edit-transparent: the DC editor's edit-mode picker lets
      // clicks through for chrome marked with it (EDIT_TRANSPARENT_SEL)
      // — without it, Replace/Edit clicks in Edit mode are swallowed by
      // element selection and the controls look dead.
      '<div class="ctl" popover="manual" data-dc-edit-transparent><button data-act="replace" title="Replace image">Replace</button>' + '  <button data-act="edit" title="Reframe image">Edit</button></div>' + '<input type="file" accept="' + ACCEPT.join(',') + '" hidden>';
      this._frame = root.querySelector('.frame');
      this._ring = root.querySelector('.ring');
      this._img = root.querySelector('.frame img');
      this._empty = root.querySelector('.empty');
      this._cap = root.querySelector('.cap');
      this._sub = root.querySelector('.sub');
      this._spill = root.querySelector('.spill');
      this._ctl = root.querySelector('.ctl');
      this._credit = root.querySelector('.credit');
      this._attrError = root.querySelector('.attr-error');
      // Credit clicks open the link, not browse/reframe.
      this._credit.addEventListener('click', e => e.stopPropagation());
      this._credit.addEventListener('dblclick', e => e.stopPropagation());
      this._ghost = root.querySelector('.ghost');
      this._err = null;
      this._input = root.querySelector('input');
      this._depth = 0;
      this._gen = 0;
      // Encode-in-flight marker (the owning _ingest generation): while set,
      // the same-src "nothing in flight" clear in _render must not fire —
      // the stored value still points at the OLD image until the encode
      // lands, so that clear would unmask the stale image mid-replace.
      this._swapGen = 0;
      // Render-owned swap in flight: set when _render assigns a new src,
      // cleared only by the img's own load/error (or the empty branch).
      // img.complete CANNOT stand in for this — setting src only QUEUES
      // the current-request swap (a microtask), so synchronously after an
      // assignment, complete still reports the OLD settled request. The
      // pick path does exactly that: the host sets src, credit, and
      // credit-href back-to-back in one task, and renders #2/#3 would
      // read the stale complete === true and drop the mask one render
      // after it was set.
      this._loadPending = false;
      // See _render's empty branch: a transient attribution-error wipe of a
      // showing image must make the follow-up render a replacement (spinner),
      // not a first fill (blank frame).
      this._hidShowing = false;
      this._view = {
        s: 1,
        x: 0,
        y: 0
      };
      this._subFn = () => this._render();
      // Shadow-DOM listeners live with the shadow DOM — bound once here so
      // disconnect/reconnect (e.g. React remount) doesn't stack handlers.
      this._empty.addEventListener('click', () => this._input.click());
      root.addEventListener('click', e => {
        const act = e.target && e.target.getAttribute && e.target.getAttribute('data-act');
        if (!act) return;
        // The hidden controls are opacity-0 but still tabbable — without
        // this gate a keyboard user could drive them on a read-only share
        // link (mirrors the dblclick handler's editable gate).
        if (!this.hasAttribute('data-editable')) return;
        if (act === 'replace') {
          this._exitReframe(true);
          // Host-owned picker (Unsplash modal; it also offers local import).
          this.dispatchEvent(new CustomEvent('image-slot:pick', {
            bubbles: true,
            composed: true,
            detail: {
              id: this.id || null
            }
          }));
        }
        if (act === 'edit') {
          if (!this._reframes()) return;
          if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
        }
      });
      this._input.addEventListener('change', () => {
        const f = this._input.files && this._input.files[0];
        if (f) this._ingest(f);
        this._input.value = '';
      });
      // naturalWidth/Height aren't known until load — re-apply so the cover
      // baseline is computed from real dimensions, not the 100%×100% fallback.
      // load/error also release the replacement-in-flight mask (via the
      // single discipline in _releaseMask): the swap is only revealed once
      // the new image can actually paint (on error the frame shows its
      // background, same as a fresh slot with a broken src).
      this._img.addEventListener('load', () => {
        this._loadPending = false;
        this._releaseMask(true);
        this._applyView();
      });
      this._img.addEventListener('error', () => {
        this._loadPending = false;
        this._releaseMask(true);
      });
      // Gated only on editable — any filled slot can be repositioned/scaled,
      // regardless of fit. Share links (no writeFile) stay static.
      this.addEventListener('dblclick', e => {
        if (!this.hasAttribute('data-editable') || !this._reframes()) return;
        e.preventDefault();
        if (this.hasAttribute('data-reframe')) this._exitReframe(true);else this._enterReframe();
      });
      // Pan + resize both originate on the spill layer. A handle pointerdown
      // drives an aspect-locked resize anchored at the opposite corner; any
      // other pointerdown on the spill pans. Offsets are frame-% so a
      // reframed slot survives responsive resize / PPTX export.
      this._spill.addEventListener('pointerdown', e => {
        if (e.button !== 0 || !this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        e.stopPropagation();
        this._spill.setPointerCapture(e.pointerId);
        const rect = this.getBoundingClientRect();
        const fw = rect.width || 1,
          fh = rect.height || 1;
        const corner = e.target.getAttribute && e.target.getAttribute('data-c');
        let move;
        if (corner) {
          // Resize about the OPPOSITE corner. Viewport-px throughout (rect
          // fw/fh, not clientWidth) so the math survives a transform:scale()
          // ancestor — deck_stage renders slides scaled-to-fit.
          const iw = this._img.naturalWidth || 1,
            ih = this._img.naturalHeight || 1;
          const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
          const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
          const sx = corner.includes('e') ? 1 : -1;
          const sy = corner.includes('s') ? 1 : -1;
          const s0 = this._view.s;
          const w0 = iw * base * s0,
            h0 = ih * base * s0;
          const cx0 = (50 + this._view.x) / 100 * fw;
          const cy0 = (50 + this._view.y) / 100 * fh;
          const ox = cx0 - sx * w0 / 2,
            oy = cy0 - sy * h0 / 2;
          const diag0 = Math.hypot(w0, h0);
          const ux = sx * w0 / diag0,
            uy = sy * h0 / diag0;
          move = ev => {
            const proj = (ev.clientX - rect.left - ox) * ux + (ev.clientY - rect.top - oy) * uy;
            const s = clampS(s0 * proj / diag0);
            const d = diag0 * s / s0;
            this._view.s = s;
            this._view.x = (ox + ux * d / 2) / fw * 100 - 50;
            this._view.y = (oy + uy * d / 2) / fh * 100 - 50;
            this._clampView();
            this._applyView();
          };
        } else {
          this.setAttribute('data-panning', '');
          const start = {
            px: e.clientX,
            py: e.clientY,
            x: this._view.x,
            y: this._view.y
          };
          move = ev => {
            this._view.x = start.x + (ev.clientX - start.px) / fw * 100;
            this._view.y = start.y + (ev.clientY - start.py) / fh * 100;
            this._clampView();
            this._applyView();
          };
        }
        const up = () => {
          try {
            this._spill.releasePointerCapture(e.pointerId);
          } catch {}
          this._spill.removeEventListener('pointermove', move);
          this._spill.removeEventListener('pointerup', up);
          this._spill.removeEventListener('pointercancel', up);
          this.removeAttribute('data-panning');
          this._dragUp = null;
        };
        // Stashed so _exitReframe (Escape / outside-click mid-drag) can
        // tear the capture + listeners down synchronously.
        this._dragUp = up;
        this._spill.addEventListener('pointermove', move);
        this._spill.addEventListener('pointerup', up);
        this._spill.addEventListener('pointercancel', up);
      });
      // Wheel zoom stays available inside reframe mode as a trackpad nicety —
      // zooms toward the cursor (offset' = cursor·(1-k) + offset·k).
      this.addEventListener('wheel', e => {
        if (!this.hasAttribute('data-reframe')) return;
        e.preventDefault();
        const r = this.getBoundingClientRect();
        const cx = (e.clientX - r.left) / r.width * 100 - 50;
        const cy = (e.clientY - r.top) / r.height * 100 - 50;
        const prev = this._view.s;
        const next = clampS(prev * Math.pow(1.0015, -e.deltaY));
        if (next === prev) return;
        const k = next / prev;
        this._view.s = next;
        this._view.x = cx * (1 - k) + this._view.x * k;
        this._view.y = cy * (1 - k) + this._view.y * k;
        this._clampView();
        this._applyView();
      }, {
        passive: false
      });
    }
    connectedCallback() {
      // Warn once per page — an id-less slot works for the session but
      // cannot persist, and two id-less slots would share nothing.
      if (!this.id && !ImageSlot._warned) {
        ImageSlot._warned = true;
        console.warn('<image-slot> without an id will not persist its dropped image.');
      }
      this.addEventListener('dragenter', this);
      this.addEventListener('dragover', this);
      this.addEventListener('dragleave', this);
      this.addEventListener('drop', this);
      subs.add(this._subFn);
      // The host may inject window.omelette.writeFile AFTER the first render;
      // re-render on hover so the editable-gated controls reliably appear.
      this.addEventListener('pointerenter', this._subFn);
      // width%/height% in _applyView encode the frame aspect at call time —
      // a host resize (responsive grid, pane divider) would stretch the
      // image until the next _render. Re-render on size change: _render()
      // re-seeds _view from stored before clamp/apply, so a shrink→grow
      // cycle round-trips instead of ratcheting x/y toward the narrower
      // frame's clamp range.
      this._ro = new ResizeObserver(() => this._render());
      this._ro.observe(this);
      load();
      this._render();
    }
    disconnectedCallback() {
      subs.delete(this._subFn);
      this.removeEventListener('pointerenter', this._subFn);
      this.removeEventListener('dragenter', this);
      this.removeEventListener('dragover', this);
      this.removeEventListener('dragleave', this);
      this.removeEventListener('drop', this);
      if (this._ro) {
        this._ro.disconnect();
        this._ro = null;
      }
      // commit=false: a disconnect is not a user intent — committing here
      // would persist whatever half-finished drag a React remount or DOM
      // splice happened to interrupt. Deliberate exits commit on their own
      // paths (Escape/click-out/toggle), and unloads commit via pagehide.
      this._exitReframe(false);
    }
    _enterReframe() {
      if (this.hasAttribute('data-reframe')) return;
      this.setAttribute('data-reframe', '');
      this._signalReframe(true);
      // Best-effort commit when the document unloads mid-reframe (a host
      // navigation racing the enter signal, a manual reload, tab close):
      // the sidecar write rides the host bridge, which outlives this
      // document, so the crop survives even though the mode dies with the
      // DOM. Held on the instance so _exitReframe detaches exactly what
      // was attached.
      this._pagehide = () => {
        this._exitReframe(true);
        flushNow();
      };
      window.addEventListener('pagehide', this._pagehide);
      // Promote spill to the top layer, then keep it pinned over the frame:
      // scroll/resize cover the common cases, and a per-frame rect check
      // catches layout shifts that fire neither (an image above finishing
      // load, streamed DOM pushing the slot down, an ancestor transform
      // change) so the overlay can't detach from the frame.
      try {
        this._spill.showPopover();
      } catch {}
      // After the spill, so the controls stack above it in the top layer.
      try {
        this._ctl.showPopover();
      } catch {}
      this._reposition = () => {
        if (this.hasAttribute('data-reframe')) this._applyView();
      };
      window.addEventListener('scroll', this._reposition, true);
      window.addEventListener('resize', this._reposition);
      this._lastRect = '';
      this._watch = () => {
        if (!this.hasAttribute('data-reframe')) return;
        const r = this.getBoundingClientRect();
        const key = r.left + ',' + r.top + ',' + r.width + ',' + r.height;
        if (key !== this._lastRect) {
          this._lastRect = key;
          this._applyView();
        }
        this._watchId = requestAnimationFrame(this._watch);
      };
      this._watchId = requestAnimationFrame(this._watch);
      this._applyView();
      // Close on click outside (the spill handler stopPropagation()s so
      // in-image drags don't reach this) and on Escape. Listeners are held
      // on the instance so _exitReframe / disconnectedCallback can detach
      // exactly what was attached.
      this._outside = e => {
        if (e.composedPath && e.composedPath().includes(this)) return;
        this._exitReframe(true);
      };
      this._esc = e => {
        if (e.key === 'Escape') this._exitReframe(true);
      };
      document.addEventListener('pointerdown', this._outside, true);
      document.addEventListener('keydown', this._esc, true);
    }
    _exitReframe(commit) {
      if (!this.hasAttribute('data-reframe')) return;
      if (this._dragUp) this._dragUp();
      this.removeAttribute('data-reframe');
      this.removeAttribute('data-panning');
      if (this._outside) document.removeEventListener('pointerdown', this._outside, true);
      if (this._esc) document.removeEventListener('keydown', this._esc, true);
      this._outside = this._esc = null;
      if (this._reposition) {
        window.removeEventListener('scroll', this._reposition, true);
        window.removeEventListener('resize', this._reposition);
        this._reposition = null;
      }
      if (this._watchId) {
        cancelAnimationFrame(this._watchId);
        this._watchId = 0;
      }
      if (this._pagehide) {
        window.removeEventListener('pagehide', this._pagehide);
        this._pagehide = null;
      }
      try {
        this._spill.hidePopover();
      } catch {}
      try {
        this._ctl.hidePopover();
      } catch {}
      this._ctl.style.left = '';
      this._ctl.style.top = '';
      if (commit) this._commitView();
      this._signalReframe(false);
    }

    // Reframe state lives only in this DOM until commit, invisible to the
    // host's dirty signals — announce enter/exit so the host can hold
    // auto-reloads for exactly the gesture (the guest bundle forwards
    // image-slot:reframe to the host as imageSlotReframe). Dispatched on
    // the element (composed, so it escapes shadow roots) while connected;
    // a disconnected exit (disconnectedCallback) falls back to document so
    // the host still hears it.
    _signalReframe(active) {
      const target = this.isConnected ? this : document;
      target.dispatchEvent(new CustomEvent('image-slot:reframe', {
        bubbles: true,
        composed: true,
        detail: {
          active: active,
          id: this.id || null
        }
      }));
    }

    // Public: host's "Import from computer" calls this to run local browse.
    openFilePicker() {
      this._exitReframe(true);
      this._input.click();
    }

    // A src write is a newer intent for this slot's content — the host
    // pick path (setImageSlotImage) or an agent edit — so it must win
    // over any encode still in flight from an earlier drop: left live,
    // that encode lands later, passes _ingest's gen guard, and its
    // setSlot silently overwrites the pick (the stored value shadows
    // src in _render). Bumping _gen kills the encode before its own
    // _swapGen clear runs, so clear the dead claim here too — otherwise
    // _releaseMask (gated on !_swapGen) never fires and the pick's
    // spinner is stranded. src ONLY: the pick sets credit/credit-href
    // in the same task, and clearing _swapGen on those would let the
    // same-src branch unmask the old image mid-encode.
    attributeChangedCallback(name, oldVal, newVal) {
      if (name === 'src' && oldVal !== newVal) {
        this._gen++;
        this._swapGen = 0;
      }
      if (this.shadowRoot) this._render();
    }

    // handleEvent — one listener object for all four drag events keeps the
    // add/remove symmetric and the depth counter correct.
    handleEvent(e) {
      if (e.type === 'dragenter' || e.type === 'dragover') {
        // Without preventDefault the browser never fires 'drop'.
        e.preventDefault();
        e.stopPropagation();
        if (e.dataTransfer) e.dataTransfer.dropEffect = 'copy';
        if (e.type === 'dragenter') this._depth++;
        this.setAttribute('data-over', '');
      } else if (e.type === 'dragleave') {
        // dragenter/leave fire for every descendant crossing — count depth
        // so hovering the icon inside the empty state doesn't flicker.
        if (--this._depth <= 0) {
          this._depth = 0;
          this.removeAttribute('data-over');
        }
      } else if (e.type === 'drop') {
        e.preventDefault();
        e.stopPropagation();
        this._depth = 0;
        this.removeAttribute('data-over');
        const f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (f) this._ingest(f);
      }
    }
    async _ingest(file) {
      this._setError(null);
      if (!file || ACCEPT.indexOf(file.type) < 0) {
        this._setError('Drop a PNG, JPEG, WebP, or AVIF image.');
        return;
      }
      // toDataUrl can take hundreds of ms on a large photo. A Clear or a
      // newer drop during that window would be clobbered when this await
      // resumes — bump + capture a generation so stale encodes bail.
      const gen = ++this._gen;
      // Replacing a shown image: surface the swap through the encode too,
      // not just the decode — otherwise the old photo sits there with no
      // feedback while the canvas re-encode runs. An empty slot keeps its
      // placeholder (no spinner) until the encode lands, as before.
      // _swapGen guards the mask against re-renders DURING the encode
      // (pointerenter, ResizeObserver, another slot's store write): the
      // stored value still resolves to the old image there, so _render's
      // same-src clear would otherwise unmask it mid-replace.
      if (this.hasAttribute('data-filled')) {
        this.setAttribute('data-swapping', '');
        this._swapGen = gen;
      }
      try {
        const w = this.clientWidth || this.offsetWidth || MAX_DIM;
        const url = await toDataUrl(file, w);
        if (gen !== this._gen) return;
        // Only exit reframe once the new image is in hand — a rejected type
        // or decode failure leaves the in-progress crop untouched.
        this._exitReframe(false);
        // Clear BEFORE setSlot: its synchronous re-render must see no
        // pending encode, so a byte-identical re-upload (same data URL, no
        // load event coming) still clears the mask via the complete branch.
        this._swapGen = 0;
        const val = {
          u: url,
          s: 1,
          x: 0,
          y: 0
        };
        setSlot(this.id || '', val);
        // Keep a session-local copy for id-less slots so the drop still
        // shows, even though it cannot persist.
        if (!this.id) {
          this._local = val;
          this._render();
        }
      } catch (err) {
        if (gen !== this._gen) return;
        this._swapGen = 0;
        // Reveal the kept old image — unless another replacement (a
        // remote pick's src swap) is still in flight, in which case the
        // mask stays until THAT image settles (its load/error releases).
        this._releaseMask();
        this._setError('Could not read that image.');
        console.warn('<image-slot> ingest failed:', err);
      }
    }
    _setError(msg) {
      if (this._err) {
        this._err.remove();
        this._err = null;
      }
      if (!msg) return;
      const d = document.createElement('div');
      d.className = 'err';
      d.textContent = msg;
      this.shadowRoot.appendChild(d);
      this._err = d;
      setTimeout(() => {
        if (this._err === d) {
          d.remove();
          this._err = null;
        }
      }, 3000);
    }

    // Reframing (pan/resize) is available on any filled slot — the user can
    // always reposition/scale. `fit` only sets the initial baseline (see
    // _geom): contain starts fully-visible, cover starts frame-filling.
    _reframes() {
      return this.hasAttribute('data-filled');
    }

    // The single release discipline for the replacement-in-flight mask
    // (data-swapping). The mask comes off only when BOTH hold:
    //  - no encode is pending (_swapGen) — mid-encode the stored value
    //    still resolves to the old image, so any reveal paints it;
    //  - the frame img has settled on its current src — an unsettled src
    //    means some replacement is still in flight (e.g. a remote pick),
    //    whoever started it, and revealing would paint the previous
    //    frame. The load/error listeners pass settled=true (the event IS
    //    the settlement signal, per spec complete is true by then);
    //    other callers rely on the complete flag (covers loaded AND
    //    failed).
    // Every release path funnels through here EXCEPT _render's empty
    // branch (the img is being cleared — nothing will ever settle).
    _releaseMask(settled) {
      if (!this._swapGen && !this._loadPending && (settled || this._img.complete)) {
        this.removeAttribute('data-swapping');
      }
    }

    // Baseline geometry, shared by clamp/apply/resize. `base` is the scale at
    // view-scale s=1: cover = fill the frame (overflow on the looser axis),
    // contain = fit fully inside (letterboxed). Zooming a contain image past
    // s where it overflows naturally becomes a crop. Null until the img has
    // loaded (naturalWidth is 0 before that) or when the slot has no layout
    // box — ResizeObserver fires with a 0×0 rect under display:none, and
    // clamping against a degenerate 1×1 frame would silently pull the stored
    // pan toward zero.
    _geom() {
      const iw = this._img.naturalWidth,
        ih = this._img.naturalHeight;
      const fw = this.clientWidth,
        fh = this.clientHeight;
      if (!iw || !ih || !fw || !fh) return null;
      const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
      const base = contain ? Math.min(fw / iw, fh / ih) : Math.max(fw / iw, fh / ih);
      return {
        iw,
        ih,
        fw,
        fh,
        base
      };
    }
    _clampView() {
      // Pan range on each axis is half the overflow past the frame edge.
      const g = this._geom();
      if (!g) return;
      const mx = Math.max(0, (g.iw * g.base * this._view.s / g.fw - 1) * 50);
      const my = Math.max(0, (g.ih * g.base * this._view.s / g.fh - 1) * 50);
      this._view.x = Math.max(-mx, Math.min(mx, this._view.x));
      this._view.y = Math.max(-my, Math.min(my, this._view.y));
    }
    _applyView() {
      const g = this._geom();
      // Top-layer controls: pin to the frame's top-right in viewport px
      // (the same 8px inset as the in-frame layout; unscaled — top-layer UI
      // reads as chrome, not page content). BEFORE the geometry branch:
      // placement needs only the frame rect, and a not-yet-loaded or broken
      // src must not leave the promoted strip floating unpositioned. Gated
      // on the popover actually being open: without the Popover API,
      // showPopover() threw (swallowed in _enterReframe), .ctl stays in
      // its in-frame absolute layout, and viewport-px coordinates would
      // shove it off-frame — and matches(':popover-open') itself throws
      // there (unknown pseudo-class), hence the try/catch.
      if (this.hasAttribute('data-reframe')) {
        let onTop = false;
        try {
          onTop = this._ctl.matches(':popover-open');
        } catch {}
        if (onTop) {
          const r = this.getBoundingClientRect();
          this._ctl.style.left = r.right - 8 + 'px';
          this._ctl.style.top = r.top + 8 + 'px';
        }
      }
      if (!g) {
        // Dimensions not known yet (before img load) — centered fit so there
        // is no flash of an unpositioned image before the geometry lands.
        const contain = (this.getAttribute('fit') || 'cover').toLowerCase() === 'contain';
        this._img.style.width = '100%';
        this._img.style.height = '100%';
        this._img.style.left = '50%';
        this._img.style.top = '50%';
        this._img.style.objectFit = contain ? 'contain' : 'cover';
        return;
      }
      // Baseline (cover-fill or contain-fit) × view scale. Width/height and
      // left/top are all frame-% — depends only on the frame aspect ratio, so
      // a responsive resize keeps the same crop. The spill layer mirrors the
      // same box so its corners = image corners.
      const k = g.base * this._view.s;
      const w = g.iw * k / g.fw * 100 + '%';
      const h = g.ih * k / g.fh * 100 + '%';
      const l = 50 + this._view.x + '%';
      const t = 50 + this._view.y + '%';
      this._img.style.width = w;
      this._img.style.height = h;
      this._img.style.left = l;
      this._img.style.top = t;
      this._img.style.objectFit = '';
      if (this.hasAttribute('data-reframe')) {
        // Top-layer spill: position in viewport px over the frame. The top
        // layer escapes ancestor transforms entirely, so EVERY term must be
        // in viewport units: getBoundingClientRect gives the frame's scaled
        // origin AND size, and the rect/layout ratio rescales the ghost —
        // sizing from layout px alone renders it 1/scale too large under a
        // scaled deck slide. Inner ghost + handles stay box-relative.
        const r = this.getBoundingClientRect();
        const sx = g.fw ? r.width / g.fw : 1;
        const sy = g.fh ? r.height / g.fh : 1;
        this._spill.style.width = g.iw * k * sx + 'px';
        this._spill.style.height = g.ih * k * sy + 'px';
        this._spill.style.left = r.left + (50 + this._view.x) / 100 * r.width + 'px';
        this._spill.style.top = r.top + (50 + this._view.y) / 100 * r.height + 'px';
      }
    }
    _commitView() {
      const v = {
        s: this._view.s,
        x: this._view.x,
        y: this._view.y
      };
      if (this._userUrl) v.u = this._userUrl;
      // Framing-only (no u) persists too so an author-src slot remembers its
      // crop; clearing the sidecar still falls through to src=.
      if (this.id) setSlot(this.id, v);else {
        this._local = v;
      }
    }
    _render() {
      // Shape / mask. Presets use border-radius so the dashed ring can
      // follow the rounded outline; clip-path is only applied for an
      // explicit `mask` (the ring is hidden there since a rectangle
      // dashed border chopped by an arbitrary polygon looks broken).
      const mask = this.getAttribute('mask');
      const shape = (this.getAttribute('shape') || 'rounded').toLowerCase();
      let radius = '';
      if (shape === 'circle') radius = '50%';else if (shape === 'pill') radius = '9999px';else if (shape === 'rounded') {
        const n = parseFloat(this.getAttribute('radius'));
        radius = (Number.isFinite(n) ? n : 12) + 'px';
      }
      this._frame.style.borderRadius = mask ? '' : radius;
      this._frame.style.clipPath = mask || '';
      this._ring.style.borderRadius = mask ? '' : radius;
      this._ring.style.display = mask ? 'none' : '';

      // Controls and reframe entry gate on this so share links stay read-only.
      const editable = !!(window.omelette && window.omelette.writeFile);
      this.toggleAttribute('data-editable', editable);
      this._sub.style.display = editable ? '' : 'none';

      // Content. The sidecar is also writable by the agent's write_file
      // tool, so its value isn't guaranteed canvas-originated — only accept
      // data:image/ URLs from it. The `src` attribute is author-controlled
      // (Claude wrote it into the HTML) so it passes through unchanged.
      let stored = this.id ? getSlot(this.id) : this._local;
      if (stored && stored.u && !/^data:image\//i.test(stored.u)) stored = null;
      const srcAttr = this.getAttribute('src') || '';
      this._userUrl = stored && stored.u || null;
      const url = this._userUrl || srcAttr;
      // Don't clobber an in-flight reframe with a store-triggered re-render.
      if (!this.hasAttribute('data-reframe')) {
        this._view = {
          s: stored && Number.isFinite(stored.s) ? clampS(stored.s) : 1,
          x: stored && Number.isFinite(stored.x) ? stored.x : 0,
          y: stored && Number.isFinite(stored.y) ? stored.y : 0
        };
      }
      this._cap.textContent = this.getAttribute('placeholder') || 'Drop an image';
      // Toggle via style.display — the [hidden] attribute alone loses to
      // the display:flex / display:block rules in the stylesheet above.
      // An Unsplash src with no credit attribute must NOT render — showing
      // the photo uncredited is the Unsplash-terms violation itself. The
      // error tile replaces the photo until the credit is written. A
      // user-dropped image is the user's own content and always renders.
      // Trimmed: credit is agent/user-editable content, and a whitespace-
      // only value must count as missing — otherwise it would suppress the
      // error tile AND render an empty credit box (no text, no links),
      // exactly the unattributed state this gate exists to prevent.
      const credit = (this.getAttribute('credit') || '').trim();
      const attrError = !!(!credit && !this._userUrl && srcAttr && isUnsplashHost(srcAttr));
      this.toggleAttribute('data-attribution-error', attrError);
      if (url && !attrError) {
        const prev = this._img.getAttribute('src');
        if (prev !== url) {
          // Replacing an already-shown image: mark the swap BEFORE setting
          // src so the stale frame is never revealed (see the data-swapping
          // stylesheet rules). First fill (prev empty) keeps the existing
          // placeholder-until-load behavior — no spinner. _hidShowing
          // covers the pick path's transient attribution-error wipe: prev
          // is gone, but an image WAS showing, so this is a replacement.
          if (prev || this._hidShowing) this.setAttribute('data-swapping', '');
          // Mark the swap BEFORE assigning src: complete keeps reporting
          // the old settled request until the browser's
          // update-the-image-data microtask runs, so same-task re-renders
          // (the pick path's credit/credit-href setAttributes) need this
          // flag, not complete, to know a load is in flight.
          this._loadPending = true;
          this._img.src = url;
          this._ghost.src = url;
        } else {
          // Same-src re-render — release if settled, so an ingest-set
          // spinner can't stick after a byte-identical re-upload (same
          // data URL, no further load event ever fires).
          this._releaseMask();
        }
        this._hidShowing = false;
        this._img.style.display = 'block';
        this._empty.style.display = 'none';
        this.setAttribute('data-filled', '');
        this._clampView();
        this._applyView();
      } else {
        this.removeAttribute('data-swapping');
        // The src is being removed — no load/error will ever fire for it.
        this._loadPending = false;
        // A transient attribution-error wipe of a showing image happens on
        // the pick path: the host sets src one setAttribute before credit,
        // so render N hides the old image (attrError) and render N+1
        // restores a URL. Remember the wipe so that restore renders as a
        // replacement (spinner), not a first fill (blank frame).
        this._hidShowing = attrError && !!this._img.getAttribute('src');
        this._img.style.display = 'none';
        this._img.removeAttribute('src');
        this._ghost.removeAttribute('src');
        // The error tile owns the blocked-photo state; .empty stays for
        // the genuinely-empty slot.
        this._empty.style.display = attrError ? 'none' : 'flex';
        this.removeAttribute('data-filled');
      }

      // Credit belongs to the author src, so a user drop hides it.
      // textContent + the http(s)-only funnel keep external strings inert.
      const showCredit = !!(url && credit && !this._userUrl && !attrError);
      this._credit.textContent = '';
      if (showCredit) {
        // Validate once (resolved against the document, http(s) only),
        // then append the terms-required utm referral params to links
        // that point back at unsplash.com.
        let href = '';
        const rawHref = this.getAttribute('credit-href') || '';
        if (rawHref) {
          try {
            const u = new URL(rawHref, document.baseURI);
            if (u.protocol === 'http:' || u.protocol === 'https:') {
              href = withReferral(u.href);
            }
          } catch {}
        }
        const mkLink = (text, linkHref) => {
          const a = document.createElement('a');
          a.setAttribute('target', '_blank');
          a.setAttribute('rel', 'noopener noreferrer');
          a.setAttribute('href', linkHref);
          a.textContent = text;
          return a;
        };
        // Unsplash's prescribed credit is TWO links — the photographer's
        // name to their profile (credit-href) and 'Unsplash' to the
        // homepage. Render that split whenever the text has the canonical
        // shape; other text keeps the legacy single-link rendering.
        const m = /^Photo by (.+) on Unsplash$/.exec(credit);
        if (m) {
          this._credit.appendChild(document.createTextNode('Photo by '));
          this._credit.appendChild(href ? mkLink(m[1], href) : document.createTextNode(m[1]));
          this._credit.appendChild(document.createTextNode(' on '));
          this._credit.appendChild(mkLink('Unsplash', UNSPLASH_HOMEPAGE_HREF));
        } else if (href) {
          this._credit.appendChild(mkLink(credit, href));
        } else {
          this._credit.textContent = credit;
        }
      }
      this.toggleAttribute('data-credit', showCredit);
    }
  }
  if (!customElements.get('image-slot')) {
    customElements.define('image-slot', ImageSlot);
  }
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing/image-slot.js", error: String((e && e.message) || e) }); }

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.Metric = __ds_scope.Metric;

__ds_ns.PosterBlock = __ds_scope.PosterBlock;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.DataTable = __ds_scope.DataTable;

__ds_ns.ListPanel = __ds_scope.ListPanel;

__ds_ns.ListRow = __ds_scope.ListRow;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StateBand = __ds_scope.StateBand;

__ds_ns.StatusBadge = __ds_scope.StatusBadge;

__ds_ns.StatusDot = __ds_scope.StatusDot;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Banner = __ds_scope.Banner;

__ds_ns.Dialog = __ds_scope.Dialog;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.Toast = __ds_scope.Toast;

__ds_ns.Tooltip = __ds_scope.Tooltip;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Radio = __ds_scope.Radio;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Textarea = __ds_scope.Textarea;

__ds_ns.FAQ = __ds_scope.FAQ;

__ds_ns.FeatureGrid = __ds_scope.FeatureGrid;

__ds_ns.LogoWall = __ds_scope.LogoWall;

__ds_ns.PricingTable = __ds_scope.PricingTable;

__ds_ns.SectionHeader = __ds_scope.SectionHeader;

__ds_ns.Testimonial = __ds_scope.Testimonial;

__ds_ns.Breadcrumb = __ds_scope.Breadcrumb;

__ds_ns.HelpLink = __ds_scope.HelpLink;

__ds_ns.PageHeader = __ds_scope.PageHeader;

__ds_ns.SideNav = __ds_scope.SideNav;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TopBar = __ds_scope.TopBar;

})();
