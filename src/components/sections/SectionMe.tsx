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
                    boxShadow="0 4px 24px 0 rgba(0,0,0,0.09)"
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
                    <Text fontSize="2xl" fontWeight="bold" letterSpacing={0.5}>
                        Viet Phung
                    </Text>
                    <Text color="gray.600" mb={4} fontSize="lg">
                        AI Consultant&nbsp;·&nbsp;Software Engineer
                    </Text>

                    <Wrap gap={2}>
                        {["AI", "Full-Stack", "Entrepreneur", "SaaS Creator"].map(
                            (label) => (
                                <WrapItem key={label}>
                                    <Text
                                        fontSize="sm"
                                        px={3}
                                        py={1}
                                        borderRadius="full"
                                        bg="teal.100"
                                        color="teal.800"
                                        fontWeight="semibold"
                                        boxShadow="0 1px 4px 0 rgba(30,64,175,0.04)"
                                    >
                                        {label}
                                    </Text>
                                </WrapItem>
                            )
                        )}
                    </Wrap>
                </Box>
            </Flex>

            {/* Kurzprofil - Modern, klar, mit Icons */}
            <Box mt={7} fontSize="lg" lineHeight={1.85} color="gray.800">
                <Text as="span" fontWeight="semibold" fontSize="xl">
                    Mein Name ist Viet&nbsp;
                </Text>
                <span role="img" aria-label="AI">🤖</span> &nbsp;
                <Text as="span">
                    Ich bin ein begeisterter KI-Entwickler mit Herz für datengetriebene Innovationen – aktuell zuhause in Wuppertal, Deutschland.
                </Text>
                <br /><br />

                <span role="img" aria-label="study">🎓</span> Informatik-Studium in Deutschland hat mir ein starkes Fundament für Software Engineering und moderne KI-Methoden gegeben.<br /><br />

                <span role="img" aria-label="code">💻</span> Mein Weg führte mich vom Fullstack Engineering (Frontend & Backend) hin zur Welt des Machine Learnings und Deep Learnings – meine Leidenschaft und Fokus der Zukunft.<br /><br />

                <span role="img" aria-label="rocket">🚀</span> Mein Ziel: Mit KI-Technologien echte Mehrwerte schaffen. Ich entwickle smarte Anwendungen zur Podcast- & Content-Erstellung, die den Arbeitsalltag und kreativen Flow vieler Menschen bereichern.<br /><br />

                <span role="img" aria-label="lightbulb">💡</span> Neue Technologien inspirieren mich, immer wieder Grenzen zu verschieben und innovative Lösungen umzusetzen.<br /><br />

                <span role="img" aria-label="life">🌱</span> Neben Tech liebe ich Reisen, Meditation <span role="img" aria-label="meditation">🧘‍♂️</span>, kreatives Zeichnen <span role="img" aria-label="paint">🎨</span>, soziale Projekte <span role="img" aria-label="social">🤝</span> und produziere gern spannende Videos & Inhalte zu AI <span role="img" aria-label="video">🎬</span>.<br /><br />

                <Text as="span" fontWeight="semibold" color="teal.600">
                    Lassen Sie uns die Zukunft der Künstlichen Intelligenz gemeinsam gestalten!
                </Text>
            </Box>
        </Box>
    );
}
