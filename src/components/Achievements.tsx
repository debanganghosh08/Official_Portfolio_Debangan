import React from 'react';
import BorderGlow from './BorderGlow';
import ShinyText from './ShinyText';

interface Achievement {
  title: string;
  org: string;
  detail: string;
  /** Only where the claim can be checked by a stranger. */
  link?: string;
  linkLabel?: string;
}

const achievements: Achievement[] = [
  {
    title: 'Acknowledged in a research paper',
    org: 'Google DeepMind',
    detail:
      'For contributions to the open-source JAX privacy repository, resolving silent data-leak paths in privacy-sensitive numerical code.',
    link: 'https://arxiv.org/pdf/2602.17861#search=%22Debangan%20Ghosh%22',
    linkLabel: 'Read the paper',
  },
  {
    title: 'Best global ranking of 962',
    org: 'Kaggle',
    detail:
      'Achieved through competition entries and published notebooks, alongside Code Expert status on the platform.',
    link: 'https://www.kaggle.com/debanganghosh',
    linkLabel: 'View profile',
  },
  {
    title: 'Masai IIT-G Scholarship',
    org: 'IIT Guwahati',
    detail:
      'Awarded to the top 99.5 percentile nationwide, supporting the Data Science minor completed alongside my degree.',
  },
  {
    title: 'KDSH Hackathon, Track B',
    org: 'IIT Kharagpur',
    detail:
      'Competed as part of Team Prime, building a narrative consistency checker that audits full-length novels for plot and character contradictions.',
  },
  {
    title: 'Machine Learning Challenge',
    org: 'Saptang Labs',
    detail:
      'Submitted an agentic reasoning system built on a LoRA fine-tuned Llama 3 8B model with a tool-use loop for verifying its own arithmetic.',
  },
];

export const Achievements: React.FC = () => {
  return (
    <article className="achievements active" data-page="achievements">
      <header>
        <h2 className="h2 article-title">
          <ShinyText text="Achievements" speed={3} />
        </h2>
      </header>

      <section className="achievement-section">
        <ul className="achievement-list">
          {achievements.map((item, index) => (
            <BorderGlow
              key={index}
              as="li"
              borderRadius={14}
              backgroundColor="var(--eerie-black-1)"
              glowColor="45 100 72"
              colors={['#ffdb70', '#e5a13c', '#ff8f00']}
              edgeSensitivity={30}
              className="w-full"
              contentClassName="achievement-content relative z-[1]"
            >
              <p className="achievement-org">{item.org}</p>
              <h3 className="h4 achievement-title">{item.title}</h3>
              <p className="achievement-detail">{item.detail}</p>
              {item.link && (
                <a
                  className="achievement-link"
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item.linkLabel}
                </a>
              )}
            </BorderGlow>
          ))}
        </ul>
      </section>
    </article>
  );
};
