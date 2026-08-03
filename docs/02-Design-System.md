---
title: Design System
purpose: Defines the visual language — color tokens, typography, spacing, elevation, border radius, and motion — that all ImageFlow UI is built from
owner: Design + Frontend
status: Draft
version: 0.1
created: 2026-07-30
last_updated: 2026-07-30
review_cycle: Quarterly
depends_on: [01-Product-Vision]
referenced_by: [03-Component-Library, 11-Brand-Guidelines]
---

# 02 — Design System

> **Version:** 0.1 &nbsp;·&nbsp; **Last Updated:** 2026-07-30 &nbsp;·&nbsp; **Status:** Draft &nbsp;·&nbsp; **Owner:** Design + Frontend

> [!CAUTION]
> This document is a **Draft**. It has not been approved. Sections marked **UNRESOLVED** contain design decisions that have not yet been derived from the frozen Product Vision (`01-Product-Vision.md`) or Engineering Handbook (`docs/README.md`). No token values in an UNRESOLVED section may be used in the codebase until that section is approved.

---

## 1. Purpose and Scope

This document defines the complete visual language of ImageFlow. It is the single source of truth for every visual decision: color, type, spacing, elevation, border radius, and motion.

**This document's authority is derived exclusively from two frozen sources:**

1. `docs/README.md` (Engineering Handbook, v1.2) — specifically §17 (Engineering Principles), §18 (Decision Hierarchy), §19 (Design Token Philosophy), and §22 (Naming Conventions).
2. `docs/01-Product-Vision.md` (v1.0) — specifically §4 (Differentiation), §5 (Product Principles), and §8 (Quality Standard).

Any decision not traceable to one of these two documents is marked **UNRESOLVED** and must be decided by the product owner before it becomes authoritative.

**Scope:**

- Components and pages **consume tokens**. They never hardcode a value that a token already represents (`docs/README.md §19`).
- A component-level override of any token value is a **Structural Change** (`docs/README.md §16`) — requires a written proposal before implementation.
- This document does not define which components exist (`03-Component-Library.md`), page layouts (`04`/`05`), brand assets (`11-Brand-Guidelines.md`), WCAG checklists (`08-Accessibility.md`), or performance budgets (`09-Performance.md`).

---

## 2. What the Frozen Documents Establish for Visual Design

Before addressing any specific token, this section records exactly what the two frozen documents mandate. Every subsequent section decision is measured against this list.

### From `docs/README.md`

| Source | Mandate |
|---|---|
| §17 Accessibility First | Every visual pattern must be usable by everyone by default — not retrofitted. WCAG compliance is non-negotiable. |
| §17 SEO First | One `<h1>` per page. Semantic heading hierarchy must be preserved. |
| §17 Performance First | Speed is a design constraint. Visual assets and animation must not cost user-perceived performance. |
| §17 Consistency | Patterns must behave the same way everywhere they appear. |
| §18 Decision Hierarchy | Security/Privacy > Accessibility > Product Vision > Performance > Design System consistency. When two visual options are equal, the more accessible, more performant, more privacy-respecting one wins. |
| §19 Token Philosophy | Two-tier model: primitive tokens (raw values) and semantic tokens (intent-named aliases). Components consume semantic tokens only. One visual change = one token edit. |
| §19 Semantic naming | Token names must express intent, not value. Example given: `color-surface-danger`, not `color-red-3`. |
| §22 Naming convention | Design tokens use `kebab-case`. Pattern: `--[category]-[role]-[modifier?]`. |

### From `01-Product-Vision.md`

