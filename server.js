const PORT = process.env.PORT || 8080
const REDIRECT_URL = process.env.REDIRECT_URL

if (!REDIRECT_URL) throw new Error(`REDIRECT_URL not defined`)

const express = require('express')

const app = express()

console.log(`redirecting / to ${REDIRECT_URL}`)

app.get('/', (req, res) => {
  console.log(`redirecting`)
  res.redirect(REDIRECT_URL)
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))