import { Box, Text, Link, HStack, Icon, VStack, Button } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function SectionContact() {
    return (
        <Box p={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Kontakt & Netzwerke
            </Text>
            <VStack alignItems="flex-start" gap={4}>
                <Text fontSize="md">
                    Wenn du <b>meine Projekte und Code-Beispiele</b> anschauen möchtest, findest du alles auf{" "}
                    <Icon as={FaGithub} color="gray.700" boxSize={5} mb="-2px" />
                    <Link
                        href="https://github.com/quocvietphung"
                        color="teal.600"
                        fontWeight="semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                        ml={1}
                        textDecoration="underline"
                        display="inline-block"
                    >
                        meinem GitHub-Profil
                    </Link>
                    .
                </Text>

                <Text fontSize="md">
                    Meinen <b>Lebenslauf, Zertifikate und mehr über mich</b> findest du auf{" "}
                    <Icon as={FaLinkedin} color="#0077b5" boxSize={5} mb="-2px" />
                    <Link
                        href="https://www.linkedin.com/in/viet-phung-00b740168/"
                        color="teal.600"
                        fontWeight="semibold"
                        target="_blank"
                        rel="noopener noreferrer"
                        ml={1}
                        textDecoration="underline"
                        display="inline-block"
                    >
                        LinkedIn
                    </Link>
                    .
                </Text>
            </VStack>

            <HStack mt={8} gap={4} justifyContent="center">
                <Link
                    href="https://github.com/quocvietphung"
                    target="_blank"
                    rel="noopener noreferrer"
                    _hover={{ textDecoration: "none" }}
                >
                    <Button colorScheme="gray" variant="outline" gap={2}>
                        <FaGithub />
                        GitHub ansehen
                    </Button>
                </Link>

                <Link
                    href="https://www.linkedin.com/in/viet-phung-00b740168/"
                    target="_blank"
                    rel="noopener noreferrer"
                    _hover={{ textDecoration: "none" }}
                >
                    <Button colorScheme="linkedin" variant="solid" gap={2}>
                        <FaLinkedin />
                        LinkedIn besuchen
                    </Button>
                </Link>
            </HStack>
        </Box>
    );
}
