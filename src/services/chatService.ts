// chatService.ts
export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export async function sendChatMessage(prompt: string): Promise<ChatMessage> {
    const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            messages: [{ role: "user", content: prompt }],
            temperature: 0.7,
            max_tokens: 300,
        }),
    });
    const data = await res.json();
    const reply = data?.choices?.[0]?.message?.content || "No response.";
    return { role: "assistant", content: reply };
}
