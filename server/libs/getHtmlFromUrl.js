const cheerio = require('cheerio')
const axios = require('axios')

module.exports = async (url) => {
    const proxyUrl = `https://proxy.scrapeops.io/v1/?api_key=68b15988-3708-4baa-aee8-513b6e6a9a6a&url=${url}`

    try {
        const page = await axios.get(url, {
            delayed: true,
        })
        return cheerio.load(page.data)
    } catch (err) {
        console.log(err.message)
    }
}
