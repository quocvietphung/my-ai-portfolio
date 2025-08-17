// src/components/SectionContact.tsx
"use client";

import { Box, Text, Link, HStack, Icon, VStack, Button } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const LINKEDIN_COLOR = "#0A66C2";
const LINKEDIN_HOVER = "#084d99";

export default function SectionContact() {
    return (
        <Box
            w="100%"
            maxW={{ base: "100%", md: "1100px", lg: "1280px", "2xl": "1440px" }}
            mx="auto"
            p={{ base: 6, md: 8 }}
            bg="transparent"
            border="0"
            borderColor="transparent"
            borderRadius="2xl"
            boxShadow="none"
        >
            <Text
                fontSize={{ base: "2xl", md: "3xl" }}
                fontWeight="extrabold"
                letterSpacing="-0.02em"
                mb={{ base: 4, md: 6 }}
            >
                Kontakt & Netzwerke
            </Text>

            <VStack alignItems="flex-start" gap={4}>
                <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">
                    Wenn du <b>meine Projekte und Code-Beispiele</b> anschauen möchtest, findest du alles auf{" "}
                    <Icon as={FaGithub} color="gray.700" boxSize={5} mb="-2px" />
                    <Link
                        href="https://github.com/quocvietphung"
                        color="teal.600"
                        fontWeight="semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                        ml={1}
                        textDecoration="underline"
                        _hover={{ color: "teal.700" }}
                    >
                        meinem GitHub-Profil
                    </Link>
                    .
                </Text>

                <Text fontSize={{ base: "md", md: "lg" }} color="gray.700">
                    Meinen <b>Lebenslauf, Zertifikate und mehr über mich</b> findest du auf{" "}
                    <Icon as={FaLinkedin} color={LINKEDIN_COLOR} boxSize={5} mb="-2px" />
                    <Link
                        href="https://www.linkedin.com/in/viet-phung-00b740168/"
                        color="teal.600"
                        fontWeight="semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                        ml={1}
                        textDecoration="underline"
                        _hover={{ color: "teal.700" }}
                    >
                        LinkedIn
                    </Link>
                    .
                </Text>
            </VStack>

            <HStack mt={{ base: 6, md: 8 }} gap={4} justifyContent="center" flexWrap="wrap">
                <Button asChild variant="outline" colorPalette="gray" size="md" borderRadius="full" px={5} py={5}>
                    <a
                        href="https://github.com/quocvietphung"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open GitHub profile"
                    >
                        <HStack gap={2}>
                            <FaGithub />
                            <span>GitHub ansehen</span>
                        </HStack>
                    </a>
                </Button>

                <Button
                    asChild
                    variant="solid"
                    size="md"
                    borderRadius="full"
                    px={5}
                    py={5}
                    bg={LINKEDIN_COLOR}
                    _hover={{ bg: LINKEDIN_HOVER }}
                    color="white"
                    boxShadow="0 8px 24px rgba(10,102,194,0.26)"
                >
                    <a
                        href="https://www.linkedin.com/in/viet-phung-00b740168/"
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Open LinkedIn profile"
                    >
                        <HStack gap={2}>
                            <FaLinkedin />
                            <span>LinkedIn besuchen</span>
                        </HStack>
                    </a>
                </Button>
            </HStack>
        </Box>
    );
}
