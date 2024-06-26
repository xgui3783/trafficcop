const PORT = process.env.PORT || 8080
const REDIRECT_URL = process.env.REDIRECT_URL
const code = Number(process.env.STATUS_CODE || 302)
const CORS = process.env.CORS
const DONOT_FOLLOW_PATH = process.env.DONOT_FOLLOW_PATH

if (![302, 301, 307, 308].includes(code)) {
  throw new Error(`STATUS_CODE, if defined, must be either 302 or 301`)
}

if (!REDIRECT_URL) throw new Error(`REDIRECT_URL not defined`)

const express = require('express')
const { URL } = require("url")

const app = express()

console.log(`redirecting / to ${REDIRECT_URL}`)

app.disable('x-powered-by')

if (CORS) {
  const cors = require("cors")
  app.use(cors())
}

const redirectHtml = url => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redirecting ... </title>
</head>
<body>
    Redirecting to ${JSON.stringify(url)}
</body>
<script>
    window.location.replace(${JSON.stringify(url)})
</script>
</html>
`

app.get('*', (req, res) => {
  if (DONOT_FOLLOW_PATH) {
    res.setHeader("content-type", "text/html; charset=utf-8")
    res.send(redirectHtml(REDIRECT_URL))
    return
  }
  const { path, query, headers, hostname } = req
  const url = new URL(REDIRECT_URL.replace(/\/+$/, '') + path)
  console.log(`Redirecting to ${REDIRECT_URL} - ${headers.referer} - ${hostname} - ${path}`)
  for (const key in query) {
    url.searchParams.set(key, query[key])
  }
  res.redirect(code, url)
})

app.listen(PORT, () => console.log(`listening on port ${PORT}`))