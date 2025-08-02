"use client";

import { Box, Button, Flex, HStack, Input, InputGroup, IconButton } from "@chakra-ui/react";
import { FiSend } from "react-icons/fi";
import { useState } from "react";

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
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (!input.trim()) return;
        // TODO: call OpenAI here
        alert("Bạn vừa hỏi: " + input);
        setInput("");
    };

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
        >
            <Flex justify="center">
                <HStack spacing={4} wrap="wrap">
                    {sections.map((s) => (
                        <Button
                            key={s.key}
                            variant="outline"
                            colorPalette="teal"
                            onClick={() => onSelect(s.key)}
                            borderRadius="full"
                        >
                            {s.label}
                        </Button>
                    ))}
                </HStack>
            </Flex>

            <InputGroup mt={6} maxW="660px" mx="auto" endElement={
                <IconButton
                    aria-label="Send"
                    icon={<FiSend />}
                    colorPalette="blue"
                    borderRadius="full"
                    onClick={handleSend}
                    disabled={!input.trim()}
                />
            }>
                <Input
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    size="lg"
                    borderRadius="full"
                    bg="#f1f3f5"
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleSend())}
                />
            </InputGroup>
        </Box>
    );
}
