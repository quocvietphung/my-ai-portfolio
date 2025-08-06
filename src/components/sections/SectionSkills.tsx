// src/sections/SectionSkills.tsx
import { Box, Text, Wrap, WrapItem, Stack, HStack, Icon } from "@chakra-ui/react";
import { FaCode, FaServer, FaCloud, FaDatabase, FaRobot, FaTools } from "react-icons/fa";

const skillGroups = [
    {
        title: "Frontend",
        icon: <FaCode />,
        skills: [
            "React", "Next.js", "Flutter", "HTML", "CSS", "JavaScript"
        ],
    },
    {
        title: "Backend",
        icon: <FaServer />,
        skills: [
            "Java", "Python", "Spring Boot", "Flask", "MySQL", "SQLite"
        ],
    },
    {
        title: "Webentwicklung",
        icon: <FaDatabase />,
        skills: [
            "REST-APIs", "MVC-Architektur"
        ],
    },
    {
        title: "Cloud & DevOps",
        icon: <FaCloud />,
        skills: [
            "Azure", "Docker", "GitHub", "Vercel", "Cloudpanel", "CI/CD-Grundlagen"
        ],
    },
    {
        title: "Datenanalyse",
        icon: <FaDatabase />,
        skills: [
            "Pandas", "NumPy", "Matplotlib", "Selenium", "BeautifulSoup"
        ],
    },
    {
        title: "Machine Learning",
        icon: <FaRobot />,
        skills: [
            "TensorFlow", "PyTorch", "Keras", "Scikit-Learn"
        ],
    },
    {
        title: "Tools",
        icon: <FaTools />,
        skills: [
            "VS Code", "IntelliJ", "PyCharm", "Postman", "Jira"
        ],
    },
];

export default function SectionSkills() {
    return (
        <Box p={[4, 6]} maxW="900px" mx="auto">
            <Text fontSize="2xl" fontWeight="bold" mb={7} letterSpacing={-0.5}>
                Skills & Expertise
            </Text>

            <Stack gap={7}>
                {skillGroups.map((group) => (
                    <Box key={group.title}>
                        <HStack mb={2} gap={2}>
                            <Icon as={group.icon.type} boxSize={6} color="teal.600" />
                            <Text fontSize="xl" fontWeight="semibold">{group.title}</Text>
                        </HStack>
                        <Wrap gap={3} pb={1}>
                            {group.skills.map((skill) => (
                                <WrapItem key={skill}>
                                    <Box
                                        as="span"
                                        px={3}
                                        py={1.5}
                                        bg="gray.900"
                                        color="white"
                                        fontSize="sm"
                                        borderRadius="xl"
                                        fontWeight={500}
                                        letterSpacing={0.2}
                                        boxShadow="sm"
                                    >
                                        {skill}
                                    </Box>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Box>
                ))}
            </Stack>

            <Text mt={8} color="gray.600" fontSize="md">
                Hier findest du meine wichtigsten Kompetenzen – fokussiert auf moderne Entwicklung, Datenanalyse, KI und Cloud-Tools.<br />
                <b>Was interessiert dich am meisten?</b>
            </Text>
        </Box>
    );
}
