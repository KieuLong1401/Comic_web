/*
  Warnings:

  - The primary key for the `Comics` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `story_line` on the `Comics` table. All the data in the column will be lost.
  - The primary key for the `Votes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[title]` on the table `Comics` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Chapters" DROP CONSTRAINT "Chapters_comic_id_fkey";

-- DropForeignKey
ALTER TABLE "Follow" DROP CONSTRAINT "Follow_comic_id_fkey";

-- DropForeignKey
ALTER TABLE "Views" DROP CONSTRAINT "Views_comic_id_fkey";

-- DropForeignKey
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_comic_id_fkey";

-- AlterTable
ALTER TABLE "Chapters" ALTER COLUMN "comic_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Comics" DROP CONSTRAINT "Comics_pkey",
DROP COLUMN "story_line",
ADD COLUMN     "storyline" TEXT,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Comics_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Comics_id_seq";

-- AlterTable
ALTER TABLE "Follow" ALTER COLUMN "comic_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Views" ALTER COLUMN "comic_id" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Votes" DROP CONSTRAINT "Votes_pkey",
ALTER COLUMN "comic_id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Votes_pkey" PRIMARY KEY ("user_id", "comic_id");

-- CreateIndex
CREATE UNIQUE INDEX "Comics_title_key" ON "Comics"("title");

-- AddForeignKey
ALTER TABLE "Chapters" ADD CONSTRAINT "Chapters_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "Comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "Comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "Comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "Comics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