| Source | Mandate |
|---|---|
| §4 Differentiation | UI quality is described as "premium, modern, no ads" vs. competitors who are "functional, ad-supported, dated." This frames the quality bar but does not specify any visual value. |
| §5 Earn trust | "The visual language is calm and confident, not urgent or pressuring." CTAs are visible but never aggressive. This constrains color intensity and contrast for interactive elements. |
| §5 Speed is a feature | Motion must never delay interaction. Animations are communicative, not decorative. This constrains animation duration. |
| §5 Zero friction | UI affordances must be instantly legible. No cognitive overhead to understand what is interactive. |
| §5 One tool, one job | Visual hierarchy guides to one primary action per page. No competing focal points. |
| §5 Free core | Design quality is equal across free and Pro tiers. Both light and dark modes must receive equal quality treatment. |
| §5 Privacy as architecture | No design patterns that visually suggest server processing, data upload to a remote server, or data retention. |
| §5 Million-user test | WCAG 2.1 AA contrast compliance is required for all text on colored backgrounds. |
| §8 Quality standard | UI patterns must be consistent with the Design System. |

---

## 3. Token Architecture

**Status: VALID — fully derived from `docs/README.md §19` and `§22`.**

ImageFlow uses a **two-tier token model** mandated by the Engineering Handbook:

```
Tier 1 — Primitive Tokens
  Raw named values with no semantic meaning.
  Live in the global stylesheet (:root).
  Example: --color-indigo-500: [value]

Tier 2 — Semantic Tokens
  Intent-named aliases that reference primitives.
  Split between light (:root) and dark (.dark) themes.
  Example: --color-interactive: var(--color-indigo-500)
```

**Rules (all derived from `docs/README.md §19` and `§22`):**

1. Components and pages always consume **semantic tokens** — never primitive tokens directly.
2. Primitive tokens are defined once in the global token file. They are never referenced in component code.
3. Semantic tokens are split by theme. A light set (`:root`) and a dark set (`.dark`). Primitive values do not change between themes; only semantic aliases do.
4. New tokens must be added to **both themes** before they can be used in a component.
5. Token names use `kebab-case` following the pattern `--[category]-[role]-[modifier?]`. Examples: `--color-surface-elevated`, `--shadow-md`, `--radius-lg`.
6. A token name must describe **intent**, not value. `--color-surface-danger` is correct. `--color-red-3` is not.

---

## 4. Color System

### 4.1 What the Frozen Documents Establish for Color

The following constraints are directly derived from the frozen documents:

| Constraint | Source |
|---|---|
| "Calm and confident, not urgent or pressuring" | `01-Product-Vision.md §5` — Earn trust |
| No high-saturation urgent red as a brand/primary color | `01-Product-Vision.md §5` — Earn trust |
| Text on colored backgrounds must meet WCAG 2.1 AA (4.5:1 normal, 3:1 large) | `01-Product-Vision.md §5` — Million-user test; `docs/README.md §17` — Accessibility First |
| Both light and dark modes must have equivalent visual quality | `01-Product-Vision.md §5` — Free core, sustainable edges |
| No visual patterns suggesting server upload or data retention | `01-Product-Vision.md §5` — Privacy as architecture |
| Token naming must be semantic (intent-based), not literal | `docs/README.md §19` and `§22` |
| Semantic token categories needed: interactive/brand, text, surface, border, status | `docs/README.md §19` — mandate for tokens to cover all visual decisions |

**What the frozen documents do NOT establish:**

- Which hue family to use for the primary interactive color
- Any specific hex, RGB, or HSL value
- Whether the palette is warm or cool
- How many steps a color scale should have
- What "success", "warning", or "error" colors should look like (only that they must exist as semantic tokens and be WCAG-compliant)

### 4.2 Required Semantic Token Categories

The following token categories are mandated — their existence is required, their values are UNRESOLVED:

- **Interactive / Brand** — the primary action color and its states (hover, muted, tinted surface, focus glow)
- **Text** — hierarchy levels: primary (ink), body, muted, placeholder
- **Surfaces** — canvas (page background), surface, card, elevated surface
- **Borders** — standard hairline, soft hairline, prominent border
- **Status** — success, warning, error, informational (and their background variants)

