"use client";

import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import ParticlesBackground from "@/components/chat/ParticlesBackground";
import AvatarHeader from "@/components/chat/AvatarHeader";
import ControlSegment from "@/components/chat/ControlSegment";
import ChatBox from "@/components/chat/ChatBox";
import { sectionDefaultPrompts } from "../constants/sections";

export default function Home() {
    // Khởi tạo section mặc định là "me"
    const [section, setSection] = useState<string>("me");
    // Khởi tạo prompt mặc định theo section "me"
    const [prompt, setPrompt] = useState<string | null>(sectionDefaultPrompts["me"]);

    const handleControl = (key: string) => {
        if (key.startsWith("__chat:")) {
            // Khi user nhập prompt thủ công
            setPrompt(key.replace("__chat:", ""));
        } else if (key.startsWith("__section:")) {
            // Khi user bấm nút chọn section
            const secKey = key.replace("__section:", "");
            setSection(secKey);
            // Gửi prompt mặc định cho section được chọn
            setPrompt(sectionDefaultPrompts[secKey]);
        } else {
            // Nếu key là section trực tiếp
            setSection(key);
            setPrompt(sectionDefaultPrompts[key] || null);
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

            <Flex direction="column" minH="100vh" pos="relative" bg="transparent" zIndex={1}>
                <Flex flex="1" align="center" justify="center" pt="50px" pb="80px">
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
