export const PERSONAL_INFO_KEYWORDS_BY_SECTION: Record<string, string[]> = {
    me: [
        "who are you",
        "your experience",
        "tell me about yourself",
        "about you",
        "your name",
        "who is",
        "introduce yourself",
        "your background",
        "personal info",
    ],
    projects: [
        "what is your project",
        "tell me about your projects",
        "your work",
        "project details",
        "project experience",
    ],
    skills: [
        "what are your skills",
        "your abilities",
        "technologies you know",
        "programming languages",
    ],
    fun: [
        "what do you do for fun",
        "hobbies",
        "your interests",
        "free time activities",
    ],
    contact: [
        "how can I contact you",
        "contact details",
        "email",
        "phone number",
        "reach you",
    ],
    other: [
        "tell me something else",
        "more information",
        "additional info",
        "anything else",
    ],
};

export const sections = [
    { key: "me", label: "Me" },
    { key: "projects", label: "Projects" },
    { key: "skills", label: "Skills" },
    { key: "fun", label: "Fun" },
    { key: "contact", label: "Contact" },
    { key: "other", label: "Other" },
];
