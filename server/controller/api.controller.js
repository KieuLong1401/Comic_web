const Prisma = require('@prisma/client')

const prisma = new Prisma.PrismaClient()

BigInt.prototype.toJSON = () => {
    const int = Number.parseInt(this.toString())
    return int ?? this.toString()
}

module.exports = {
    async getComicDetail(req, res) {
        const id = req.params.id

        await prisma.comics
            .findUnique({
                where: {
                    id,
                },
            })
            .then((comic) => {
                res.json(comic)
            })
            .catch((err) => {
                console.error(err)
            })
    },
    async getComics(req, res) {
        const page = parseInt(req.query.page)
        const categories = JSON.parse(req.query.categories)
        const sortBy = req.query.sortBy
        const sortType = req.query.sortType
        const pageComicNum = req.query.pageComicNum

        try {
            const newestComic = await prisma.$queryRaw`
                SELECT c.id, c.title, c.comic_image_src, v.views, COALESCE(ROUND(vt.average_vote_point::decimal, 1), 0) AS average_vote_point, c.categories
                FROM "public"."Comics" c 
                LEFT JOIN (
                    SELECT MAX(uploaded_time) AS last_uploaded_time, comic_id
                    FROM "public"."Chapters"
                    GROUP BY comic_id
                ) ch 
                ON c.id = ch.comic_id
                LEFT JOIN (
                    SELECT COUNT(*) AS views, comic_id
                    FROM "public"."Views"
                    GROUP BY comic_id
                ) v
                ON c.id = v.comic_id
                LEFT JOIN (
                    SELECT AVG(voted_point) AS average_vote_point, comic_id
                    FROM "public"."Votes"
                    GROUP BY comic_id
                ) vt
                ON c.id = vt.comic_id
                WHERE c.categories @> ${categories}
                ORDER BY ch.last_uploaded_time desc
                OFFSET ${(page - 1) * 32}
                LIMIT 32
            `

            newestComic.forEach((result) => {
                result.views = Number(result.views)
                result.average_vote_point = parseFloat(
                    result.average_vote_point
                )
            })

            res.json(newestComic)
        } catch (err) {
            console.error(err)
        }
    },
    async getChapter(req, res) {
        const comic_id = req.params.comicId
        const limit = Number(req.query.limit)

        try {
            if (!limit) {
                const result = await prisma.chapters.findMany({
                    select: {
                        id: true,
                        chap_order: true,
                        chap_num: true,
                        uploaded_time: true,
                    },
                    where: {
                        comic_id: comic_id,
                    },
                    orderBy: {
                        chap_order: 'desc',
                    },
                })
                res.json(result)
            } else {
                const result = await prisma.chapters.findMany({
                    select: {
                        id: true,
                        chap_order: true,
                        chap_num: true,
                        uploaded_time: true,
                    },
                    where: {
                        comic_id: comic_id,
                    },
                    orderBy: {
                        chap_order: 'desc',
                    },
                    take: limit,
                })
                res.json(result)
            }
        } catch (err) {
            console.error(err)
        }
    },
}
