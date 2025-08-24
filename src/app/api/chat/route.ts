import { NextRequest, NextResponse } from "next/server";

// This function handles POST requests sent to the API route
export async function POST(req: NextRequest) {
    let body;
    try {
        // Try to parse the request body as JSON
        body = await req.json();
    } catch {
        // If parsing fails, return a 400 error with a message
        return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    // If the body is missing or doesn't contain 'messages', return an error
    if (!body || !body.messages) {
        return NextResponse.json({ error: "Missing messages in request body" }, { status: 400 });
    }

    // Read environment variables from .env for Azure OpenAI credentials
    const apiKey = process.env.AZURE_OPENAI_API_KEY!;
    const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
    const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME!;
    const apiVersion = process.env.AZURE_OPENAI_API_VERSION!;

    // Build the correct Azure OpenAI API endpoint URL
    const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

    // Forward the request to Azure OpenAI API
    const res = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": apiKey,
        },
        body: JSON.stringify(body),
    });

    // Parse the response from Azure OpenAI and send it back to the client
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
}
