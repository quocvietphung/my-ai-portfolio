// src/sections/SectionSkills.tsx
"use client";

import {
    Box,
    Text,
    Wrap,
    WrapItem,
    Stack,
    HStack,
    Icon,
    Badge,
    Separator,
} from "@chakra-ui/react";
import {
    FaCode,
    FaServer,
    FaCloud,
    FaDatabase,
    FaRobot,
    FaTools,
    FaCertificate,
} from "react-icons/fa";
import type { IconType } from "react-icons";

// Pastel màu cho từng nhóm kỹ năng
const pastelBg: Record<string, string> = {
    Frontend: "#b2f5ea",
    Backend: "#bee3f8",
    Webentwicklung: "#fbb6ce",
    "Cloud & DevOps": "#fbcfe8",
    Datenanalyse: "#fefcbf",
    "Machine Learning": "#c4b5fd",
    Tools: "#fde68a",
};

const pastelFg: Record<string, string> = {
    Frontend: "#234e52",
    Backend: "#1a365d",
    Webentwicklung: "#97266d",
    "Cloud & DevOps": "#8b5cf6",
    Datenanalyse: "#975a16",
    "Machine Learning": "#4c1d95",
    Tools: "#b45309",
};

type SkillGroup = {
    title: string;
    icon: IconType;
    skills: string[];
};

const skillGroups: SkillGroup[] = [
    {
        title: "Frontend",
        icon: FaCode,
        skills: ["React", "Next.js", "Flutter", "HTML", "CSS", "JavaScript"],
    },
    {
        title: "Backend",
        icon: FaServer,
        skills: ["Java", "Python", "Spring Boot", "Flask", "MySQL", "SQLite"],
    },
    {
        title: "Webentwicklung",
        icon: FaDatabase,
        skills: ["REST-APIs", "MVC-Architektur"],
    },
    {
        title: "Cloud & DevOps",
        icon: FaCloud,
        skills: ["Azure", "Docker", "GitHub", "Vercel", "Cloudpanel", "CI/CD"],
    },
    {
        title: "Datenanalyse",
        icon: FaDatabase,
        skills: ["Pandas", "NumPy", "Matplotlib", "Selenium", "BeautifulSoup"],
    },
    {
        title: "Machine Learning",
        icon: FaRobot,
        skills: ["TensorFlow", "PyTorch", "Keras", "Scikit-Learn"],
    },
    {
        title: "Tools",
        icon: FaTools,
        skills: ["VS Code", "IntelliJ", "PyCharm", "Postman", "Jira"],
    },
];

const certificates = [
    { label: "Azure Fundamentals AZ-900", org: "Microsoft" },
    { label: "Python Advanced", org: "alfatraining Bildungszentrum" },
    { label: "Certified Associate Python Programmer (PCAP)", org: "Python Institute" },
    { label: "Cloud Machine Learning Engineering & MLOps", org: "Duke University (Coursera)" },
    { label: "MLOps Internship Certificate", org: "MotionsCloud" },
];

export default function SectionSkills() {
    return (
        <Box
            maxW={{ base: "100%", md: "1180px", lg: "1280px" }}
            mx="auto"
            px={{ base: 4, md: 6 }}
            py={{ base: 6, md: 8 }}
            bg="white"
        >
            <HStack mb={6} gap={3} align="center">
                <Icon as={FaCode} boxSize={6} color="teal.600" />
                <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="bold" letterSpacing={-0.5}>
                    Skills &amp; Expertise
                </Text>
            </HStack>

            <Stack gap={7}>
                {skillGroups.map((group) => (
                    <Box key={group.title}>
                        <HStack mb={2} gap={2} align="center">
                            <Box
                                bg="teal.50"
                                color="teal.700"
                                borderRadius="md"
                                p={2}
                                display="inline-flex"
                            >
                                <Icon as={group.icon} boxSize={5} />
                            </Box>
                            <Text fontSize="xl" fontWeight="semibold">
                                {group.title}
                            </Text>
                        </HStack>

                        <Wrap gap={3} pb={1}>
                            {group.skills.map((skill) => (
                                <WrapItem key={skill}>
                                    <Box
                                        as="span"
                                        px={3}
                                        py={1.5}
                                        bg={pastelBg[group.title]}
                                        color={pastelFg[group.title]}
                                        fontSize="sm"
                                        borderRadius="xl"
                                        fontWeight={600}
                                        letterSpacing={0.2}
                                        border="1px solid #e2e8f0"
                                    >
                                        {skill}
                                    </Box>
                                </WrapItem>
                            ))}
                        </Wrap>
                    </Box>
                ))}
            </Stack>

            <Separator my={{ base: 7, md: 8 }} />

            <HStack mb={3} gap={2} align="center">
                <Icon as={FaCertificate} boxSize={6} color="teal.600" />
                <Text fontSize="lg" fontWeight="semibold">Zertifikate</Text>
            </HStack>

            <Wrap gap={2}>
                {certificates.map((c) => (
                    <WrapItem key={c.label}>
                        <Badge
                            colorPalette="teal"
                            variant="subtle"
                            px={3}
                            py={1}
                            borderRadius="md"
                            fontWeight={600}
                            fontSize="sm"
                            bg="teal.50"
                            color="teal.800"
                            border="1px solid"
                            borderColor="teal.100"
                        >
                            {c.label}
                            <Text as="span" color="teal.600" fontWeight="normal" ml={1}>
                                – {c.org}
                            </Text>
                        </Badge>
                    </WrapItem>
                ))}
            </Wrap>

            <Text mt={8} color="gray.600" fontSize="md">
                Hier findest du meine wichtigsten Kompetenzen – fokussiert auf moderne Entwicklung, Datenanalyse, KI und Cloud-Tools.
                <br />
                <b>Was interessiert dich am meisten?</b>
            </Text>
        </Box>
    );
}