### 4.3 UNRESOLVED: Primary Color (Hue Family)

> [!IMPORTANT]
> **UNRESOLVED — requires owner decision.**
>
> The frozen documents establish that the primary interactive color must be "calm and confident, not urgent or pressuring" (`01-Product-Vision.md §5`). They do not specify any hue.
>
> **What this decision affects:** Every interactive element across the product — buttons, links, focus rings, active states.
>
> **Constraint from frozen documents:**
> - Must achieve WCAG 2.1 AA contrast (4.5:1) against both light canvas (`#ffffff` or equivalent) and dark canvas.
> - Must read as "calm and confident" — not aggressive, not alarming.
> - Must communicate interactivity clearly without prior learning (Zero friction).
>
> **Options and trade-offs:**
>
> | Option | Hue Family | Tone | Trade-offs |
> |---|---|---|---|
> | **A — Indigo/Violet** | ~238° | Cool, calm, professional | Strong legibility; widely associated with technology products; distinct from warning (amber) and error (red) without risk of confusion. Passes WCAG AA at mid-range saturation. |
> | **B — Blue** | ~210–230° | Familiar, trustworthy | Extremely common in utility products; may feel less distinctive. Passes WCAG AA readily. |
> | **C — Teal/Cyan** | ~175–195° | Calm, fresh, modern | Less common in the file-tool category; may feel more distinctive. Requires careful WCAG validation at lower saturations. |
> | **D — Neutral/Slate-based** | Achromatic | Minimal, confident | Near-monochromatic; avoids "branded" feel; conveys tool-first rather than brand-first. Highest risk of insufficient contrast for interactive affordance legibility. |
>
> The codebase currently uses Indigo 500 (`#6366f1` in light, `#818cf8` in dark) — inherited from a prior implementation decision, not a documented product decision. This is **not an approval of Option A** — it is a statement of current state pending this decision.
>
> **Decision needed:** Which hue family aligns with the ImageFlow brand identity?

### 4.4 UNRESOLVED: Status and Accent Colors

> [!IMPORTANT]
> **UNRESOLVED — requires owner decision.**
>
> Status colors (success, warning, error, informational) and any accent color are required by the token architecture but their values are not derivable from the frozen documents. The only constraint is WCAG 2.1 AA compliance and that they must be semantically distinct from each other and from the primary interactive color.
>
> **Constraint from frozen documents:** Status colors must be universally understood without prior learning (Zero friction). Success, warning, and error must be distinguishable for users with color vision deficiencies — which means relying on color alone is insufficient; icons or labels must accompany status colors (Accessibility First).
>
> **Decision needed:** Confirm or replace the current codebase values (emerald success, amber warning/accent, red error, blue info) — or defer to Brand Guidelines (`11-Brand-Guidelines.md`).

### 4.5 Color Usage Rules

**Valid — derived from frozen documents:**

1. Never hardcode a hex or RGB value in a component. Use the semantic token (`docs/README.md §19`).
2. Text on colored backgrounds must meet WCAG 2.1 AA (`01-Product-Vision.md §5` — million-user test).
3. Status colors are semantic — use them only for their stated state. Do not use them as palette alternatives.
4. Both light and dark modes receive the same token structure. Neither is an afterthought (`01-Product-Vision.md §5` — Free core).
5. No color patterns that visually suggest file upload to a remote server or data retention (`01-Product-Vision.md §5` — Privacy as architecture).

---

## 5. Typography

### 5.1 What the Frozen Documents Establish for Typography

| Constraint | Source |
|---|---|
| One `<h1>` per page | `docs/README.md §17` — SEO First |
| Heading hierarchy is never skipped | `docs/README.md §17` — Accessibility First |
| Text must be legible by everyone by default | `docs/README.md §17` — Accessibility First |
| System-level font fallbacks are required | `01-Product-Vision.md §5` — Speed is a feature (no invisible text on first load) |
| Type rendering must not contribute to Cumulative Layout Shift | `01-Product-Vision.md §8` — Core Web Vitals |

