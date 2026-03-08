import type { ReactNode } from "react";
import clsx from "clsx";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import Heading from "@theme/Heading";

import styles from "./index.module.css";

type ProjectItem = {
  id: string;
  title: string;
  description: string;
  link: string;
};

const activityProjects: ProjectItem[] = [
  {
    id: "activity-1",
    title: "Activity 1",
    description: "Foundation concepts in database design and modeling.",
    link: "/docs/M4_activity_projects/M4_DB_activity_1",
  },
  {
    id: "activity-2",
    title: "Activity 2",
    description: "Advanced relational database design and normalization.",
    link: "/docs/M4_activity_projects/M4_DB_activity_2",
  },
  {
    id: "activity-3",
    title: "Activity 3",
    description: "Practical implementation and optimization techniques.",
    link: "/docs/M4_activity_projects/M4_DB_activity_3",
  },
];

const moodleProjects: ProjectItem[] = [
  {
    id: "moodle-1",
    title: "Moodle Week 1",
    description: "Comprehensive database project planning and analysis.",
    link: "/docs/M4_moodle_projects/M4_DB_moodle_week_1",
  },
  {
    id: "moodle-2",
    title: "Moodle Week 2",
    description: "Advanced project development and implementation.",
    link: "/docs/M4_moodle_projects/M4_DB_moodle_week_2",
  },
  {
    id: "moodle-3",
    title: "Moodle Week 3",
    description: "Comprehensive Nosql database mongodb(atlas).",
    link: "/docs/M4_moodle_projects/M4_DB_moodle_week_3",
  },
];

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={styles.heroBanner}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
      </div>
    </header>
  );
}

function ProjectCard({ project }: { project: ProjectItem }) {
  return (
    <Link to={project.link} className={styles.projectCard}>
      <Heading as="h3" className={styles.projectCardTitle}>
        {project.title}
      </Heading>
      <p className={styles.projectCardDescription}>{project.description}</p>
      <span className={styles.projectCardLink}>View Details</span>
    </Link>
  );
}

function ProjectSection({
  title,
  projects,
}: {
  title: string;
  projects: ProjectItem[];
}) {
  return (
    <section className={styles.sectionWrapper}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2">{title}</Heading>
        </div>
        <div className={styles.projectsGrid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout description="Comprehensive database design and development documentation">
      <HomepageHeader />
      <main>
        <ProjectSection title="Activity Projects" projects={activityProjects} />
        <ProjectSection title="Moodle Projects" projects={moodleProjects} />
      </main>
    </Layout>
  );
}
