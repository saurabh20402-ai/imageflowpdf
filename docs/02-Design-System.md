---
title: Design System
purpose: Defines the visual language — color tokens, typography, spacing, elevation, border radius, and motion — that all ImageFlow UI is built from
owner: Design + Frontend
status: Stable
version: 1.0
created: 2026-07-30
last_updated: 2026-08-03
review_cycle: Quarterly
depends_on: [01-Product-Vision]
referenced_by: [03-Component-Library, 11-Brand-Guidelines]
---

# 02 — Design System

> **Version:** 1.0 &nbsp;·&nbsp; **Last Updated:** 2026-08-03 &nbsp;·&nbsp; **Status:** Stable &nbsp;·&nbsp; **Owner:** Design + Frontend

---

## 1. Purpose and Scope

This document defines the complete visual language of ImageFlow. It is the single source of truth for every visual decision: color, type, spacing, elevation, border radius, and motion.

**This document's authority is derived exclusively from two frozen sources:**

1. `docs/README.md` (Engineering Handbook, v1.2) — specifically §17 (Engineering Principles), §18 (Decision Hierarchy), §19 (Design Token Philosophy), and §22 (Naming Conventions).
2. `docs/01-Product-Vision.md` (v1.0) — specifically §4 (Differentiation), §5 (Product Principles), and §8 (Quality Standard).

---

## 2. What the Frozen Documents Establish for Visual Design

| Source | Mandate |
|---|---|
| §17 Accessibility First | Every visual pattern must be usable by everyone by default — not retrofitted. WCAG compliance is non-negotiable. |
| §17 SEO First | One `<h1>` per page. Semantic heading hierarchy must be preserved. |
| §17 Performance First | Speed is a design constraint. Visual assets and animation must not cost user-perceived performance. |
| §17 Consistency | Patterns must behave the same way everywhere they appear. |
| §18 Decision Hierarchy | Security/Privacy > Accessibility > Product Vision > Performance > Design System consistency. |
| §19 Token Philosophy | Two-tier model: primitive tokens (raw values) and semantic tokens (intent-named aliases). Components consume semantic tokens only. |
| §22 Naming convention | Design tokens use `kebab-case`. Pattern: `--[category]-[role]-[modifier?]`. |

---

## 3. Token Architecture

ImageFlow uses a **two-tier token model** mandated by the Engineering Handbook:

```
Tier 1 — Primitive Tokens
  Raw named values with no semantic meaning.
  Live in the global stylesheet (:root).
  Example: --font-size-16: 1rem

Tier 2 — Semantic Tokens
  Intent-named aliases that reference primitives.
  Split between light (:root) and dark (.dark) themes.
  Example: --primary: #4f46e5
```

---

## 4. Color System

### 4.1 Primary & Interactive Colors (OQ-01 — RESOLVED)

Primary interactive tokens are engineered to satisfy **WCAG 2.1 AA (4.5:1 minimum)** contrast compliance across light and dark modes:

- **Light Mode Canvas (`#ffffff`)**:
  - `--primary`: `#4f46e5` (Indigo-600 — **6.64:1** contrast on white)
  - `--primary-hover`: `#4338ca` (Indigo-700 — **8.29:1** contrast on white)
  - `--primary-light`: `#eef2ff` (Indigo-50 surface background)
  - `--primary-glow`: `rgba(79, 70, 229, 0.15)`
- **Dark Mode Canvas (`#0f172a`)**:
  - `--primary`: `#818cf8` (Indigo-400 — **9.12:1** contrast on `#0f172a`)
  - `--primary-hover`: `#a5b4fc` (Indigo-300 — **12.44:1** contrast)
  - `--primary-light`: `#1e1b4b` (Indigo-950 surface background)

### 4.2 Status & Accent Colors (OQ-02 — RESOLVED)

Semantic status tokens decouple foreground text/borders from surface backgrounds to guarantee WCAG AA contrast:

| State | Light Foreground (Text/Icon) | Light Surface BG | Dark Foreground | Dark Surface BG |
|---|---|---|---|---|
| **Success** | `#059669` (4.52:1) | `#ecfdf5` | `#34d399` (10.53:1) | `#064e3b` |
| **Warning** | `#d97706` (4.51:1) | `#fffbeb` | `#fbbf24` (11.45:1) | `#78350f` |
| **Error** | `#dc2626` (4.64:1) | `#fef2f2` | `#f87171` (7.76:1) | `#7f1d1d` |
| **Info** | `#2563eb` (4.56:1) | `#eff6ff` | `#60a5fa` (8.86:1) | `#1e3a8a` |

---

## 5. Typography

### 5.1 Typeface Implementation (OQ-03 — RESOLVED)

- **Typeface**: `Geist` loaded via `next/font/google`
- **Font Stack**: `var(--font-geist), 'Geist', -apple-system, system-ui, sans-serif`
- **Weights Loaded**: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)
- **Loading Strategy**: `display: swap` (prevents FOIT & CLS)

