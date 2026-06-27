# TODO — Backend Improvements

## Student Signature

- [ ] **Remove signature from violation creation** (`ViolationService::create`, `StoreViolationRequest`, migration to drop `student_signature_path` from `violations`)
      After a month of real use, the canvas signature proved to be friction with no real security value.
      Replacement: teacher attestation is already captured via `created_by`.

## Point Reset & Revocation — Core Design Fragilities

- [ ] **Link reset transactions to their trigger violation**
      Add `triggered_by_violation_id` (nullable FK to `violations`) on `point_transactions` for rows where `transaction_type = 'reset'`.
      This replaces the fragile `created_at >=` timestamp check in `ViolationService::violationTriggeredReset()` and
      the ambiguous "most recently closed" heuristic in `reopenTransactionGroup()`.

- [ ] **Fix `reopenTransactionGroup()`** to use the explicit `triggered_by_violation_id` link instead of
      `->where('is_closed', true)->orderBy('closed_at', 'desc')->first()`.

- [ ] **Fix `violationTriggeredReset()`** to check `triggered_by_violation_id === $violation->id`
      instead of `->where('created_at', '>=', ...)`.

## Audit Trail Consistency

- [ ] **Unify `intended_points` semantic across all transaction types**
      - Violation: full theoretical deduction (e.g. `-20` when only 5 was available) — ✓ already correct
      - Reward: keep as `points_change` (or null — reward partial deduction is not a real scenario)
      - Revoke (violation): currently stores resulting balance — change to `points_change` (just mirror the reversed amount)
      - Revoke (reset): same as above
      - Reset: currently not set — should be `null` (there is no "intended" for a reset)

- [ ] **Fix `processPointReset()` `points_after`** — currently `$pointsToAdd`, should be `$currentBalance + $pointsToAdd`.

- [ ] **Add description to reset transactions** for an auditable trail (e.g. "Auto reset after points depleted to 0").

## Guards & Constraints

- [ ] **Guard approval against non-pending violations** — currently only idempotency-checks `approved` status.
      Rejected/revoked violations can be re-approved, creating duplicate transactions.

- [ ] **Add DB unique constraint** `(violation_id, transaction_type)` where `transaction_type = 'violation'`
      to prevent double-processing at the database level.

- [ ] **Add DB unique constraint** `(reward_id, transaction_type)` where `transaction_type = 'reward'`
      to prevent double-processing rewards.

## Transaction Group Sequencing

- [ ] **Atomic sequence generation** — `$lastSequence = max('sequence')` has a race condition.
      Use a separate `sequences` table, `INSERT ... ON CONFLICT DO NOTHING` with retry,
      or a `DB::raw('COALESCE(MAX(sequence), 0) + 1')` inside `lockForUpdate` scope.
