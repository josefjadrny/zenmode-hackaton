import { ScenarioResult } from ".."
import { openai } from "../openai"
import emails from "../emails.json"
import { ChatCompletionRequestMessage } from "openai"

export const summaryFromThread = async (): Promise<ScenarioResult> => {
    let result = ''

    try {
        const messages = [
            { "role": "user", "content": "I need to summarize an email conversation." },
            { "role": "assistant", "content": "Sure, please provide me all the emails in the conversation." },
        ] as ChatCompletionRequestMessage[]

        emails.forEach(email => { 
            messages.push({ "role": "user", "content": `Message sent from ${email.from === 'ted.dillan@mcg.com' ? 'me' : email.from} to ${email.to === 'ted.dillan@mcg.com' ? 'me' : email.to}: ${email.body}` })
        })

        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages
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

    return { name: 'Make a summary from thread', result }
} 