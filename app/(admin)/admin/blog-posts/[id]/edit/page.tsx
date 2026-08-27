import { prisma } from "@/lib/db";
import { BlogPostForm } from "../../blog-post-form";

export default async function EditBlogPostPage({
    params,
}: {
    params: Promise<{ id: string }>;
}) {
    const { id } = await params;
    const item = await prisma.blogPost.findUnique({ where: { id } });
    if (!item) return <div>Not found</div>;
    return <BlogPostForm defaultValues={item as never} />;
}
