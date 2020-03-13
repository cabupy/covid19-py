const http = require('http')
const bodyParser = require('body-parser')
const volleyball = require('volleyball')
const cors = require('cors')
require('dotenv').config()
const express = require('express')
const app = express()

const { getCOVID19 } = require('./modules/scraping')

app.set('trust proxy', true)
app.set('strict routing', true)
app.set('case sensitive routing', true)
app.set('x-powered-by', false)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(
  cors({
    methods: ['HEAD', 'OPTIONS', 'GET', 'POST'],
    credentials: true,
    maxAge: 3600,
    preflightContinue: false,
  })
)
app.use(volleyball)
app.use((req, res, next) => {
  res.header('X-Powered-By', 'Vamyal S.A. <vamyal.com>')
  res.header(
    'X-Hello-Human',
    'Somos Vamyal, Escribinos a <contacto@vamyal.com>'
  )
  next()
})

app.get('/', async (req, res, next) => {
    try {
      const r = await getCOVID19();
      res.status(200).json(r);
    } catch (error) {
      console.log(`Error: ${error.message}`);
      res
        .status(500)
        .json({ message: `Ocurrio un error al buscar el dato.` });
    }
})

app.use('*', function(req, res, next) {
  res.status(200).json({
    success: true,
    message: `Vamyal S.A. 2020 ! -  API para CONSULTAR COVID19 - PY`,
  })
  next()
})

const ip = process.env.IP
const port = process.env.PORT

console.time('Arrancamos el server en')
var server = http.createServer(app).listen(port, ip, function() {
  console.log(
    `COVID19 PY API en http://${server.address().address}:${
      server.address().port
    }`
  )
})

process.on('unhandledRejection', (reason, p) => {
  console.log(`Unhandled Rejection at: ${p} reason: ${reason}`)
  process.exit(1)
})

process.on('uncaughtException', err => {
  console.error(`Caught exception: ${err}\n`)
  process.exit(1)
})
