"use client";
import { Box, Button, Flex, HStack } from "@chakra-ui/react";

const sections = [
    { key: "me", label: "Me" },
    { key: "projects", label: "Projects" },
    { key: "skills", label: "Skills" },
    { key: "fun", label: "Fun" },
    { key: "contact", label: "Contact" },
    { key: "other", label: "Other" },
];

interface Props {
    onSelect: (key: string) => void;
}

export default function ControlSegment({ onSelect }: Props) {
    return (
        <Box
            bg="white"
            py={6}
            px={4}
            borderRadius="2xl"
            boxShadow="0 10px 40px rgba(0,0,0,0.08)"
            maxW="780px"
            width="90%"
            mx="auto"
            mb={4}
        >
            <Flex justify="center">
                <HStack gap={4} wrap="wrap">
                    {sections.map((item) => (
                        <Button
                            key={item.key}
                            variant="outline"
                            colorScheme="teal"
                            onClick={() => onSelect(item.key)}
                            borderRadius="full"
                        >
                            {item.label}
                        </Button>
                    ))}
                </HStack>
            </Flex>
        </Box>
    );
}
