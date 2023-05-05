import * as dotenv from "dotenv";
dotenv.config();

import Fastify from "fastify";
import { scenarios } from "./scenarios";
import emails from "./emails.json";
import templates from "./templates.json";

const fastify = Fastify({
  logger: true,
});

fastify.get("/", async (request, reply) => {
  const html = `<!DOCTYPE html>
  <html>
  <body>
  <h1>ZEN-MODE playground</h1>
  <h2>User's emails</h2>
  <textarea style="width: 100%; height: 500px;">${JSON.stringify(
    emails,
    null,
    2
  )}</textarea>
  <h2>User's templates</h2>
  <textarea style="width: 100%; height: 300px;">${JSON.stringify(
    templates,
    null,
    2
  )}</textarea>
  ${scenarios
    .map(
      (scenario) =>
        "<h2>" +
        scenario.name +
        "</h2><p><strong>Input data</strong></p><p>" +
        scenario.input +
        '</p><p><button style="padding: 5px;" onClick="this.disabled=true;fetch(\'/execute?scenarioName=' +
        scenario.name +
        "').then(response => response.text()).then(text => {var div = document.getElementById('" +
        scenario.name +
        '\');div.innerHTML = text;this.disabled=false;})")>Generate</button></p><p id="' +
        scenario.name +
        '"></p><hr>'
    )
    .join("")}
  </body>
  </html>`;

  reply.type("text/html").send(html);
});

interface IQuerystring {
  scenarioName: string;
}

fastify.get<{
  Querystring: IQuerystring;
}>("/execute", async (request, reply) => {
  const { scenarioName } = request.query;
  const scenario = scenarios.find((scenario) => scenario.name === scenarioName);

  let result = "";
  if (scenario) {
    result = await scenario.exec();
  } else {
    result = `Scenario ${scenarioName} not found`;
  }

  reply.type("text/plain").send(result);
});

fastify.listen({ port: Number(process.env.PORT) || 8080 }, (err, address) => {
  if (err) throw err;
});
