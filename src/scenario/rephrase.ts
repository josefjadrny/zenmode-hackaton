import { ScenarioResult } from ".."
import { openai } from "../openai"
import emails from "../emails.json"
import { ChatCompletionRequestMessage } from "openai"

export const rephrase = async (): Promise<ScenarioResult> => {
    let result = ''

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "user", "content": "I need to rephrase an email." },
                { "role": "assistant", "content": "Sure, please provide me with the email." },
                { "role": "user", "content": emails[0].body },
            ]
        })

        result = completion.data.choices[0].message.content
    } catch (error) {
        if (error.response) {
            console.log(error.response);
        } else {
            console.log(error.message);
        }
        result = error.message
    }

    return { name: 'Reprahse an email', result }
} 