# TypeScript/ESLint Fixes - Progress Tracking

## Files to Fix:
- [ ] src/app/api/admin/download/route.ts - Fix `any` type and unused `idx`
- [ ] src/app/api/admin/login/route.ts - Remove unused `cookie` import
- [ ] src/app/api/admin/route.ts - Fix `any` type and unused `err`
- [ ] src/app/api/admin/statistic/route.ts - Fix `any` type and unused `err`
- [ ] src/app/api/admin/update_status/[note_id]/route.ts - Fix unused `err`
- [ ] src/app/api/notes/route.ts - Fix unused `req` parameter and `err`
- [ ] src/app/api/submit/route.ts - Fix `any` type in catch block
- [ ] src/app/keluhan/page.tsx - Fix unused `setStatus` state

## Steps:
1. Create proper TypeScript interfaces for Note data
2. Fix each file systematically
3. Test functionality after changes
4. Run ESLint to verify fixes
