const PORT = process.env.PORT || 8080
const REDIRECT_URL = process.env.REDIRECT_URL

if (!REDIRECT_URL) throw new Error(`REDIRECT_URL not defined`)

const express = require('express')
const { URL } = require("url")

const app = express()

console.log(`redirecting / to ${REDIRECT_URL}`)

app.get('*', (req, res) => {
  const { path, query } = req
  const url = new URL(REDIRECT_URL.replace(/\/+$/, '') + path)
  for (const key in query) {
    url.searchParams.set(key, query[key])
  }
  res.redirect(url)
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))