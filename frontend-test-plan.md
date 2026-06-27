# Frontend Test Plan — Pointify

## Recommended Setup

### Unit & Component Tests: Vitest + Testing Library

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom \
  @testing-library/user-event jsdom msw @inertiajs/testing
```

Add to `vite.config.ts`:
```ts
/// <reference types="vitest/config" />
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./resources/js/test/setup.ts"],
    css: true,
  },
  // ...existing Vite config
});
```

Create `resources/js/test/setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";
```

### E2E Tests: Playwright (recommended — see comparison below)

```bash
npm init playwright@latest
```

---

## E2E Tool Recommendation: Playwright

| Criteria | Playwright | Cypress |
|---|---|---|
| **Language** | TypeScript/JS (native) | TypeScript/JS |
| **Browser support** | Chromium, Firefox, WebKit | Chromium, Firefox, WebKit (limited) |
| **Parallelism** | Native, across files & browsers | Paid CI only |
| **Network mocking** | `page.route()` — built-in, powerful | `cy.intercept()` — good but less flexible |
| **Component testing** | Integrated (experimental) | Mature, separate module |
| **IFrame handling** | Excellent (auto-waits) | Limited |
| **Multi-page / tabs** | Built-in API | Workaround needed |
| **Laravel integration** | No official adapter; use `artisan serve` | `cy.exec('php artisan ...')` |
| **Speed** | Faster (runs closer to browser) | Slower (runs in browser) |
| **Debugging** | Trace Viewer, VS Code extension | Time-travel snapshots |

**Recommendation: Playwright** because:
- This project uses Inertia.js (SPA-like XHR navigation) — Playwright's `page.route()` intercepts XHR easily
- Native parallel execution without paying for a CI plan
- Built-in trace viewer for debugging test failures
- Better DX with VS Code extension
- No lock-in to a paid cloud service

---

## Test Categories

### 1. Unit Tests

Test pure logic in isolation — no React rendering, no Inertia mocking needed.

| # | What to test | File(s) | Notes |
|---|---|---|---|
| 1.1 | `cn()` — class name merging | `lib/utils.ts` | Test `twMerge` + `clsx` combining, conditional classes, override precedence |
| 1.2 | `formatName()` — name formatting | `lib/utils.ts` | `"Muhammad"` → `"M."`, no-op for other names, empty string |
| 1.3 | `toUrl()` — URL conversion | `lib/utils.ts` | String passthrough, object `.url` extraction, edge cases |
| 1.4 | `useAppearance` — theme toggle logic | `hooks/use-appearance.ts` | localStorage read/write, system preference detection, cookie sync, `applyTheme()` DOM mutation |
| 1.5 | `usePermission` — permission checks | `hooks/use-permission.ts` | `can()` with single/multiple permissions, role-based access, edge cases |
| 1.6 | `useFilter` — filter state management | `hooks/use-filter.ts` | Debounced search (timer behavior), `handleFilterChange` merging params, `resetFilters` clearing, `only` prop filtering |
| 1.7 | `PAGE_SIZE_OPTIONS` constant | `constants.ts` | Values, type, immutability |
| 1.8 | Pagination helpers — `isFirstPage`, `isLastPage` | `table-pagination.tsx` | Logic extraction (if moved to utils) for edge values (single page, zero total) |
| 1.9 | Label cache logic in `AsyncCombobox` | `async-combobox.tsx` | Cache population, label enrichment, deduplication, stale cache handling |

### 2. Component Tests (Isolated)

Test individual components with mocked props — no Inertia router calls.

| # | What to test | File(s) | Notes |
|---|---|---|---|
| 2.1 | **SearchInput** — render, input, clear | `components/table/search-input.tsx` | Value display, onChange callback, reset button visibility/enabled, placeholder default/override, className passthrough |
| 2.2 | **TablePagination** — all states | `components/table/table-pagination.tsx` | First page (prev/first disabled), last page (next/last disabled), single page, empty data label, page size selector change, display text format, "Tidak ada data" when `from`/`to` are null |
| 2.3 | **TableFilter** — open/close, select/deselect, reset | `components/table/table-filter.tsx` | Popover toggle, item selection toggles checked state, "Hapus filter" clears all, selected badge display (1, 2, 3+ items), search within filter, counts display |
| 2.4 | **TableAction** — edit link, delete confirm | `components/table/table-action.tsx` | Edit button renders Inertia `Link`, delete triggers `onClickConfirm`, loading state disables buttons, alert-dialog visibility |
| 2.5 | **ConfirmationDialog** — confirm/cancel flows | `components/confirmation-dialog.tsx` | `modal.resolve()` on confirm, `modal.reject()` on cancel, `modal.hide()` called in both, dismiss on backdrop click |
| 2.6 | **Breadcrumbs** — render items, active state | `components/breadcrumbs.tsx` | Multiple items, single item, separator rendering, last item not linked |
| 2.7 | **AsyncCombobox** — single/multi, loading, search | `components/async-combobox.tsx` | Loading spinner visible during fetch, options displayed, selection clears input, multi-select chips shown, clearable button, empty state message, label cache fallback |
| 2.8 | **AvatarCropper** — crop, zoom, submit | `components/avatar-cropper.tsx` | Image loaded, crop area moves, zoom slider updates, onCropComplete callback, cancel resets |
| 2.9 | **ToastListener** — flash messages render | `components/toast-listener.tsx` | `flash.success` → sonner toast, `flash.error` → sonner toast, no flash → no toast |
| 2.10 | **CardMetric** — value display | `components/ui/card-metric.tsx` | Label, value, trend indicator (up/down/neutral), loading skeleton state |
| 2.11 | **TableToolbar** — children layout | `components/table/table-toolbar.tsx` | Wraps children in flex container, responsive classes applied |
| 2.12 | **NavMain** — permission-based filtering | `components/nav/nav-main.tsx` | Items hidden when user lacks permission, active state matching, collapsible groups |
| 2.13 | **NavUser** — dropdown menu | `components/nav/nav-user.tsx` | Avatar display, menu items (settings, logout), logout confirmation flow |
| 2.14 | **FieldError** — error display | `components/ui/field.tsx` (FieldError) | Renders error text, hidden when no error, aria-invalid propagation |

### 3. Integration Tests (Page-Level)

Test full page flows with Inertia request mocking — combine components + data fetching.

Use **MSW** to mock Inertia endpoint responses or **@inertiajs/testing** utilities.

| # | What to test | File(s) | Notes |
|---|---|---|---|
| 3.1 | **VocationalPrograms index** — full CRUD table | `pages/dashboard/vocational-programs/vocational-programs.tsx` | Renders data from props, search triggers `router.get`, pagination navigation works, empty state ("Belum ada data"), "Tambah" opens create modal |
| 3.2 | **CreateVocationalProgram modal** — form submit | `partials/create-vocational-program.tsx` | Form validation errors display, successful submit closes modal, dirty state triggers confirm dialog, abbreviation disabled for short names |
| 3.3 | **EditVocationalProgram modal** — prefill + update | `partials/edit-vocational-program.tsx` | Pre-filled with existing data, put request on submit, validation errors, dirty state tracking |
| 3.4 | **VocationalProgramActions** — delete flow | `partials/vocational-program-actions.tsx` | Delete button triggers confirm, confirm sends `router.delete`, loading state during deletion |
| 3.5 | **Login page** — form submission | `pages/auth/login.tsx` | Valid credentials → redirect, invalid → error display, processing state disables button |
| 3.6 | **Register page** — form validation | `pages/auth/register.tsx` | All fields required, password confirmation match, server validation errors display |
| 3.7 | **Dashboard** — cards, navigation | `pages/dashboard/dashboard.tsx` | CreateViolations card renders, CreateRewards card renders, links point to correct routes |
| 3.8 | **Student detail** — transaction history | `pages/dashboard/student-enrollments/student-detail.tsx` | Transaction groups render, violations vs rewards color coding, revocation flow, print button |
| 3.9 | **Violation approvals** — approve/reject actions | `pages/dashboard/violation-approvals/violation-approvals.tsx` | Approve button sends patch, reject opens reason form, status badges update |
| 3.10 | **Class reorder** — drag and drop | `pages/dashboard/classes/classes.tsx` | Drag item changes position, `reorder` request on drop, optimisic UI update |
| 3.11 | **Filter sync** — URL params reflect state | Multiple pages | Changing search/filter updates URL query params, navigating back restores state, page param resets on filter change |
| 3.12 | **Settings profile** — avatar upload | `pages/dashboard/settings/profile.tsx` | Avatar cropper opens, crop + save submits FormData, preview updates |

### 4. E2E Tests (Playwright)

Full user journey tests against a running Laravel dev server.

| # | What to test | User story |
|---|---|---|
| 4.1 | **Login → Dashboard** | User logs in with valid credentials, lands on dashboard, sees navigation sidebar, can access all permitted menu items |
| 4.2 | **Create entity** | User navigates to any CRUD page (e.g. Program Kejuruan), clicks "Tambah", fills form, submits, sees new entity in table |
| 4.3 | **Edit entity** | User clicks edit, modifies a field, saves, sees updated data |
| 4.4 | **Delete entity** | User clicks delete, confirms in alert-dialog, entity disappears from table |
| 4.5 | **Search + pagination** | User types in search, results filter after debounce, changes page size, navigates pages |
| 4.6 | **Column filter** | User opens filter popover, selects values, table filters, clears filter |
| 4.7 | **Logout** | User opens user menu, clicks logout, redirected to login page |
| 4.8 | **Protected route redirect** | Unauthenticated user visits `/dashboard`, redirected to `/login` |
| 4.9 | **Permission-based access** | User without permission cannot see restricted menu items or access restricted pages |
| 4.10 | **Theme toggle** | User switches theme (light/dark/system), preference persists on reload |
| 4.11 | **Student violation recording** | Navigate to student detail, create violation with signature, verify it appears in transaction history |
| 4.12 | **Violation approval workflow** | Teacher records violation → Admin approves/rejects via approval queue |

---

## Implementation Roadmap (Suggested Order)

```
Phase 1 — Foundation
├── Install Vitest + Testing Library + jsdom
├── Create test setup file
├── Write unit tests (1.1–1.3 utility functions)
└── Verify tests run with npm run test

