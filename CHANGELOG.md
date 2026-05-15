# Database Changes Log

## 2026-05-15 14:37 — Add Missing Unique Constraints

### Migration
`2026_05_15_143700_add_unique_constraints.php`

### Changes

| # | Table | Constraint | Reason |
|---|-------|-----------|--------|
| 1 | `point_transactions` | `UNIQUE(violation_id, transaction_type)` | Prevents same violation from being approved twice (race condition in ViolationApprovalService). Composite with `transaction_type` because revocation also creates a row with the same `violation_id` but type `revoked`. |
| 2 | `point_transactions` | `UNIQUE(reward_id, transaction_type)` | Same pattern as above for rewards (RewardService). Revocation reuses `reward_id` with type `revoked`. |
| 3 | `violation_letters` | `UNIQUE(student_enrollment_id, point_transaction_group_id, point_threshold_id)` | PointThresholdService uses `exists()` check before creating, but has no DB-level protection against concurrent requests. |
| 4 | `point_transaction_groups` | `UNIQUE(student_enrollment_id, sequence)` | `firstOrCreate` + `max(sequence) + 1` pattern can produce duplicate sequences under concurrency. |
| 5 | `student_classes` | `UNIQUE(name)` | Validated in `StudentClassService::validateUniqueness()` but not enforced at DB level. |
| 6 | `vocational_programs` | `UNIQUE(name)` | Validated in `StoreVocationalProgramRequest` / `UpdateVocationalProgramRequest` but not enforced at DB level. |

### Notes
- PostgreSQL allows multiple NULLs in unique columns, so nullable `violation_id` and `reward_id` won't conflict with rows where those are NULL (e.g., reset transactions).
- The `violation_letters` constraint name is manually set to `violation_letters_enrollment_group_threshold_unique` because the auto-generated name exceeds PostgreSQL's 63-character identifier limit.
- Run `php artisan migrate` after restoring the pg dump to apply these constraints without losing data.
- If existing data has duplicates, the migration will fail. Clean up duplicates first before running.


---

## Future Improvements & Ideas

### Point Reset Policy (Low Priority)
Currently `processPointReset` always resets to `initial_points` (100). If the school ever decides:
- "Second cycle gets 75 points"
- "Third cycle means automatic expulsion/enrollment deactivation"

...this logic would need to change. For now, don't over-engineer — the current policy is simply "reset and continue."

**Possible approach:** Add a `reset_points` column per cycle on `point_transaction_groups` or a configurable policy table that maps cycle number → points awarded.

### Flagged for Review on Reset (Low Priority)
When a student's points hit zero and reset, there's no visible flag for admins beyond counting reset transactions. Consider adding:
- A `is_flagged_for_review` boolean or `flag_reason` on `student_enrollments`
- Auto-set when reset happens
- Cleared manually by admin after review

This gives admins a dashboard view of "students who have depleted all points" without digging into transaction history.

---

## Known UX Issues

### Student Signature Bottleneck (High Priority)
**Problem:** The student signature requirement (touchscreen drawing) slows down violation entry significantly when multiple students violate rules simultaneously. Teachers operate on multiple devices but touchscreen signing is cumbersome.

**Why it exists:** Student acknowledgment that they violated rules — protection against students later denying the violation.

**Alternative verification ideas:**
1. **Student card (NFC/barcode/QR)** — tap to acknowledge. Requires school to issue cards and devices to have readers. Not currently available.
2. **PIN/password per student** — student enters a short PIN to confirm. No hardware needed, but PINs can be shared/forgotten.
3. **Batch mode with witness** — allow teachers to log multiple violations at once with a single witness signature (another teacher or staff), then notify students later. Trades real-time acknowledgment for speed.
4. **Photo evidence** — replace signature with a quick photo of the student at the scene. Faster than drawing, still serves as proof.
5. **Deferred acknowledgment** — teacher logs violation without signature, student confirms later (e.g., next time they check their record on a kiosk/app). Violation stays "pending acknowledgment" but points are already deducted.
6. **Checkbox + timestamp** — simplest: student taps a "Saya mengakui pelanggaran ini" button on the teacher's device. Less legally binding than a signature but much faster for bulk entry.

**Recommendation:** Option 5 (deferred acknowledgment) or 6 (checkbox confirmation) are the lowest-effort changes that solve the speed problem. Option 3 (batch + witness) is best if the school accepts a witness as sufficient proof.


---

## NFC Student Card Integration (Proposed Improvement)

### Overview
Replace touchscreen signature with NFC card tap for violation/reward acknowledgment. Teacher remains as witness. Card tap = student confirmation.

### Cost Estimate (~500 students, 4 devices)

| Item | Unit Price | Qty | Total |
|------|-----------|-----|-------|
| Kartu RFID 13.56MHz Mifare Classic 1K (blank PVC) | Rp 3.000–5.000 | 500 | Rp 1.500.000–2.500.000 |
| USB NFC Reader (ACR122U atau sejenis) | Rp 150.000–300.000 | 4 | Rp 600.000–1.200.000 |
| Cetak kartu custom (opsional, logo sekolah) | Rp 2.000–3.000 | 500 | Rp 1.000.000–1.500.000 |
| **Total** | | | **Rp 3.100.000–5.200.000** |

Per-student cost: ~Rp 5.000–10.000 (bisa dibebankan ke siswa).

### How It Works
1. Each card stores only the student's unique ID (UID or written data)
2. All student details remain in the database — card is just a key
3. Teacher initiates violation → student taps card → system confirms identity → violation recorded
4. If student changes class/name, no need to rewrite card

### Card Lifecycle
- **New student:** Issue blank card, register UID to student record
- **Graduation:** Recycle card (rewrite UID for new student) OR let student keep it
- **Lost/stolen:** Deactivate UID immediately, issue new card
- Mifare Classic 1K supports ~100,000 rewrites — cards last many years

### Security: Preventing Card Misuse (someone else's card)
1. **Teacher is present** — teacher sees the student, card tap just replaces signature
2. **Photo snap on tap (optional)** — front camera auto-captures photo on tap for visual proof
3. **Immediate deactivation** — lost card reported → UID disabled instantly
4. **Policy deterrent** — lending card = violation itself

### Multi-Use Potential (same card infrastructure)
- Pointify — violation/reward acknowledgment
- Absensi — tap in/out attendance
- Perpustakaan — book borrowing
- Kantin — cashless payment (future)

### Technical Implementation (DB changes needed)
- Add `card_uid` column to `students` table (unique, nullable)
- New endpoint: scan card → lookup student → return student info
- Modify violation/reward flow: accept card tap as confirmation method (alternative to signature)

### vs Fingerprint
Fingerprint is more secure but worse for this use case:
- Slower (1–3s vs instant tap)
- Fails with dirty/wet hands (common in SMK workshop)
- Privacy/legal risk (UU PDP — biometric data)
- Requires enrollment of 500+ fingerprints upfront
- Needs fallback method anyway
- More complex SDK integration

NFC card wins on speed, simplicity, cost, and multi-use potential.