**What the frozen documents do NOT establish:**

- Which typeface(s) to use
- Font size values
- Line height values
- Weight assignments

### 5.2 UNRESOLVED: Typeface Selection

> [!IMPORTANT]
> **UNRESOLVED — requires owner decision before the Component Library is written.**
>
> The frozen documents require system-level font fallbacks for performance (CLS, FOIT prevention) but do not name any typeface.
>
> **Constraints from frozen documents:**
> - Must have system-level fallbacks loaded before the web font (`01-Product-Vision.md §5` — Speed).
> - Must support legibility at small sizes for a broad audience, including non-technical users (`docs/README.md §17` — Accessibility First).
> - Loading strategy must not cause layout shift (`01-Product-Vision.md §8` — CLS target).
>
> **Options and trade-offs:**
>
> | Option | Typeface | Notes |
> |---|---|---|
> | **A — Inter** | Inter (Google Fonts / self-hostable) | Variable font; optimised for screen readability; well-documented; broad weight range; currently in codebase. |
> | **B — Geist** | Geist (Vercel, available via `next/font`) | Developed for the Next.js/Vercel ecosystem; zero-CLS via `next/font` automatic optimisation; no separate font loading step needed. |
> | **C — Geist + Inter** | Geist for headings, Inter for body | Typographic hierarchy with two complementary typefaces. Adds complexity to the token system (two font tokens required). |
> | **D — System stack only** | `-apple-system, system-ui, Segoe UI, sans-serif` | Zero web font loading cost; zero CLS risk; no brand typeface. Prioritises performance over identity. |
>
> **Decision needed:** Which option aligns with the brand identity direction and performance requirements?

### 5.3 UNRESOLVED: Type Scale

> [!IMPORTANT]
> **UNRESOLVED — requires owner decision.**
>
> The frozen documents do not specify any font size, weight, or line-height values. The type scale must be defined here before the Component Library can use typographic tokens.
>
> **Constraints from frozen documents:**
> - Hierarchy must be clear instantly (Zero friction).
> - Fluid scaling across mobile and desktop is required to avoid layout shift (Performance First, CLS target).
> - Minimum body text size must meet WCAG 1.4.4 requirements (Accessibility First). WCAG mandates text can be resized to 200% without loss of content — the specific minimum pixel size is a design decision, not a WCAG mandate.
>
> **Decision needed:** Confirm a type scale (sizes, weights, line heights) for all roles: display, h1, h2, h3, body large, body, body small, label, caption.

### 5.4 Typography Rules

**Valid — derived from frozen documents:**

1. **One `<h1>` per page.** (`docs/README.md §17` — SEO First; WCAG 2.4.6)
2. **Heading hierarchy is never skipped.** An `<h3>` must follow an `<h2>`. (`docs/README.md §17` — Accessibility First)
3. **System fallback fonts are required** in all font stacks. The web font may not be the only entry. (`01-Product-Vision.md §5` — Speed)
4. **Font loading must use `display: swap` or equivalent** to prevent FOIT and minimise CLS. (`01-Product-Vision.md §8` — Core Web Vitals)
5. **Text must be resizable** to 200% of its base size without loss of content or functionality. (WCAG 1.4.4, mandated by `docs/README.md §17`)

---

## 6. Spacing Scale

### 6.1 What the Frozen Documents Establish for Spacing

| Constraint | Source |
|---|---|
| Consistent visual rhythm across components | `docs/README.md §17` — Consistency |
| Spacing tokens must exist (spacing is a visual decision, tokens are the source of truth) | `docs/README.md §19` |
| Spacing token names must be semantic and kebab-case | `docs/README.md §19` and `§22` |

**What the frozen documents do NOT establish:**

