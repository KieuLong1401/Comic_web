const getHtmlFromUrl = require('../getHtmlFromUrl')
const wait = require('../wait.js')
const comicInfoCrawl = require('./comic.crawl.js')

module.exports = async () => {
    const list = JSON.parse(process.env.CRAWL_COMICS)

    var comicInfoCrawlPromises = []

    setInterval(async () => {}, 1000 * 60 * 60)

    list.map(async (comic) => {
        const comic_id = comic
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .split(' ')
            .join('-')
        let $comic = await getHtmlFromUrl(
            (process.env.CRAWL_URL || 'https://www.nettruyenus.net/') +
                'truyen-tranh/' +
                comic_id
        )
        comicInfoCrawlPromises.push(comicInfoCrawl(comic_id, $comic))
    })

    await Promise.all(comicInfoCrawlPromises)
}
