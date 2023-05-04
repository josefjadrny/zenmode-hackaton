import * as dotenv from 'dotenv'
dotenv.config()

import Fastify from 'fastify'
import { summaryFromLastEmail } from './scenario/summaryFromLastEmail'

const fastify = Fastify({
  logger: true
})


fastify.get('/', async (request, reply) => {
  const results = await Promise.all([summaryFromLastEmail()])
  
  const html = `<!DOCTYPE html>
  <html>
  <body>
  <h1>ZEN-MODE playground</h1>
  ${results.map((result) => '<h2>' + result.name + '</h2><p>' + result.result + '</p>')}
  </body>
  </html>`

  reply.type('text/html').send(html)
})

fastify.listen({ port: Number(process.env.PORT) || 8080 }, (err, address) => {
  if (err) throw err
})