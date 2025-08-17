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

export default function SectionOther() {
    return (
        <Box
            px={{ base: 4, md: 6 }}
            py={{ base: 6, md: 8 }}
            w="100%"
            maxW={{ base: "100%", md: "1100px", lg: "1280px" }}
            mx="auto"
        >
            <VStack align="start" gap={{ base: 5, md: 6 }}>
                {/* Tiêu đề + mô tả */}
                <Text
                    fontSize={{ base: "2xl", md: "3xl" }}
                    fontWeight="extrabold"
                    letterSpacing="-0.02em"
                    color="teal.700"
                >
                    Willkommen im Portfolio!
                </Text>

                <Text
                    fontSize={{ base: "md", md: "lg" }}
                    color="gray.800"
                    lineHeight={1.85}
                    maxW="85ch"
                >
                    Dies ist mein interaktives Portfolio – du findest hier Infos zu meiner
                    Person, Projekten, Hobbys und Kontaktmöglichkeiten.
                    <br />
                    <b>Besonderheit:</b> Dieses Portfolio ist mit{" "}
                    <span style={{ color: "#0ea5e9" }}>AI</span> ausgestattet – du kannst
                    jederzeit jede Frage im Chat stellen, ob zu Machine Learning, KI, Deep
                    Learning, Karriere oder Alltag!
                    <br />
                    <br />
                    <span style={{ color: "#6366f1", fontWeight: 600 }}>
            Danke fürs Vorbeischauen und viel Spaß beim Entdecken! ✨
          </span>
                </Text>

                {/* Gợi ý câu hỏi */}
                <Box w="100%">
                    <Text fontWeight={700} fontSize={{ base: "lg", md: "xl" }} mb={3}>
                        Probiere doch direkt ein paar Fragen aus:
                    </Text>

                    {/* Wrap v3 dùng 'gap' để canh khoảng cách giữa các chip */}
                    <Wrap gap={3}>
                        {exampleQuestions.map((q) => (
                            <WrapItem key={q.label}>
                                <Tag.Root
                                    // v3: sử dụng Tag.Root + style props
                                    variant="subtle"
                                    borderRadius="full"
                                    fontWeight={700}
                                    fontSize={{ base: "sm", md: "md" }}
                                    px={{ base: 3.5, md: 4 }}
                                    py={{ base: 2, md: 2.5 }}
                                    bg="gray.50"
                                    color="gray.800"
                                    boxShadow="0 2px 10px rgba(2, 6, 23, 0.06)"
                                    _hover={{ bg: "teal.500", color: "white" }}
                                    transition="all 0.18s ease"
                                    cursor="default"
                                    minW={{ base: "unset", md: "240px" }}
                                    display="inline-flex"
                                    alignItems="center"
                                    gap={2}
                                >
                                    <Tag.StartElement>
                                        <Icon as={q.icon} boxSize={5} color={q.color} />
                                    </Tag.StartElement>
                                    <Tag.Label lineHeight="1.2">{q.label}</Tag.Label>
                                </Tag.Root>
                            </WrapItem>
                        ))}
                    </Wrap>
                </Box>

                <Text fontSize="sm" color="gray.500" pt={2}>
                    Du kannst auch frei schreiben oder auf einen Bereich (Me, Skills,
                    Projekte, Kontakt...) klicken, um mehr zu erfahren!
                </Text>
            </VStack>
        </Box>
    );
}
