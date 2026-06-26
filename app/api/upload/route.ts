import { NextResponse } from "next/server";
import { cloudinary } from "@/lib/cloudinary";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File | null;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const buffer = Buffer.from(await file.arrayBuffer());

        const result = await new Promise<{ secure_url: string; public_id: string }>(
            (resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: "lexa-cms", resource_type: "image" }, (error, result) => {
                        if (error || !result) reject(error ?? new Error("Upload failed"));
                        else resolve(result as { secure_url: string; public_id: string });
                    })
                    .end(buffer);
            },
        );

        return NextResponse.json({ url: result.secure_url, publicId: result.public_id });
    } catch (error) {
        console.error("[POST /api/upload]", error);
        const message = error instanceof Error ? error.message : "Upload failed";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
