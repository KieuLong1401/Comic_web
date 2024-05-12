const Prisma = require('@prisma/client')

const prisma = new Prisma.PrismaClient()

module.exports = {
    async getList(req, res) {
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
    async getId(req, res) {
        try {
            const comic_id = req.query.comicId
            const chap_order = parseInt(req.query.chapOrder)

            const result = await prisma.chapters.findFirst({
                select: {
                    id: true,
                },
                where: {
                    comic_id,
                    chap_order,
                },
            })

            res.json(result.id)
        } catch (e) {
            console.error(e)
        }
    },
}
