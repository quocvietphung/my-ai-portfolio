"use client";

import { useState, useRef, useEffect, ReactNode } from "react";
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
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { FiSend, FiImage } from "react-icons/fi";
import {
    LuUser,
    LuFolderKanban,
    LuSparkles,
    LuCoffee,
    LuMail,
    LuInfo,
} from "react-icons/lu";
import { FaRobot } from "react-icons/fa";

import PersonalInfoRenderer from "./PersonalInfoRenderer";
import { ChatMessage, sendChatMessage, generateSmartQuestions, ChatContext } from "@/services/chatService";
import { analyzeImage, getAIInsights, convertImageToBase64, AIInsights, getProjectRecommendations, ProjectRecommendation } from "@/services/aiService";
import {
    PERSONAL_INFO_KEYWORDS_BY_SECTION,
    sections,
    sectionDefaultPrompts,
    CONTEXTUAL_SUGGESTIONS,
} from "@/constants/sections";

const MotionFlex = motion.create(Flex);
const MotionBox = motion.create(Box);

// map icon theo nhãn (label) — xử lý cả tiếng Đức
function iconForLabel(label: string): ReactNode {
    const l = label.toLowerCase();
    if (l.includes("über mich") || l.includes("ueber mich") || l.includes("about")) return <LuUser />;
    if (l.includes("projekt") || l.includes("project")) return <LuFolderKanban />;
    if (l.includes("fähigkeit") || l.includes("skill")) return <LuSparkles />;
    if (l.includes("freizeit") || l.includes("hobby")) return <LuCoffee />;
    if (l.includes("kontakt") || l.includes("contact")) return <LuMail />;
    if (l.includes("weitere") || l.includes("info")) return <LuInfo />;
    return null;
}

