import { NextRequest, NextResponse } from "next/server";
import { PineconeStore } from "@langchain/pinecone";
import { OpenAIEmbeddings } from "@langchain/openai";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "@langchain/core/documents";

// Initialize Pinecone client
const pinecone = new PineconeClient();
const pineconeIndex = pinecone.Index(process.env.PINECONE_INDEX!);

// Initialize OpenAI embeddings
const embeddings = new OpenAIEmbeddings({
  model: "text-embedding-3-small",
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { documents } = body;

    if (!Array.isArray(documents)) {
      return NextResponse.json({ error: "Invalid input: documents must be an array" }, { status: 400 });
    }

    // Create PineconeStore instance
    const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
      pineconeIndex,
      maxConcurrency: 5,
    });

    // Prepare documents and IDs
    const docs: Document[] = documents.map((doc: any, index: number) => ({
      pageContent: doc.pageContent,
      metadata: doc.metadata || {},
    }));

    const ids = documents.map((_: any, index: number) => index.toString());

    // Add documents to the vector store
    await vectorStore.addDocuments(docs, { ids });

    return NextResponse.json({ message: "Documents added successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error populating database:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}