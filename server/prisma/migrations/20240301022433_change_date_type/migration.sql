-- AlterTable
ALTER TABLE "Chapters" ALTER COLUMN "uploaded_time" SET DATA TYPE TIMESTAMPTZ(3);

-- AlterTable
ALTER TABLE "Comments" ALTER COLUMN "uploaded_time" SET DATA TYPE TIMESTAMPTZ(3);
