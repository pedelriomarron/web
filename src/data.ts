import { Bot, Boxes, Cloud, Code2, Database, LayoutTemplate, Server, Smartphone, Wrench, type LucideIcon } from 'lucide-react';

// Bilingual content shared by Resume and Skills (source: cv/cv.html)
export type L10n = { es: string, en: string }

export interface Job {
    title: L10n
    company: string
    from: string
    to?: string
    note?: L10n
    summary?: L10n
    tags: string[]
}

export const experience: Job[] = [
    {
        title: { es: "Product Engineer", en: "Product Engineer" },
        company: "Invox Medical", from: "2026-09",
        note: { es: "Antes Full Stack (2025 – 2026)", en: "Previously Full Stack (2025 – 2026)" },
        summary: { es: "Arquitectura y liderazgo técnico en productos de salud.", en: "Architecture and tech leadership on healthcare products." },
        tags: ["AWS", "Serverless", "TypeScript", "Nuxt.js"],
    },
    {
        title: { es: "Desarrollador Web", en: "Web Developer" },
        company: "SmartWay Studio", from: "2023-02", to: "2025-10",
        summary: { es: "Desarrollo full stack para clientes como Avatel.", en: "Full stack development for clients like Avatel." },
        tags: ["Laravel", "Vue/Nuxt", "Angular", "Django", "Spring Boot"],
    },
    {
        title: { es: "Desarrollador RPA", en: "RPA Developer" },
        company: "Devol Robotics Automation", from: "2022-04", to: "2023-02",
        summary: { es: "Automatizaciones para Eroski y AEDAS Homes.", en: "Automations for Eroski and AEDAS Homes." },
        tags: ["UiPath", "Angular", "Flask"],
    },
    {
        title: { es: "Analista RPA", en: "RPA Analyst" },
        company: "NEORIS", from: "2021-08", to: "2022-04",
        summary: { es: "Referente técnico de RPA en España y formador.", en: "RPA technical lead in Spain and trainer." },
        tags: ["UiPath", "Appian", "Automation Anywhere", "Java"],
    },
    {
        title: { es: "Desarrollador Web (prácticas)", en: "Web Developer (internship)" },
        company: "OFG", from: "2020-09", to: "2020-12", tags: ["PHP", "Bonitasoft"],
    },
    {
        title: { es: "Desarrollador Web", en: "Web Developer" },
        company: "Córdoba Embrujada S.L.", from: "2020-05", to: "2020-06", tags: ["Django", "jQuery"],
    },
    {
        title: { es: "Desarrollador Web (prácticas)", en: "Web Developer (internship)" },
        company: "Eurotransportcar", from: "2018-03", to: "2018-06", tags: ["Symfony", "jQuery", "GitFlow"],
    },
    {
        title: { es: "Técnico Informático (prácticas)", en: "IT Technician (internship)" },
        company: "PC-ON Córdoba", from: "2016-03", to: "2016-05", tags: ["Hardware"],
    },
]

export const education: Job[] = [
    { title: { es: "Bootcamp de RPA", en: "RPA Bootcamp" }, company: "Generation Spain", from: "2021-03", to: "2021-07", tags: [] },
    { title: { es: "CFGS Desarrollo de Aplicaciones Web", en: "Higher Diploma in Web Application Development" }, company: "IES Marqués de Comares & IES Trassierra", from: "2018-09", to: "2020-12", tags: [] },
    { title: { es: "CFGS Administración de Sistemas Informáticos en Red", en: "Higher Diploma in Network Systems Administration" }, company: "IES Marqués de Comares", from: "2016-09", to: "2018-06", tags: [] },
    { title: { es: "CFGM Sistemas Microinformáticos y Redes", en: "Diploma in Microcomputer Systems and Networks" }, company: "CES Lope de Vega SCA", from: "2014-09", to: "2016-06", tags: [] },
]

export interface SkillGroup { title: L10n, icon: LucideIcon, color: string, items: string[] }

export const skillGroups: SkillGroup[] = [
    { title: { es: "Lenguajes", en: "Languages" }, icon: Code2, color: "#f7df1e", items: ["TypeScript", "JavaScript", "PHP", "Python", "Java", "SQL"] },
    { title: { es: "Frontend", en: "Frontend" }, icon: LayoutTemplate, color: "#42b883", items: ["Vue.js", "Nuxt.js", "Angular", "React", "Svelte", "SvelteKit", "Redux", "Vuex", "Tailwind CSS", "Sass", "Bootstrap", "jQuery"] },
    { title: { es: "Backend y APIs", en: "Backend & APIs" }, icon: Server, color: "#83cd29", items: ["Node.js", "Express.js", "REST APIs", "JWT", "Laravel", "Symfony", "Django", "Flask", "Spring Boot"] },
    { title: { es: "Cloud y despliegue", en: "Cloud & deployment" }, icon: Cloud, color: "#ff9900", items: ["AWS", "Serverless", "Firebase", "Vercel", "GitHub Pages"] },
    { title: { es: "IA aplicada al desarrollo", en: "AI-assisted development" }, icon: Bot, color: "#d97757", items: ["Claude Code", "MCP", "Orca"] },
    { title: { es: "Móvil y PWA", en: "Mobile & PWA" }, icon: Smartphone, color: "#61dafb", items: ["React Native", "Expo", "Ionic", "PWA"] },
    { title: { es: "Bases de datos", en: "Databases" }, icon: Database, color: "#f29111", items: ["MySQL", "MongoDB", "Mongoose"] },
    { title: { es: "Automatización (RPA/BPM)", en: "Automation (RPA/BPM)" }, icon: Boxes, color: "#fa4616", items: ["UiPath", "Appian RPA", "Automation Anywhere", "Bonitasoft", "DRUID", "Web scraping"] },
    { title: { es: "Herramientas y sistemas", en: "Tools & systems" }, icon: Wrench, color: "#76a9fa", items: ["Git", "GitFlow", "Vite", "ESLint", "Prettier", "Linux", "Windows Server"] },
]

// The 2020 skill logos live on as chip icons
export const skillLogos: Record<string, string> = {
    "JavaScript": "javascript.svg", "PHP": "php.svg", "Python": "python.svg", "Java": "java.svg",
    "Node.js": "nodejs.svg", "Tailwind CSS": "css-3.svg", "MySQL": "database.svg", "Linux": "linux-tux.svg", "Windows Server": "windows.svg",
}

export function formatPeriod(lang: 'es' | 'en', from: string, to: string | undefined, present: string) {
    const fmt = new Intl.DateTimeFormat(lang, { month: 'short', year: 'numeric' });
    const date = (ym: string) => fmt.format(new Date(`${ym}-01T12:00:00`));
    return `${date(from)} – ${to ? date(to) : present}`;
}