- Which base unit to use
- Any specific spacing values
- How many steps the scale should have

### 6.2 UNRESOLVED: Spacing Base Unit and Scale

> [!IMPORTANT]
> **UNRESOLVED — requires owner decision before the Component Library is written.**
>
> The frozen documents mandate that spacing tokens exist and follow naming conventions, but do not specify any values.
>
> **Constraints from frozen documents:**
> - Consistent visual rhythm (Consistency principle).
> - Spacing decisions must be expressible as tokens — hardcoded values in components are a violation of `docs/README.md §19`.
>
> **Options and trade-offs:**
>
> | Option | Base Unit | Smallest step | Notes |
> |---|---|---|---|
> | **A — Base-4** | 4px | 4px | Maximum granularity; every value is a multiple of 4px. Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96. |
> | **B — Base-8** | 8px | 4px | Primary increments at 8px multiples; 4px available for micro-gaps. Scale: 4, 8, 16, 24, 32, 48, 64, 80, 96. Reduces token count. |
> | **C — Rem-based (custom)** | 0.25rem | 0.25rem | Scale defined in rem units for user font-size respect. Aligns with WCAG 1.4.4 (text resizing). |
>
> **Decision needed:** Which base unit and scale aligns with the development workflow and design tool being used?

---

## 7. Layout Tokens

### 7.1 What the Frozen Documents Establish for Layout

| Constraint | Source |
|---|---|
| Content must be readable and not create layout shift | `01-Product-Vision.md §8` — Core Web Vitals (CLS) |
| Navigation must be present (implied by product structure) | `01-Product-Vision.md §2` — browser-based platform |
| Layout tokens must exist as tokens, not hardcoded values | `docs/README.md §19` |

### 7.2 UNRESOLVED: Navigation Height and Maximum Content Width

> [!IMPORTANT]
> **UNRESOLVED — requires owner decision.**
>
> The frozen documents do not specify any layout dimension values. The current codebase uses `--nav-h: 68px` and `--max-w: 1200px`, both derived from implementation, not from a product decision.
>
> **Constraints from frozen documents:**
> - Navigation height must be a token (not hardcoded) so page content offset is consistent across all pages.
> - Maximum content width must prevent line lengths from becoming uncomfortably wide (Zero friction — readability).
> - Both values must be set in both themes if they differ between themes (they are structural, so they likely do not).
>
> **Decision needed:** Confirm navigation height and maximum content width for Phase 1.

---

## 8. Elevation and Shadows

### 8.1 What the Frozen Documents Establish for Elevation

| Constraint | Source |
|---|---|
| "Premium, modern" visual quality | `01-Product-Vision.md §4` |
| Elevation tokens must exist | `docs/README.md §19` |
| Elevation must be consistent (same component, same shadow, everywhere) | `docs/README.md §17` — Consistency |
| Both light and dark modes require tokens | `01-Product-Vision.md §5` — Free core |

**What the frozen documents do NOT establish:**

- Whether shadows should be single-layer or multi-layer
- Specific opacity, blur, or spread values
- How many elevation steps are needed
- Whether dark mode requires different opacity values

### 8.2 UNRESOLVED: Shadow Approach and Values

> [!IMPORTANT]
> **UNRESOLVED — requires owner decision.**
>
> The frozen documents establish that elevation tokens are required and that the visual style must be "premium, modern." They do not specify shadow construction.
>
> **Constraints from frozen documents:**
> - Shadows must not impair readability or create visual noise that competes with content (Zero friction).
> - Both light and dark modes must have equal visual quality (Free core).
>
> **Options and trade-offs:**
>
> | Option | Approach | Visual character | Notes |
> |---|---|---|---|
> | **A — Minimal / no shadow** | No drop shadows; elevation expressed through border and background contrast only | Flat, clean, modern | Zero GPU cost; no cross-browser shadow rendering variance; favoured by minimalist design systems. Risk: surfaces may lack hierarchy. |
> | **B — Low-opacity single-layer** | One `box-shadow` value per step, low opacity | Light, subtle elevation | Simple token values; predictable. Less depth than multi-layer. |
> | **C — Low-opacity multi-layer** | Two composited `box-shadow` values per step | Soft, dimensional, premium | More natural depth; higher visual quality. Slightly more complex token values. Current codebase approach. |
> | **D — Coloured/tinted shadows** | Shadow uses a tint of the primary brand color | Branded, distinctive | Used by some modern design systems. Risk: harder to maintain across theme changes. |
>
> **Decision needed:** Which elevation approach aligns with the "premium, modern" quality bar?

