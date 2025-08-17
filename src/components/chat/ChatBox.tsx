// src/components/chat/ChatBox.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import {
    Box,
    Flex,
    VStack,
    Text,
    Button,
    HStack,
    Input,
    IconButton,
    InputGroup,
} from "@chakra-ui/react";
import { FaRobot } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { FiSend } from "react-icons/fi";
import { Typewriter } from "react-simple-typewriter";
import PersonalInfoRenderer from "./PersonalInfoRenderer";
import { ChatMessage, sendChatMessage } from "@/services/chatService";
import {
    PERSONAL_INFO_KEYWORDS_BY_SECTION,
    sections,
    sectionDefaultPrompts,
} from "@/constants/sections";

const MotionFlex = motion.create(Flex);
const MotionBox = motion.create(Box);

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
    prompt?: string | null;
    onPromptHandledAction?: () => void;
};

export default function ChatBox({ prompt, onPromptHandledAction }: ChatBoxProps) {
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
    const [loading, setLoading] = useState(false);
    const [showTopQuestion, setShowTopQuestion] = useState(false);
    const [pendingAnswer, setPendingAnswer] = useState<ChatMessage | null>(null);
    const chatRef = useRef<HTMLDivElement>(null);
    const [input, setInput] = useState("");
    const [activeSection, setActiveSection] = useState<string>("me");

    useEffect(() => {
        if (prompt && prompt.trim()) {
            (async () => {
                const promptSection = getSectionFromPrompt(prompt);
                if (promptSection) {
                    setActiveSection(promptSection);
                    setChatHistory([{ role: "user", content: prompt }]);
                    await handleChat(prompt);
                } else {
                    await handleChat(prompt);
                }
                onPromptHandledAction?.();
            })();
        }
        // eslint-disable-next-line
    }, [prompt]);

    useEffect(() => {
        if (!chatRef.current) return;
        if (chatHistory.length === 1 && getSectionFromPrompt(chatHistory[0]?.content)) {
            chatRef.current.scrollTo({ top: 0, behavior: "smooth" });
        }
        // eslint-disable-next-line
    }, [activeSection, chatHistory]);

    // Scroll xuống đáy khi chat bình thường
    useEffect(() => {
        if (!chatRef.current) return;
        if (chatHistory.length > 1 && !getSectionFromPrompt(chatHistory[0]?.content)) {
            chatRef.current.scrollTo({
                top: chatRef.current.scrollHeight,
                behavior: "smooth",
            });
        }
        // eslint-disable-next-line
    }, [chatHistory, loading, showTopQuestion]);

    useEffect(() => {
        if (chatHistory.length > 0 && chatHistory[0].role === "user" && pendingAnswer) {
            setShowTopQuestion(true);
            const timer = setTimeout(() => {
                setShowTopQuestion(false);
                setChatHistory([chatHistory[0], pendingAnswer]);
                setPendingAnswer(null);
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [pendingAnswer]);

    const handleSend = () => {
        if (!input.trim()) return;
        setChatHistory([{ role: "user", content: input.trim() }]);
        void handleChat(input.trim());
        setInput("");
    };

    const handleSection = (key: string) => {
        setInput("");
        setActiveSection(key);
        const nextPrompt = sectionDefaultPrompts[key] || key;
        setChatHistory([{ role: "user", content: nextPrompt }]);
        void handleChat(nextPrompt);
    };

    const handleChat = async (userPrompt: string) => {
        setLoading(true);
        setShowTopQuestion(true);
        setPendingAnswer(null);
        setActiveSection(getSectionFromPrompt(userPrompt) || activeSection);
        try {
            const assistantMessage = await sendChatMessage(userPrompt);
            setPendingAnswer(assistantMessage);
        } catch {
            setPendingAnswer({
                role: "assistant",
                content: "Error: Could not get response.",
            });
        }
        setLoading(false);
    };

    return (
        // Wrapper toàn màn, căn giữa box chat
        <Box
            position="fixed"
            inset="0"
            display="grid"
            placeItems="center"
            p={{ base: 3, md: 6 }}
            zIndex={2}
        >
            {/* Khung chat lớn, đẹp, responsive */}
            <Box
                w={{ base: "96vw", md: "90vw", lg: "86vw" }}
                maxW="1400px"
                h={{ base: "74vh", md: "78vh", lg: "82vh" }}
                minH="560px"
                p={{ base: 4, sm: 6, md: 8 }}
                borderRadius="2xl"
                bg="linear-gradient(135deg, rgba(255,255,255,0.94), rgba(249,250,255,0.92))"
                border="1px solid #e6e8ef"
                boxShadow="0 24px 84px rgba(13, 42, 148, 0.16)"
                backdropFilter="saturate(1.25) blur(8px)"
                display="flex"
                flexDirection="column"
            >
                {/* Vùng hiển thị chat */}
                <Box ref={chatRef} flex="1" w="100%" minH={0} overflowY="auto" pr={{ base: 1, md: 2 }}>
                    <AnimatePresence>
                        {chatHistory.length > 0 && chatHistory[0].role === "user" && showTopQuestion && (
                            <MotionFlex
                                key="question"
                                w="100%"
                                justify="center"
                                mb={3}
                                mt={0}
                                initial={{ opacity: 0, x: 40 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -40 }}
                                transition={{ duration: 0.45, ease: "easeInOut" }}
                            >
                                <Text
                                    fontSize={{ base: "16px", sm: "18px", md: "20px" }}
                                    fontWeight={800}
                                    color="#1f2937"
                                    textAlign="center"
                                    lineHeight="1.35"
                                    letterSpacing="0.01em"
                                    textShadow="0 2px 10px #e1e4eb55"
                                    px="20px"
                                    py="15px"
                                    maxW={{ base: "98%", md: "70%", lg: "55%" }}
                                    bg="#fff"
                                    border="1px solid #e5e7eb"
                                    borderRadius="22px 22px 12px 22px"
                                    boxShadow="0 4px 16px rgba(0,0,0,0.06)"
                                >
                                    {chatHistory[0].content}
                                </Text>
                            </MotionFlex>
                        )}
                    </AnimatePresence>

                    <VStack gap={4} align="stretch" w="100%">
                        <AnimatePresence>
                            {!showTopQuestion &&
                                chatHistory.length > 1 &&
                                getSectionFromPrompt(chatHistory[0].content) && (
                                    <MotionBox
                                        key="section-info"
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 40 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        <PersonalInfoRenderer section={activeSection} />
                                    </MotionBox>
                                )}
                        </AnimatePresence>

                        <AnimatePresence>
                            {!showTopQuestion &&
                                chatHistory.length > 1 &&
                                !getSectionFromPrompt(chatHistory[0].content) && (
                                    <motion.div
                                        key={chatHistory[1].content}
                                        initial={{ opacity: 0, x: -40 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: 40 }}
                                        transition={{ duration: 0.5, ease: "easeInOut" }}
                                    >
                                        <Text
                                            color="#185ca8"
                                            fontWeight={600}
                                            fontSize={{ base: "16px", md: "17px" }}
                                            px={{ base: 3, md: 6 }}
                                            py="15px"
                                            maxW="100%"
                                            whiteSpace="pre-line"
                                            textAlign="justify"
                                            style={{ flex: 1 }}
                                        >
                                            <Typewriter
                                                words={[chatHistory[1].content]}
                                                loop={1}
                                                cursor={false}
                                                typeSpeed={22}
                                                deleteSpeed={0}
                                                delaySpeed={900}
                                            />
                                        </Text>
                                    </motion.div>
                                )}
                        </AnimatePresence>

                        {chatHistory.length === 0 && (
                            <Text color="gray.500" textAlign="center" pt={6}>
                                Ask me anything!
                            </Text>
                        )}

                        {(loading || (showTopQuestion && pendingAnswer)) && (
                            <Flex
                                align="center"
                                justify="flex-start"
                                color="blue.500"
                                opacity={0.8}
                                fontStyle="italic"
                                mt={2}
                                ml={2}
                                gap={2}
                            >
                                <Box as={FaRobot} display="inline" mb="-2px" />
                                Thinking...
                            </Flex>
                        )}
                    </VStack>
                </Box>

                {/* Thanh nhập liệu */}
                <Box mt={{ base: 3, md: 4 }}>
                    <Flex justify="center" mb={{ base: 2, md: 3 }}>
                        <HStack gap={2} flexWrap="wrap">
                            {sections.map((s) => (
                                <Button
                                    key={`bottom-${s.key}`}
                                    size="xs"
                                    variant="ghost"
                                    colorPalette="teal" // Chakra v3
                                    borderRadius="full"
                                    onClick={() => handleSection(s.key)}
                                >
                                    {s.label}
                                </Button>
                            ))}
                        </HStack>
                    </Flex>

                    <Flex align="center" justify="center" px={{ base: 1, sm: 2 }}>
                        <Box w={{ base: "100%", md: "80%", lg: "65%" }}>
                            <InputGroup
                                endElement={
                                    <IconButton
                                        aria-label="Send"
                                        size="md"
                                        borderRadius="full"
                                        colorPalette="blue"
                                        onClick={handleSend}
                                        disabled={!input.trim()}
                                    >
                                        <FiSend />
                                    </IconButton>
                                }
                            >
                                <Input
                                    aria-label="Chat input"
                                    placeholder="Ask me anything..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    size="sm"
                                    border="1px solid #e6e8ef"
                                    bg="#f7f9fb"
                                    borderRadius="full"
                                    _focusVisible={{
                                        outline: "none",
                                        boxShadow: "0 0 0 3px rgba(59,130,246,0.25)",
                                    }}
                                    fontSize="sm"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleSend();
                                        }
                                    }}
                                />
                            </InputGroup>
                        </Box>
                    </Flex>
                </Box>
            </Box>
        </Box>
    );
}
