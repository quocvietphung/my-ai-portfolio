// src/sections/SectionMe.tsx
import { Box, Text } from "@chakra-ui/react";

export default function SectionMe() {
    return (
        <Box p={6}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
                About Me
            </Text>
            <Text>
                I'm Viet, an AI enthusiast and software engineer with experience in AI projects.
            </Text>
        </Box>
    );
}
