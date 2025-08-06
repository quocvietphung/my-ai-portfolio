"use client";

import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import ParticlesBackground from "@/components/chat/ParticlesBackground";
import AvatarHeader from "@/components/chat/AvatarHeader";
import ControlSegment from "@/components/chat/ControlSegment";
import ChatBox from "@/components/chat/ChatBox";
import { sectionDefaultPrompts } from "@/constants/sections";

export default function Home() {
    const [section, setSection] = useState<string>("me");
    const [prompt, setPrompt] = useState<string | null>(sectionDefaultPrompts["me"]);

    const handleControl = (key: string) => {
        if (key.startsWith("__chat:")) {
            setPrompt(key.replace("__chat:", ""));
        } else if (key.startsWith("__section:")) {
            const secKey = key.replace("__section:", "");
            setSection(secKey);
            setPrompt(sectionDefaultPrompts[secKey]);
        } else {
            setSection(key);
            setPrompt(sectionDefaultPrompts[key] || null);
        }
    };

    return (
        <>
            <ParticlesBackground />
            <Flex direction="column" minH="100vh" pos="relative" bg="transparent" zIndex={1}>
                <Box
                    w="min(700px, 90vw)"
                    mx="auto"
                    mt="40px"
                    mb="0"
                    display="flex"
                    justifyContent="center"
                    zIndex={1002}
                >
                    <AvatarHeader />
                </Box>
                <Flex flex="1" align="flex-start" justify="center" pt="0" pb="0">
                    <ChatBox section={section} prompt={prompt} onPromptHandled={() => setPrompt(null)} />
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
                    <ControlSegment onSelect={handleControl} />
                </Box>
            </Flex>
        </>
    );
}
