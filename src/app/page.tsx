// app/page.tsx
"use client";

import { useState } from "react";
import { Box } from "@chakra-ui/react";
import ParticlesBackground from "@/components/chat/ParticlesBackground";
import ChatBox from "@/components/chat/ChatBox";
import { sectionDefaultPrompts } from "@/constants/sections";

export default function Home() {
    const [prompt, setPrompt] = useState<string | null>(sectionDefaultPrompts["me"]);

    return (
        <>
            <ParticlesBackground />
            <Box
                as="main"
                minH="100svh"
                display="grid"
                placeItems="center"
                px={{ base: 2, sm: 4, md: 6 }}
                py={{ base: 4, md: 8 }}
                pos="relative"
                zIndex={1}
            >
                <Box w="100%" maxW={{ base: "100%", md: "980px", lg: "1200px" }}>
                    <ChatBox prompt={prompt} onPromptHandledAction={() => setPrompt(null)} />
                </Box>
            </Box>
        </>
    );
}
