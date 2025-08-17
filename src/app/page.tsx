"use client";

import { useState } from "react";
import { Box, Flex, Container } from "@chakra-ui/react";
import ParticlesBackground from "@/components/chat/ParticlesBackground";
import AvatarHeader from "@/components/chat/AvatarHeader";
import ChatBox from "@/components/chat/ChatBox";
import { sectionDefaultPrompts } from "@/constants/sections";

export default function Home() {
    const [prompt, setPrompt] = useState<string | null>(sectionDefaultPrompts["me"]);

    return (
        <>
            <ParticlesBackground />

            <Flex
                direction="column"
                minH="100svh"              // tốt cho mobile viewport
                pos="relative"
                bg="transparent"
                zIndex={1}
            >
                {/* Header area */}
                <Container
                    maxW={{ base: "container.sm", md: "container.md" }}
                    px={{ base: 4, md: 6 }}
                    pt={{ base: 6, md: 10 }}
                    pb={{ base: 2, md: 4 }}
                    zIndex={1002}
                    centerContent
                >
                    <AvatarHeader />
                </Container>

                {/* Chat area */}
                <Flex
                    as="main"
                    flex="1"
                    justify="center"
                    align={{ base: "stretch", md: "flex-start" }}
                    px={{ base: 2, sm: 4, md: 6 }}
                    pb={{ base: 4, md: 8 }}
                >
                    <Box
                        w="100%"
                        maxW={{ base: "100%", sm: "640px", md: "720px" }}  // giới hạn chiều rộng chat
                        mx="auto"
                    >
                        <ChatBox
                            prompt={prompt}
                            onPromptHandledAction={() => setPrompt(null)}
                        />
                    </Box>
                </Flex>
            </Flex>
        </>
    );
}
