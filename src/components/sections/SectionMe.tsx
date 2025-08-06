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

            <Box mt={7} fontSize="lg" lineHeight={1.85} color="gray.800">
                <Text as="span" fontWeight="semibold" fontSize="xl">
                    Mein Name ist Viet&nbsp;
                </Text>
                <span role="img" aria-label="AI">🤖</span>
                <Text as="span">
                    &nbsp;– Softwareentwickler mit Herz für KI, neugierig und offen für neue Wege. Mein Lebensmittelpunkt ist Wuppertal, Deutschland.
                </Text>
                <br /><br />

                <span role="img" aria-label="code">💻 </span>
                In den letzten Jahren habe ich als Software Engineer vielseitige Erfahrungen gesammelt. <br />
                Ich bin dankbar für diese Möglichkeiten – für jedes Projekt, jedes Team, jede Herausforderung, die mich ein Stück weitergebracht haben.<br /><br />

                <span role="img" aria-label="rocket">🚀 </span>
                Jetzt freue ich mich darauf, mein Wissen im Bereich Machine Learning und Künstliche Intelligenz weiter auszubauen. Mein Wunsch ist es, gemeinsam mit anderen Lösungen zu entwickeln, die den Alltag bereichern und echten Mehrwert schaffen.<br /><br />

                <span role="img" aria-label="lightbulb">💡 </span>
                Für mich stehen der offene Austausch, gemeinsames Lernen und gegenseitige Inspiration im Mittelpunkt. Ich glaube daran, dass Innovation aus Teamgeist und Begeisterung entsteht.<br /><br />

                <span role="img" aria-label="life">🌱 </span>
                Meine Auszeiten finde ich beim Reisen, in der Meditation <span role="img" aria-label="meditation">🧘‍♂️</span>, beim Zeichnen <span role="img" aria-label="paint">🎨</span> oder wenn ich neue Ideen in kleinen Videos <span role="img" aria-label="video">🎬</span> festhalte.<br /><br />

                <Text as="span" fontWeight="semibold" color="teal.600">
                    Ich freue mich auf neue Kontakte, Inspiration und gemeinsame Projekte rund um KI!
                </Text>
            </Box>
        </Box>
    );
}
