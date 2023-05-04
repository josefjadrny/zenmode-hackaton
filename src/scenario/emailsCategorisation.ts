import { openai } from "../openai"
import emails from "../emails.json"

export const emailListCategorisation = async (): Promise<string> => {
    let result = ''

    try {
        const completion = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "user", "content": "Classify emails based on pre-defined topics for classify emails based on there relation to sales process: lead, prospect, new request, ongoing customer, advertisment, spam, fraud, transactional, internal, deal, sales potential"},
                {"role": "assistant", "content": "Sure, please provide me with the email conversation."},
                { "role": "user", "content": emails[9].body },
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

    return result
} 
