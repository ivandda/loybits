import {NextRequest, NextResponse} from "next/server";
import {PineconeStore} from "@langchain/pinecone";
import {ChatOpenAI, OpenAIEmbeddings} from "@langchain/openai";
import {Pinecone as PineconeClient} from "@pinecone-database/pinecone";
import {PromptTemplate} from "@langchain/core/prompts";
import {StringOutputParser} from "@langchain/core/output_parsers";
import {createStuffDocumentsChain} from "langchain/chains/combine_documents";

// Initialize Pinecone client
const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

// Initialize OpenAI embeddings
const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
});

interface ConversationExchange {
    role: 'human' | 'ai';
    content: string;
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const {
            question,
            customPrompt,
            temperature = 0.7,
            maxTokens = 256,
            previousConversation = [] as ConversationExchange[] // Explicitly type this
        } = body;

        if (!question) {
            return NextResponse.json({error: "Question is required"}, {status: 400});
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

        // Define prompt template
        const defaultTemplate = `You are a helpful AI assistant. Use the following pieces of context to answer the question at the end.
If you don't know the answer, just say that you don't know, don't try to make up an answer.
Keep the answer concise and informative.

Previous conversation:
{conversationHistory}

Context information:
{context}

Question: {question}
Helpful Answer:`;

        const promptTemplate = PromptTemplate.fromTemplate(customPrompt || defaultTemplate);

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

        return NextResponse.json({answer: response}, {status: 200});
    } catch (error) {
        console.error("Error generating response:", error);
        return NextResponse.json({error: "Internal server error"}, {status: 500});
    }
}