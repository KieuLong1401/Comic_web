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
        const sort_by = req.query.sort_by
        const sort_type = req.query.sort_type
        const page_comic_num = parseInt(req.query.page_comic_num)

        try {
            const comics = await prisma.comics.findMany({
                where: {
                    categories: {
                        hasEvery: categories,
                    },
                },
                include: {
                    chapters: {
                        select: {
                            chap_num: true,
                            uploaded_time: true,
                        },
                        orderBy: {
                            chap_order: 'desc',
                        },
                        take: 3,
                    },
                },
                take: page_comic_num,
                skip: (page - 1) * page_comic_num || 0,
            })
            const comicsLastUploadedTime = await prisma.chapters.groupBy({
                by: ['comic_id'],
                _max: {
                    uploaded_time: true,
                },
                orderBy: {
                    _max: {
                        uploaded_time: 'desc',
                    },
                },
            })
            const comicsViews = await prisma.views.groupBy({
                by: ['comic_id'],
                _count: {
                    _all: true,
                },
            })
            const comicsAverageVote = await prisma.votes.groupBy({
                by: ['comic_id'],
                _avg: {
                    voted_point: true,
                },
            })

            var result = comics.map((comic) => {
                const views = comicsViews.find((e) => e.comic_id == comic.id)
                const vote = comicsAverageVote.find(
                    (e) => e.comic_id == comic.id
                )
                const uploaded_time = comicsLastUploadedTime.find(
                    (e) => e.comic_id == comic.id
                )._max.uploaded_time
                return {
                    ...comic,
                    uploaded_time,
                    views: views != undefined ? views._count._all : 0,
                    vote:
                        vote != undefined
                            ? vote._avg.voted_point.toFixed(1)
                            : 0,
                }
            })

            result = result.sort((comic1, comic2) => {
                return sort_type == 'desc'
                    ? comic2[sort_by] - comic1[sort_by]
                    : comic1[sort_by] - comic2[sort_by]
            })

            res.json(result)
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
