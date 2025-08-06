// src/sections/SectionMe.tsx
import Image from "next/image";
import { Box, Flex, Text, Wrap, WrapItem } from "@chakra-ui/react";

export default function SectionMe() {
    return (
        <Box p={6}>
            <Flex
                direction={{ base: "column", md: "row" }}
                align={{ md: "center" }}
                gap={6}
            >
                {/* Avatar square with next/image */}
                <Box
                    overflow="hidden"
                    boxSize="120px"
                    position="relative"
                >
                    <Image
                        src="/assets/avatar-viet.png"
                        alt="Viet Phung"
                        fill
                        style={{ objectFit: "cover" }}
                        priority
                    />
                </Box>

                {/* Info */}
                <Box>
                    <Text fontSize="2xl" fontWeight="bold">
                        Viet Phung
                    </Text>
                    <Text color="gray.600" mb={4} fontSize="lg">
                        AI Consultant · Software Engineer
                    </Text>

                    <Wrap gap={2}>
                        {["AI", "Full-Stack", "Entrepreneurship", "SaaS Builder"].map(
                            (label) => (
                                <WrapItem key={label}>
                                    <Text
                                        fontSize="sm"
                                        px={3}
                                        py={1}
                                        borderRadius="full"
                                        bg="teal.100"
                                        color="teal.800"
                                        fontWeight="medium"
                                    >
                                        {label}
                                    </Text>
                                </WrapItem>
                            )
                        )}
                    </Wrap>
                </Box>
            </Flex>

            {/* Kurzprofil nur auf Deutsch */}
            <Text mt={7} fontSize="lg" lineHeight={1.85}>
                Mein Name ist Viet&nbsp;–&nbsp;
                <span role="img" aria-label="AI">🤖</span>&nbsp;
                ich bin ein leidenschaftlicher Softwareentwickler im Bereich Machine Learning & Künstliche Intelligenz, aktuell lebend in Wuppertal, Deutschland.<br /><br />

                <span role="img" aria-label="book">🎓</span> Ich habe Informatik in Deutschland studiert und verfüge über ein breites Wissen rund um Softwareentwicklung und moderne KI-Technologien.<br /><br />

                <span role="img" aria-label="laptop">💻</span> Ursprünglich habe ich als Fullstack Software Engineer (Frontend & Backend) gearbeitet, doch heute widme ich mich mit Herzblut der KI und dem maschinellen Lernen. Deshalb fokussiere ich mich verstärkt auf Machine Learning und Deep Learning Projekte, um innovative, datenbasierte Lösungen zu entwickeln.<br /><br />

                <span role="img" aria-label="rocket">🚀</span> Mein großer Traum ist es, mit KI echte Produkte zu schaffen, die Menschen in ihrem Alltag und Beruf unterstützen&nbsp;–&nbsp;zum Beispiel durch smarte Anwendungen für Podcast- und Content-Creation. Ich finde es inspirierend, wenn Technologie neue Möglichkeiten eröffnet, kreative Ideen zum Leben zu erwecken.<br /><br />

                <span role="img" aria-label="travel">🌍</span> Neben dem Programmieren reise ich gerne, entspanne mich bei <span role="img" aria-label="meditation">🧘</span> Meditation, zeichne kreativ <span role="img" aria-label="paint">🎨</span>, engagiere mich für soziale Aktivitäten <span role="img" aria-label="handshake">🤝</span> und produziere ab und zu spannende Videos oder interessante Inhalte rund um Tech und AI <span role="img" aria-label="video">🎬</span>. Diese Hobbys geben mir Inspiration und die nötige Balance für neue Herausforderungen.<br /><br />

                Lassen Sie uns die Welt der KI gemeinsam gestalten und mit Leidenschaft neue Lösungen entdecken! <span role="img" aria-label="lightbulb">💡</span>
            </Text>
        </Box>
    );
}
