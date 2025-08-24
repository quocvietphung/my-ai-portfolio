// chatService.ts
export interface ChatMessage {
    role: "user" | "assistant" | "system";
    content: string;
}

export interface ChatContext {
    conversationHistory: ChatMessage[];
    currentSection: string;
    userInterests: string[];
}

// Enhanced chat service with conversation memory and context
export async function sendChatMessage(
    prompt: string, 
    context?: ChatContext
): Promise<ChatMessage> {
    // Build enhanced message array with context
    const messages: ChatMessage[] = [];
    
    // Add system prompt for better AI behavior
    messages.push({
        role: "system",
        content: `Du bist ein intelligenter AI-Assistent für Quoc Viet Phungs Portfolio. Du hilfst Besuchern dabei, mehr über seine Projekte, Fähigkeiten und Erfahrungen im Bereich KI, ML und Softwareentwicklung zu erfahren.

Wichtige Informationen:
- Quoc Viet ist ein erfahrener Entwickler mit Fokus auf AI/ML, Python, Java und moderne Web-Technologien
- Er hat Erfahrung mit TensorFlow, Azure OpenAI, Computer Vision und Datenanalyse
- Seine Projekte umfassen Kreditkartenbetrug-Erkennung, Objekterkennung, Sprachlern-Apps und AI-Chatbots
- Sei hilfsbereit, informativ und freundlich
- Antworte auf Deutsch, außer wenn explizit nach Englisch gefragt wird
- Gib konkrete, detaillierte Antworten basierend auf seinem Portfolio
- Wenn nach spezifischen Projekten gefragt wird, erkläre die verwendeten Technologien und Herausforderungen`
    });

    // Add conversation history for context
    if (context?.conversationHistory && context.conversationHistory.length > 0) {
        // Keep last 6 messages for context (3 exchanges)
        const recentHistory = context.conversationHistory.slice(-6);
        messages.push(...recentHistory);
    }

    // Add current user message
    messages.push({ role: "user", content: prompt });

    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            messages,
            temperature: 0.7,
            max_tokens: 500, // Increased for more detailed responses
            top_p: 0.9,
        }),
    });
    
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || "Entschuldigung, ich konnte keine Antwort generieren.";
    return { role: "assistant", content: reply };
}

// Smart question suggestions based on context
export async function generateSmartQuestions(context: ChatContext): Promise<string[]> {
    const systemPrompt = `Basierend auf der Unterhaltung, generiere 3 relevante Folgefragen, die Besucher über Quoc Viets Portfolio stellen könnten. Die Fragen sollten:
- Konkret und spezifisch sein
- Bezug zu seinen AI/ML-Projekten haben
- Technische Details oder Erfahrungen erfragen
- Auf Deutsch sein
- Als JSON Array zurückgegeben werden

Format: ["Frage 1", "Frage 2", "Frage 3"]`;

    try {
        const res = await fetch("/api/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: `Unterhaltungskontext: ${JSON.stringify(context)}` }
                ],
                temperature: 0.8,
                max_tokens: 200,
            }),
        });
        
        const data = await res.json();
        const reply = data?.choices?.[0]?.message?.content || "[]";
        
        // Try to parse JSON response
        try {
            const questions = JSON.parse(reply);
            return Array.isArray(questions) ? questions.slice(0, 3) : [];
        } catch {
            // Fallback to manual parsing if JSON fails
            const lines = reply.split('\n').filter((line: string) => line.trim().startsWith('"') || line.trim().startsWith('-'));
            return lines.slice(0, 3).map((line: string) => line.replace(/^[-"]\s*/, '').replace(/"$/, '').trim());
        }
    } catch (error) {
        console.error('Error generating smart questions:', error);
        return [];
    }
}
