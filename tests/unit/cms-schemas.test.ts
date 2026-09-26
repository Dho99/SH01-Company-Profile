import { describe, it, expect } from "vitest";
import {
  statSchema,
  aboutPointSchema,
  serviceSchema,
  siteSettingSchema,
  sectionHeadingSchema,
} from "@/lib/cms/schemas";
const ICON_CATEGORIES = {
  stats: ["rocket", "users", "code"],
  services: ["code", "smartphone", "cog", "palette"],
};

// ============================================================
// Unit Test: CMS Schema Validation (@/lib/cms/schemas.ts)
// Menguji logika validasi Zod untuk semua schema CMS admin:
//   - statSchema
//   - aboutPointSchema
//   - serviceSchema
//   - siteSettingSchema
//   - sectionHeadingSchema
//
// Termasuk pengujian:
//   - sortOrder validation (integer required)
//   - validasi icon (hanya nilai dari ICON_CATEGORIES yang valid)
//   - field wajib dan opsional
//
// Catatan duplicate sortOrder:
//   Schema Zod TIDAK memvalidasi keunikan sortOrder antar item —
//   validasi itu adalah tanggung jawab database/API layer.
//   Constraint @unique belum ada di schema.prisma untuk model-model ini.
//   Ini adalah GAP yang didokumentasikan di E2E tests.
// ============================================================

// ============================================================
// statSchema
// ============================================================
describe("statSchema", () => {
  const validStat = {
    icon: "rocket",
    value: "100+",
    label: "Projects",
    sortOrder: 1,
    published: true,
  } as const;

  it("menerima data stat yang valid", () => {
    const result = statSchema.safeParse(validStat);
    expect(result.success).toBe(true);
  });

  it("menolak icon dengan format tidak valid", () => {
    const result = statSchema.safeParse({
      ...validStat,
      icon: "invalid/icon-xyz",
    });
    expect(result.success).toBe(false);
  });

  it("menerima semua icon yang valid dari ICON_CATEGORIES.stats", () => {
    for (const icon of ICON_CATEGORIES.stats) {
      const result = statSchema.safeParse({ ...validStat, icon });
      expect(result.success).toBe(true);
    }
  });

  it("menolak value kosong", () => {
    const result = statSchema.safeParse({ ...validStat, value: "" });
    expect(result.success).toBe(false);
  });

  it("menolak label kosong", () => {
    const result = statSchema.safeParse({ ...validStat, label: "" });
    expect(result.success).toBe(false);
  });

  it("menolak sortOrder yang bukan integer (float)", () => {
    const result = statSchema.safeParse({ ...validStat, sortOrder: 1.5 });
    expect(result.success).toBe(false);
  });

  it("menerima sortOrder 0", () => {
    const result = statSchema.safeParse({ ...validStat, sortOrder: 0 });
    expect(result.success).toBe(true);
  });

  it("menerima sortOrder negatif (tidak ada batasan minimum)", () => {
    const result = statSchema.safeParse({ ...validStat, sortOrder: -1 });
    expect(result.success).toBe(true);
  });

  it("menolak sortOrder yang bertipe string", () => {
    const result = statSchema.safeParse({ ...validStat, sortOrder: "1" });
    expect(result.success).toBe(false);
  });

  it("menolak published yang bukan boolean", () => {
    const result = statSchema.safeParse({ ...validStat, published: "true" });
    expect(result.success).toBe(false);
  });

  // Catatan: keunikan sortOrder antar item tidak bisa divalidasi di schema Zod
  // karena schema hanya mengevaluasi satu objek sekaligus tanpa konteks data lain.
  it("DOKUMENTASI GAP: schema Zod tidak bisa mendeteksi duplicate sortOrder", () => {
    // Dua stat dengan sortOrder identik akan lolos validasi schema secara individual
    const stat1 = statSchema.safeParse({ ...validStat, sortOrder: 5 });
    const stat2 = statSchema.safeParse({ ...validStat, sortOrder: 5 });
    expect(stat1.success).toBe(true);
    expect(stat2.success).toBe(true);
    // Keunikan harus dijaga di DB (@unique constraint) atau API layer.
  });
});

// ============================================================
// aboutPointSchema
// ============================================================
describe("aboutPointSchema", () => {
  const validPoint = {
    text: "Innovative solutions",
    sortOrder: 1,
    published: true,
  };

  it("menerima data about point yang valid", () => {
    const result = aboutPointSchema.safeParse(validPoint);
    expect(result.success).toBe(true);
  });

  it("menolak text kosong", () => {
    const result = aboutPointSchema.safeParse({ ...validPoint, text: "" });
    expect(result.success).toBe(false);
  });

  it("menolak sortOrder yang bukan integer (float)", () => {
    const result = aboutPointSchema.safeParse({
      ...validPoint,
      sortOrder: 2.7,
    });
    expect(result.success).toBe(false);
  });

  it("menerima sortOrder 0 (urutan awal)", () => {
    const result = aboutPointSchema.safeParse({ ...validPoint, sortOrder: 0 });
    expect(result.success).toBe(true);
  });

  it("menolak sortOrder bertipe string", () => {
    const result = aboutPointSchema.safeParse({ ...validPoint, sortOrder: "2" });
    expect(result.success).toBe(false);
  });

  it("menolak published yang bukan boolean", () => {
    const result = aboutPointSchema.safeParse({
      ...validPoint,
      published: 1,
    });
    expect(result.success).toBe(false);
  });

  it("menolak jika field text tidak ada", () => {
    const { text: _t, ...withoutText } = validPoint;
    const result = aboutPointSchema.safeParse(withoutText);
    expect(result.success).toBe(false);
  });
});

