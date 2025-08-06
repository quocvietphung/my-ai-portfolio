"use client";
import { Box, Text, VStack, Wrap, WrapItem, Tag, Icon } from "@chakra-ui/react";
import { FaRobot, FaLightbulb, FaQuestionCircle, FaRocket } from "react-icons/fa";

const exampleQuestions = [
    {
        label: "Was ist Machine Learning?",
        prompt: "Was ist Machine Learning?",
        icon: FaRobot,
        color: "#14b8a6",
    },
    {
        label: "Wie funktioniert Deep Learning?",
        prompt: "Wie funktioniert Deep Learning?",
        icon: FaLightbulb,
        color: "#f59e42",
    },
    {
        label: "Was ist ein neuronales Netz?",
        prompt: "Was ist ein neuronales Netz?",
        icon: FaRocket,
        color: "#6366f1",
    },
    {
        label: "Unterschied: AI vs. ML vs. DL?",
        prompt: "Unterschied zwischen AI, ML und Deep Learning?",
        icon: FaQuestionCircle,
        color: "#f43f5e",
    },
    {
        label: "Kann AI kreativ sein?",
        prompt: "Kann Künstliche Intelligenz kreativ sein?",
        icon: FaLightbulb,
        color: "#facc15",
    },
];

export default function SectionOther({
                                         onQuestionClick,
                                     }: {
    onQuestionClick?: (prompt: string) => void;
}) {
    return (
        <Box p={[4, 6]} maxW="800px" mx="auto">
            <VStack gap={6} align="start">
                <Text fontSize="2xl" fontWeight="bold" color="teal.700">
                    Willkommen im Portfolio!
                </Text>
                <Text fontSize="md" color="gray.800" lineHeight={1.8}>
                    Dies ist mein interaktives Portfolio – du findest hier Infos zu meiner Person, Projekten, Hobbys und Kontaktmöglichkeiten.
                    <br />
                    <b>Besonderheit:</b> Dieses Portfolio ist mit <span style={{ color: "#0ea5e9" }}>AI</span> ausgestattet – du kannst jederzeit jede Frage im Chat stellen, ob zu Machine Learning, KI, Deep Learning, Karriere oder Alltag!
                    <br />
                    <br />
                    <span style={{ color: "#6366f1", fontWeight: 600 }}>Danke fürs Vorbeischauen und viel Spaß beim Entdecken! ✨</span>
                </Text>
                <Box>
                    <Text fontWeight={600} fontSize="lg" mb={2}>
                        Probiere doch direkt ein paar Fragen aus:
                    </Text>
                    <Wrap gap={3}>
                        {exampleQuestions.map((q) => (
                            <WrapItem key={q.label}>
                                <Tag.Root
                                    size="lg"
                                    variant="subtle"
                                    borderRadius="full"
                                    cursor="pointer"
                                    fontWeight={600}
                                    fontSize="md"
                                    boxShadow="md"
                                    bg="#f1f5f9"
                                    color="teal.800"
                                    minW="220px"
                                    px={4}
                                    py={2}
                                    _hover={{
                                        bg: "teal.400",
                                        color: "white",
                                    }}
                                    transition="all 0.18s"
                                    gap={2}
                                    onClick={() => onQuestionClick?.(q.prompt)}
                                >
                                    <Tag.StartElement>
                                        <Icon as={q.icon} color={q.color} boxSize={5} />
                                    </Tag.StartElement>
                                    <Tag.Label ml={1}>{q.label}</Tag.Label>
                                </Tag.Root>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Box>
                <Text fontSize="sm" color="gray.500" pt={2}>
                    Du kannst auch frei schreiben oder auf einen Bereich (Me, Skills, Projekte, Kontakt...) klicken, um mehr zu erfahren!
                </Text>
            </VStack>
        </Box>
    );
}
