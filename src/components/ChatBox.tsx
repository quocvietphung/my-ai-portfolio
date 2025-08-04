"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

type ChatMessage = {
    role: "user" | "assistant";
    content: string;
};

type ChatBoxProps = {
    section: string;
    prompt?: string | null;
    onPromptHandled?: () => void;
};

const MotionFlex = motion(Flex);

export default function ChatBox({ section, prompt, onPromptHandled }: ChatBoxProps) {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [showTopQuestion, setShowTopQuestion] = useState(true);
    const chatRef = useRef<HTMLDivElement>(null);

    // Khi prompt thay đổi, gọi handleChat một lần duy nhất
    useEffect(() => {
        if (prompt && prompt.trim()) {
            handleChat(prompt);
            onPromptHandled?.();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prompt]);

    // Scroll xuống dưới khi chatHistory hoặc loading thay đổi
    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chatHistory, loading]);

    // Ẩn câu hỏi trên cùng sau 1.5s
    useEffect(() => {
        if (chatHistory.length > 0 && chatHistory[0].role === "user") {
            setShowTopQuestion(true);
            const timer = setTimeout(() => {
                setShowTopQuestion(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [chatHistory]);

    // Hàm gọi API chat, set chatHistory 1 lần với user + assistant
    const handleChat = async (prompt: string) => {
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

    return (
        <Box
            ref={chatRef}
            w="90vw"
            h={["55vh", "60vh", "50vh"]}
            minW="0"
            maxW="none"
            mx="auto"
            minH="420px"
            maxH="70vh"
            bg="#fff"
            border="1.5px solid #e7eaf2"
            borderRadius="2xl"
            boxShadow="0 4px 32px 0 rgba(30,64,175,0.08)"
            p={["6px", "24px", "32px"]}
            fontSize="17px"
            display="flex"
            flexDirection="column"
            overflowY="auto"
            zIndex={2}
        >
            {/* Animate câu hỏi user trên cùng */}
            <AnimatePresence>
                {chatHistory.length > 0 && chatHistory[0].role === "user" && showTopQuestion && (
                    <MotionFlex
                        w="100%"
                        justify="center"
                        mb={3}
                        mt={0}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                    >
                        <Text
                            fontSize={["16px", "18px", "20px"]}
                            fontWeight={700}
                            color="#212121"
                            textAlign="center"
                            lineHeight="1.3"
                            letterSpacing="0.02em"
                            textShadow="0 2px 10px #e1e4eb55"
                        >
                            {chatHistory[0].content}
                        </Text>
                    </MotionFlex>
                )}
            </AnimatePresence>

            {/* Các tin nhắn chat còn lại */}
            <VStack gap={4} align="stretch" w="100%">
                {chatHistory.length === 0 ? (
                    <Text color="#aaa" textAlign="center" pt={6}>
                        Ask me anything!
                    </Text>
                ) : (
                    chatHistory.slice(1).map((m, i) => (
                        <Flex
                            key={i}
                            align="flex-end"
                            justify={m.role === "user" ? "flex-end" : "flex-start"}
                            w="100%"
                        >
                            {m.role === "assistant" ? (
                                <Box
                                    bg={aiBg}
                                    color="#185ca8"
                                    border="1px solid"
                                    borderColor={aiBorder}
                                    borderRadius="20px 20px 20px 10px"
                                    boxShadow="0 2px 8px 0 rgba(44,62,80,0.06)"
                                    fontWeight={600}
                                    fontSize="17px"
                                    px="32px"
                                    py="15px"
                                    maxW="100%"
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                    justifyContent="flex-start"
                                >
                                    <Box as={FaRobot} fontSize={19} color="#059669" mt="1px" mr={4} />
                                    <Text
                                        as="span"
                                        whiteSpace="pre-line"
                                        textAlign="justify"
                                        flex="1"
                                    >
                                        {m.content}
                                    </Text>
                                </Box>
                            ) : (
                                <Box
                                    bg={userBg}
                                    color="#212121"
                                    border="1px solid"
                                    borderColor={userBorder}
                                    borderRadius="20px 20px 10px 20px"
                                    boxShadow="0 2px 8px 0 rgba(0,0,0,0.04)"
                                    fontWeight={500}
                                    fontSize="17px"
                                    px="22px"
                                    py="15px"
                                    maxW={["98%", "80%", "60%"]}
                                    minW="110px"
                                    display="flex"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Text as="span" whiteSpace="pre-line">
                                        {m.content}
                                    </Text>
                                </Box>
                            )}
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
