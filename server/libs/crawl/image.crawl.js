const getHtmlFromUrl = require('../getHtmlFromUrl')
const Prisma = require('@prisma/client')

const prisma = new Prisma.PrismaClient()

module.exports = async (chapter_id, chapUrl) => {
    const $chapter = await getHtmlFromUrl(chapUrl)
    const imageList = $chapter('img', '.page-chapter')

    imageList.each(async (image_order, image) => {
        setTimeout(async () => {
            try {
                const image_src = image.attribs['data-src']

                const duplicated = await prisma.images.findFirst({
                    where: {
                        chapter_id,
                        image_order,
                    },
                })
                if (!duplicated) {
                    console.log(image_src)
                    // const image = await prisma.images.create({
                    //     data: {
                    //         image_src,
                    //         image_order,
                    //         chapter_id,
                    //     },
                    // })
                }
            } catch (err) {
                throw err.message
            }
        }, 1000 * image_order)
    })
}
