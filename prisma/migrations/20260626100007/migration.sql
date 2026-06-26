-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "SiteSetting" ADD COLUMN     "heroImageUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT;

-- AlterTable
ALTER TABLE "Testimonial" ADD COLUMN     "avatarUrl" TEXT;
