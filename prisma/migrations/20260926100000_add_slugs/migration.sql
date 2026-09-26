ALTER TABLE "Service" ADD COLUMN "slug" TEXT;
ALTER TABLE "Project" ADD COLUMN "slug" TEXT;
ALTER TABLE "BlogPost" ADD COLUMN "slug" TEXT;

UPDATE "Service" SET "slug" = lower(regexp_replace(regexp_replace("title", '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g')) || '-' || substr("id", 1, 6) WHERE "slug" IS NULL;
UPDATE "Project" SET "slug" = lower(regexp_replace(regexp_replace("title", '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g')) || '-' || substr("id", 1, 6) WHERE "slug" IS NULL;
UPDATE "BlogPost" SET "slug" = lower(regexp_replace(regexp_replace("title", '[^a-zA-Z0-9]+', '-', 'g'), '(^-|-$)', '', 'g')) || '-' || substr("id", 1, 6) WHERE "slug" IS NULL;

ALTER TABLE "Service" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "Project" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "BlogPost" ALTER COLUMN "slug" SET NOT NULL;

CREATE UNIQUE INDEX "Service_slug_key" ON "Service"("slug");
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
CREATE UNIQUE INDEX "BlogPost_slug_key" ON "BlogPost"("slug");
