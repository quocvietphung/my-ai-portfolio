// src/components/chat/AvatarHeader.tsx
"use client";

import { memo } from "react";
import { Box, Heading, Text, Avatar } from "@chakra-ui/react";

const AvatarHeader = memo(function AvatarHeader() {
    return (
        <Box position="relative" textAlign="center" mb={{ base: 6, md: 8 }}>
            <Box
                aria-hidden
                position="absolute"
                top={{ base: "6px", md: "8px" }}
                left="50%"
                transform="translateX(-50%)"
                w={{ base: "200px", sm: "240px", md: "280px" }}
                h={{ base: "90px", sm: "110px", md: "130px" }}
                bg="radial-gradient(circle at 65% 35%, #ffd6fa90 0%, #aee7f799 70%, #ffffff00 100%)"
                filter="blur(30px)"
                zIndex={0}
            />

            <Avatar.Root
                w={{ base: "84px", sm: "96px", md: "110px" }}
                h={{ base: "84px", sm: "96px", md: "110px" }}
                mx="auto"
                mb={{ base: 3, md: 4 }}
                borderRadius="full"
                border="3px solid var(--chakra-colors-white)"
                boxShadow="0 4px 14px rgba(0,0,0,0.12)"
                overflow="hidden"
                bg="var(--chakra-colors-white)"
            >
                <Avatar.Fallback>VP</Avatar.Fallback>
                <Avatar.Image
                    src="/assets/avatar-memoji.png"
                    alt="Viet Phung avatar"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
            </Avatar.Root>

            {/* Name */}
            <Heading
                as="h1"
                fontWeight="extrabold"
                fontSize={{ base: "xl", sm: "2xl", md: "3xl" }}
                letterSpacing="-0.02em"
                lineHeight="1.2"
                position="relative"
                zIndex={2}
            >
                Viet Phung
            </Heading>

            {/* Subtitle */}
            <Text
                color="var(--chakra-colors-gray-500)"
                fontSize={{ base: "sm", sm: "md" }}
                mt={{ base: 1, md: 2 }}
                mb={{ base: 3, md: 5 }}
                position="relative"
                zIndex={2}
            >
                AI Consultant • Data Engineer • Softwareentwickler
            </Text>
        </Box>
    );
});

export default AvatarHeader;
