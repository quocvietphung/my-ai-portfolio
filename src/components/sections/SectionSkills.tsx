// src/sections/SectionSkills.tsx
import { Box, Text } from "@chakra-ui/react";

export default function SectionSkills() {
    return (
        <Box p={6}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Skills
            </Text>
            <Text>
                My skills include JavaScript, Python, AI, ML, and cloud computing.
            </Text>
        </Box>
    );
}
