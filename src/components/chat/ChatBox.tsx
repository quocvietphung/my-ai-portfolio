"use client";
import { useState, useRef, useEffect } from "react";
import { Box, Flex, VStack, Text, Button, HStack, Input, IconButton } from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
import PersonalInfoRenderer from "./PersonalInfoRenderer";
import { ChatMessage, sendChatMessage } from "@/services/chatService";
import { PERSONAL_INFO_KEYWORDS_BY_SECTION, sections, sectionDefaultPrompts } from "@/constants/sections";

const MotionFlex = motion.create(Flex);

// Kiểm tra prompt thuộc section nào
function getSectionFromPrompt(prompt: string): string | null {
    const lower = prompt.toLowerCase().trim();
    for (const [section, keywords] of Object.entries(PERSONAL_INFO_KEYWORDS_BY_SECTION)) {
        for (const kw of keywords) {
            if (lower.includes(kw.toLowerCase().trim())) {
                return section;
            }
        }
    }
    return null;
}

type ChatBoxProps = {
    section: string;
    prompt?: string | null;
    onPromptHandled?: () => void;
};

export default function ChatBox({ section, prompt, onPromptHandled }: ChatBoxProps) {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [showTopQuestion, setShowTopQuestion] = useState(true);
    const chatRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");

    useEffect(() => {
        if (prompt && prompt.trim()) {
            const promptSection = getSectionFromPrompt(prompt);
            if (promptSection) {
                setChatHistory([
                    { role: "user", content: prompt },
                    { role: "assistant", content: "" },
                ]);
            } else {
                handleChat(prompt);
            }
            onPromptHandled?.();
        }
    }, [prompt]);

    useEffect(() => {
        if (chatRef.current) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [chatHistory, loading]);

    useEffect(() => {
        if (chatHistory.length > 0 && chatHistory[0].role === "user") {
            setShowTopQuestion(true);
            const timer = setTimeout(() => {
                setShowTopQuestion(false);
            }, 1500);
            return () => clearTimeout(timer);
        }
    }, [chatHistory]);

    const handleSend = () => {
        if (!input.trim()) return;
        handleChat(input.trim());
        setInput("");
    };

    const handleSection = (key: string) => {
        setInput("");
        const prompt = sectionDefaultPrompts[key] || key;
        handleChat(prompt);
    };

    const handleChat = async (userPrompt: string) => {
        setLoading(true);
        setChatHistory([{ role: "user", content: userPrompt }]);
        try {
            const assistantMessage = await sendChatMessage(userPrompt);
            setChatHistory([
                { role: "user", content: userPrompt },
                assistantMessage,
            ]);
        } catch (error) {
            setChatHistory([
                { role: "user", content: userPrompt },
                { role: "assistant", content: "Error: Could not get response." },
            ]);
        }
        setLoading(false);
    };

    return (
        <Box
            ref={chatRef}
            w="90vw"
            minW="0"
            maxW="680px"
            mx="auto"
            minH="420px"
            maxH="70vh"
            bg="#fff"
            border="1.5px solid #e5e7eb"
            borderRadius="2xl"
            boxShadow="0 4px 32px 0 rgba(30,64,175,0.08)"
            p={["12px", "24px", "32px"]}
            fontSize="17px"
            display="flex"
            flexDirection="column"
            overflowY="auto"
            zIndex={2}
            justifyContent="flex-end"
        >
            <Box flex="1" w="100%">
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
                                px="20px"
                                py="15px"
                                maxW={["98%", "70%", "50%"]}
                                bg="#fff"
                                border="1px solid #e5e7eb"
                                borderRadius="20px 20px 10px 20px"
                                boxShadow="0 2px 8px 0 rgba(0,0,0,0.04)"
                            >
                                {chatHistory[0].content}
                            </Text>
                        </MotionFlex>
                    )}
                </AnimatePresence>

                <VStack gap={4} align="stretch" w="100%">
                    {chatHistory.length > 1 && getSectionFromPrompt(chatHistory[0].content) ? (
                        <PersonalInfoRenderer section={section} />
                    ) : chatHistory.length === 0 ? (
                        <Text color="#aaa" textAlign="center" pt={6}>
                            Ask me anything!
                        </Text>
                    ) : (
                        chatHistory.slice(1).map(
                            (m, i) =>
                                m.role === "assistant" && (
                                    <Text
                                        key={m.content}
                                        color="#185ca8"
                                        fontWeight={600}
                                        fontSize="17px"
                                        px="32px"
                                        py="15px"
                                        maxW="100%"
                                        whiteSpace="pre-line"
                                        textAlign="justify"
                                        style={{ flex: 1 }}
                                    >
                                        <Typewriter
                                            words={[m.content]}
                                            loop={1}
                                            cursor={false}
                                            typeSpeed={20}
                                            deleteSpeed={0}
                                            delaySpeed={1000}
                                        />
                                    </Text>
                                )
                        )
                    )}

                    {loading && (
                        <Flex
                            align="center"
                            justify="flex-start"
                            color="#0ea5e9"
                            opacity={0.7}
                            fontStyle="italic"
                            mt={2}
                            ml={2}
                        >
                            <Box as={FaRobot} display="inline" mr={2} mb="-2px" />
                            Thinking...
                        </Flex>
                    )}
                </VStack>
            </Box>

            <Box mt={4}>
                <Flex justify="center" mb={2}>
                    <HStack gap={2} wrap="wrap">
                        {sections.map((s) => (
                            <Button
                                key={s.key}
                                variant="ghost"
                                colorScheme="teal"
                                fontWeight="600"
                                size="sm"
                                px={4}
                                py={2}
                                borderRadius="full"
                                onClick={() => handleSection(s.key)}
                            >
                                {s.label}
                            </Button>
                        ))}
                    </HStack>
                </Flex>
                {/* Chat Input */}
                <Flex
                    bg="#f7f9fb"
                    borderRadius="full"
                    px={2}
                    py={1}
                    boxShadow="0 1px 6px rgba(0,0,0,0.03)"
                    align="center"
                    gap={2}
                    maxW="95%"
                    mx="auto"
                >
                    <Input
                        aria-label="Chat input"
                        placeholder="Ask me anything..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        size="sm"
                        border="none"
                        bg="transparent"
                        borderRadius="full"
                        _focusVisible={{ boxShadow: "none" }}
                        fontSize="sm"
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleSend();
                            }
                        }}
                    />
                    <IconButton
                        aria-label="Send"
                        children={<FiSend />}
                        colorScheme="blue"
                        size="md"
                        borderRadius="full"
                        bg="blue.400"
                        color="white"
                        _hover={{ bg: "blue.500" }}
                        onClick={handleSend}
                        disabled={!input.trim()}
                    />
                </Flex>
            </Box>
        </Box>
    );
}
