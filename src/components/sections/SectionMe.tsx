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
                        src="/assets/avatar-viet.jpeg"
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
                        {[
                            "AI",
                            "Full-Stack",
                            "Cloud & Data",
                            "Lifelong Learner",
                            "SaaS Creator",
                        ].map((label) => (
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
                        Mein Name ist Viet Phung.
                    </Text>{" "}
                    Ich bin ein Fullstack Software Engineer mit einer tiefen
                    Leidenschaft für künstliche Intelligenz und moderne Softwareentwicklung.
                    In meiner Arbeit verbinde ich analytisches Denken mit Kreativität – immer
                    mit dem Ziel, Lösungen zu schaffen, die Sinn stiften und Menschen wirklich helfen.
                </Text>

                <Text>
                    In den letzten Jahren durfte ich vielseitige Erfahrungen sammeln –
                    von klassischen Webanwendungen bis zu komplexen Cloud- und KI-Projekten.
                    Jedes Projekt war für mich nicht nur eine technische Herausforderung,
                    sondern auch eine persönliche Reise: zu lernen, zu verstehen, und besser zu werden.
                </Text>

                <Text>
                    Technologie bedeutet für mich mehr als nur Code. Sie ist eine Sprache,
                    mit der wir Ideen greifbar machen können – eine Brücke zwischen Logik und Emotion.
                    Ich glaube daran, dass gute Software nicht nur funktioniert, sondern inspiriert.
                </Text>

                <Text>
                    Ich bin ein Mensch, der ständig lernt, reflektiert und neue Perspektiven sucht.
                    Diese Offenheit hat mich hierhergeführt – in die Welt von KI, Cloud und Innovation.
                    Heute lebe ich in Wuppertal und arbeite daran, die Zukunft ein Stück menschlicher zu gestalten.
                </Text>

                <Text as="span" fontWeight="semibold" color="teal.600">
                    Ich freue mich auf inspirierende Gespräche, gemeinsame Projekte
                    und den Austausch mit Menschen, die Technologie genauso lieben wie ich.
                </Text>
            </VStack>
        </Box>
    );
}
