// src/sections/SectionFun.tsx
import { Box, Text } from "@chakra-ui/react";

export default function SectionFun() {
    return (
        <Box p={6}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Fun
            </Text>
            <Text>
                I enjoy coding, hiking, and playing chess in my free time.
            </Text>
        </Box>
    );
}
