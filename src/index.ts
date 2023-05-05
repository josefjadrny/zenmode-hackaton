import * as dotenv from 'dotenv'
dotenv.config()

import Fastify from 'fastify'
import emails from "./emails.json"
import { summaryFromLastEmail } from './scenario/summaryFromLastEmail'
import { summaryFromThread } from './scenario/summaryFromThread'
import { summaryFromAccount } from './scenario/summaryFromAccount'
import { emailListCategorisation } from './scenario/emailsCategorisation'
import { extractActionsDetails } from './scenario/extractActions'
import { urgencyType } from './scenario/urgencyType'
import { rephrase } from './scenario/rephrase'
import { makeItShorter } from './scenario/makeItShorter'
import { suggestLabelFromThread } from './scenario/suggestLabelFromThread'
import { translateToCzech } from './scenario/translateToLanguage'
import { translateToEstonian } from './scenario/translateToEstonian'

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
  },
  {
    name: 'Suggest an email category',
    exec: emailListCategorisation,
  },
  {
    name: 'Translate to Estonian language',
    exec: translateToEstonian,
  },
  {
    name: 'Translate to Czech language',
    exec: translateToCzech,
  },
  {
    name: 'Extract suggested activities',
    exec: extractActionsDetails,
  },
  {
    name: 'Prioritise this email by urgency',
    exec: urgencyType,
  },
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
  <textarea style="width: 100%; height: 500px;">${JSON.stringify(emails, null, 2)}</textarea>
  ${scenarios.map(scenario => '<h2>' + scenario.name + '</h2><p><button onClick="this.disabled=true;fetch(\'/execute?scenarioName='+scenario.name+'\').then(response => response.text()).then(text => {var div = document.getElementById(\''+scenario.name+'\');div.innerHTML = text;this.disabled=false;})")>Generate</button></p><p id="'+scenario.name+'"><p></p>')}
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
