-- DropIndex
DROP INDEX "Follow_user_id_comic_id_key";

-- DropIndex
DROP INDEX "Views_user_id_chapter_id_key";

-- AlterTable
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_pkey" PRIMARY KEY ("user_id", "comic_id");

-- AlterTable
ALTER TABLE "Views" ADD CONSTRAINT "Views_pkey" PRIMARY KEY ("user_id", "chapter_id");