// ============================================================
// serviceSchema
// ============================================================
describe("serviceSchema", () => {
  const validService = {
    icon: "code",
    title: "Web Development",
    description: "We build web applications",
    imageUrl: null,
    sortOrder: 1,
    published: true,
  } as const;

  it("menerima data service yang valid tanpa imageUrl", () => {
    const result = serviceSchema.safeParse(validService);
    expect(result.success).toBe(true);
  });

  it("menerima data service dengan imageUrl berisi URL", () => {
    const result = serviceSchema.safeParse({
      ...validService,
      imageUrl: "https://res.cloudinary.com/test/image/upload/v1/test.jpg",
    });
    expect(result.success).toBe(true);
  });

  it("menerima imageUrl: undefined (opsional)", () => {
    const { imageUrl: _i, ...withoutImage } = validService;
    const result = serviceSchema.safeParse(withoutImage);
    expect(result.success).toBe(true);
  });

  it("menolak icon dengan format tidak valid", () => {
    const result = serviceSchema.safeParse({
      ...validService,
      icon: "invalid/icon",
    });
    expect(result.success).toBe(false);
  });

  it("menerima semua icon valid dari ICON_CATEGORIES.services", () => {
    for (const icon of ICON_CATEGORIES.services) {
      const result = serviceSchema.safeParse({ ...validService, icon });
      expect(result.success).toBe(true);
    }
  });

  it("menolak title kosong", () => {
    const result = serviceSchema.safeParse({ ...validService, title: "" });
    expect(result.success).toBe(false);
  });

  it("menolak description kosong", () => {
    const result = serviceSchema.safeParse({
      ...validService,
      description: "",
    });
    expect(result.success).toBe(false);
  });

  it("menolak sortOrder float", () => {
    const result = serviceSchema.safeParse({
      ...validService,
      sortOrder: 1.1,
    });
    expect(result.success).toBe(false);
  });

  it("menolak sortOrder bertipe string", () => {
    const result = serviceSchema.safeParse({
      ...validService,
      sortOrder: "3",
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================
// sectionHeadingSchema
// ============================================================
describe("sectionHeadingSchema", () => {
  const validHeading = {
    key: "about",
    eyebrow: "Company Profile",
    title: "About LEXA",
  };

  it("menerima data section heading yang valid", () => {
    const result = sectionHeadingSchema.safeParse(validHeading);
    expect(result.success).toBe(true);
  });

  it("menolak key kosong", () => {
    const result = sectionHeadingSchema.safeParse({ ...validHeading, key: "" });
    expect(result.success).toBe(false);
  });

  it("menolak eyebrow kosong", () => {
    const result = sectionHeadingSchema.safeParse({
      ...validHeading,
      eyebrow: "",
    });
    expect(result.success).toBe(false);
  });

  it("menolak title kosong", () => {
    const result = sectionHeadingSchema.safeParse({
      ...validHeading,
      title: "",
    });
    expect(result.success).toBe(false);
  });
});

// ============================================================
// Upload image — validasi file (unit test murni tanpa browser)
//
// Catatan implementasi:
//   Komponen ImageUpload (/components/admin/image-upload.tsx) dan
//   API route /api/upload/route.ts TIDAK mendefinisikan batas ukuran file
//   maksimum secara eksplisit.
//
//   - Sisi client: input accept="image/*" hanya menyaring berdasarkan MIME type.
//     Tidak ada pemeriksaan file.size di handleFileChange().
//   - Sisi server: /api/upload/route.ts menerima file apapun yang valid sebagai File,
//     lalu langsung di-stream ke Cloudinary tanpa pemeriksaan ukuran.
//   - Cloudinary sendiri memiliki batas 10MB untuk upload tidak bertanda tangan (unsigned)
//     dan 100MB untuk upload bertanda tangan (signed), namun ini ditangani Cloudinary,
//     bukan kode aplikasi.
//
//   GAP: Tidak ada validasi ukuran file di sisi aplikasi (client maupun server).
//   Test batas ukuran file tidak bisa dibuat berdasarkan implementasi yang ada.
//
// Yang bisa diuji secara unit:
//   - MIME type filtering (accept="image/*") — hanya bisa diuji di E2E browser
//   - Logika handleFileChange (membutuhkan DOM + fetch mock) — bisa di unit test
//     dengan vi.stubGlobal untuk fetch, namun hanya menguji flow fungsi bukan ukuran.
// ============================================================
describe("Upload image — GAP dokumentasi", () => {
  it("DOKUMENTASI GAP: tidak ada validasi ukuran file di kode aplikasi", () => {
    // Implementasi di /components/admin/image-upload.tsx:
    //   async function handleFileChange(e) {
    //     const file = e.target.files?.[0];
    //     if (!file) return;   // hanya cek null/undefined, bukan ukuran
    //     ...stream to /api/upload...
    //   }
    //
    // Implementasi di /app/api/upload/route.ts:
    //   const file = formData.get("file") as File | null;
    //   if (!file) return 400;   // hanya cek null, bukan ukuran
    //   ...upload ke Cloudinary...
    //
    // Limit Cloudinary: 10MB (unsigned), 100MB (signed) — diluar kontrol aplikasi.
    // Tidak ada angka batas di kode — tidak ada angka yang bisa ditest.
    expect(true).toBe(true); // Placeholder untuk dokumentasi
  });

  it("DOKUMENTASI: accept='image/*' hanya menyaring MIME type di sisi browser", () => {
    // Input file di image-upload.tsx: accept="image/*"
    // Ini adalah HTML5 hint untuk file picker, bukan validasi sesungguhnya.
    // User bisa bypass dengan drag-and-drop atau programmatic file assignment.
    // Validasi MIME type seharusnya dilakukan di server (route.ts) namun tidak ada.
    expect(true).toBe(true); // Placeholder untuk dokumentasi
  });
});
