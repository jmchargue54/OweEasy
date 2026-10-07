# F1 — Foundation and Authentication

> Implementation plan. Source: [docs/MVP_FEATURE_INVENTORY.md](../MVP_FEATURE_INVENTORY.md) §F1.

## Metadata

| Field | Value |
|---|---|
| **Feature ID** | F1 |
| **Section** | Shared Expense Tracker MVP |
| **Severity** | BLOCKER |
| **Markets** | USD shared-expense groups |
| **Status (today)** | MISSING |
| **Estimated effort** | S (≤1 week) |
| **Owner (proposed)** | Feature team |
| **Depends on** | none |
| **Unblocks** | F2, F3, F4, F5 |
| **Included feature slices** | F1 covers F1–F6: local setup, user persistence, email/Google sign-in, protected routes, and current-user summary. |

---

## 1. Problem Statement

The team needs a reliable runnable base and authenticated identity before private group data can be used. Set up the app, persist users, support at least one sign-in path, protect routes, and show the current account.

## 2. Goals

- Set up the app, persist users, support at least one sign-in path, protect routes, and show the current account.
- Keep server, data, and UI behavior consistent across the included slices.
- Provide testable behavior that unlocks the next plan.

## 3. Non-Goals

- Advanced account recovery, profile editing, roles, and production deployment.
- No work belonging exclusively to a later plan.
- No currency conversion or external money movement.

## 4. Personas & User Stories

- **As a group member**, I want foundation and authentication so that shared expenses remain clear and traceable.
- **As an unauthenticated or non-member user**, I want access denied so private group data is protected.
- **As a teammate**, I want one focused contract so I can implement and review this plan within one week.

## 5. Functional Requirements

- **FR-1.** The system MUST implement only the included feature slices and MUST preserve the dependency and authorization boundaries in this plan.
- **FR-2.** The system MUST validate required fields, reject invalid or unauthorized requests, and MUST NOT persist partial writes.
- **FR-3.** The system MUST represent USD amounts as integer cents wherever money is present.
- **FR-4.** The system SHOULD return a clear success result and the next relevant action.
- **FR-5.** The system MAY emit non-sensitive diagnostic events for success, failure, and duration.

## 6. Non-Functional Requirements

- **Performance** — p95 API latency MUST be under 500 ms for normal reads/writes; list responses SHOULD remain under 100 KB.
- **Security** — authentication and group authorization MUST be enforced server-side; secrets and tokens MUST not be logged.
- **Privacy & Compliance** — expose minimum necessary account and financial data; apply WCAG 2.1 AA practices. FERPA/COPPA/GDPR/SOC 2 are not additional delivery requirements for this student MVP.
- **Accessibility** — all added UI MUST have labels, keyboard access, visible focus, and announced validation errors.
- **Scalability** — index foreign keys and paginate lists; assume up to 100 members and 10,000 expenses per group.
- **Reliability** — writes SHOULD tolerate safe retries and MUST avoid duplicate records from rapid repeat submissions.
- **Observability** — log plan ID, request ID, outcome, duration, and error code without sensitive payloads.
- **Maintainability** — keep validation, authorization, and money rules in shared modules with focused tests.
- **Internationalization** — externalize strings and display timestamps in the user’s locale/time zone.
- **Backward compatibility** — use additive migrations and preserve existing records.

## 7. Acceptance Criteria

- **AC-1.** *Given* a valid authorized user and all prerequisites available, *When* the user completes the primary flow for **Foundation and Authentication**, *Then* the expected records and/or result are created and shown. **Test:** end-to-end happy path.
- **AC-2.** *Given* missing, invalid, duplicate, or unauthorized input, *When* the request is submitted, *Then* the API returns a documented error and no partial state is saved. **Test:** API validation/authorization integration test.
- **AC-3.** *Given* no records, a loading request, or a dependency failure, *When* the relevant view opens, *Then* it shows an explicit empty, loading, or error state with recovery guidance. **Test:** UI state component test.
- **AC-4.** *Given* a mobile viewport and keyboard-only navigation, *When* the user completes the primary flow, *Then* controls remain usable and focus/validation feedback is perceivable. **Test:** responsive Playwright plus axe/keyboard test.

## 8. Data Model

- Reuse the project’s User, Group, GroupMember, Expense, ExpenseSplit, Settlement, Notification, and preference models only when relevant to the included slices.
- Add the smallest fields required by **Foundation and Authentication**, including stable IDs, ownership/group foreign keys, timestamps, and integer USD cents where applicable.
- Enforce foreign keys, unique user/group membership, positive amounts, exact split totals, and soft-delete rules where applicable.
- Migration convention: server/migrations/NNN_foundation-authentication.sql using the next repository sequence number.
- Backfill: N/A for a new MVP; if existing rows are present, backfill nullable fields before adding required constraints and verify counts.

