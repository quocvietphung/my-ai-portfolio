// src/sections/SectionContact.tsx
import { Box, Text, Link } from "@chakra-ui/react";

export default function SectionContact() {
    return (
        <Box p={6}>
            <Text fontSize="lg" fontWeight="semibold" mb={2}>
                Contact
            </Text>
            <Text>
                You can reach me at{" "}
                <Link href="mailto:viet@example.com" color="blue.500">
                    viet@example.com
                </Link>
                .
            </Text>
        </Box>
    );
}
