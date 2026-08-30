import React from 'react';
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

export const Education: React.FC = () => {
  return (
    <article className="education active" data-page="education">
      <header>
        <h2 className="h2 article-title">
          <ShinyText text="Education" speed={3} />
        </h2>
      </header>

      <section className="timeline">
        <div className="title-wrapper">
          <div className="icon-box">
            <Icon name="book-outline" />
          </div>
          <h3 className="h3">Academic Background</h3>
        </div>

        <ol className="timeline-list">
          {educationData.map((item, index) => (
            <li key={index} className="timeline-item">
              <h4 className="h4 timeline-item-title">{item.title}</h4>
              {item.subtitle && <p className="timeline-item-subtitle">{item.subtitle}</p>}
              <span>{item.date}</span>
              <p className="timeline-text">{item.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
};
