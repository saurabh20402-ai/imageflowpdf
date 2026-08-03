# Contributing to ImageFlow

Thank you for your interest in contributing to ImageFlow. 

Please note that **ImageFlow is proprietary software**. We generally do not accept external code contributions. However, we warmly welcome bug reports, feature requests, documentation improvements, and product feedback from the community. 

For authorized team members and internal contributors, this guide explains the development workflow, setup, and pull request processes.

---

## Before You Start

Read these documents first — they define how ImageFlow is built and maintained:

1. **[Engineering Handbook](./docs/README.md)** — Required reading for all contributors
2. **[Product Vision](./docs/01-Product-Vision.md)** — Why ImageFlow exists and who it serves
3. **[Code of Conduct](./CODE_OF_CONDUCT.md)** — Community standards

Everything in those documents is binding. If a contribution conflicts with the handbook, it will be requested to change before merging.

---

## Development Workflow

### 1. Understand the Feature

Before opening an editor:

- Read the relevant specification in `docs/` (if it exists)
- Check the [Roadmap](./docs/12-Roadmap.md) for priority and context
- Check [open issues](https://github.com/saurabh20402-ai/imageflowpdf/issues) for existing work
- If the feature isn't documented yet, open an issue first for discussion

### 2. Create a Branch

Use branch naming from the [Engineering Handbook](./docs/README.md) (§22):

```
type/short-description
```

Types:
- `feat/` — new feature
- `fix/` — bug fix
- `docs/` — documentation only
- `refactor/` — code restructuring without behavior change
- `perf/` — performance improvement
- `a11y/` — accessibility improvement
- `seo/` — SEO improvement

Examples:
```
feat/pdf-merge-tool
fix/image-resize-memory-leak
docs/component-library-update
perf/lazy-load-images
a11y/keyboard-navigation-improvements
```

### 3. Implement

Follow the [Engineering Handbook](./docs/README.md):

- **Design System** (`docs/02-Design-System.md`) — use existing tokens and patterns
- **Component Library** (`docs/03-Component-Library.md`) — reuse components, don't duplicate
- **Development Rules** (`docs/07-Development-Rules.md`) — code standards and architecture
- **Accessibility** (`docs/08-Accessibility.md`) — WCAG 2.2 AA compliance
- **Performance** (`docs/09-Performance.md`) — Core Web Vitals targets

**Hard rules:**
- No magic numbers or hardcoded values
- No duplicate code
- Reuse components from the Component Library
- Semantic HTML first, ARIA only when necessary
- Every public-facing change is SEO-checked

### 4. Test

- Unit tests for logic
- Accessibility testing (keyboard nav, screen reader, contrast)
- Performance testing (bundle size, Lighthouse)
- Responsive testing (mobile, tablet, desktop)
- Cross-browser testing if relevant

### 5. Update Documentation

Documentation updates are mandatory — not optional.

If your change affects:
- **UI/patterns** → Update `docs/02-Design-System.md`
- **Components** → Update `docs/03-Component-Library.md`
- **Page structure** → Update `docs/04-Homepage-Spec.md` or `docs/05-Tool-Page-Spec.md`
- **SEO elements** → Update `docs/06-SEO-Guidelines.md`
- **Architecture** → Update `docs/07-Development-Rules.md`
- **Accessibility** → Update `docs/08-Accessibility.md`
- **Performance** → Update `docs/09-Performance.md`

Follow the documentation update process in the [Engineering Handbook](./docs/README.md) (§7):
1. Update the document's `version` field
2. Update `last_updated` date
3. Verify `depends_on` links are still accurate
4. Update any referenced documents if needed
5. Ensure no contradictions exist
6. Commit documentation with your implementation

### 6. Open a Pull Request

Use the [pull request template](./.github/PULL_REQUEST_TEMPLATE.md). It will auto-populate when you open a PR.

**PR requirements:**
- Title follows branch naming convention (e.g., `feat: PDF merge tool`)
- Description explains the **why**, not just the **what**
- Links to relevant issues
- Screenshots/videos if UI changed
- Documentation updates included
- All CI checks passing

### 7. Review & Merge

- At least one approval required before merging
- All checks must pass (tests, linting, accessibility)
- No merge commits — use squash and rebase
- Delete the branch after merge

---

## Commit Conventions

Write clear commit messages. Use this format:

```
type(scope): short description

Longer explanation if needed. Explain why, not what.
```

**Types:**
- `feat` — new feature
- `fix` — bug fix
- `docs` — documentation
- `refactor` — code change without behavior change
- `perf` — performance improvement
- `a11y` — accessibility improvement
- `seo` — SEO improvement
- `test` — test addition or update
- `chore` — build, deps, config

**Examples:**
```
feat(pdf): add merge tool to PDFs page

Users can now merge multiple PDFs into a single document.
Implements the spec from docs/05-Tool-Page-Spec.md.

fix(ui): correct button alignment on mobile

Fix: #123
```

---

## Pull Request Template

The PR template (`.github/PULL_REQUEST_TEMPLATE.md`) guides what to include:

- **Description** — why you're making this change
- **Type of Change** — feature, fix, docs, etc.
- **Related Issues** — links to issues this resolves
- **Testing Done** — how you verified it works
- **Screenshots** — if UI changed
- **Documentation Updated** — which docs were updated
- **Checklist** — accessibility, performance, responsive, etc.

---

## Code Quality Standards

### TypeScript
- No `any` types without justification
- Proper typing for all functions and components
- Use interfaces over types where appropriate

### React Components
- Functional components only
- Hooks for state and effects
- Reuse from Component Library first
- Descriptive names (not `Item`, `Wrapper`, `Container`)
- Small, focused components (< 200 lines)

### File Organization
```
components/
├── Button.tsx
├── Input.tsx
├── PDFViewer.tsx
└── PDFViewer.test.tsx

lib/
├── utils.ts
├── constants.ts
└── hooks/

pages/
├── api/
├── tools/
│   ├── pdf/
│   │   └── merge.tsx
│   └── images/
│       └── resize.tsx
└── index.tsx
```

### No Hardcoded Values
- Use design tokens for colors, spacing, typography
- Use constants for strings and numbers
- Use environment variables for config

---

## Accessibility Checklist

Every PR touching UI must verify:

- [ ] Keyboard navigation works (Tab, Enter, Escape)
- [ ] Color contrast meets WCAG AA (4.5:1 for text)
- [ ] Form inputs have labels and error messages
- [ ] Images have alt text
- [ ] ARIA labels only where necessary (prefer semantic HTML)
- [ ] Screen reader tested (NVDA, JAWS, or VoiceOver)
- [ ] Focus indicators visible

See `docs/08-Accessibility.md` for full requirements.

---

## Performance Checklist

Every PR must verify:

- [ ] Bundle size increased by < 5KB (gzipped)
- [ ] Lighthouse score maintained (90+)
- [ ] Core Web Vitals not degraded
- [ ] No unnecessary dependencies added
- [ ] Images optimized
- [ ] Code split where appropriate

See `docs/09-Performance.md` for full requirements.

---

## Documentation Checklist

Before merging, verify:

- [ ] README updated if needed
- [ ] Inline code comments added for complex logic
- [ ] Component props documented
- [ ] API endpoints documented
- [ ] Handbook doc updated and version bumped
- [ ] No broken links in documentation
- [ ] Metadata fields updated in handbook docs (last_updated, version)

---

## Getting Help

- **Questions about the handbook?** Check [Engineering Handbook](./docs/README.md)
- **Architecture advice?** Open an issue or discussion
- **Code review?** Tag reviewers in your PR
- **Security concern?** See [SECURITY.md](./SECURITY.md)

---

## Reporting Issues

### Bug Reports
Use the [bug report template](./.github/ISSUE_TEMPLATE/bug_report.md):
- What you expected to happen
- What actually happened
- Steps to reproduce
- Screenshots if relevant
- Environment (OS, browser, device)

### Feature Requests
Use the [feature request template](./.github/ISSUE_TEMPLATE/feature_request.md):
- Why this feature is needed
- Use cases it solves
- Proposed implementation (if you have ideas)
- References (similar tools, relevant docs)

### Security Issues
See [SECURITY.md](./SECURITY.md) for responsible disclosure.

---

## Long-Term Maintenance

The [Engineering Handbook](./docs/README.md) is the single source of truth. As it evolves:

- New documents will be added
- Patterns will be established
- Standards will be refined

Stay aligned with the handbook. If you find gaps or contradictions, raise them as issues or discussions — don't silently work around them.

---

## Review Process

### For Authors
- Expect 24-48 hours for initial review
- Respond to feedback promptly
- Push force-updates only if requested
- Request re-review after changes

### For Reviewers
- Check alignment with [Engineering Handbook](./docs/README.md)
- Verify accessibility and performance
- Test locally if possible
- Be constructive and specific

---

## Questions?

- **Documentation:** [Engineering Handbook](./docs/README.md)
- **Issues:** [GitHub Issues](https://github.com/saurabh20402-ai/imageflowpdf/issues)
- **Discussions:** [GitHub Discussions](https://github.com/saurabh20402-ai/imageflowpdf/discussions)

Thank you for contributing to ImageFlow.
