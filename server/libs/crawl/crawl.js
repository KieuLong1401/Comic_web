const getHtmlFromUrl = require('../getHtmlFromUrl')
const comicInfoCrawl = require('./comic.crawl.js')

module.exports = async () => {
    const list = JSON.parse(process.env.CRAWL_COMICS)

    var comicInfoCrawlPromises = []

    setInterval(async () => {
        list.map(async (comic) => {
            try {
                const comic_id = comic
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                    .split(' ')
                    .join('-')

                let $comic = await getHtmlFromUrl(
                    (process.env.CRAWL_URL ||
                        'https://www.nettruyenfull.com/') +
                        'truyen-tranh/' +
                        comic_id
                )
                comicInfoCrawlPromises.push(comicInfoCrawl(comic_id, $comic))
            } catch (err) {
                console.error(err)
            }
        })
    }, 1000 * 60 * 60)

    await Promise.all(comicInfoCrawlPromises)
}
