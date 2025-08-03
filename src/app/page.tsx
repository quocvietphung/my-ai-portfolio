"use client";
import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import ParticlesBackground from "@/components/ParticlesBackground";
import AvatarHeader from "@/components/AvatarHeader";
import ControlSegment from "@/components/ControlSegment";
import ChatBox from "@/components/ChatBox";

export default function Home() {
    const [section, setSection] = useState("me");
    const [prompt, setPrompt] = useState<string | null>(null);

    // Lắng nghe cả section lẫn prompt
    const handleControl = (key: string) => {
        if (key.startsWith("__chat:")) {
            setPrompt(key.replace("__chat:", ""));
        } else {
            setSection(key);
            setPrompt(null); // reset prompt nếu đổi tab
        }
    };

    return (
        <>
            <ParticlesBackground />
            <Box
                pos="fixed"
                top="32px"
                left="50%"
                transform="translateX(-50%)"
                zIndex={1002}
                w="min(700px, 90vw)"
                pointerEvents="auto"
            >
                <AvatarHeader />
            </Box>
            <Flex
                direction="column"
                minH="100vh"
                pos="relative"
                bg="transparent"
                zIndex={1}
            >
                <Flex
                    flex="1"
                    align="center"
                    justify="center"
                    pt="50px"
                    pb="80px"
                >
                    {/* Truyền prop prompt và hàm onPromptHandled */}
                    <ChatBox
                        section={section}
                        prompt={prompt}
                        onPromptHandled={() => setPrompt(null)}
                    />
                </Flex>
                <Box
                    pos="fixed"
                    bottom="32px"
                    left={0}
                    w="100%"
                    zIndex={1001}
                    backdropFilter="blur(12px)"
                    bg="transparent"
                >
                    {/* Truyền handleControl cho ControlSegment */}
                    <ControlSegment onSelect={handleControl} />
                </Box>
            </Flex>
        </>
    );
}
