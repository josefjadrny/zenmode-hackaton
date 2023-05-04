import * as dotenv from 'dotenv'
dotenv.config()

import Fastify from 'fastify'
import { summaryFromLastEmail } from './scenario/summaryFromLastEmail'
import { summaryFromThread } from './scenario/summaryFromThread'
import emails from "./emails.json"


const fastify = Fastify({
  logger: true
})

export type ScenarioResult = {
  name: string,
  result: string,
}

fastify.get('/', async (request, reply) => {
  const results = await getResults()

  const html = `<!DOCTYPE html>
  <html>
  <body>
  <h1>ZEN-MODE playground</h1>
  <h2>Emails</h2>
  <pre>${JSON.stringify(emails, null, 2)}</pre>
  ${results.map((result) => '<h2>' + result.name + '</h2><p>' + result.result + '</p>')}
  </body>
  </html>`

  reply.type('text/html').send(html)
})

fastify.listen({ port: Number(process.env.PORT) || 8080 }, (err, address) => {
  if (err) throw err
})

const getResults = async () => {
  return await Promise.all([
    summaryFromLastEmail(),
    summaryFromThread()
  ])
}