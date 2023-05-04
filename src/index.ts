import * as dotenv from 'dotenv'
dotenv.config()

import Fastify from 'fastify'
import { summaryFromLastEmail } from './scenario/summaryFromLastEmail'
import { summaryFromThread } from './scenario/summaryFromThread'
import { summaryFromAccount } from './scenario/summaryFromAccount'

import emails from "./emails.json"
import { rephrase } from './scenario/rephrase'
import { makeItShorter } from './scenario/makeItShorter'
import { suggestLabelFromThread } from './scenario/suggestLabelFromThread'

const scenarios = [
  {
    name: 'Make a summary from last email',
    exec: summaryFromLastEmail,
  },
  {
    name: 'Make a summary from thread',
    exec: summaryFromThread,
  },
  {
    name: 'Make a summary from account',
    exec: summaryFromAccount,
  },
  { 
    name: 'Reprahse an email',
    exec: rephrase,
  },
  {
    name: 'Shorten an email',
    exec: makeItShorter,
  },
  {
    name: 'Suggest a label from thread',
    exec: suggestLabelFromThread,
  }
]

const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  const html = `<!DOCTYPE html>
  <html>
  <body>
  <h1>ZEN-MODE playground</h1>
  <h2>Emails</h2>
  <pre>${JSON.stringify(emails, null, 2)}</pre>
  ${scenarios.map(scenario => '<h2>' + scenario.name + '</h2><p><button onClick="fetch(\'/execute?scenarioName='+scenario.name+'\').then(response => response.text()).then(text => {var div = document.getElementById(\''+scenario.name+'\');div.innerHTML = text;})")>Generate</button></p><p id="'+scenario.name+'"><p></p>')}
  </body>
  </html>`

  reply.type('text/html').send(html)
})

interface IQuerystring {
  scenarioName: string;
}

fastify.get<{
  Querystring: IQuerystring,
}>('/execute', async (request, reply) => {
  const { scenarioName } = request.query;
  const scenario = scenarios.find(scenario => scenario.name === scenarioName)
  
  let result = '';
  if(scenario) {
    result = await scenario.exec();
  } else {
    result = `Scenario ${scenarioName} not found`
  }

  reply.type('text/plain').send(result)
})

fastify.listen({ port: Number(process.env.PORT) || 8080 }, (err, address) => {
  if (err) throw err
})