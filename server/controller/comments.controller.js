const Prisma = require('@prisma/client')

const prisma = new Prisma.PrismaClient()

module.exports = {
    async post(req, res) {
        try {
            const {comment} = req.body

            console.log(comment)
            // const comic = await prisma.comments.create({
            //     data: {
            //         content: comment
            //     }
            // })
        } catch(err) {
            console.error(err)
        }

    },
}