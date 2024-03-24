const Prisma = require('@prisma/client')
const imageCrawl = require('./image.crawl')

const prisma = new Prisma.PrismaClient()

module.exports = (comic_id, chapterList) => {
    return new Promise(async (resolve, reject) => {
        try {
            var imageCrawlPromises = []

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
                        chapterList.eq(i).find('a').text().split(' ')[1]
                    )

                    const chapter = await prisma.chapters.create({
                        data: {
                            comic_id,
                            chap_order,
                            chap_num,
                        },
                    })
                    imageCrawlPromises.push(
                        imageCrawl(
                            chapter.id,
                            chapterList
                                .eq(chap_order - 1)
                                .find('a')
                                .attr('href')
                        )
                    )
                } else {
                    imageCrawlPromises.push(
                        imageCrawl(
                            duplicated.id,
                            chapterList
                                .eq(chap_order - 1)
                                .find('a')
                                .attr('href')
                        )
                    )
                }
            }

            await Promise.all(imageCrawlPromises)

            resolve()
        } catch (err) {
            reject(err)
        }
    })
}
