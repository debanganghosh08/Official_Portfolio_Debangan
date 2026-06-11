import React, { useEffect, useState } from 'react';
import { Icon } from './Icon';
import ShinyText from './ShinyText';

interface TimelineItem {
  title: string;
  subtitle?: string;
  date: string;
  text: string;
}

const educationData: TimelineItem[] = [
  {
    title: 'SRM University, AP',
    subtitle: 'B.Tech in Computer Science and Engineering (Data Science)',
    date: '2022 — 2026',
    text: 'Secured an exceptional 9.8 SGPA in the final semester (Overall CGPA: 7.6). Actively led technical community events and participated in multiple national hackathons.',
  },
  {
    title: 'IIT Guwahati (Remote)',
    subtitle: 'Minor in Data Science',
    date: '2024 — 2026',
    text: 'Graduated with a GPA of 8.6/10. Supported by the highly competitive Masai IIT-G Scholarship (awarded to the top 99.5 percentile nationwide).',
  },
];

const experienceData: TimelineItem[] = [
  {
    title: 'Core Research Engineering Contributor',
    subtitle: 'Google DeepMind (Open Source)',
    date: '5 January 2026 — 20 May 2026',
    text: 'Engineered high-performance, secure mathematical primitives within the JAX privacy repository to resolve silent data leaks. Collaborated globally to harden enterprise-grade AI infrastructure for large-scale model optimization, earning an official acknowledgment in a DeepMind research paper.',
  },
  {
    title: 'Backend & AI Developer Intern',
    subtitle: 'PlayTo',
    date: 'June 2025 — August 2025',
    text: 'Bridged the gap between complex AI models and user-facing products by packaging ML models into scalable APIs. Containerized applications with Docker and automated deployment pipelines, reducing overall system latency by 30% for over 1,000 active users.',
  },
];

const skillsData = [
  { name: 'Python', value: 90 },
  { name: 'SQL (MySQL/PostgreSQL)', value: 90 },
  { name: 'JavaScript/TypeScript', value: 80 },
  { name: 'React.js / Next.js', value: 80 },
  { name: 'AI & Machine Learning (PyTorch, LangChain)', value: 85 },
  { name: 'Backend APIs (FastAPI, Flask)', value: 85 },
];

export const Resume: React.FC = () => {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimate(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <article className="resume active" data-page="resume">
      <header>
        <h2 className="h2 article-title">
          <ShinyText text="Resume" speed={3} />
        </h2>
      </header>

      {/* Education */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <Icon name="book-outline" />
          </div>
          <h3 className="h3">Education</h3>
        </div>

        <ol className="timeline-list">
          {educationData.map((item, index) => (
            <li key={index} className="timeline-item">
              <h4 className="h4 timeline-item-title">{item.title}</h4>
              {item.subtitle && <p style={{ color: 'var(--orange-yellow-crayola)', fontSize: 'var(--fs-6)', fontWeight: 'var(--fw-500)', marginBottom: '5px' }}>{item.subtitle}</p>}
              <span>{item.date}</span>
              <p className="timeline-text">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Experience */}
      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <Icon name="book-outline" />
          </div>
          <h3 className="h3">Experience</h3>
        </div>

        <ol className="timeline-list">
          {experienceData.map((item, index) => (
            <li key={index} className="timeline-item">
              <h4 className="h4 timeline-item-title">{item.title}</h4>
              {item.subtitle && <p style={{ color: 'var(--orange-yellow-crayola)', fontSize: 'var(--fs-6)', fontWeight: 'var(--fw-500)', marginBottom: '5px' }}>{item.subtitle}</p>}
              <span>{item.date}</span>
              <p className="timeline-text">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Skills */}
      <section className="skill">
        <h3 className="h3 skills-title">My skills</h3>
        <ul className="skills-list content-card">
          {skillsData.map((skill, index) => (
            <li key={index} className="skills-item">
              <div className="title-wrapper">
                <h5 className="h5">{skill.name}</h5>
                <data value={skill.value}>{skill.value}%</data>
              </div>
              <div className="skill-progress-bg">
                <div
                  className="skill-progress-fill"
                  style={{
                    width: animate ? `${skill.value}%` : '0%',
                    transition: 'width 1.2s ease-out-in',
                  }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