### 8.3 Elevation Usage Rules

**Valid — derived from frozen documents:**

1. Elevation must be expressed through tokens, not hardcoded `box-shadow` values (`docs/README.md §19`).
2. Both light and dark modes must define elevation tokens with equal quality (`01-Product-Vision.md §5` — Free core).
3. Elevation level must be consistent: the same component at the same state must use the same elevation token everywhere it appears (`docs/README.md §17` — Consistency).

---

## 9. Border Radius

### 9.1 What the Frozen Documents Establish for Border Radius

| Constraint | Source |
|---|---|
| Radius tokens must exist | `docs/README.md §19` |
| Radius must be consistent per component class | `docs/README.md §17` — Consistency |
| Visual style must be "premium, modern" — not dated | `01-Product-Vision.md §4` |
| Visual style must convey a professional tool (primary user expects a tool, not a consumer app) | `01-Product-Vision.md §3` — Primary User |

**What the frozen documents do NOT establish:**

- Any specific pixel value for any radius step
- How many radius steps are needed
- Whether a "pill" (fully rounded) variant is required

### 9.2 UNRESOLVED: Radius Scale

> [!IMPORTANT]
> **UNRESOLVED — requires owner decision.**
>
> The frozen documents establish that radius must be consistent and the visual style must be "premium, modern" and convey a professional tool. They do not specify any values.
>
> **Constraints from frozen documents:**
> - "Professional tool" implies control and precision over "playful" or "consumer" aesthetics (`01-Product-Vision.md §3`).
> - Must be consistent across all components of the same type (`docs/README.md §17`).
>
> **Options and trade-offs:**
>
> | Option | Range | Character | Notes |
> |---|---|---|---|
> | **A — Sharp / minimal** | 0–4px | Technical, precise | Conveys tool-like precision; may feel cold on a consumer-facing product. |
> | **B — Controlled** | 6–16px | Clean, professional, accessible | Enough rounding for softness without consumer-app feeling. Most versatile for a broad audience. |
> | **C — Moderate** | 8–24px | Modern, friendly | Current codebase range. Balanced. Pill variant (9999px) required for tag/badge elements. |
> | **D — Generous** | 16–32px | Rounded, approachable | Risks reading as consumer-app rather than professional tool for the primary user. |
>
> **Decision needed:** Which radius range aligns with the product identity?

---

## 10. Motion and Animation

### 10.1 What the Frozen Documents Establish for Motion

| Constraint | Source |
|---|---|
| Motion must never delay interaction | `01-Product-Vision.md §5` — Speed is a feature |
| Animations must communicate state change — not exist for decoration | `01-Product-Vision.md §5` — Speed is a feature |
| All animated elements must respect `prefers-reduced-motion` | `docs/README.md §17` — Accessibility First (non-negotiable) |
| Motion tokens must exist as tokens | `docs/README.md §19` |

**What the frozen documents do NOT establish:**

- Specific duration values in milliseconds
- Specific easing curves or cubic-bezier values
- Whether spring/physics-based animation is used
- Which specific UI interactions receive animation

### 10.2 UNRESOLVED: Animation Duration Thresholds

