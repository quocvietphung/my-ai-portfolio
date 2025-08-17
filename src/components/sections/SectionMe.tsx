// src/sections/SectionMe.tsx
"use client";

import Image from "next/image";
import {
    Box,
    Flex,
    Text,
    Wrap,
    WrapItem,
    Tag,
    VStack,
    HStack,
} from "@chakra-ui/react";

export default function SectionMe() {
    return (
        <Box
            px={{ base: 4, md: 6 }}
            py={{ base: 6, md: 8 }}
            bgGradient="linear(to-br, white, gray.50)"
            border="1px solid"
            borderColor="gray.200"
            borderRadius="2xl"
            boxShadow="0 12px 48px rgba(2,32,71,.06)"
        >
            <Flex
                direction={{ base: "column", md: "row" }}
                align={{ md: "center" }}
                gap={{ base: 5, md: 7 }}
            >
                <Box
                    position="relative"
                    boxSize={{ base: "96px", md: "120px" }}
                    flexShrink={0}
                    borderRadius="xl"
                    overflow="hidden"
                    boxShadow="0 6px 22px rgba(0,0,0,0.12)"
                >
                    <Image
                        src="/assets/avatar-viet.png"
                        alt="Viet Phung"
                        fill
                        sizes="(min-width: 768px) 120px, 96px"
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </Box>

                <VStack align="start" gap={2} flex="1" minW={0}>
                    <Text
                        fontSize={{ base: "xl", md: "2xl" }}
                        fontWeight="extrabold"
                        letterSpacing="-0.02em"
                    >
                        Viet Phung
                    </Text>

                    <HStack gap={2} color="fg.muted" fontSize={{ base: "sm", md: "md" }}>
                        <Text as="span">AI Consultant</Text>
                        <Text as="span">•</Text>
                        <Text as="span">Software Engineer</Text>
                    </HStack>

                    <Wrap gap={2}>
                        {["AI", "Full-Stack", "Entrepreneur", "SaaS Creator"].map((label) => (
                            <WrapItem key={label}>
                                <Tag.Root
                                    size="sm"
                                    colorPalette="teal"
                                    variant="subtle"
                                    borderRadius="full"
                                >
                                    <Tag.Label>{label}</Tag.Label>
                                </Tag.Root>
                            </WrapItem>
                        ))}
                    </Wrap>
                </VStack>
            </Flex>

            <VStack
                align="start"
                gap={4}
                mt={{ base: 6, md: 7 }}
                color="fg"
                fontSize={{ base: "md", md: "lg" }}
                lineHeight={1.85}
            >
                <Text>
                    <Text as="span" fontWeight="semibold" fontSize={{ base: "lg", md: "xl" }}>
                        Mein Name ist Viet{" "}
                    </Text>
                    <Text as="span" aria-hidden>
                        🤖
                    </Text>
                    <Text as="span">
                        {" "}
                        – Softwareentwickler mit Herz für KI, neugierig und offen für neue
                        Wege. Mein Lebensmittelpunkt ist Wuppertal, Deutschland.
                    </Text>
                </Text>

                <Text>
                    <Text as="span" aria-hidden>
                        💻{" "}
                    </Text>
                    In den letzten Jahren habe ich als Software Engineer vielseitige
                    Erfahrungen gesammelt. Ich bin dankbar für diese Möglichkeiten – für
                    jedes Projekt, jedes Team, jede Herausforderung, die mich ein Stück
                    weitergebracht haben.
                </Text>

                <Text>
                    <Text as="span" aria-hidden>
                        🚀{" "}
                    </Text>
                    Jetzt freue ich mich darauf, mein Wissen im Bereich Machine Learning
                    und Künstliche Intelligenz weiter auszubauen. Mein Wunsch ist es,
                    gemeinsam mit anderen Lösungen zu entwickeln, die den Alltag
                    bereichern und echten Mehrwert schaffen.
                </Text>

                <Text>
                    <Text as="span" aria-hidden>
                        💡{" "}
                    </Text>
                    Für mich stehen der offene Austausch, gemeinsames Lernen und
                    gegenseitige Inspiration im Mittelpunkt. Ich glaube daran, dass
                    Innovation aus Teamgeist und Begeisterung entsteht.
                </Text>

                <Text>
                    <Text as="span" aria-hidden>
                        🌱{" "}
                    </Text>
                    Meine Auszeiten finde ich beim Reisen, in der Meditation 🧘‍♂️, beim
                    Zeichnen 🎨 oder wenn ich neue Ideen in kleinen Videos 🎬 festhalte.
                </Text>

                <Text as="span" fontWeight="semibold" color="teal.600">
                    Ich freue mich auf neue Kontakte, Inspiration und gemeinsame Projekte
                    rund um KI!
                </Text>
            </VStack>
        </Box>
    );
}
