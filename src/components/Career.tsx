import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Icon } from './Icon';
import ShinyText from './ShinyText';
import { crossFade, springMove } from '../lib/motion';

interface Role {
  title: string;
  company: string;
  date: string;
  type: string;
  current?: boolean;
  text: string;
}

/** Most recent first. */
const experienceData: Role[] = [
  {
    title: 'Associate Software Developer',
    company: 'Vempower Ventures',
    date: 'July 2026 — Present',
    type: 'Full Time',
    current: true,
    text: 'Working on a credential evaluation platform built with TypeScript, Node.js and AWS. I contributed 61 commits to the backend, mostly across the authentication and feedback modules, helping migrate legacy procedural code to a class-based architecture using DTOs. Alongside the feature work I built the internal tooling that codifies our engineering conventions, so the team’s standards are written down and checkable rather than tribal knowledge.',
  },
  {
    title: 'Backend & AI Engineer',
    company: 'SPARQ Labs',
    date: 'May 2026 — July 2026',
    type: 'Internship',
    text: 'Built backend services and data pipelines for a multi-tenant GTM attribution platform in Python and FastAPI. I contributed 41 of the repository’s 158 commits, working on the attribution engine’s data flow, chunked bulk database operations that stopped large imports from crashing, and a tenant-scoping fix that closed a cross-tenant data leak in the HubSpot integration.',
  },
  {
    title: 'Core Research Engineering Contributor',
    company: 'Google DeepMind (Open Source)',
    date: 'January 2026 — May 2026',
    type: 'Open Source',
    text: 'Contributed to the JAX privacy repository, working on the mathematical primitives that keep training data from leaking out of models. Collaborated asynchronously with reviewers across time zones on a public codebase, and was acknowledged in a DeepMind research paper for the contribution.',
  },
  {
    title: 'Backend & AI Developer Intern',
    company: 'PlayTo',
    date: 'June 2025 — August 2025',
    type: 'Internship',
    text: 'Took machine learning models the team had trained and made them serviceable — packaged them behind scalable REST APIs, containerised the services with Docker and automated the deployment pipeline. This reduced overall system latency by around 30% for a base of roughly 1,000 active users.',
  },
];

/**
 * Grouped rather than scored. A self-assigned "Python 90%" is unfalsifiable, so
 * a reader discounts it; naming the tools and letting the roles and projects
 * carry the evidence is both more honest and more useful.
 */
const skillGroups: { group: string; items: string[] }[] = [
  { group: 'Languages', items: ['Python', 'TypeScript', 'JavaScript', 'SQL', 'C++'] },
  {
    group: 'AI & Machine Learning',
    items: ['PyTorch', 'TensorFlow', 'LangChain', 'LangGraph', 'CrewAI', 'Hugging Face', 'scikit-learn'],
  },
  {
    /* Capabilities rather than product names: what gets built, not what it is built in. */
    group: 'Agentic AI Tooling',
    items: ['Agent Skills & Rules', 'Context Memory Systems', 'RAG Pipelines', 'Evaluation Harnesses', 'MCP'],
  },
  {
    group: 'Backend & APIs',
    items: ['FastAPI', 'Node.js', 'Express', 'REST APIs', 'Celery', 'Redis'],
  },
  {
    group: 'Cloud & Infrastructure',
    items: ['AWS Cognito', 'DynamoDB', 'GCP Vertex AI', 'Cloud Functions', 'Docker', 'Vercel'],
  },
  { group: 'Frontend', items: ['React', 'Next.js', 'Tailwind CSS'] },
  {
    group: 'Data & Storage',
    items: ['PostgreSQL', 'MySQL', 'MongoDB', 'FAISS', 'ChromaDB', 'Pinecone'],
  },
];

export const Career: React.FC = () => {
  const reduceMotion = useReducedMotion();

  return (
    <article className="career active" data-page="career">
      <header>
        <h2 className="h2 article-title">
          <ShinyText text="Career" speed={3} />
        </h2>
      </header>

      {/* Experience */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <Icon name="briefcase-outline" />
          </div>
          <h3 className="h3">Experience</h3>
        </div>

        <ol className="timeline-list">
          {experienceData.map((item) => (
            <li key={item.company} className="timeline-item">
              <h4 className="h4 timeline-item-title">{item.title}</h4>
              <p className="timeline-item-subtitle">{item.company}</p>
              <div className="role-meta">
                <span>{item.date}</span>
                <span className="role-type">{item.type}</span>
                {item.current && <span className="role-current">Current</span>}
              </div>
              <p className="timeline-text">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className="career-skills">
        <h3 className="h3 career-section-title">Skills</h3>

        <ul className="skill-group-list">
          {skillGroups.map((group, index) => (
            <motion.li
              key={group.group}
              className="skill-group"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                ...(reduceMotion ? crossFade : springMove),
                delay: reduceMotion ? 0 : Math.min(index, 4) * 0.05,
              }}
            >
              <h4 className="skill-group-title">{group.group}</h4>
              <ul className="skill-tags">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </section>

    </article>
  );
};
