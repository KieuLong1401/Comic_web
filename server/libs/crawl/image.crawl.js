const getHtmlFromUrl = require('../getHtmlFromUrl')
const Prisma = require('@prisma/client')

const prisma = new Prisma.PrismaClient()

module.exports = (chapter_id, chapUrl) => {
    return new Promise(async (resolve, reject) => {
        try {
            const $chapter = await getHtmlFromUrl(
                `https://www.nettruyenca.com${chapUrl}`
            )
            const imageList = $chapter('div>img')
            for (let i = 0; i < imageList.length; i++) {
                const image_order = i
                const image_src = imageList[i].attribs['alt']

                const duplicated = await prisma.images.findFirst({
                    where: {
                        chapter_id,
                        image_order,
                    },
                })

                if (!duplicated) {
                    const image = await prisma.images.create({
                        data: {
                            image_src,
                            image_order,
                            chapter_id,
                        },
                    })
                }

                resolve()
            }
        } catch (err) {
            reject(err)
        }
    })
}
