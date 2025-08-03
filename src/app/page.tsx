"use client";
import { useState } from "react";
import ParticlesBackground from "@/components/ParticlesBackground";
import AvatarHeader from "@/components/AvatarHeader";
import ControlSegment from "@/components/ControlSegment";

export default function Home() {
    const [section, setSection] = useState("me");
    const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
    const [loading, setLoading] = useState(false);

    // Gửi prompt từ ControlSegment
    const handleSection = async (key: string) => {
        if (key.startsWith("__chat:")) {
            const prompt = key.replace("__chat:", "");
            // Tạo nextHistory để đảm bảo cập nhật đúng state (tránh bug closure)
            const nextHistory = [...chatHistory, { role: "user", content: prompt }];
            setChatHistory(nextHistory);
            setLoading(true);
            // Gọi API nội bộ của bạn
            const res = await fetch("/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    messages: nextHistory,
                    temperature: 0.7,
                    max_tokens: 100,
                }),
            });
            const data = await res.json();
            // Dựa vào cấu trúc trả về từ Azure OpenAI:
            const reply = data?.choices?.[0]?.message?.content || "No response.";
            setChatHistory(h => [...h, { role: "assistant", content: reply }]);
            setLoading(false);
        } else {
            setSection(key);
        }
    };

    return (
        <>
            {/* Hiệu ứng particles phải đặt TRÊN CÙNG, zIndex thấp */}
            <ParticlesBackground />

            {/* Container chính, zIndex cao hơn particles */}
            <div
                style={{
                    height: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "transparent", // <-- phải là transparent
                    position: "relative",
                    zIndex: 1, // <-- rất quan trọng!
                }}
            >
                <div
                    style={{
                        flex: 1,
                        overflowY: "auto",
                        paddingBottom: "200px",
                        paddingTop: "4em",
                    }}
                >
                    <div style={{ textAlign: "center" }}>
                        <AvatarHeader />
                        {/* Vùng hiển thị chat */}
                        <div
                            style={{
                                margin: "32px auto",
                                minHeight: "300px",
                                width: "min(700px, 90vw)",
                                border: "2px solid #f44336",
                                borderRadius: 18,
                                background: "rgba(255,255,255,0.88)",  // Nên dùng background trắng trong suốt
                                padding: 28,
                                boxShadow: "0 2px 18px rgba(0,0,0,0.08)",
                                textAlign: "left",
                                fontSize: 17,
                                minWidth: 300,
                                maxWidth: "90vw",
                                zIndex: 2,
                                backdropFilter: "blur(4px)", // blur nhẹ nếu thích
                            }}
                        >
                            {chatHistory.length === 0 ? (
                                <div style={{ color: "#aaa", textAlign: "center" }}>Ask me anything!</div>
                            ) : (
                                chatHistory.map((m, i) =>
                                    <div key={i} style={{
                                        marginBottom: 20,
                                        color: m.role === "assistant" ? "#1565c0" : "#222",
                                        background: m.role === "assistant" ? "#f0f6fd" : "transparent",
                                        padding: m.role === "assistant" ? "12px 18px" : 0,
                                        borderRadius: 10
                                    }}>
                                        <b>{m.role === "user" ? "You" : "AI"}:</b> {m.content}
                                    </div>
                                )
                            )}
                            {loading && (
                                <div style={{ color: "#1565c0", opacity: 0.5, fontStyle: "italic" }}>Thinking...</div>
                            )}
                        </div>
                    </div>
                </div>
                {/* Nút và thanh nhập chat (control), luôn nổi trên cùng */}
                <div
                    style={{
                        position: "fixed",
                        bottom: "40px",
                        width: "100%",
                        zIndex: 1000,
                        backdropFilter: "blur(12px)",
                        backgroundColor: "transparent",
                    }}
                >
                    <ControlSegment onSelect={handleSection} />
                </div>
            </div>
        </>
    );
}
