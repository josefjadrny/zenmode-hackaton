import { openai } from "../openai"

export const summaryFromLastEmail = async(): Promise<{name: string, result: string}> => {
    return {name: summaryFromLastEmail.name, result:Math.random().toString()}
} 