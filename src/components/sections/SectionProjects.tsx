// src/sections/SectionProjects.tsx
import { Box, Text, Stack, HStack, Icon, Tag, Wrap, WrapItem } from "@chakra-ui/react";
import { FaGem, FaCreditCard, FaRobot, FaTools, FaSearch } from "react-icons/fa";
import { LuCircleUser, LuFileBadge } from "react-icons/lu";

const projects = [
    {
        title: "Diamantpreis-Prognose mit Machine Learning",
        icon: FaGem,
        time: "07.2025 – heute",
        tags: [
            { label: "Python", icon: LuCircleUser },
            { label: "Scikit-Learn", icon: LuFileBadge },
            { label: "XGBoost" },
            { label: "PCA" },
            { label: "Explainable AI" }
        ],
        desc: `Entwicklung einer ML-Pipeline zur Vorhersage von Diamantpreisen basierend auf realen Daten. Umfasst Datenbereinigung, Feature Selection (PCA), Regressionsmodelle (Random Forest, XGBoost), Hyperparameter-Optimierung sowie Performanceanalyse (MSE, R²). Ergebnisse wurden mittels Jupyter Notebooks für den Praxiseinsatz visualisiert und erklärt.`,
    },
    {
        title: "Kreditkartenbetrugserkennung (End-to-End)",
        icon: FaCreditCard,
        time: "06.2025 – heute",
        tags: [
            { label: "Python", icon: LuCircleUser },
            { label: "Flask" },
            { label: "React" },
            { label: "Visualisierung" }
        ],
        desc: `Komplette Umsetzung eines Systems zur Erkennung von Kreditkartenbetrug mit modernsten ML-Methoden. Inklusive Datenanalyse, Backend-Entwicklung (Flask API), Frontend (React Dashboard), Visualisierung (Matplotlib) und Echtzeit-Auswertung für Explainability.`,
    },
    {
        title: "Objekterkennung mit Deep Learning (TensorFlow, CNN)",
        icon: FaSearch,
        time: "2025",
        tags: [
            { label: "TensorFlow", icon: LuFileBadge },
            { label: "YOLO" },
            { label: "CNN" },
            { label: "TensorBoard" },
            { label: "Hyperparameter-Tuning" }
        ],
        desc: `Implementierung und Training von Convolutional Neural Networks (CNN) für die Objekterkennung (u.a. Fahrzeugerkennung). Einsatz von TensorFlow, YOLO und Keras, inklusive umfassendem Hyperparameter-Tuning und Monitoring mit TensorBoard zur Optimierung von Genauigkeit und Robustheit. Anwendung von Explainable AI zur Modellinterpretation.`,
    },
    {
        title: "Annotation Tool für AI-Research",
        icon: FaRobot,
        time: "2021-2022",
        tags: [
            { label: "Java" },
            { label: "Docker" },
            { label: "Azure", icon: LuFileBadge },
            { label: "OCR" }
        ],
        desc: `Mitentwicklung eines Annotation Tools für Computer Vision-Projekte (z.B. Automatisierung von Schadensbildern). Realisierung mit Java und Python, Docker, Azure, OCR-Integration und flexibler API für effiziente Datenpipelines.`,
    },
    {
        title: "Weitere Projekte & Tools",
        icon: FaTools,
        time: "2022–2023",
        tags: [
            { label: "Spring Boot" },
            { label: "CI/CD" },
            { label: "Teamarbeit" },
            { label: "ETL" }
        ],
        desc: `Mitwirkung an Microservices (Spring Boot, Docker), Data Engineering (ETL-Pipelines), Cloud-Integration für AI-Lösungen sowie technische Doku und Wissenstransfer im Team.`,
    },
];

export default function SectionProjects() {
    return (
        <Box p={[4, 6]} maxW="900px" mx="auto">
            <Text fontSize="2xl" fontWeight="bold" mb={7} letterSpacing={-0.5}>
                Projekte & Highlights
            </Text>
            <Stack gap={8}>
                {projects.map((p) => (
                    <Box key={p.title} bg="gray.50" borderRadius="xl" p={5} boxShadow="md">
                        <HStack mb={2} gap={2}>
                            <Icon as={p.icon} boxSize={6} color="teal.600" />
                            <Text fontSize="xl" fontWeight="semibold">{p.title}</Text>
                            <Text fontSize="sm" color="gray.500" ml={2}>
                                {p.time}
                            </Text>
                        </HStack>
                        <Wrap gap={2} flexWrap="wrap" mb={2}>
                            {p.tags.map((tag) => (
                                <WrapItem key={tag.label}>
                                    <Tag.Root size="sm" colorScheme="teal" variant="subtle">
                                        {tag.icon && (
                                            <Tag.StartElement>
                                                <Icon as={tag.icon} boxSize={3} mr={1} />
                                            </Tag.StartElement>
                                        )}
                                        <Tag.Label>{tag.label}</Tag.Label>
                                    </Tag.Root>
                                </WrapItem>
                            ))}
                        </Wrap>
                        <Text fontSize="md" color="gray.800" lineHeight={1.7}>
                            {p.desc}
                        </Text>
                    </Box>
                ))}
            </Stack>
            <Text mt={8} color="gray.600" fontSize="md">
                Für mehr Einblicke in einzelne Projekte oder verwendete Technologien – gerne einfach nachfragen!
            </Text>
        </Box>
    );
}
