"use client";

import { memo } from "react";
import { Box, Heading, Image, Text } from "@chakra-ui/react";

const AvatarHeader = memo(() => (
    <Box position="relative" mb="1.5em" textAlign="center">
        <Box
            position="absolute"
            top="22px"
            left="50%"
            transform="translateX(-50%)"
            width="260px"
            height="120px"
            bg="radial-gradient(circle at 65% 35%, #ffd6fa90 0%, #aee7f799 70%, #ffffff00 100%)"
            filter="blur(30px)"
            zIndex={0}
        />
        <Image
            src="/assets/avatar-memoji.png"
            alt="Avatar"
            boxSize="110px"
            borderRadius="full"
            mx="auto"
            mb="1em"
            bg="#fff"
            zIndex={1}
            position="relative"
        />
        <Heading
            as="h1"
            fontWeight="extrabold"
            letterSpacing={1}
            zIndex={2}
            position="relative"
        >
            Viet Phung
        </Heading>
        <Text
            color="#5f6368"
            mb="1.2em"
            fontSize="lg"
            zIndex={2}
            position="relative"
        >
            AI Consultant • Data Engineer • Softwareentwickler
        </Text>
    </Box>
));

export default AvatarHeader;
