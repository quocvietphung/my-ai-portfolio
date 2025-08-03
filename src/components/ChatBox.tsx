"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

type ChatBoxProps = {
    section: string;
    prompt?: string | null;
    onPromptHandled?: () => void;
};

export default function ChatBox({ section, prompt, onPromptHandled }: ChatBoxProps) {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const chatRef = useRef<HTMLDivElement>(null);

    // Gửi chat khi có prompt mới
    useEffect(() => {
        if (prompt && prompt.trim() !== "") {
            handleChat(prompt);
            onPromptHandled?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prompt]);

    // Always scroll to bottom on new message
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chatHistory, loading]);

    const handleChat = async (prompt: string) => {
        setChatHistory([{ role: "user", content: prompt }]);
        setLoading(true);
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
        setChatHistory([
            { role: "user", content: prompt },
            { role: "assistant", content: reply },
        ]);
        setLoading(false);
    };

    // Reset chat khi đổi section
    useEffect(() => {
        setChatHistory([]);
    }, [section]);

    // Style cho user/assistant
    const userBg = "#fff", aiBg = "#e0f2fe";
    const userBorder = "#60a5fa", aiBorder = "#0ea5e9";
    const scrollbarStyles = {
        "::-webkit-scrollbar": { width: "9px", background: "#eee", borderRadius: "12px" },
        "::-webkit-scrollbar-thumb": { background: "#c7d2fe", borderRadius: "12px" },
    } as any;

    return (
        <Box
            ref={chatRef}
            w={["98vw", "90vw", "700px"]}
            minW={["320px", "420px"]}
            maxW="700px"
            minH="500px"
            maxH="67vh"
            bg="rgba(255,255,255,0.97)"
            border="2.3px solid #93c5fd"
            borderRadius="2xl"
            boxShadow="0 8px 36px 0 rgba(30,64,175,0.12)"
            p={["18px", "32px"]}
            fontSize="17px"
            display="flex"
            flexDirection="column"
            overflowY="auto"
            zIndex={2}
        >
            <VStack gap={4} align="stretch" w="100%">
                {chatHistory.length === 0 ? (
                    <Text color="#aaa" textAlign="center" pt={7}>
                        Ask me anything!
                    </Text>
                ) : (
                    chatHistory.map((m, i) => (
                        <Flex
                            key={i}
                            align="center"
                            justify={m.role === "user" ? "flex-end" : "flex-start"}
                            w="100%"
                        >
                            <Box
                                bg={m.role === "user" ? userBg : aiBg}
                                color={m.role === "user" ? "#222" : "#0369a1"}
                                border="1.6px solid"
                                borderColor={m.role === "user" ? userBorder : aiBorder}
                                borderRadius={
                                    m.role === "user"
                                        ? "20px 20px 10px 20px"
                                        : "20px 20px 20px 10px"
                                }
                                boxShadow={
                                    m.role === "user"
                                        ? "0 2px 12px 0 rgba(59,130,246,0.08)"
                                        : "0 2px 12px 0 rgba(14,165,233,0.13)"
                                }
                                fontWeight={m.role === "assistant" ? 600 : 500}
                                fontSize="17px"
                                px="19px"
                                py="15px"
                                maxW={["95%", "85%", "73%"]}
                                minW="110px"
                                display="flex"
                                alignItems="center"
                                gap={2}
                            >
                                {m.role === "assistant" && (
                                    <Box as={FaRobot} fontSize={18} color="#0284c7" mt="1px" mr={2} />
                                )}
                                <Text as="span" whiteSpace="pre-line">
                                    {m.content}
                                </Text>
                            </Box>
                        </Flex>
                    ))
                )}
                {loading && (
                    <Flex align="center" justify="flex-start" color="#0ea5e9" opacity={0.68} fontStyle="italic" mt={2} ml={2}>
                        <Box as={FaRobot} display="inline" mr={2} mb="-2px" />
                        Thinking...
                    </Flex>
                )}
            </VStack>
        </Box>
    );
}
