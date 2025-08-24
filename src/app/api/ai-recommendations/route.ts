import { NextRequest, NextResponse } from "next/server";

// AI-powered project recommendations based on user interests
export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        
        if (!body.userInterests && !body.conversationContext) {
            return NextResponse.json({ 
                error: "Missing user interests or conversation context" 
            }, { status: 400 });
        }

        // Read environment variables
        const apiKey = process.env.AZURE_OPENAI_API_KEY!;
        const endpoint = process.env.AZURE_OPENAI_ENDPOINT!;
        const deployment = process.env.AZURE_OPENAI_DEPLOYMENT_NAME!;
        const apiVersion = process.env.AZURE_OPENAI_API_VERSION!;

        const systemPrompt = `Du bist ein AI-Experte für Projektempfehlungen. Basierend auf Benutzerinteressen und Gesprächskontext, empfiehl relevante Projekte aus Quoc Viets Portfolio.

Verfügbare Projekte:
1. Speak German (AI Pronunciation Trainer) - Whisper AI, Next.js, TypeScript
2. AI Chatbot Portfolio - Azure OpenAI, Next.js, TypeScript
3. Diamantpreis-Prognose - Python, Scikit-Learn, XGBoost, ML Pipeline
4. Kreditkartenbetrug-Erkennung - Python, Flask, React, End-to-End ML
5. Objekterkennung - TensorFlow, CNN, Computer Vision, Deep Learning

Antworte als JSON:
{
    "recommendedProjects": [
        {
            "title": "Projektname",
            "reason": "Warum dieses Projekt relevant ist",
            "relevanceScore": 95,
            "highlights": ["Besondere Features", "Technologien"]
        }
    ],
    "learningPath": ["Vorschlag 1", "Vorschlag 2"],
    "nextQuestions": ["Frage über empfohlene Projekte"]
}`;

        const userContext = `
        Benutzerinteressen: ${JSON.stringify(body.userInterests || [])}
        Unterhaltungskontext: ${body.conversationContext || 'Keine Unterhaltung'}
        Technisches Level: ${body.technicalLevel || 'intermediate'}
        `;

        const messages = [
            {
                role: "system",
                content: systemPrompt
            },
            {
                role: "user", 
                content: `Empfiehl relevante Projekte basierend auf: ${userContext}`
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
                max_tokens: 500,
            }),
        });

        if (!response.ok) {
            throw new Error(`Azure OpenAI API error: ${response.status}`);
        }

        const data = await response.json();
        const recommendationText = data?.choices?.[0]?.message?.content || "{}";

        // Try to parse JSON response
        let recommendations;
        try {
            recommendations = JSON.parse(recommendationText);
        } catch {
            // Fallback recommendations
            recommendations = {
                recommendedProjects: [
                    {
                        title: "AI Chatbot Portfolio",
                        reason: "Zeigt moderne AI-Integration mit Azure OpenAI",
                        relevanceScore: 90,
                        highlights: ["Conversational AI", "Azure Integration", "TypeScript"]
                    },
                    {
                        title: "Kreditkartenbetrug-Erkennung",
                        reason: "Vollständige ML-Pipeline mit praktischer Anwendung",
                        relevanceScore: 85,
                        highlights: ["End-to-End ML", "Real-world Problem", "Explainable AI"]
                    }
                ],
                learningPath: ["Verstehe die Projektarchitektur", "Erkunde verwendete Technologien"],
                nextQuestions: ["Wie funktioniert die ML-Pipeline?", "Welche AI-Modelle wurden verwendet?"]
            };
        }

        return NextResponse.json({
            success: true,
            recommendations,
            metadata: {
                generatedAt: new Date().toISOString(),
                basedOn: body.userInterests?.length || 0
            }
        });

    } catch (error) {
        console.error("AI recommendations error:", error);
        return NextResponse.json({ 
            error: "Fehler bei der Projekt-Empfehlung",
            details: error instanceof Error ? error.message : "Unbekannter Fehler"
        }, { status: 500 });
    }
}