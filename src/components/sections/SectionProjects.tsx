// src/sections/SectionProjects.tsx
"use client";

import {
    Box,
    Text,
    SimpleGrid,
    VStack,
    Icon,
    Wrap,
    WrapItem,
    Button,
    Link as ChakraLink,
    Tag,
    Flex,
    IconButton,
} from "@chakra-ui/react";
import type { IconType } from "react-icons";
import {
    FaGem,
    FaCreditCard,
    FaRobot,
    FaMicrophone,
    FaSearch,
    FaExternalLinkAlt,
} from "react-icons/fa";
import { LuCircleUser, LuFileBadge } from "react-icons/lu";

type ProjectTag = { label: string; icon?: IconType };

type Project = {
    title: string;
    icon: IconType;
    time: string;
    tags: ProjectTag[];
    desc: string;
    href?: string;
};

const projects: Project[] = [
    {
        title: "Speak German – AI Pronunciation Trainer",
        icon: FaMicrophone,
        time: "2025",
        tags: [
            { label: "Next.js" },
            { label: "Chakra UI" },
            { label: "Whisper AI" },
            { label: "TypeScript" },
        ],
        desc:
            "Interaktive App zur Verbesserung der deutschen Aussprache. Nutzer lesen Sätze vor, die per Whisper AI transkribiert und mit dem Zieltext verglichen werden. Das System gibt Feedback zu Fehlern, bewertet die Genauigkeit in Prozent und bietet Tipps zur Verbesserung.",
        href: "https://github.com/quocvietphung/speak-german",
    },
    {
        title: "AI Chatbot Portfolio (Azure OpenAI GPT-3.5)",
        icon: FaRobot,
        time: "2025",
        tags: [
            { label: "Next.js" },
            { label: "Chakra UI" },
            { label: "Azure OpenAI" },
            { label: "TypeScript" },
        ],
        desc:
            "Interaktives Portfolio mit integriertem Chatbot, betrieben durch Azure OpenAI GPT-3.5. Besucher können Fragen zu Projekten, Skills oder CV direkt stellen und erhalten sofortige Antworten.",
        href: "https://github.com/quocvietphung/my-ai-portfolio",
    },
    {
        title: "Diamantpreis-Prognose mit Machine Learning",
        icon: FaGem,
        time: "07.2025 – heute",
        tags: [
            { label: "Python", icon: LuCircleUser },
            { label: "Scikit-Learn", icon: LuFileBadge },
            { label: "XGBoost" },
            { label: "PCA" },
            { label: "Explainable AI" },
        ],
        desc:
            "Entwicklung einer ML-Pipeline zur Vorhersage von Diamantpreisen basierend auf realen Daten. Umfasst Datenbereinigung, Feature Selection (PCA), Regressionsmodelle (Random Forest, XGBoost), Hyperparameter-Optimierung sowie Performanceanalyse (MSE, R²). Ergebnisse wurden mittels Jupyter Notebooks für den Praxiseinsatz visualisiert und erklärt.",
        href: "https://github.com/quocvietphung/ML-Diamonds/tree/master",
    },
    {
        title: "Kreditkartenbetrugserkennung (End-to-End)",
        icon: FaCreditCard,
        time: "06.2025 – heute",
        tags: [
            { label: "Python", icon: LuCircleUser },
            { label: "Flask" },
            { label: "React" },
            { label: "Visualisierung" },
        ],
        desc:
            "Komplette Umsetzung eines Systems zur Erkennung von Kreditkartenbetrug mit modernsten ML-Methoden. Inklusive Datenanalyse, Backend-Entwicklung (Flask API), Frontend (React Dashboard), Visualisierung (Matplotlib) und Echtzeit-Auswertung für Explainability.",
        href: "https://github.com/quocvietphung/Risk-Vision-detector",
    },
    {
        title: "Dokumentanalyse mit Azure AI Services (Java & Angular)",
        icon: FaSearch,
        time: "2025",
        tags: [
            { label: "Azure AI Document Intelligence", icon: LuFileBadge },
            { label: "Java Spring Boot" },
            { label: "Angular" },
            { label: "REST API" },
            { label: "PDF & OCR" },
        ],
        desc:
            "Entwicklung eines webbasierten Systems zur automatisierten Analyse und Extraktion von Informationen aus PDF-Dokumenten. Integration von Azure AI Document Intelligence (Form Recognizer) zur Texterkennung und strukturierten Datenausgabe. Umsetzung mit Java Spring Boot (Backend, REST API) und Angular (Frontend) für eine interaktive Benutzeroberfläche.",
        href: "https://github.com/quocvietphung/document-analyzer",
    },
];