> [!IMPORTANT]
> **UNRESOLVED — requires owner decision.**
>
> "Speed is a feature" mandates that motion must not delay interaction. It does not specify any millisecond threshold.
>
> **Constraints from frozen documents:**
> - No animation may block the user from interacting with the result of that animation.
> - Motion communicates state; it does not perform.
>
> **Options and trade-offs:**
>
> | Option | UI interaction cap | Notes |
> |---|---|---|
> | **A — Conservative** | 150ms max | Feels instant; minimal visual communication; appropriate for micro-interactions only. |
> | **B — Moderate** | 200–300ms max | Balances speed and communicative value; most transitions complete before the user notices. |
> | **C — Expressive** | 400–500ms max | Allows richer motion; risk of perceived sluggishness on low-end devices. |
>
> **Decision needed:** What is the maximum acceptable duration for a UI interaction animation?

### 10.3 UNRESOLVED: Easing Strategy

> [!IMPORTANT]
> **UNRESOLVED — requires owner decision.**
>
> The frozen documents do not specify easing curves. The previous draft referenced Material Design cubic-bezier values — this is an unjustified external dependency.
>
> **Options and trade-offs:**
>
> | Option | Approach | Notes |
> |---|---|---|
> | **A — CSS keywords only** | `ease`, `ease-in`, `ease-out`, `ease-in-out` | Zero configuration; broad browser support; limited expressiveness. |
> | **B — Named cubic-bezier tokens** | Custom `cubic-bezier()` values defined as tokens | Full control over motion character; requires design decision per curve. |
> | **C — Spring motion library** | Framer Motion or equivalent | Most natural feel for drag, file drop, and modal transitions; adds a dependency; spring parameters must be documented here if adopted. |
>
> **Decision needed:** Which easing strategy aligns with the product and performance constraints?

### 10.4 Motion Rules

**Valid — derived from frozen documents:**

1. **All animated elements must respect `prefers-reduced-motion`.** This is non-negotiable. (`docs/README.md §17` — Accessibility First). Implementation: wrap all transitions in `@media (prefers-reduced-motion: no-preference)`.
2. **Animations do not block interactivity.** The user must never wait for an animation to complete before interacting with the result. (`01-Product-Vision.md §5` — Speed)
3. **Motion communicates state change.** It is not decorative. If removing the animation does not affect the user's understanding of a state transition, the animation should not exist. (`01-Product-Vision.md §5` — Speed)
4. **Motion tokens must be consumed by components** — no hardcoded `transition` values in component code. (`docs/README.md §19`)

---

## 11. Additional Visual Utilities

### 11.1 UNRESOLVED: Glassmorphism / Backdrop Blur

> [!IMPORTANT]
> **UNRESOLVED — requires owner decision.**
>
> The previous draft included a `glass` utility class (backdrop-filter blur) derived from the current codebase implementation. The frozen documents do not reference or justify this pattern.
>
> **Constraints from frozen documents:**
> - "Speed is a feature" — `backdrop-filter` carries a GPU compositing cost that must be justified against performance budgets (`01-Product-Vision.md §5`).
> - Accessibility First — `backdrop-filter` can reduce text legibility on complex backgrounds and must be verified against contrast requirements (`docs/README.md §17`).
>
> **Decision needed:** Is a glassmorphism/backdrop-blur utility part of the ImageFlow visual language? If yes, which surfaces use it and under what conditions?

---

## 12. Open Questions Summary

All unresolved decisions are listed here. **None of these may be used in the codebase until resolved and this document is approved.**

