import { ScenarioResult } from ".."
import { openai } from "../openai"
import emails from "../emails.json"

export const summaryFromLastEmail = async (): Promise<ScenarioResult> => {
    let result = ''

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                { "role": "user", "content": "I need to summarize an email." },
                { "role": "assistant", "content": "Sure, please provide me with the email." },
                { "role": "user", "content": emails[6].body },
            ]
        })

        result = completion.data.choices[0].message.content
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
        result = error.message
    }

    return { name: 'Make a summary from last email', result }
} 