export default function SectionProjects() {
    const cardBorder = "var(--chakra-colors-gray-200)";
    const titleColor = "var(--chakra-colors-gray-900)";
    const descColor = "var(--chakra-colors-gray-700)";
    const timeColor = "var(--chakra-colors-gray-500)";
    const chipBg = "var(--chakra-colors-teal-50)";
    const chipColor = "var(--chakra-colors-teal-700)";

    return (
        <Box
            px={{ base: 4, md: 6 }}
            py={{ base: 7, md: 9 }}
            maxW={{ base: "1100px", md: "1200px" }}
            mx="auto"
        >
            <VStack align="start" gap={2} mb={6}>
                <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" letterSpacing={-0.5}>
                    Projekte & Highlights
                </Text>
                <Text color={timeColor} fontSize="sm">
                    Eine Auswahl aktueller Arbeiten – ML, Data, Deep Learning & Engineering
                </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 5, md: 6 }}>
                {projects.map((p) => (
                    <Box
                        key={p.title}
                        role="group"
                        position="relative"
                        overflow="hidden"
                        bgGradient="linear(to-br, white, gray.50)"
                        border="1px solid"
                        borderColor={cardBorder}
                        borderRadius="2xl"
                        p={{ base: 5, md: 6 }}
                        boxShadow="sm"
                        transition="all 0.28s ease"
                        _before={{
                            content: '""',
                            position: "absolute",
                            inset: "-25%",
                            bg: "radial-gradient(600px 300px at 80% 0%, rgba(56,189,248,0.18) 0%, rgba(56,189,248,0) 60%)",
                            opacity: 0,
                            transform: "scale(0.9)",
                            filter: "blur(28px)",
                            transition: "all .35s ease",
                            pointerEvents: "none",
                        }}
                        _hover={{
                            boxShadow: "xl",
                            transform: "translateY(-3px)",
                            _before: { opacity: 1, transform: "scale(1)" },
                        }}
                    >
                        <Flex gap={3} mb={3} align="center" wrap="wrap">
                            <Box
                                bg={chipBg}
                                color={chipColor}
                                borderRadius="lg"
                                p={2.5}
                                display="inline-flex"
                                alignItems="center"
                                justifyContent="center"
                                boxShadow="0 6px 22px rgba(13,110,253,0.08)"
                                transform="translateZ(0)"
                                transition="transform .25s ease"
                                _groupHover={{ transform: "translateY(-2px) scale(1.05)" }}
                            >
                                <Icon as={p.icon} boxSize={5} />
                            </Box>

                            <VStack alignItems="flex-start" gap={0} flex="1" minW={0}>
                                <Text
                                    fontSize="lg"
                                    fontWeight="semibold"
                                    color={titleColor}
                                    wordBreak="break-word"
                                >
                                    {p.title}
                                </Text>
                                <Text fontSize="sm" color={timeColor}>
                                    {p.time}
                                </Text>
                            </VStack>

                            {p.href && (
                                <>
                                    {/* Mobile: IconButton */}
                                    <ChakraLink
                                        href={p.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        display={{ base: "inline-flex", sm: "none" }}
                                    >
                                        <IconButton
                                            aria-label="View on GitHub"
                                            variant="subtle"
                                            colorPalette="teal"
                                            size="sm"
                                            flexShrink={0}
                                        >
                                            <FaExternalLinkAlt />
                                        </IconButton>
                                    </ChakraLink>

                                    {/* Desktop: Button */}
                                    <ChakraLink
                                        href={p.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        _hover={{ textDecoration: "none" }}
                                        display={{ base: "none", sm: "inline-flex" }}
                                    >
                                        <Button
                                            size="sm"
                                            colorPalette="teal"
                                            variant="solid"
                                            gap={2}
                                            whiteSpace="nowrap"
                                            flexShrink={0}
                                            boxShadow="0 8px 18px rgba(16,185,129,0.18)"
                                            _hover={{ transform: "translateY(-1px)" }}
                                            transition="transform .2s ease"
                                        >
                                            <span>View on GitHub</span>
                                            <FaExternalLinkAlt />
                                        </Button>
                                    </ChakraLink>
                                </>
                            )}
                        </Flex>

                        {/* Tags */}
                        <Wrap gap={2} mb={3}>
                            {p.tags.map((tag) => (
                                <WrapItem key={`${p.title}-${tag.label}`}>
                                    <Tag.Root
                                        size="sm"
                                        colorPalette="teal"
                                        variant="subtle"
                                        borderRadius="full"
                                    >
                                        {tag.icon && (
                                            <Tag.StartElement>
                                                <Icon as={tag.icon} boxSize={3.5} />
                                            </Tag.StartElement>
                                        )}
                                        <Tag.Label>{tag.label}</Tag.Label>
                                    </Tag.Root>
                                </WrapItem>
                            ))}
                        </Wrap>

                        {/* Description */}
                        <Text fontSize="sm" color={descColor} lineHeight={1.7}>
                            {p.desc}
                        </Text>
                    </Box>
                ))}
            </SimpleGrid>

            <Text mt={8} color={timeColor} fontSize="sm">
                Für mehr Einblicke in einzelne Projekte oder verwendete Technologien – gerne einfach nachfragen!
            </Text>
        </Box>
    );
}