| ID | Decision | Blocker for | Priority |
|---|---|---|---|
| **OQ-01** | Primary color hue family | Component Library, all interactive elements | 🔴 Must resolve before 03 |
| **OQ-02** | Status and accent color values | Component Library, all status states | 🔴 Must resolve before 03 |
| **OQ-03** | Typeface selection | Component Library, all text rendering | 🔴 Must resolve before 03 |
| **OQ-04** | Type scale (sizes, weights, line heights) | Component Library, all typographic elements | 🔴 Must resolve before 03 |
| **OQ-05** | Spacing base unit and scale | Component Library, all layout | 🔴 Must resolve before 03 |
| **OQ-06** | Navigation height and max content width | Page specs, layout tokens | 🟡 Resolve before 04/05 |
| **OQ-07** | Shadow approach and values | Component Library (cards, modals) | 🔴 Must resolve before 03 |
| **OQ-08** | Border radius scale | Component Library, all shaped elements | 🔴 Must resolve before 03 |
| **OQ-09** | Animation duration thresholds | Component Library, all interactive states | 🔴 Must resolve before 03 |
| **OQ-10** | Easing strategy | Component Library, all transitions | 🔴 Must resolve before 03 |
| **OQ-11** | Glassmorphism utility — include or exclude | Navigation component | 🟡 Resolve before 03 |
| **OQ-12** | Token pipeline (CSS custom properties vs. tooling) | All token work at scale | 🟢 Low — review at first major expansion |

---

## 13. Decisions That Are Fully Resolved

These decisions are valid, traceable to the frozen documents, and require no further approval:

| Decision | Traceable to |
|---|---|
| Two-tier token model (primitive → semantic) | `docs/README.md §19` |
| Components consume semantic tokens only | `docs/README.md §19` |
| Token names use `kebab-case`, intent-based | `docs/README.md §19`, `§22` |
| New tokens must be added to both themes | `docs/README.md §19` |
| Structural Change rule for component token overrides | `docs/README.md §16` |
| Both light and dark modes receive equal quality | `01-Product-Vision.md §5` — Free core |
| WCAG 2.1 AA contrast required for all text | `01-Product-Vision.md §5` — Million-user test; `docs/README.md §17` |
| One `<h1>` per page | `docs/README.md §17` — SEO First |
| Heading hierarchy never skipped | `docs/README.md §17` — Accessibility First |
| System fallback fonts required in all font stacks | `01-Product-Vision.md §5` — Speed |
| Font loading must prevent FOIT and CLS | `01-Product-Vision.md §8` — Core Web Vitals |
| `prefers-reduced-motion` is non-negotiable for all animations | `docs/README.md §17` — Accessibility First |
| Animations must not block interactivity | `01-Product-Vision.md §5` — Speed |
| Motion communicates state, not decoration | `01-Product-Vision.md §5` — Speed |
| All visual values expressed as tokens (no hardcoded values in components) | `docs/README.md §19` |
| Status colors are semantic — used only for their stated state | `docs/README.md §19` (semantic naming) |
| No visual patterns suggesting server file upload | `01-Product-Vision.md §5` — Privacy |
| Visual hierarchy guides to one primary action per page | `01-Product-Vision.md §5` — One tool, one job |

---

## 14. What This Document Does Not Cover

| Question | Document |
|---|---|
| Which UI components exist and how are they built? | [03-Component-Library.md](./03-Component-Library.md) |
| How is the homepage structured? | [04-Homepage-Spec.md](./04-Homepage-Spec.md) |
| How are tool pages structured? | [05-Tool-Page-Spec.md](./05-Tool-Page-Spec.md) |
| What are the brand assets (logo, wordmark, visual identity)? | [11-Brand-Guidelines.md](./11-Brand-Guidelines.md) |
| What are the full WCAG compliance checklists? | [08-Accessibility.md](./08-Accessibility.md) |
| What are the performance budgets and Core Web Vitals targets? | [09-Performance.md](./09-Performance.md) |

---

*This document is reviewed quarterly. Any change that introduces, modifies, or removes a token or token category constitutes an Additive or Structural Change (`docs/README.md §16`) and must be recorded in `docs/CHANGELOG.md`. No UNRESOLVED section in this document may be implemented in the codebase until it is approved and this document's status is changed to Stable.*