Phase 2 — Component Tests
├── Write table component tests (2.1–2.4)
├── Write modal/dialog tests (2.5, 2.14)
├── Write nav/layout tests (2.12–2.13)
├── Write AsyncCombobox tests (2.7)
└── Write remaining component tests

Phase 3 — Integration Tests
├── Set up MSW or @inertiajs/testing
├── Write CRUD page integration tests (3.1–3.4)
├── Write auth integration tests (3.5–3.6)
└── Write complex flow tests (3.8–3.12)

Phase 4 — E2E Tests
├── Install Playwright, create config
├── Write auth flow tests (4.1, 4.7–4.8)
├── Write CRUD flow tests (4.2–4.4)
├── Write search/filter flow tests (4.5–4.6)
└── Write remaining E2E tests (4.9–4.12)
```

## Key Patterns for Inertia Mocking

### Component test — mock `@inertiajs/react`:
```ts
vi.mock("@inertiajs/react", async () => {
  const actual = await vi.importActual("@inertiajs/react");
  return {
    ...actual,
    usePage: () => ({
      props: { auth: { user: { name: "Admin" } }, flash: {} },
      url: "/dashboard",
      component: "dashboard/Dashboard",
    }),
    router: {
      get: vi.fn(),
      post: vi.fn(),
      put: vi.fn(),
      patch: vi.fn(),
      delete: vi.fn(),
      visit: vi.fn(),
    },
  };
});
```

### Integration test — mock Inertia form submission:
```ts
const mockPost = vi.fn((url, options) => {
  options?.onSuccess?.();
});
vi.mock("@inertiajs/react", () => ({
  useForm: (initial: any) => ({
    data: initial,
    setData: vi.fn(),
    post: mockPost,
    processing: false,
    errors: {},
    isDirty: false,
  }),
}));
```

### E2E — wait for Inertia navigation:
```ts
await page.waitForURL("**/dashboard/vocational-programs");
await page.waitForSelector('text=Program Kejuruan');
```
