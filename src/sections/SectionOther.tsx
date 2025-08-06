// src/sections/SectionOther.tsx
import { Box, Text } from "@chakra-ui/react";

export default function SectionOther() {
    return (
        <Box p={6}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Other
            </Text>
            <Text>Other info goes here...</Text>
        </Box>
    );
}
