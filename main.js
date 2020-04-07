require("dotenv").config()
const express = require("express")
const app = express()
const port = process.env.PORT || 3000

app.use(express.static('src'))
app.use(express.static('build/contracts'))


app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/src/index.html`)
})


app.get('/faq', (req, res) => {
  res.sendFile(`${__dirname}/src/faq.html`)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

