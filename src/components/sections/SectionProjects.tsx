// src/sections/SectionProjects.tsx
"use client";

import {
    Box,
    Text,
    SimpleGrid,
    HStack,
    VStack,
    Icon,
    Wrap,
    WrapItem,
    Button,
    Link as ChakraLink,
    Tag,
} from "@chakra-ui/react";
import type { IconType } from "react-icons";
import {
    FaGem,
    FaCreditCard,
    FaRobot,
    FaTools,
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
    },
    {
        title: "Objekterkennung mit Deep Learning (TensorFlow, CNN)",
        icon: FaSearch,
        time: "2025",
        tags: [
            { label: "TensorFlow", icon: LuFileBadge },
            { label: "YOLO" },
            { label: "CNN" },
            { label: "TensorBoard" },
            { label: "Hyperparameter-Tuning" },
        ],
        desc:
            "Implementierung und Training von Convolutional Neural Networks (CNN) für die Objekterkennung (u.a. Fahrzeugerkennung). Einsatz von TensorFlow, YOLO und Keras, inklusive umfassendem Hyperparameter-Tuning und Monitoring mit TensorBoard zur Optimierung von Genauigkeit und Robustheit. Anwendung von Explainable AI zur Modellinterpretation.",
    },
    {
        title: "Annotation Tool für AI-Research",
        icon: FaRobot,
        time: "2021–2022",
        tags: [{ label: "Java" }, { label: "Docker" }, { label: "Azure", icon: LuFileBadge }, { label: "OCR" }],
        desc:
            "Mitentwicklung eines Annotation Tools für Computer Vision-Projekte (z.B. Automatisierung von Schadensbildern). Realisierung mit Java und Python, Docker, Azure, OCR-Integration und flexibler API für effiziente Datenpipelines.",
    },
    {
        title: "Weitere Projekte & Tools",
        icon: FaTools,
        time: "2022–2023",
        tags: [{ label: "Spring Boot" }, { label: "CI/CD" }, { label: "Teamarbeit" }, { label: "ETL" }],
        desc:
            "Mitwirkung an Microservices (Spring Boot, Docker), Data Engineering (ETL-Pipelines), Cloud-Integration für AI-Lösungen sowie technische Doku und Wissenstransfer im Team.",
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
        <Box px={{ base: 4, md: 6 }} py={{ base: 6, md: 8 }} maxW="1100px" mx="auto">
            <VStack align="start" gap={2} mb={6}>
                <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" letterSpacing={-0.5}>
                    Projekte & Highlights
                </Text>
                <Text color={timeColor} fontSize="sm">
                    Eine Auswahl aktueller Arbeiten – ML, Data, Deep Learning & Engineering
                </Text>
            </VStack>

            <SimpleGrid columns={{ base: 1, md: 2 }} gap={6}>
                {projects.map((p) => (
                    <Box
                        key={p.title}
                        role="group"
                        bgGradient="linear(to-br, white, gray.50)"
                        border="1px solid"
                        borderColor={cardBorder}
                        borderRadius="2xl"
                        p={5}
                        boxShadow="sm"
                        transition="all 0.25s ease"
                        _hover={{ boxShadow: "lg", transform: "translateY(-2px)" }}
                    >
                        {/* Header */}
                        <HStack gap={3} mb={3} alignItems="center">
                            <Box
                                as="span"
                                bg={chipBg}
                                color={chipColor}
                                borderRadius="lg"
                                p={2}
                                display="inline-flex"
                                alignItems="center"
                                justifyContent="center"
                            >
                                <Icon as={p.icon} boxSize={5} />
                            </Box>

                            <VStack alignItems="flex-start" gap={0} flex="1">
                                <Text fontSize="lg" fontWeight="semibold" color={titleColor}>
                                    {p.title}
                                </Text>
                                <Text fontSize="sm" color={timeColor}>
                                    {p.time}
                                </Text>
                            </VStack>

                            {p.href && (
                                <ChakraLink
                                    href={p.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    _hover={{ textDecoration: "none" }}
                                >
                                    <Button size="sm" colorPalette="teal" variant="solid" gap={2}>
                                        <span>View on GitHub</span>
                                        <FaExternalLinkAlt />
                                    </Button>
                                </ChakraLink>
                            )}
                        </HStack>

                        {/* Tags (v3: Tag slots) */}
                        <Wrap gap={2} mb={3}>
                            {p.tags.map((tag) => (
                                <WrapItem key={`${p.title}-${tag.label}`}>
                                    <Tag.Root size="sm" colorPalette="teal" variant="subtle" borderRadius="full">
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
