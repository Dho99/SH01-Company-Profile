import { test } from "@playwright/test";

// ============================================================
// E2E Test Scaffold: Admin – Nav Links
// Target: /admin/nav-links
//
// File ini adalah scaffold kosong yang siap diisi.
// Struktur dan pola mengikuti tests/admin/stats.spec.ts
//
// TODO: Implementasikan test berikut:
//   - [ ] admin dapat membuat nav link baru (label, href, group, sortOrder)
//   - [ ] nav link baru tampil di daftar
//   - [ ] admin dapat mengedit nav link yang ada
//   - [ ] admin dapat menghapus nav link
//   - [ ] validasi field group (hanya: HEADER, FOOTER_NAV, FOOTER_SERVICE)
//   - [ ] hasDropdown dapat di-toggle (boolean checkbox)
//   - [ ] duplicate sortOrder — cek behavior (kemungkinan GAP seperti di stats)
//   - [ ] nav link baru tampil di navigasi publik (jika published=true)
//
// Referensi:
//   - Form: app/(admin)/admin/nav-links/ (jika ada)
//   - Schema: lib/cms/schemas.ts → navLinkSchema
//   - API: /api/cms/nav-links (generic entity route)
//   - Group enum: HEADER | FOOTER_NAV | FOOTER_SERVICE (dari schema.prisma)
// ============================================================

// test.describe.skip("Admin – Nav Links CRUD (scaffold — belum diimplementasikan)", () => {
//   // TODO: tambahkan loginAndGoToNavLinks helper

//   test.todo("admin dapat membuat nav link baru");

//   test.todo("nav link baru muncul di daftar");

//   test.todo("admin dapat mengedit nav link yang ada");

//   test.todo("admin dapat menghapus nav link");

//   test.todo("form menolak group yang tidak valid");

//   test.todo("hasDropdown bisa di-toggle");

//   test.todo("cek behavior duplicate sortOrder (kemungkinan GAP — lihat stats.spec.ts)");

//   test.todo("nav link yang published tampil di navigasi publik halaman utama");
// });
