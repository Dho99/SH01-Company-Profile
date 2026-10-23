import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { blogPostSchema } from "@/lib/cms/schemas";
import { slugify } from "@/lib/slug";
import { revalidateCms } from "@/lib/cms/revalidate";

async function uniqueSlug(base: string, excludeId: string) {
    let slug = slugify(base);
    let candidate = slug;
    let i = 2;
    while (true) {
        const exists = await prisma.blogPost.findUnique({ where: { slug: candidate } });
        if (!exists || exists.id === excludeId) break;
        candidate = `${slug}-${i++}`;
    }
    return candidate;
}

export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        const raw = (await request.json()) as Record<string, unknown>;
        if (raw.imageUrl === "") raw.imageUrl = null;
        const parsed = blogPostSchema.safeParse(raw);
        if (!parsed.success) {
            const fieldErrors = parsed.error.flatten().fieldErrors;
            const message = Object.entries(fieldErrors)
                .flatMap(([f, msgs]) => (msgs as string[]).map((m) => `${f}: ${m}`))
                .join("; ");
            return NextResponse.json({ error: message || "Validation failed" }, { status: 400 });
        }
        const { publishedAt, ...rest } = parsed.data as { publishedAt: string } & Record<string, unknown>;
        const slug =
            (rest.slug as string) || (rest.title ? await uniqueSlug(rest.title as string, id) : undefined);
        const updated = await prisma.blogPost.update({
            where: { id },
            data: { ...(rest as object), ...(slug ? { slug } : {}), publishedAt: new Date(publishedAt) } as never,
        });
        revalidateCms("blog-posts");
        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        console.error("[PUT /api/cms/blog-posts/:id]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    try {
        const { id } = await params;
        await prisma.blogPost.delete({ where: { id } });
        revalidateCms("blog-posts");
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("[DELETE /api/cms/blog-posts/:id]", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
