const PORT = process.env.PORT || 8080
const REDIRECT_URL = process.env.REDIRECT_URL
const code = Number(process.env.STATUS_CODE || 302)

if (![302, 301, 307, 308].includes(code)) {
  throw new Error(`STATUS_CODE, if defined, must be either 302 or 301`)
}

if (!REDIRECT_URL) throw new Error(`REDIRECT_URL not defined`)

const express = require('express')
const { URL } = require("url")

const app = express()

console.log(`redirecting / to ${REDIRECT_URL}`)

app.disable('x-powered-by')

app.get('*', (req, res) => {
  const { path, query } = req
  const url = new URL(REDIRECT_URL.replace(/\/+$/, '') + path)
  for (const key in query) {
    url.searchParams.set(key, query[key])
  }
  res.redirect(code, url)
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))