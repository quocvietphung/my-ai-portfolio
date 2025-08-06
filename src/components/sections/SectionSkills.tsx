import { Box, Text, Wrap, WrapItem, Stack, HStack, Icon, Badge } from "@chakra-ui/react";
import {
    FaCode, FaServer, FaCloud, FaDatabase, FaRobot, FaTools, FaCertificate
} from "react-icons/fa";

// Pastel color mapping for each skill group
const pastelColors: Record<string, string> = {
    Frontend: "#b2f5ea",
    Backend: "#bee3f8",
    Webentwicklung: "#fbb6ce",
    "Cloud & DevOps": "#fbcfe8",
    Datenanalyse: "#fefcbf",
    "Machine Learning": "#c4b5fd",
    Tools: "#fde68a",
};

const textColors: Record<string, string> = {
    Frontend: "#234e52",
    Backend: "#1a365d",
    Webentwicklung: "#97266d",
    "Cloud & DevOps": "#8b5cf6",
    Datenanalyse: "#975a16",
    "Machine Learning": "#4c1d95",
    Tools: "#b45309",
};

const skillGroups = [
    {
        title: "Frontend",
        icon: <FaCode />,
        skills: ["React", "Next.js", "Flutter", "HTML", "CSS", "JavaScript"],
    },
    {
        title: "Backend",
        icon: <FaServer />,
        skills: ["Java", "Python", "Spring Boot", "Flask", "MySQL", "SQLite"],
    },
    {
        title: "Webentwicklung",
        icon: <FaDatabase />,
        skills: ["REST-APIs", "MVC-Architektur"],
    },
    {
        title: "Cloud & DevOps",
        icon: <FaCloud />,
        skills: ["Azure", "Docker", "GitHub", "Vercel", "Cloudpanel", "CI/CD-Grundlagen"],
    },
    {
        title: "Datenanalyse",
        icon: <FaDatabase />,
        skills: ["Pandas", "NumPy", "Matplotlib", "Selenium", "BeautifulSoup"],
    },
    {
        title: "Machine Learning",
        icon: <FaRobot />,
        skills: ["TensorFlow", "PyTorch", "Keras", "Scikit-Learn"],
    },
    {
        title: "Tools",
        icon: <FaTools />,
        skills: ["VS Code", "IntelliJ", "PyCharm", "Postman", "Jira"],
    },
];

const certificates = [
    {
        label: "Azure Fundamentals AZ-900",
        org: "Microsoft",
    },
    {
        label: "Python Advanced",
        org: "alfatraining Bildungszentrum",
    },
    {
        label: "Certified Associate Python Programmer (PCAP)",
        org: "Python Institute",
    },
    {
        label: "Cloud Machine Learning Engineering & MLOps",
        org: "Duke University (Coursera)",
    },
    {
        label: "MLOps Internship Certificate",
        org: "MotionsCloud",
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
                                        bg={pastelColors[group.title]}
                                        color={textColors[group.title]}
                                        fontSize="sm"
                                        borderRadius="xl"
                                        fontWeight={500}
                                        letterSpacing={0.2}
                                        boxShadow="sm"
                                        border="1px solid #e2e8f0"
                                        transition="all 0.2s"
                                        _hover={{
                                            boxShadow: "md",
                                            bg: "#f0f0f0",
                                            color: "#2d3748",
                                            cursor: "pointer",
                                        }}
                                    >
                                        {skill}
                                    </Box>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Box>
                ))}
            </Stack>

            <Box mt={9}>
                <HStack mb={3} gap={2}>
                    <Icon as={FaCertificate} boxSize={6} color="teal.500" />
                    <Text fontSize="lg" fontWeight="semibold">
                        Zertifikate
                    </Text>
                </HStack>
                <Wrap gap={2}>
                    {certificates.map(cert => (
                        <WrapItem key={cert.label}>
                            <Badge
                                colorScheme="teal"
                                variant="subtle"
                                px={3}
                                py={1}
                                borderRadius="md"
                                fontWeight="500"
                                fontSize="sm"
                                bg="#e6fffa"
                                color="#234e52"
                                boxShadow="xs"
                                border="1px solid #b2f5ea"
                            >
                                {cert.label}
                                <Text as="span" color="#319795" fontWeight="normal" ml={1}>
                                    – {cert.org}
                                </Text>
                            </Badge>
                        </WrapItem>
                    ))}
                </Wrap>
            </Box>

            <Text mt={8} color="gray.600" fontSize="md">
                Hier findest du meine wichtigsten Kompetenzen – fokussiert auf moderne Entwicklung, Datenanalyse, KI und Cloud-Tools.<br />
                <b>Was interessiert dich am meisten?</b>
            </Text>
        </Box>
    );
}
