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
    ],
    projects: [
        "Was sind deine Projekte?",
        "Erzähl mir von deinen Projekten?",
        "Woran hast du gearbeitet?",
        "Projekt-Details?",
        "Welche Projekterfahrung hast du?",
    ],
    skills: [
        "Welche Fähigkeiten hast du?",
        "Was kannst du besonders gut?",
        "Welche Technologien kennst du?",
        "Welche Programmiersprachen beherrschst du?",
    ],
    fun: [
        "Was machst du in deiner Freizeit?",
        "Was sind deine Hobbys?",
        "Wofür interessierst du dich?",
        "Welche Aktivitäten magst du?",
    ],
    contact: [
        "Wie kann ich dich kontaktieren?",
        "Deine Kontaktdaten?",
        "Wie lautet deine E-Mail?",
        "Wie ist deine Telefonnummer?",
        "Wie kann ich dich erreichen?",
    ],
    other: [
        "Kannst du mir noch mehr erzählen?",
        "Weitere Informationen?",
        "Zusätzliche Infos?",
        "Gibt es noch etwas?",
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
