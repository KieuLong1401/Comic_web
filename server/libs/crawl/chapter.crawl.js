const Prisma = require('@prisma/client')
const imageCrawl = require('./image.crawl')

const prisma = new Prisma.PrismaClient()

module.exports = async (comic_id, chapterList) => {
    for (let i = chapterList.length - 1; i >= 0; i--) {
        const chap_order = chapterList.length - i
        setTimeout(async () => {
            try {
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
                    imageCrawl(
                        chapter.id,
                        chapterList
                            .eq(chap_order - 1)
                            .find('a')
                            .attr('href')
                    )
                } else {
                    imageCrawl(
                        duplicated.id,
                        chapterList
                            .eq(chap_order - 1)
                            .find('a')
                            .attr('href')
                    )
                }
            } catch (err) {
                throw err.message
            }
        }, 1000)
    }
}
