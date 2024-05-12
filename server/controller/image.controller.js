const Prisma = require('@prisma/client')

const prisma = new Prisma.PrismaClient()

module.exports = {
    async getList(req, res) {
        try {
            const chapter_id = parseInt(req.query.chapterId)

            const result = await prisma.images.findMany({
                where: {
                    chapter_id: chapter_id,
                },
                orderBy: {
                    image_order: 'asc',
                },
            })

            res.json(result)
        } catch (e) {
            console.error(e.message)
        }
    },
}
