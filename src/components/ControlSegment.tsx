'use client';
import { useState } from 'react';
import {
    Box, Button, Flex, HStack,
    Input, IconButton
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
            bg="rgba(255,255,255,0.75)"
            py={8}
            px={6}
            borderRadius="2xl"
            border="1px solid rgba(255,255,255,0.35)"
            backdropFilter="blur(14px)"
            boxShadow="0 20px 60px rgba(0,0,0,0.12)"
            maxW="820px"
            w="92%"
            mx="auto"
            mb={8}
            transition="all .3s ease"
            _hover={{ boxShadow: '0 24px 75px rgba(0,0,0,0.18)' }}
        >
            {/* Section buttons */}
            <Flex justify="center" mb={6}>
                <HStack gap={5} wrap="wrap">
                    {sections.map((s) => (
                        <Button
                            key={s.key}
                            variant="ghost"
                            colorPalette="teal"
                            fontWeight="600"
                            px={6}
                            py={4}
                            borderRadius="full"
                            _hover={{
                                bg: 'teal.50',
                                transform: 'translateY(-2px)',
                                boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
                            }}
                            _active={{
                                bg: 'teal.100',
                                transform: 'translateY(0)',
                                boxShadow: 'none',
                            }}
                            onClick={() => onSelect(s.key)}
                        >
                            {s.label}
                        </Button>
                    ))}
                </HStack>
            </Flex>

            {/* Chat input */}
            <Flex
                maxW="680px"
                mx="auto"
                bg="rgba(241,243,245,0.85)"
                borderRadius="full"
                px={4}
                py={2}
                boxShadow="0 4px 14px rgba(0,0,0,0.06)"
                align="center"
                gap={2}
            >
                <Input
                    aria-label="Chat input"
                    placeholder="Ask me anything..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    size="md"
                    border="none"
                    bg="transparent"
                    borderRadius="full"
                    _focusVisible={{ boxShadow: 'none' }}
                    fontSize="md"
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />
                <IconButton
                    aria-label="Send"
                    children={<FiSend />}
                    colorScheme="blue"
                    size="md"
                    borderRadius="full"
                    bg="blue.400"
                    color="white"
                    _hover={{ bg: 'blue.500' }}
                    onClick={handleSend}
                    disabled={!input.trim()}
                />
            </Flex>
        </Box>
    );
}
