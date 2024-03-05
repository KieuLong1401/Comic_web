/*
  Warnings:

  - You are about to drop the `CommentsLike` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "JudgeType" AS ENUM ('LIKE', 'DISLIKE');

-- DropForeignKey
ALTER TABLE "CommentsLike" DROP CONSTRAINT "CommentsLike_comment_id_fkey";

-- DropForeignKey
ALTER TABLE "CommentsLike" DROP CONSTRAINT "CommentsLike_user_id_fkey";

-- DropTable
DROP TABLE "CommentsLike";

-- CreateTable
CREATE TABLE "CommentsJudge" (
    "comment_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "type" "JudgeType" NOT NULL,

    CONSTRAINT "CommentsJudge_pkey" PRIMARY KEY ("comment_id","user_id")
);

-- AddForeignKey
ALTER TABLE "CommentsJudge" ADD CONSTRAINT "CommentsJudge_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comments"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentsJudge" ADD CONSTRAINT "CommentsJudge_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
