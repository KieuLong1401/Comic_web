const cheerio = require('cheerio')
const axios = require('axios')

module.exports = async (url) => {
    const page = await axios.get(url)
    return cheerio.load(page.data)
}
