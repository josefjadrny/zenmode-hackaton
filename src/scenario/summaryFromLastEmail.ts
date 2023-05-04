import { ScenarioResult } from ".."
import { openai } from "../openai"
import emails from "../emails.json"

export const summaryFromLastEmail = async(): Promise<ScenarioResult> => {
    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [
              {"role": "user", "content": "I need to summarize an email conversation."},
              {"role": "assistant", "content": "Sure, please provide me with the email conversation."},
              {"role": "user", "content": emails[0].body},
          ]
        })

    return {name: 'Summary from last email', result: completion.data.choices[0].message.content}
} 