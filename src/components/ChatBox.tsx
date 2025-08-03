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

    useEffect(() => {
        if (prompt && prompt.trim()) {
            handleChat(prompt);
            onPromptHandled?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prompt]);

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
            { role: "assistant", content: reply }
        ]);
        setLoading(false);
    };

    useEffect(() => {
        setChatHistory([]);
    }, [section]);

    // Style chuẩn
    const userBg = "#fff";
    const aiBg = "#f7fafc";
    const userBorder = "#e5e7eb";
    const aiBorder = "#d1e3f9";
    const scrollbarStyles = {
        "::-webkit-scrollbar": { width: "9px", background: "#f3f4f6", borderRadius: "12px" },
        "::-webkit-scrollbar-thumb": { background: "#e0e7ef", borderRadius: "12px" },
    } as any;

    return (
        <Box
            ref={chatRef}
            w="90vw"
            h={["55vh", "60vh", "50vh"]}
            minW="0"
            maxW="none"            // bỏ max width cũ
            mx="auto"
            minH="420px"
            maxH="70vh"
            bg="#fff"
            border="1.5px solid #e7eaf2"
            borderRadius="2xl"
            boxShadow="0 4px 32px 0 rgba(30,64,175,0.08)"
            p={["6px", "24px", "32px"]}  // responsive padding (mobile/tablet/desktop)
            fontSize="17px"
            display="flex"
            flexDirection="column"
            overflowY="auto"
            zIndex={2}
        >
            <VStack gap={4} align="stretch" w="100%">
                {chatHistory.length === 0 ? (
                    <Text color="#aaa" textAlign="center" pt={6}>
                        Ask me anything!
                    </Text>
                ) : (
                    chatHistory.map((m, i) => (
                        <Flex
                            key={i}
                            align="flex-end"
                            justify={m.role === "user" ? "flex-end" : "flex-start"}
                            w="100%"
                        >
                            <Box
                                bg={m.role === "user" ? userBg : aiBg}
                                color={m.role === "user" ? "#212121" : "#185ca8"}
                                border="1px solid"
                                borderColor={m.role === "user" ? userBorder : aiBorder}
                                borderRadius={
                                    m.role === "user"
                                        ? "20px 20px 10px 20px"
                                        : "20px 20px 20px 10px"
                                }
                                boxShadow={
                                    m.role === "user"
                                        ? "0 2px 8px 0 rgba(0,0,0,0.04)"
                                        : "0 2px 8px 0 rgba(44,62,80,0.06)"
                                }
                                fontWeight={m.role === "assistant" ? 600 : 500}
                                fontSize="17px"
                                px="22px"
                                py="15px"
                                maxW={["98%", "80%", "60%"]}
                                minW="110px"
                                display="flex"
                                alignItems="center"
                                gap={2}
                            >
                                {m.role === "assistant" && (
                                    <Box as={FaRobot} fontSize={19} color="#059669" mt="1px" mr={2} />
                                )}
                                <Text as="span" whiteSpace="pre-line">
                                    {m.content}
                                </Text>
                            </Box>
                        </Flex>
                    ))
                )}
                {loading && (
                    <Flex align="center" justify="flex-start" color="#0ea5e9" opacity={0.7} fontStyle="italic" mt={2} ml={2}>
                        <Box as={FaRobot} display="inline" mr={2} mb="-2px" />
                        Thinking...
                    </Flex>
                )}
            </VStack>
        </Box>
    );
}
