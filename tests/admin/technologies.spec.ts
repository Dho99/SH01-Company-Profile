import { test } from "@playwright/test";

// ============================================================
// E2E Test Scaffold: Admin – Technologies
// Target: /admin/technologies
//
// File ini adalah scaffold kosong yang siap diisi.
// Struktur dan pola mengikuti tests/admin/stats.spec.ts
//
// TODO: Implementasikan test berikut:
//   - [ ] admin dapat membuat technology baru (icon, label, color, sortOrder)
//   - [ ] technology baru tampil di daftar
//   - [ ] admin dapat mengedit technology yang ada
//   - [ ] admin dapat menghapus technology
//   - [ ] validasi icon (hanya dari ICON_CATEGORIES.technologies)
//   - [ ] duplicate sortOrder — cek behavior (kemungkinan GAP seperti di stats)
//
// Referensi:
//   - Form: app/(admin)/admin/technologies/ (jika ada)
//   - Schema: lib/cms/schemas.ts → technologySchema
//   - API: /api/cms/technologies (generic entity route)
//   - Icons valid: lib/cms/icons.ts → ICON_CATEGORIES.technologies
// ============================================================

// test.describe.skip("Admin – Technologies CRUD (scaffold — belum diimplementasikan)", () => {
//   // TODO: tambahkan loginAndGoToTechnologies helper

//   test.todo("admin dapat membuat technology baru");

//   test.todo("technology baru muncul di daftar");

//   test.todo("admin dapat mengedit technology yang ada");

//   test.todo("admin dapat menghapus technology");

//   test.todo("form menolak icon yang tidak valid");

//   test.todo("cek behavior duplicate sortOrder (kemungkinan GAP — lihat stats.spec.ts)");
// });
