## Account Deactivation

- [ ] **Add `SoftDeletes` to User model** + migration for `deleted_at`
- [ ] **Add super admin deactivate/restore controller + route** (e.g. `POST /users/{user}/deactivate`, `POST /users/{user}/restore`)
- [ ] **Add account deactivation request endpoint** for regular users — sends notification to super admins
- [ ] **Revoke sessions on deactivation** — invalidate all active sessions/tokens when user is soft-deleted
- [ ] **Audit log** — log deactivate/restore events (who, when, by whom)
- [ ] **Email notification** — notify user when their account is deactivated and when restored
- [ ] **UI** — add deactivate/restore controls in super admin user management page
