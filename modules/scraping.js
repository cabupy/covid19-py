const r = require('request')
const cheerio = require('cheerio')

const op = {
  rejectUnauthorized: false,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  url: null,
}

// request and return html object
const rh = url => {
  return new Promise((resolve, reject) => {
    op.url = url
    r(op, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        resolve(html)
      } else {
        resolve('')
      }
    })
  })
}

const getCOVID19 = async () => {
  const url = `https://www.mspbs.gov.py/covid-19.php`
  try {
    const html = await rh(url)
    const $ = cheerio.load(html)

    const cantidad = +$('div > h4 > font')[0]
      .children[0].data.trim()
      .replace('CONTADOR OFICIAL COVID-19 EN PARAGUAY:', '')

    return { cantidad }
  } catch (error) {
    console.log(error.message)
    return { cantidad: 0 }
  }
}

module.exports = {
  getCOVID19,
}
