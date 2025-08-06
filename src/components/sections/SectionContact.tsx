// src/sections/SectionContact.tsx
import { Box, Text, Link, HStack, Icon, VStack, Button } from "@chakra-ui/react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function SectionContact() {
    return (
        <Box p={6}>
            <Text fontSize="2xl" fontWeight="bold" mb={4}>
                Kontakt & Netzwerke
            </Text>
            <VStack align="start" gap={4}>
                <Text fontSize="md">
                    Für einen Einblick in meine <b>Projekte und Code-Beispiele</b> besuchen Sie mein&nbsp;
                    <HStack as="span" display="inline-flex">
                        <Icon as={FaGithub} color="gray.700" />
                        <Link
                            href="https://github.com/quocvietphung"
                            color="teal.600"
                            fontWeight="semibold"
                            isExternal
                        >
                            GitHub-Profil
                        </Link>
                    </HStack>
                    .
                </Text>

                <Text fontSize="md">
                    Mein <b>Lebenslauf, Zertifikate und weitere Informationen</b> finden Sie auf&nbsp;
                    <HStack as="span" display="inline-flex">
                        <Icon as={FaLinkedin} color="#0077b5" />
                        <Link
                            href="https://www.linkedin.com/in/viet-phung-00b740168/details/projects/"
                            color="teal.600"
                            fontWeight="semibold"
                            isExternal
                        >
                            LinkedIn
                        </Link>
                    </HStack>
                    .
                </Text>
            </VStack>

            <HStack mt={7} gap={4}>
                <Button
                    as={Link}
                    href="https://github.com/quocvietphung"
                    leftIcon={<FaGithub />}
                    colorScheme="gray"
                    variant="outline"
                    target="_blank"
                >
                    GitHub ansehen
                </Button>
                <Button
                    as={Link}
                    href="https://www.linkedin.com/in/viet-phung-00b740168/details/projects/"
                    leftIcon={<FaLinkedin />}
                    colorScheme="linkedin"
                    variant="solid"
                    target="_blank"
                >
                    LinkedIn besuchen
                </Button>
            </HStack>
        </Box>
    );
}
