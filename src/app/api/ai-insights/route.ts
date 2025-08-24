import { NextRequest, NextResponse } from "next/server";

// AI-powered insights and analytics about user interactions
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        if (!body.conversationHistory) {
            return NextResponse.json({ 
                error: "Missing conversation history" 
            }, { status: 400 });
        }

        // Read environment variables
        const apiKey = process.env.AZURE_OPENAI_API_KEY!;
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
        const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME!;
        const apiVersion = process.env.AZURE_OPENAI_API_VERSION!;

        const analysisPrompt = `Analysiere diese Unterhaltung und gib Insights zurück als JSON:

{
    "userInterests": ["interesse1", "interesse2", "interesse3"],
    "recommendedProjects": ["projekt1", "projekt2"],
    "conversationSummary": "Kurze Zusammenfassung",
    "nextSteps": ["vorschlag1", "vorschlag2"],
    "technicalLevel": "beginner|intermediate|advanced",
    "topicsDiscussed": ["thema1", "thema2"]
}

Basierend auf Quoc Viets Portfolio (AI/ML, Python, Java, Web-Entwicklung, Computer Vision, etc.)`;

        const messages = [
            {
                role: "system",
                content: analysisPrompt
            },
            {
                role: "user",
                content: `Analysiere diese Unterhaltung: ${JSON.stringify(body.conversationHistory)}`
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
                temperature: 0.3,
                max_tokens: 400,
            }),
        });

        if (!response.ok) {
            throw new Error(`Azure OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const analysisText = data?.choices?.[0]?.message?.content || "{}";

        // Try to parse JSON response
        let insights;
        try {
            insights = JSON.parse(analysisText);
        } catch {
            // Fallback if JSON parsing fails
            insights = {
                userInterests: ["AI", "Machine Learning"],
                recommendedProjects: ["Kreditkartenbetrug-Erkennung", "Objekterkennung"],
                conversationSummary: "Benutzer interessiert sich für AI/ML-Projekte",
                nextSteps: ["Mehr über spezifische Projekte erfahren"],
                technicalLevel: "intermediate",
                topicsDiscussed: ["Portfolio", "Projekte"]
            };
        }

        return NextResponse.json({
            success: true,
            insights,
            metadata: {
                analysisGenerated: true,
                timestamp: new Date().toISOString(),
                conversationLength: body.conversationHistory.length
            }
        });

    } catch (error) {
        console.error("AI insights error:", error);
        return NextResponse.json({ 
            error: "Fehler bei der AI-Analyse",
            details: error instanceof Error ? error.message : "Unbekannter Fehler"
        }, { status: 500 });
    }
}