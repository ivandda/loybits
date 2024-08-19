import { NextRequest, NextResponse } from "next/server";
import { PineconeStore } from "@langchain/pinecone";
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { createStuffDocumentsChain } from "langchain/chains/combine_documents";

// Initialize Pinecone client
const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

// Initialize OpenAI embeddings
const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
});

interface ConversationExchange {
    role: 'human' | 'AI';
    content: string;
}

// Define hardcoded prompts
const prompts = {
    info: `You are an AI assistant for Loybits, a loyalty platform for small and medium-sized businesses. Use the following pieces of context to answer questions about Loybits. If you don't know the answer, just say that you don't know, don't try to make up an answer. Keep the answer concise and informative.

Previous conversation:
{conversationHistory}

Context information:
{context}

Question: {question}
Helpful Answer:`,

    business: `You are an AI assistant for Loybits, helping businesses with content generation, pricing decisions, product descriptions, and business ideas. Use the context provided, which includes data from other businesses using Loybits, to provide informed suggestions. If you don't have enough information, say so and provide general advice. Be creative but realistic in your suggestions.

Previous conversation:
{conversationHistory}

Context information:
{context}

Question: {question}
Helpful Answer:`
};

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            question,
            promptType,
            temperature = 0.7,
            maxTokens = 256,
            previousConversation = [] as ConversationExchange[]
        } = body;

        if (!question) {
            return NextResponse.json({ error: "Question is required" }, { status: 400 });
        }

        if (!promptType || !['info', 'business'].includes(promptType)) {
            return NextResponse.json({ error: "Valid promptType (info or business) is required" }, { status: 400 });
        }

        // Create PineconeStore instance
        const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
            pineconeIndex,
            maxConcurrency: 5,
        });

        // Create retriever
        const retriever = vectorStore.asRetriever();

        // Create LLM instance with custom parameters
        const llm = new ChatOpenAI({
            model: "gpt-3.5-turbo",
            temperature,
            maxTokens
        });

        const promptTemplate = PromptTemplate.fromTemplate(prompts[promptType as keyof typeof prompts]);

        // Format previous conversation
        const conversationHistory = previousConversation.map((exchange: ConversationExchange) =>
            `${exchange.role === 'human' ? 'Human' : 'AI'}: ${exchange.content}`
        ).join('\n');

        // Create RAG chain
        const ragChain = await createStuffDocumentsChain({
            llm,
            prompt: promptTemplate,
            outputParser: new StringOutputParser(),
        });

        // Retrieve context
        const context = await retriever.invoke(question);

        // Generate response
        const response = await ragChain.invoke({
            question,
            context,
            conversationHistory
        });

        return NextResponse.json({ answer: response }, { status: 200 });
    } catch (error) {
        console.error("Error generating response:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}