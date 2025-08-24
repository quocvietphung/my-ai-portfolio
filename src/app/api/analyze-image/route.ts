import { NextRequest, NextResponse } from "next/server";

// AI Image Analysis API - integrates with Azure OpenAI Vision capabilities
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        if (!body.imageUrl && !body.imageBase64) {
            return NextResponse.json({ 
                error: "Missing image data. Provide either imageUrl or imageBase64" 
            }, { status: 400 });
        }

        // Read environment variables
        const apiKey = process.env.AZURE_OPENAI_API_KEY!;
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
        const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME!;
        const apiVersion = process.env.AZURE_OPENAI_API_VERSION!;

        // Prepare the message for vision analysis
        const messages = [
            {
                role: "system",
                content: `Du bist ein AI-Experte, der Bilder im Kontext von Quoc Viets Portfolio analysiert. Analysiere das Bild und erkläre:
1. Was du siehst
2. Wie es zu einem Tech-Portfolio passen könnte
3. Relevante technische Aspekte oder Technologien
4. Mögliche Verbindungen zu AI/ML-Projekten
Antworte auf Deutsch und sei detailliert aber prägnant.`
            },
            {
                role: "user",
                content: [
                    {
                        type: "text",
                        text: body.prompt || "Beschreibe und analysiere dieses Bild im Kontext eines Tech-Portfolios."
                    },
                    {
                        type: "image_url",
                        image_url: {
                            url: body.imageUrl || `data:image/jpeg;base64,${body.imageBase64}`
                        }
                    }
                ]
            }
        ];

        const url = `${endpoint}openai/deployments/${deployment}/chat/completions?api-version=${apiVersion}`;

        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": apiKey,
            },
            body: JSON.stringify({
                messages,
                temperature: 0.7,
                max_tokens: 600,
            }),
        });

        if (!response.ok) {
            throw new Error(`Azure OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const analysis = data?.choices?.[0]?.message?.content || "Bildanalyse nicht verfügbar.";

        return NextResponse.json({
            success: true,
            analysis,
            metadata: {
                imageProcessed: true,
                analysisLength: analysis.length,
                timestamp: new Date().toISOString()
            }
        });

    } catch (error) {
        console.error("Image analysis error:", error);
        return NextResponse.json({ 
            error: "Fehler bei der Bildanalyse",
            details: error instanceof Error ? error.message : "Unbekannter Fehler"
        }, { status: 500 });
    }
}