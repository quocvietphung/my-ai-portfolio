"use client";
import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import ParticlesBackground from "@/components/ParticlesBackground";
import AvatarHeader from "@/components/AvatarHeader";
import ControlSegment from "@/components/ControlSegment";
import ChatBox from "@/components/ChatBox"; // import mới

export default function Home() {
    const [section, setSection] = useState("me");

    // Handle: chuyển section sẽ reset chat qua prop section
    // ChatBox sẽ nhận section để biết khi nào reset chat (xem trên)

    // Để gửi prompt từ ControlSegment, bạn cần truyền function handleSection vào,
    // bên trong handleSection sẽ gọi handleChat của ChatBox thông qua ref hoặc callback,
    // hoặc đơn giản: để ControlSegment truyền luôn prompt xuống ChatBox qua props (xem lại flow).

    // Dưới đây là ví dụ đơn giản: ControlSegment truyền prompt về Home, rồi Home truyền prompt cho ChatBox
    // Để đơn giản hóa, ở đây Home chỉ render AvatarHeader, ChatBox và ControlSegment.

    return (
        <>
            <ParticlesBackground />
            {/* AvatarHeader cố định */}
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
            {/* Main layout */}
            <Flex
                direction="column"
                minH="100vh"
                pos="relative"
                bg="transparent"
                zIndex={1}
            >
                {/* Khung chat */}
                <Flex
                    flex="1"
                    align="center"
                    justify="center"
                    pt="170px"
                    pb="120px"
                >
                    <ChatBox section={section} />
                </Flex>
                {/* Control input – luôn nổi cuối trang */}
                <Box
                    pos="fixed"
                    bottom="32px"
                    left={0}
                    w="100%"
                    zIndex={1001}
                    backdropFilter="blur(12px)"
                    bg="transparent"
                >
                    <ControlSegment onSelect={(key) => setSection(key)} />
                </Box>
            </Flex>
        </>
    );
}