## 9. API Surface

- Add or update /api/mvp/foundation-authentication with the appropriate verb(s), authenticated session requirement, and group-member authorization for group-scoped data.
- Request shape MUST validate IDs, names, dates, amounts, participants, and settings relevant to this plan.
- Response shape: { data: FeatureResult, error: null } or { data: null, error: { code, message, fields } }, with stable IDs and timestamps.
- WebSocket events: N/A; normal refresh is sufficient for this MVP unless the notification implementation already emits a documented event.
- Rate limits: use project defaults; protect writes from duplicate rapid submission.
- OpenAPI documentation MUST include route, auth scope, status codes, validation errors, and one example.

## 10. UI / UX

- Add or update the pages/components required by **Foundation and Authentication**, keeping the signed-in account and selected group visible when relevant.
- Flow: open view → show loading state → load or submit data → show success/result → provide the next dependent action.
- Empty state MUST explain what to do next; loading state MUST use a skeleton/progress indicator; error state MUST explain recovery and support retry.
- Responsive behavior MUST work at desktop and mobile widths; destructive actions require clear confirmation.
- Accessibility MUST include semantic headings, logical focus order, labeled controls, keyboard submission, and aria-live feedback for async status.
- Copy keys: feature.foundation-authentication.title, .empty, .loading, .error, .success, and .validation.*; all user-visible strings are externalized.

## 11. AI / ML Considerations

N/A — this plan does not require model inference or AI-specific data handling.

## 12. Integration Points

- Internal modules: session middleware, group authorization, database repository, API controller/service, and web page/component.
- External services: the selected authentication provider only where F1 requires it.
- Events: domain events MAY be consumed by F6, but event names and payloads must be documented before use.

## 13. Dependencies & Sequencing

- Must ship after: none.
- Must ship before: F2, F3, F4, F5.
- Shared infrastructure: database connection, migrations, authenticated request context, validation conventions, and the test harness.
- Parallel work is allowed inside the plan only when the shared data/API contract is agreed first.

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Group authorization is enforced only in the UI | M | H | Enforce membership in the API/service layer and test member/non-member cases. |
| Included slices grow beyond one week | M | M | Freeze the non-goals and move new requests to a later plan. |
| Data, API, and UI contracts drift | M | M | Review one contract together and run integration tests before UI completion. |
| Migration or provider setup blocks dependent plans | M | H | Land setup/migrations first and document local fallback fixtures. |

## 15. Rollout Plan

- Feature flag: mvp_foundation-authentication_enabled; ON in development and OFF in production until review.
- Sequence: schema migration → seed/backfill → API/service → UI → automated tests → small team pilot → enable.
- GA criteria: all acceptance criteria pass, no high-severity authorization defect, and mobile/desktop states are reviewed.
- Rollback: disable the flag; retain additive schema and preserve data needed for dependent plans.

## 16. Test Plan

- **Unit** — validation, authorization predicates, money calculations/transforms, and error mapping.
- **Integration** — migrations, constraints, API happy path, invalid input, unauthorized access, and retry behavior.
- **End-to-end** — Playwright covers AC-1 through AC-4 for the plan’s primary and included flows.
- **Security** — unauthenticated/non-member/member authorization matrix, ID enumeration, duplicate submission, and OWASP input checks.
- **Accessibility** — axe scan, keyboard traversal, focus order, and screen-reader labels.
- **Performance / load** — representative reads/writes meet the p95 target and list queries are bounded.
- **Manual exploratory** — refresh/back behavior, mobile layout, duplicate clicks, and recovery after a failed dependency.

## 17. Documentation & Training

- Update the README and API reference with setup, permissions, user-visible behavior, and focused test commands.
- Add a short teammate note describing how to verify the included slices.
- Admin/instructor documentation: N/A; the MVP has no admin role.

## 18. Open Questions

1. Which authentication provider configuration and local test strategy will the team use?
2. Which group actions are allowed for every member versus a designated owner?
3. What migration sequence number and final route naming convention does the repository use?

## 19. References

- [MVP feature inventory](../MVP_FEATURE_INVENTORY.md) — F1.
- [Shared expense tracker project document](../../outputs/shared-expense-tracker-project-document.md).
- [WDD 430 project specification](https://wdd430.netlify.app/prove/project-proposal/).

