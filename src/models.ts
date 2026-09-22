import { OpenAIClient } from "@anvia/openai";



const client  =  new OpenAIClient({
    apiKey: process.env.OPENAI_API_KEY!,
    baseUrl: process.env.OPENAI_BASE_URL,
});

export const getModel = (modelId?: string) => {
    return client.completionModel({
        modelId: modelId || "gpt-5.6-luna"
    })
}