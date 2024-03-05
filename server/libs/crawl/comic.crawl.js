const Prisma = require('@prisma/client')
const chapterCrawl = require('./chapter.crawl')

const prisma = new Prisma.PrismaClient()

module.exports = async (id, $comic) => {
    const chapterList = $comic('.chapter', '.list-chapter')

    const comicDuplicated = await prisma.comics.findUnique({
        where: {
            id,
        },
    })
    if (!comicDuplicated) {
        let title = $comic('.title-detail', '#item-detail')
            .contents()
            .first()
            .text()
        let comic_image_src = $comic('.col-image>img').attr('src')
        let author = $comic('p', '.author').eq(1).text()
        let storyline = $comic('.detail-content>.about').eq(0).text()
        let other_title = $comic('.othername>.other-name').text() || null
        let categories = []
        $comic('a', '.kind').map((i, e) =>
            categories.push($comic(e).text().toLowerCase())
        )

        const comic = await prisma.comics.create({
            data: {
                id,
                title,
                other_title,
                comic_image_src,
                author,
                categories,
                storyline,
            },
        })
        chapterCrawl((await comic).id, chapterList)
    } else {
        chapterCrawl(comicDuplicated.id, chapterList)
    }
}
