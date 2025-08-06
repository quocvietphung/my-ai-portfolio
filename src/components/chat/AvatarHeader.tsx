"use client";

import { memo } from "react";
import { Box, Image } from "@chakra-ui/react";

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
    </Box>
));

export default AvatarHeader;
