import { test } from "@playwright/test";

// ============================================================
// E2E Test Scaffold: Admin – Testimonials
// Target: /admin/testimonials
//
// File ini adalah scaffold kosong yang siap diisi.
// Struktur dan pola mengikuti tests/admin/stats.spec.ts
//
// TODO: Implementasikan test berikut:
//   - [ ] admin dapat membuat testimonial baru (quote, name, role, avatarUrl, sortOrder)
//   - [ ] testimonial baru tampil di daftar
//   - [ ] admin dapat mengedit testimonial yang ada
//   - [ ] admin dapat menghapus testimonial
//   - [ ] field avatarUrl adalah opsional (bisa null)
//   - [ ] duplicate sortOrder — cek behavior (kemungkinan GAP seperti di stats)
//   - [ ] upload avatar image jika ada komponen ImageUpload di form
//
// Referensi:
//   - Form: app/(admin)/admin/testimonials/ (jika ada)
//   - Schema: lib/cms/schemas.ts → testimonialSchema
//   - API: /api/cms/testimonials (generic entity route)
//   - avatarUrl opsional: optionalImageUrl di schema (nullable)
// ============================================================

// test.describe.skip("Admin – Testimonials CRUD (scaffold — belum diimplementasikan)", () => {
//   // TODO: tambahkan loginAndGoToTestimonials helper

//   test.todo("admin dapat membuat testimonial baru");

//   test.todo("testimonial baru muncul di daftar");

//   test.todo("admin dapat mengedit testimonial yang ada");

//   test.todo("admin dapat menghapus testimonial");

//   test.todo("field avatarUrl bersifat opsional (bisa disimpan tanpa gambar)");

//   test.todo("area upload avatar tersedia di form jika ada ImageUpload");

//   test.todo("cek behavior duplicate sortOrder (kemungkinan GAP — lihat stats.spec.ts)");
// });
