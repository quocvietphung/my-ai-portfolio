'use client';
import { useState } from 'react';
import {
    Box, Button, Flex, HStack,
    InputGroup, Input, IconButton
} from '@chakra-ui/react';
import { FiSend } from 'react-icons/fi';

const sections = [
    { key: 'me', label: 'Me' },
    { key: 'projects', label: 'Projects' },
    { key: 'skills', label: 'Skills' },
    { key: 'fun', label: 'Fun' },
    { key: 'contact', label: 'Contact' },
    { key: 'other', label: 'Other' },
];

export default function ControlSegment({ onSelect }: { onSelect: (key: string) => void }) {
    const [input, setInput] = useState('');

    const handleSend = () => {
        if (!input.trim()) return;
        onSelect('__chat:' + input.trim());
        setInput('');
    };

    return (
        <Box
            bg="white"
            py={6}
            px={4}
            borderRadius="2xl"
            boxShadow="0 10px 40px rgba(0,0,0,0.08)"
            maxW="780px"
            w="90%"
            mx="auto"
            mb={4}
        >
            <Flex justify="center">
                <HStack gap={4} wrap="wrap">
                    {sections.map((s) => (
                        <Button
                            key={s.key}
                            variant="outline"
                            colorPalette="teal"
                            borderRadius="full"
                            onClick={() => onSelect(s.key)}
                        >
                            {s.label}
                        </Button>
                    ))}
                </HStack>
            </Flex>

            <InputGroup mt={6} maxW="660px" mx="auto"
                        endElement={
                            <IconButton
                                aria-label="Send"
                                colorPalette="blue"
                                size="md"
                                borderRadius="full"
                                onClick={handleSend}
                                disabled={!input.trim()}
                            >
                                <FiSend />
                            </IconButton>
                        }
            >
                <Input
                    aria-label="Chat input"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    size="lg"
                    borderRadius="full"
                    bg="#f1f3f5"
                    pr="4.5rem"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
            </InputGroup>
        </Box>
    );
}