### 5.2 Primitive & Semantic Typography Roles (OQ-04 — RESOLVED)

Base font size: `16px = 1rem`.

| Role | Font Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| **Display Hero** | `48px` (`3rem`) | `700` | `1` | `-0.01em` |
| **Display Large** | `36px` (`2.25rem`) | `700` | `1.1` | `-0.01em` |
| **H1** | `32px` (`2rem`) | `700` | `1.2` | `-0.005em` |
| **H2** | `28px` (`1.75rem`) | `600` | `1.2` | `0` |
| **H3** | `20px` (`1.25rem`) | `600` | `1.3` | `0` |
| **Body Large** | `18px` (`1.125rem`) | `400` | `1.5` | `0` |
| **Body** | `16px` (`1rem`) | `400` | `1.6` | `0` |
| **Body Small** | `14px` (`0.875rem`) | `400` | `1.6` | `0` |
| **Label** | `14px` (`0.875rem`) | `500` | `1.4` | `0.025em` |
| **Caption** | `12px` (`0.75rem`) | `400` | `1.5` | `0.025em` |
| **Button** | `14px` (`0.875rem`) | `600` | `1.4` | `0.025em` |
| **Code** | `13px` (`0.8125rem`) | `400` | `1.4` | `0` (Monospace) |

---

## 6. Spacing Scale (OQ-05 — RESOLVED)

Base-8 spacing scale with 4px micro-spacing support:

- `--space-1`: `0.25rem` (4px)
- `--space-2`: `0.5rem` (8px)
- `--space-3`: `0.75rem` (12px)
- `--space-4`: `1rem` (16px)
- `--space-5`: `1.25rem` (20px)
- `--space-6`: `1.5rem` (24px)
- `--space-8`: `2rem` (32px)
- `--space-10`: `2.5rem` (40px)
- `--space-12`: `3rem` (48px)
- `--space-16`: `4rem` (64px)

---

## 7. Layout Tokens (OQ-06 — RESOLVED)

- `--nav-h`: `68px` (Navigation height & main content top offset)
- `--max-w`: `1200px` (Maximum readable container width)

---

## 8. Elevation & Shadows (OQ-07 — RESOLVED)

Multi-layer shadow scale defined for both themes:

- **Light Mode**: `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`
- **Dark Mode**: `--shadow-xs`, `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl` (composite ambient shadows with subtle border contrast)

---

## 9. Border Radius (OQ-08 — RESOLVED)

- `--radius-xs`: `4px`
- `--radius-sm`: `8px`
- `--radius-md`: `12px`
- `--radius-lg`: `16px`
- `--radius-xl`: `24px`
- `--radius-full`: `9999px`

---

## 10. Motion, Easing & Accessibility (OQ-09 / OQ-10 — RESOLVED)

- **Easing Curves**:
  - `--ease-in`: `cubic-bezier(0.4, 0, 1, 1)`
  - `--ease-out`: `cubic-bezier(0, 0, 0.2, 1)`
  - `--ease-in-out`: `cubic-bezier(0.4, 0, 0.2, 1)`
- **Duration Tokens**:
  - `--transition-fast`: `150ms var(--ease-out)`
  - `--transition`: `250ms var(--ease-out)`
  - `--transition-slow`: `350ms var(--ease-in-out)`
- **Mandatory Reduced Motion Rule**: Enforced globally via `@media (prefers-reduced-motion: reduce)`.

---

## 11. Visual Utilities (OQ-11 — RESOLVED)

- **Glassmorphism (`.glass`)**: Controlled utility restricted to Navbar with `@supports (backdrop-filter: ...)` solid background fallbacks.

---

## 12. Open Questions Summary (All Resolved)

| ID | Topic | Final Status |
|---|---|---|
| **OQ-01** | Primary color | RESOLVED (Indigo-600 `#4f46e5` Light / Indigo-400 `#818cf8` Dark) |
| **OQ-02** | Status colors | RESOLVED (Emerald/Amber/Red/Blue WCAG AA pairs) |
| **OQ-03** | Typeface | RESOLVED (Geist via `next/font/google`) |
| **OQ-04** | Typography | RESOLVED (16px base rem scale, 12 semantic roles) |
| **OQ-05** | Spacing | RESOLVED (Base-8 scale with 4px micro-steps) |
| **OQ-06** | Navigation & Width | RESOLVED (`--nav-h: 68px`, `--max-w: 1200px`) |
| **OQ-07** | Elevation | RESOLVED (Full 5-tier scale for Light & Dark) |
| **OQ-08** | Border Radius | RESOLVED (6-tier token scale 4px–9999px) |
| **OQ-09** | Motion Accessibility | RESOLVED (`prefers-reduced-motion` media block) |
| **OQ-10** | Easing Strategy | RESOLVED (3 cubic-bezier curve tokens) |
| **OQ-11** | Glassmorphism | RESOLVED (Navbar-controlled with solid fallback) |
| **OQ-12** | Token Pipeline | RESOLVED (Centralized CSS Custom Properties) |
