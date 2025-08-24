export const PERSONAL_INFO_KEYWORDS_BY_SECTION: Record<string, string[]> = {
    me: [
        "Stell dich vor?",
        "Wie lautet dein Name?",
        "Erzähl mir von dir?",
        "Wie ist dein Hintergrund?",
        "Wer ist das?",
        "Stell dich bitte vor?",
        "Persönliche Infos?",
        "Deine Erfahrung?",
        "Dein Lebenslauf?",
        "about yourself",
        "who are you",
        "background",
        "experience",
    ],
    projects: [
        "Was sind deine Projekte?",
        "Erzähl mir von deinen Projekten?",
        "Woran hast du gearbeitet?",
        "Projekt-Details?",
        "Welche Projekterfahrung hast du?",
        "AI projects",
        "machine learning",
        "portfolio",
        "github",
        "code",
        "development",
        "programming",
    ],
    skills: [
        "Welche Fähigkeiten hast du?",
        "Was kannst du besonders gut?",
        "Welche Technologien kennst du?",
        "Welche Programmiersprachen beherrschst du?",
        "skills",
        "technologies",
        "programming languages",
        "expertise",
        "knowledge",
    ],
    fun: [
        "Was machst du in deiner Freizeit?",
        "Was sind deine Hobbys?",
        "Wofür interessierst du dich?",
        "Welche Aktivitäten magst du?",
        "hobbies",
        "interests",
        "free time",
        "leisure",
    ],
    contact: [
        "Wie kann ich dich kontaktieren?",
        "Deine Kontaktdaten?",
        "Wie lautet deine E-Mail?",
        "Wie ist deine Telefonnummer?",
        "Wie kann ich dich erreichen?",
        "contact",
        "email",
        "phone",
        "reach",
        "get in touch",
    ],
    other: [
        "Kannst du mir noch mehr erzählen?",
        "Weitere Informationen?",
        "Zusätzliche Infos?",
        "Gibt es noch etwas?",
        "more information",
        "additional",
        "tell me more",
    ],
};

export const sections = [
    { key: "me", label: "Über mich" },
    { key: "projects", label: "Projekte" },
    { key: "skills", label: "Fähigkeiten" },
    { key: "fun", label: "Freizeit" },
    { key: "contact", label: "Kontakt" },
    { key: "other", label: "Weitere Infos" },
];

export const sectionDefaultPrompts: Record<string, string> = {
    me: "Stell dich vor?",
    projects: "Was sind deine Projekte?",
    skills: "Welche Fähigkeiten hast du?",
    fun: "Was machst du in deiner Freizeit?",
    contact: "Wie kann ich dich kontaktieren?",
    other: "Kannst du mir noch mehr erzählen?",
};

// AI-enhanced prompt suggestions for better conversations
export const AI_ENHANCED_PROMPTS = {
    projectDeepDive: [
        "Erkläre die ML-Pipeline im Kreditkartenbetrug-Projekt",
        "Wie funktioniert die Whisper AI Integration?",
        "Welche Herausforderungen hattest du bei der Objekterkennung?",
        "Zeig mir die Azure OpenAI Implementation",
        "Wie trainierst du die CNN-Modelle?",
    ],
    technicalQuestions: [
        "Welche AI-Frameworks verwendest du am liebsten?",
        "Wie gehst du an neue ML-Projekte heran?",
        "Was sind deine Erfahrungen mit TensorFlow vs PyTorch?",
        "Wie implementierst du Explainable AI?",
        "Welche Cloud-Plattformen nutzt du für AI?",
    ],
    careerInsights: [
        "Wie bist du in die AI-Entwicklung eingestiegen?",
        "Was motiviert dich an Machine Learning?",
        "Welche AI-Trends findest du spannend?",
        "Wo siehst du dich in der AI-Zukunft?",
        "Was würdest du AI-Anfängern empfehlen?",
    ],
    collaboration: [
        "Suchst du nach interessanten AI-Projekten?",
        "Könnten wir an einem ML-Projekt zusammenarbeiten?",
        "Hilfst du bei AI-Implementierungen?",
        "Welche Art von Projekten interessieren dich?",
        "Wie können wir uns vernetzen?",
    ]
};

// Context-aware suggestions based on conversation topics
export const CONTEXTUAL_SUGGESTIONS: Record<string, string[]> = {
    ai: AI_ENHANCED_PROMPTS.technicalQuestions,
    machine_learning: AI_ENHANCED_PROMPTS.projectDeepDive,
    career: AI_ENHANCED_PROMPTS.careerInsights,
    collaboration: AI_ENHANCED_PROMPTS.collaboration,
    projects: AI_ENHANCED_PROMPTS.projectDeepDive,
    skills: AI_ENHANCED_PROMPTS.technicalQuestions,
};
