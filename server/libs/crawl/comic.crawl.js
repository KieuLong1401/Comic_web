const Prisma = require('@prisma/client')
const chapterCrawl = require('./chapter.crawl')

const prisma = new Prisma.PrismaClient()

module.exports = (id, $comic) => {
    return new Promise(async (resolve, reject) => {
        try {
            const chapterList = $comic('li.table-v2-row>div>a')
            const comicDuplicated = await prisma.comics.findUnique({
                where: {
                    id,
                },
            })

            if (!comicDuplicated) {
                let title = $comic('h1').text()
                let comic_image_src = `${$comic('section>div>div>div>img').attr(
                    'src'
                )}`
                let author = null
                let storyline = $comic('section>div>div>div.relative').text()
                let categories = []
                $comic('li>p>a').map((i, e) => {
                    if ($comic(e).text() == '') return
                    categories.push($comic(e).text().toLowerCase())
                })

                const comic = await prisma.comics.create({
                    data: {
                        id,
                        title,
                        other_title: null,
                        comic_image_src,
                        author,
                        categories,
                        storyline,
                    },
                })

                await chapterCrawl(comic.id, chapterList)

                resolve()
            } else {
                await chapterCrawl(comicDuplicated.id, chapterList)
                resolve()
            }
        } catch (err) {
            reject(err)
        }
    })
}
