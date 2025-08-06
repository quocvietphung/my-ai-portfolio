// src/components/PersonalInfoRenderer.tsx
import SectionMe from '../sections/SectionMe';
import SectionProjects from '../sections/SectionProjects';
import SectionSkills from '../sections/SectionSkills';
import SectionFun from '../sections/SectionFun';
import SectionContact from '../sections/SectionContact';
import SectionOther from '../sections/SectionOther';

const sectionMap: Record<string, React.FC> = {
    me: SectionMe,
    projects: SectionProjects,
    skills: SectionSkills,
    fun: SectionFun,
    contact: SectionContact,
    other: SectionOther,
};

export default function PersonalInfoRenderer({ section }: { section: string }) {
    const Component = sectionMap[section] || (() => <div>Section not found</div>);
    return <Component />;
}
