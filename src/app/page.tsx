"use client";
import { Box, Flex } from "@chakra-ui/react";
import ParticlesBackground from "@/components/chat/ParticlesBackground";
import AvatarHeader from "@/components/chat/AvatarHeader";
import ChatBox from "@/components/chat/ChatBox";

export default function Home() {
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
                    <ChatBox />
                </Flex>
            </Flex>
        </>
    );
}
