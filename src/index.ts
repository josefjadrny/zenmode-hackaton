import * as dotenv from 'dotenv'
import { Configuration, OpenAIApi } from 'openai'
import Fastify from 'fastify'

dotenv.config()
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

const openai = new OpenAIApi(configuration);

const fastify = Fastify({
  logger: true
})

fastify.get('/', async (request, reply) => {
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: "Hello world",
  });
  reply.send(completion.data.choices[0].text)
})

fastify.listen({ port: Number(process.env.PORT) || 3030 }, (err, address) => {
  if (err) throw err
})

