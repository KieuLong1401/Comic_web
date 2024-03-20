const cheerio = require('cheerio')
const axios = require('axios')
const userAgent = require('random-useragent')
const https = require('https')

module.exports = async (url) => {
    const randomUserAgent = userAgent.getRandom()

    try{
        const page = await axios.request({
            method: 'GET',
            url: url,
            headers: {
              'User-Agent': randomUserAgent
            },
            httpsAgent: new https.Agent({
                rejectUnauthorized: false,
            })
        })
        return cheerio.load(page.data)
    } catch(err) {
        console.log(err)
    }

}
