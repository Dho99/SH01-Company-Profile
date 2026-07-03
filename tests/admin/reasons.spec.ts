import { test } from "@playwright/test";

// ============================================================
// E2E Test Scaffold: Admin – Reasons
// Target: /admin/reasons
//
// File ini adalah scaffold kosong yang siap diisi.
// Struktur dan pola mengikuti tests/admin/stats.spec.ts
//
// TODO: Implementasikan test berikut:
//   - [ ] admin dapat membuat reason baru (icon, title, description, sortOrder)
//   - [ ] reason baru tampil di daftar
//   - [ ] admin dapat mengedit reason yang ada
//   - [ ] admin dapat menghapus reason
//   - [ ] validasi icon (hanya dari ICON_CATEGORIES.reasons)
//   - [ ] duplicate sortOrder — cek behavior (kemungkinan GAP seperti di stats)
//
// Referensi:
//   - Form: app/(admin)/admin/reasons/ (jika ada)
//   - Schema: lib/cms/schemas.ts → reasonSchema
//   - API: /api/cms/reasons (generic entity route)
//   - Icons valid: lib/cms/icons.ts → ICON_CATEGORIES.reasons
// ============================================================

// test.describe.skip("Admin – Reasons CRUD (scaffold — belum diimplementasikan)", () => {
//   // TODO: tambahkan loginAndGoToReasons helper

//   test.todo("admin dapat membuat reason baru");

//   test.todo("reason baru muncul di daftar");

//   test.todo("admin dapat mengedit reason yang ada");

//   test.todo("admin dapat menghapus reason");

//   test.todo("form menolak icon yang tidak valid");

//   test.todo("cek behavior duplicate sortOrder (kemungkinan GAP — lihat stats.spec.ts)");
// });
