const Prisma = require('@prisma/client')
const imageCrawl = require('./image.crawl')

const prisma = new Prisma.PrismaClient()

module.exports = (comic_id, chapterList) => {
    return new Promise(async (resolve, reject) => {
        try {
            for (let i = chapterList.length - 1; i >= 0; i--) {
                const chap_order = chapterList.length - i
                const duplicated = await prisma.chapters.findFirst({
                    where: {
                        comic_id,
                        chap_order,
                    },
                })

                if (!duplicated) {
                    const chap_num = parseFloat(
                        chapterList.eq(i).text().split(' ')[1]
                    )

                    const chapter = await prisma.chapters.create({
                        data: {
                            comic_id,
                            chap_order,
                            chap_num,
                        },
                    })
                    await imageCrawl(chapter.id, chapterList.eq(i).attr('href'))
                } else {
                    await imageCrawl(
                        duplicated.id,
                        chapterList.eq(i).attr('href')
                    )
                }
            }
            resolve()
        } catch (err) {
            reject(err)
        }
    })
}
