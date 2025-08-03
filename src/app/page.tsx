"use client";
import { useState } from "react";
import { Box, Flex, VStack, Text } from "@chakra-ui/react";
import { useColorModeValue } from '@chakra-ui/color-mode';
import { FaRobot } from "react-icons/fa";
import ParticlesBackground from "@/components/ParticlesBackground";
import AvatarHeader from "@/components/AvatarHeader";
import ControlSegment from "@/components/ControlSegment";

export default function Home() {
    const [section, setSection] = useState("me");
    const [chatHistory, setChatHistory] = useState<{ role: string; content: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const handleSection = async (key: string) => {
        if (key.startsWith("__chat:")) {
            const prompt = key.replace("__chat:", "");
            const nextHistory = [...chatHistory, { role: "user", content: prompt }];
            setChatHistory(nextHistory);
            setLoading(true);
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
            const reply = data?.choices?.[0]?.message?.content || "No response.";
            setChatHistory(h => [...h, { role: "assistant", content: reply }]);
            setLoading(false);
        } else {
            setSection(key);
        }
    };

    // Màu sắc nổi bật, sử dụng theme Chakra UI
    const userBg = useColorModeValue("#fff", "gray.700");
    const aiBg = useColorModeValue("#e0f2fe", "blue.900");
    const userBorder = useColorModeValue("#60a5fa", "blue.400");
    const aiBorder = useColorModeValue("#0ea5e9", "blue.500");

    return (
        <>
            <ParticlesBackground />

            <Flex
                direction="column"
                minH="100vh"
                pos="relative"
                overflow="hidden"
                bg="transparent"
                zIndex={1}
            >
                <Flex
                    flex="1"
                    overflowY="auto"
                    pb="200px"
                    pt="4em"
                    align="center"
                    direction="column"
                >
                    <AvatarHeader />

                    {/* Khung chat */}
                    <Box
                        mt="32px"
                        minH="320px"
                        w={["98vw", "90vw", "700px"]}
                        border="2px solid"
                        borderColor="#93c5fd"
                        borderRadius="2xl"
                        bg="rgba(255,255,255,0.92)"
                        p="32px"
                        boxShadow="0 4px 32px 0 rgba(30,64,175,0.10)"
                        fontSize="17px"
                        minW="320px"
                        maxW="90vw"
                        zIndex={2}
                        backdropFilter="blur(6px)"
                        transition="box-shadow 0.2s"
                    >
                        {chatHistory.length === 0 ? (
                            <Text color="#aaa" align="center">
                                Ask me anything!
                            </Text>
                        ) : (
                            <VStack gap={4} align="stretch">
                                {chatHistory.map((m, i) => (
                                    <Flex
                                        key={i}
                                        align="center"
                                        justify={m.role === "user" ? "flex-end" : "flex-start"}
                                    >
                                        <Box
                                            bg={m.role === "user" ? userBg : aiBg}
                                            color={m.role === "user" ? "#222" : "#0369a1"}
                                            border="1.5px solid"
                                            borderColor={m.role === "user" ? userBorder : aiBorder}
                                            borderRadius={
                                                m.role === "user"
                                                    ? "18px 18px 8px 18px"
                                                    : "18px 18px 18px 8px"
                                            }
                                            boxShadow={
                                                m.role === "user"
                                                    ? "0 2px 12px 0 rgba(59,130,246,0.06)"
                                                    : "0 2px 12px 0 rgba(14,165,233,0.11)"
                                            }
                                            fontWeight={m.role === "assistant" ? 600 : 500}
                                            fontSize="17px"
                                            px="19px"
                                            py="13px"
                                            maxW="80%"
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
                                ))}
                                {loading && (
                                    <Flex align="center" justify="flex-start" color="#0ea5e9" opacity={0.68} fontStyle="italic" mt={2} ml={2}>
                                        <Box as={FaRobot} display="inline" mr={2} mb="-2px" />
                                        Thinking...
                                    </Flex>
                                )}
                            </VStack>
                        )}
                    </Box>
                </Flex>

                {/* Control input */}
                <Box
                    pos="fixed"
                    bottom="40px"
                    left={0}
                    w="100%"
                    zIndex={1000}
                    backdropFilter="blur(12px)"
                    bg="transparent"
                >
                    <ControlSegment onSelect={handleSection} />
                </Box>
            </Flex>
        </>
    );
}