function getSectionFromPrompt(prompt: string): string | null {
    const lower = prompt.toLowerCase().trim();
    for (const [section, keywords] of Object.entries(PERSONAL_INFO_KEYWORDS_BY_SECTION)) {
        for (const kw of keywords) {
            if (lower.includes(kw.toLowerCase().trim())) return section;
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
    
    // New AI-enhanced state
    const [smartQuestions, setSmartQuestions] = useState<string[]>([]);
    const [aiInsights, setAiInsights] = useState<AIInsights | null>(null);
    const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);
    const [userInterests, setUserInterests] = useState<string[]>([]);
    const [projectRecommendations, setProjectRecommendations] = useState<ProjectRecommendation[]>([]);

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

    // scroll xuống đáy khi chat bình thường
    useEffect(() => {
        if (!chatRef.current) return;
        if (chatHistory.length > 1 && !getSectionFromPrompt(chatHistory[0]?.content)) {
            chatRef.current.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
        }
        // eslint-disable-next-line
    }, [chatHistory, loading, showTopQuestion]);

    useEffect(() => {
        if (chatHistory.length > 0 && chatHistory[0].role === "user" && pendingAnswer) {
            setShowTopQuestion(true);
            const t = setTimeout(() => {
                setShowTopQuestion(false);
                setChatHistory([chatHistory[0], pendingAnswer]);
                setPendingAnswer(null);
            }, 900);
            return () => clearTimeout(t);
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

    // Handle image upload and analysis
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Check if it's an image
        if (!file.type.startsWith('image/')) {
            alert('Bitte wähle eine Bilddatei aus.');
            return;
        }

        setIsAnalyzingImage(true);
        try {
            // Convert to base64
            const base64 = await convertImageToBase64(file);
            
            // Analyze with AI
            const result = await analyzeImage(undefined, base64, "Analysiere dieses Bild im Kontext meines Tech-Portfolios");
            
            if (result.success) {
                // Add analysis to chat
                const userMessage: ChatMessage = { role: "user", content: `[Bild hochgeladen: ${file.name}]` };
                const aiMessage: ChatMessage = { role: "assistant", content: `🖼️ **Bildanalyse:**\n\n${result.analysis}` };
                
                setChatHistory(prev => [...prev, userMessage, aiMessage]);
            } else {
                alert('Fehler bei der Bildanalyse. Bitte versuche es erneut.');
            }
        } catch (error) {
            console.error('Image upload error:', error);
            alert('Fehler beim Verarbeiten des Bildes.');
        }
        setIsAnalyzingImage(false);
        
        // Reset input
        event.target.value = '';
    };

    const handleChat = async (userPrompt: string) => {
        setLoading(true);
        setShowTopQuestion(true);
        setPendingAnswer(null);
        setActiveSection(getSectionFromPrompt(userPrompt) || activeSection);
        
        try {
            // Build context for enhanced AI
            const context: ChatContext = {
                conversationHistory: chatHistory,
                currentSection: activeSection,
                userInterests: userInterests
            };
            
            const assistantMessage = await sendChatMessage(userPrompt, context);
            setPendingAnswer(assistantMessage);
            
            // Update conversation history for context
            const userMessage: ChatMessage = { role: "user", content: userPrompt };
            const newHistory: ChatMessage[] = [...chatHistory, userMessage, assistantMessage];
            
            // Generate smart questions after response
            if (newHistory.length >= 2) {
                try {
                    const questions = await generateSmartQuestions({
                        conversationHistory: newHistory.slice(-4), // Last 2 exchanges
                        currentSection: activeSection,
                        userInterests: userInterests
                    });
                    setSmartQuestions(questions);
                } catch (error) {
                    console.error("Error generating smart questions:", error);
                }
            }
            
            // Get AI insights after a few exchanges
            if (newHistory.length >= 4) {
                try {
                    const insights = await getAIInsights(newHistory);
                    if (insights.success) {
                        setAiInsights(insights.insights);
                        setUserInterests(insights.insights.userInterests);
                        
                        // Get project recommendations based on insights
                        if (insights.insights.userInterests.length > 0) {
                            const recommendations = await getProjectRecommendations(
                                insights.insights.userInterests,
                                insights.insights.conversationSummary,
                                insights.insights.technicalLevel
                            );
                            if (recommendations.success) {
                                setProjectRecommendations(recommendations.recommendations.recommendedProjects);
                            }
                        }
                    }
                } catch (error) {
                    console.error("Error getting AI insights:", error);
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setPendingAnswer({ role: "assistant", content: "Entschuldigung, ich konnte keine Antwort generieren. Bitte versuche es erneut." });
        }
        setLoading(false);
    };

    return (
        // overlay căn giữa toàn màn (giữ nguyên như yêu cầu của bạn)
        <Box position="fixed" inset="0" display="grid" placeItems="center" p={{ base: 3, md: 6 }} zIndex={20}>
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
                {/* Hiển thị hội thoại */}
                <Box ref={chatRef} flex="1" w="100%" minH={0} overflowY="auto" pr={{ base: 1, md: 2 }}>
                    <AnimatePresence>
                        {chatHistory.length > 0 && chatHistory[0].role === "user" && showTopQuestion && (
                            <MotionFlex
                                key="question"
                                w="100%"
                                justify="center"
                                mb={3}
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
                                        >
                                            <Typewriter words={[chatHistory[1].content]} loop={1} cursor={false} typeSpeed={22} deleteSpeed={0} delaySpeed={900} />
                                        </Text>
                                    </motion.div>
                                )}
                        </AnimatePresence>

                        {chatHistory.length === 0 && (
                            <Text color="gray.500" textAlign="center" pt={4}>
                                Ask me anything!
                            </Text>
                        )}

                        {(loading || (showTopQuestion && pendingAnswer)) && (
                            <Flex align="center" gap={2} color="blue.500" opacity={0.85} fontStyle="italic">
                                <Box as={FaRobot} />
                                Thinking...
                            </Flex>
                        )}
                    </VStack>
                </Box>

                {/* Footer sticky: chip + input (chuẩn v3) */}
                <Box
                    mt={{ base: 2, md: 3 }}
                    position="sticky"
                    bottom="0"
                    bg="linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.85) 24%, rgba(255,255,255,0.95) 100%)"
                    backdropFilter="blur(6px)"
                    pt={3}
                    pb={`max(8px, env(safe-area-inset-bottom))`}
                    zIndex={1}
                >
                    <Flex justify="center" mb={2}>
                        <HStack gap={2} flexWrap="wrap" maxW="92%" justify="center">
                            {sections.map((s) => {
                                const isActive = activeSection === s.key;
                                return (
                                    <Button
                                        key={`bottom-${s.key}`}
                                        size="xs"
                                        variant={isActive ? "solid" : "ghost"}
                                        colorPalette="teal"
                                        borderRadius="full"
                                        onClick={() => handleSection(s.key)}
                                        gap="6px" // v3: dùng gap thay iconSpacing
                                    >
                                        {iconForLabel(s.label)}
                                        {s.label}
                                    </Button>
                                );
                            })}
                        </HStack>
                    </Flex>

                    {/* Smart Questions Section */}
                    {smartQuestions.length > 0 && (
                        <Box mb={3} px={2}>
                            <Text fontSize="xs" color="gray.600" mb={2} textAlign="center">
                                💡 Empfohlene Fragen:
                            </Text>
                            <HStack gap={2} flexWrap="wrap" justify="center" maxW="100%">
                                {smartQuestions.map((question, idx) => (
                                    <Button
                                        key={idx}
                                        size="xs"
                                        variant="outline"
                                        colorPalette="blue"
                                        borderRadius="full"
                                        fontSize="11px"
                                        px={3}
                                        maxW="280px"
                                        overflow="hidden"
                                        whiteSpace="nowrap"
                                        textOverflow="ellipsis"
                                        onClick={() => {
                                            setInput(question);
                                            handleChat(question);
                                        }}
                                    >
                                        {question}
                                    </Button>
                                ))}
                            </HStack>
                        </Box>
                    )}

                    {/* AI Insights Display */}
                    {aiInsights && (
                        <Box mb={3} px={2}>
                            <Text fontSize="xs" color="gray.600" mb={1} textAlign="center">
                                🎯 AI-Analyse: {aiInsights.technicalLevel} • {aiInsights.topicsDiscussed.join(', ')}
                            </Text>
                        </Box>
                    )}

                    {/* Project Recommendations */}
                    {projectRecommendations.length > 0 && (
                        <Box mb={3} px={2}>
                            <Text fontSize="xs" color="gray.600" mb={2} textAlign="center">
                                🤖 Empfohlene Projekte für dich:
                            </Text>
                            <HStack gap={2} flexWrap="wrap" justify="center" maxW="100%">
                                {projectRecommendations.slice(0, 2).map((project, idx) => (
                                    <Button
                                        key={idx}
                                        size="xs"
                                        variant="outline"
                                        colorPalette="green"
                                        borderRadius="full"
                                        fontSize="11px"
                                        px={3}
                                        maxW="200px"
                                        overflow="hidden"
                                        whiteSpace="nowrap"
                                        textOverflow="ellipsis"
                                        title={`${project.title}: ${project.reason}`}
                                        onClick={() => {
                                            const question = `Erzähl mir mehr über das ${project.title} Projekt`;
                                            setInput(question);
                                            handleChat(question);
                                        }}
                                    >
                                        ⭐ {project.title}
                                    </Button>
                                ))}
                            </HStack>
                        </Box>
                    )}

                    <Flex justify="center" px={{ base: 1, sm: 2 }} gap={2}>
                        {/* Hidden file input for image upload */}
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            id="image-upload"
                            onChange={handleImageUpload}
                        />
                        
                        {/* Image upload button */}
                        <IconButton
                            aria-label="Upload image"
                            size="sm"
                            variant="outline"
                            colorPalette="purple"
                            borderRadius="full"
                            onClick={() => document.getElementById('image-upload')?.click()}
                            disabled={isAnalyzingImage}
                            title="Bild für AI-Analyse hochladen"
                        >
                            <FiImage />
                        </IconButton>

                        <Box w={{ base: "85%", sm: "78%", md: "65%" }}>
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
                                    placeholder={isAnalyzingImage ? "Bild wird analysiert..." : "Ask me anything..."}
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    size="sm"
                                    border="1px solid #e6e8ef"
                                    bg="#f7f9fb"
                                    borderRadius="full"
                                    _focusVisible={{ outline: "none", boxShadow: "0 0 0 3px rgba(59,130,246,0.22)" }}
                                    fontSize="sm"
                                    disabled={isAnalyzingImage}
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
