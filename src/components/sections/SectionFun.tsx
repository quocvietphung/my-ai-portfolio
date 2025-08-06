// src/sections/SectionFun.tsx
import { Box, Text, Image, VStack, HStack, Icon } from "@chakra-ui/react";
import { FaParachuteBox } from "react-icons/fa";
import { MdSelfImprovement } from "react-icons/md";

export default function SectionFun() {
    return (
        <Box p={6}>
            <HStack mb={3} gap={2}>
                <Icon as={FaParachuteBox} boxSize={7} color="teal.500" />
                <Text fontSize="xl" fontWeight="bold">
                    Inspiration & Abenteuer
                </Text>
            </HStack>
            <VStack align="start" gap={8}>
                <Text fontSize="md">
                    Mein eindrucksvollstes Erlebnis? <b>Fallschirmspringen in der Schweiz</b> <span role="img" aria-label="Fallschirm">🪂</span>.<br />
                    Im Tandemsprung aus 1.500 Metern über Interlaken – die Alpen unter mir – habe ich nicht nur den ultimativen Adrenalinkick gespürt, sondern auch gelernt, was es heißt, mutig loszulassen und den Moment voll auszukosten. Diese Erfahrung begleitet mich und gibt mir bis heute Energie und Zuversicht!
                </Text>
                <Box w="100%">
                    <Image
                        src="/assets/fun1.jpg"
                        alt="Fallschirmspringen über Interlaken"
                        borderRadius="2xl"
                        boxShadow="xl"
                        maxW="520px"
                        w="100%"
                        display="block"
                        mx="auto"
                        transition="transform 0.3s"
                        _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
                    />
                </Box>
                <Text fontSize="md">
                    <span role="img" aria-label="Herz">💚</span> Genauso wichtig wie Abenteuer sind mir <b>soziales Engagement</b> und <b>Achtsamkeit</b> <Icon as={MdSelfImprovement} ml={1} color="teal.400" />.<br />
                    Ob inspirierende Begegnungen, freiwillige Projekte oder Momente der Stille bei Meditation – all das schenkt mir innere Klarheit, neue Perspektiven und kreative Energie. <br />
                    Diese Erlebnisse motivieren mich, neugierig zu bleiben, offen zu denken und auch im Job immer wieder mutig neue Wege zu gehen.
                </Text>
                <Box w="100%">
                    <Image
                        src="/assets/fun2.jpg"
                        alt="Soziales Engagement oder Meditation"
                        borderRadius="2xl"
                        boxShadow="xl"
                        maxW="520px"
                        w="100%"
                        display="block"
                        mx="auto"
                        transition="transform 0.3s"
                        _hover={{ transform: "scale(1.05)", boxShadow: "2xl" }}
                    />
                </Box>
            </VStack>
        </Box>
    );
}
