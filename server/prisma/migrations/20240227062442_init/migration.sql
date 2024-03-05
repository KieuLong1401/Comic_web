-- CreateTable
CREATE TABLE "Comics" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "other_title" TEXT,
    "comic_image_src" TEXT NOT NULL,
    "author" TEXT,
    "categories" TEXT[],
    "story_line" TEXT,

    CONSTRAINT "Comics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Chapters" (
    "id" SERIAL NOT NULL,
    "chap_order" INTEGER NOT NULL,
    "chap_num" DOUBLE PRECISION NOT NULL,
    "uploaded_time" TIMESTAMP(3) NOT NULL,
    "comic_id" INTEGER NOT NULL,

    CONSTRAINT "Chapters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Images" (
    "id" SERIAL NOT NULL,
    "image_src" TEXT NOT NULL,
    "image_order" INTEGER NOT NULL,
    "chapter_id" INTEGER NOT NULL,

    CONSTRAINT "Images_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Users" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Views" (
    "user_id" INTEGER NOT NULL,
    "chapter_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Follow" (
    "user_id" INTEGER NOT NULL,
    "comic_id" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Comments" (
    "id" SERIAL NOT NULL,
    "content" TEXT NOT NULL,
    "uploaded_time" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,
    "chapter_id" INTEGER NOT NULL,
    "parent_comment_id" INTEGER,

    CONSTRAINT "Comments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentsLike" (
    "comment_id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "CommentsLike_pkey" PRIMARY KEY ("comment_id","user_id")
);

-- CreateTable
CREATE TABLE "Votes" (
    "voted_point" DOUBLE PRECISION NOT NULL,
    "user_id" INTEGER NOT NULL,
    "comic_id" INTEGER NOT NULL,

    CONSTRAINT "Votes_pkey" PRIMARY KEY ("user_id","comic_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Views_user_id_chapter_id_key" ON "Views"("user_id", "chapter_id");

-- CreateIndex
CREATE UNIQUE INDEX "Follow_user_id_comic_id_key" ON "Follow"("user_id", "comic_id");

-- AddForeignKey
ALTER TABLE "Chapters" ADD CONSTRAINT "Chapters_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "Comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Images" ADD CONSTRAINT "Images_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Views" ADD CONSTRAINT "Views_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Follow" ADD CONSTRAINT "Follow_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "Comics"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_chapter_id_fkey" FOREIGN KEY ("chapter_id") REFERENCES "Chapters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comments" ADD CONSTRAINT "Comments_parent_comment_id_fkey" FOREIGN KEY ("parent_comment_id") REFERENCES "Comments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentsLike" ADD CONSTRAINT "CommentsLike_comment_id_fkey" FOREIGN KEY ("comment_id") REFERENCES "Comments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentsLike" ADD CONSTRAINT "CommentsLike_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Votes" ADD CONSTRAINT "Votes_comic_id_fkey" FOREIGN KEY ("comic_id") REFERENCES "Comics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
