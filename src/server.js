import express from 'express'
import path from 'path'
import limiter from './config/rateLimit.js'
import logger from './config/logger.js'

const app = express()
const port = 8080

app.set('trust proxy', true)
app.use(express.json())
app.use(limiter)
app.use(express.static(path.resolve('public')))

app.use((req,res,next)=>{
  console.log('----')
  console.log('IP do cliente:', req.ip)
  console.log('X-Forwarded-For:', req.headers['x-forwarded-for'])
  console.log('----')
  res.sendFile(path.resolve('public','notFoundRote.html'))
})

app.use((err,req,res,next)=>{
  logger.warn(err)
  res.sendFile(path.resolve('public','error.html'))
}) 

const server = app.listen(port, '0.0.0.0',() => {
  console.log(`Geradora de Numeros rodando `)
})

process.on('uncaughtException', (err) => {
  logger.fatal(err, ' - EXCECAO NAO DETECTADA')
  server.close(() => {
    process.exit(1)
  })

  setTimeout(() => {
    process.abort()
  }, 1000).unref()
})

