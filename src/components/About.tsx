import React from 'react';
import BorderGlow from './BorderGlow';
import ShinyText from './ShinyText';

const servicesData = [
  {
    title: 'Backend & API Engineering',
    text: 'Building and running production services in Python and TypeScript — FastAPI with SQLAlchemy, Alembic and PostgreSQL deployed on Render, and class-based Node.js and Express services with DTOs. Multi-tenant scoping, rate limiting and background jobs included.',
    icon: '/assets/images/icon-dev.svg',
  },
  {
    title: 'Agent Harnesses & Tooling',
    text: 'Making AI coding agents behave like careful engineers inside a real codebase — harnesses with enforcement hooks, reusable skills and rules, Markdown memory that carries context between sessions, and evaluations that measure the difference rather than assert it.',
    icon: '/assets/images/icon-design.svg',
  },
  {
    title: 'Data Pipelines & Integrations',
    text: 'Making third-party data survive contact with production — bounded, resumable ingestion from CRM, ad, outbound-email and HR APIs, conservative deduplication on exact keys, chunked bulk upserts, and attribution maths that reconciles to the P&L.',
    icon: '/assets/images/icon-app.svg',
  },
  {
    title: 'Applied Machine Learning',
    text: 'Retrieval pipelines with FAISS and ChromaDB, semantic matching on embedding models, LoRA fine-tuning on open-weight models, and the evaluation harnesses needed to tell whether any of it actually worked.',
    icon: '/assets/images/icon-photo.svg',
  },
];

/** The marks alone, with the roles behind them living on the Career tab. */
const affiliations = [
  { name: 'Vempower Ventures', image: '/assets/images/vempower-logo-dark.png' },
  { name: 'Google DeepMind', image: '/assets/images/deepmind.png' },
  { name: 'PlayTo', image: '/assets/images/playto.png' },
];

export const About: React.FC = () => {
  return (
    <article className="about active" data-page="about">
      <header>
        <h2 className="h2 article-title">
          <ShinyText text="About me" speed={3} />
        </h2>
      </header>

      <section className="about-text">
        <p>
          I am a software developer working on backend systems and applied AI, across roles as a
          software developer, backend engineer and AI engineer. I work mainly in Python,
          JavaScript, SQL and C++, with FastAPI, Docker, PyTorch and TensorFlow, and I am active
          on Kaggle where my best global ranking is 962. Earlier in 2026 I contributed to Google
          DeepMind&apos;s open-source JAX privacy repository and was{' '}
          <a
            className="inline-link"
            href="https://arxiv.org/pdf/2602.17861#search=%22Debangan%20Ghosh%22"
            target="_blank"
            rel="noopener noreferrer"
          >
            acknowledged in one of their research papers
          </a>
          .
        </p>

        <p>
          Something I care about is making AI tooling genuinely useful inside a real codebase,
          rather than a novelty bolted on the side. Right now that means owning the engineering
          of SparqAI, a GTM ROI platform that went from a laptop to production this autumn, and
          building{' '}
          <a
            className="inline-link"
            href="https://github.com/debanganghosh08/LORD_CLAUDE"
            target="_blank"
            rel="noopener noreferrer"
          >
            LORD
          </a>
          , an open-source harness that gives any IDE coding model the discipline of a senior
          engineer. Alongside those I keep two personal systems, a provider-independent digital
          twin and an agent-operated job-search pipeline, both built on the same rule: the durable
          value lives in the specification, the decisions and the tests, not in whichever model
          wrote the code. I am still early in my career and learning quickly, and I enjoy work
          where the hard part is understood properly before it gets built.
        </p>
      </section>

      {/* Services */}
      <section className="service">
        <h3 className="h3 service-title">What i&apos;m doing</h3>
        <ul className="service-list">
          {servicesData.map((service, index) => (
            <BorderGlow
              key={index}
              as="li"
              borderRadius={14}
              backgroundColor="var(--eerie-black-1)"
              glowColor="45 100 72"
              colors={['#ffdb70', '#e5a13c', '#ff8f00']}
              edgeSensitivity={30}
              className="w-full"
              contentClassName="service-item-content relative z-[1]"
            >
              <div className="service-icon-box">
                <img src={service.icon} alt={`${service.title} icon`} width="40" />
              </div>
              <div className="service-content-box">
                <h4 className="h4 service-item-title">{service.title}</h4>
                <p className="service-item-text">{service.text}</p>
              </div>
            </BorderGlow>
          ))}
        </ul>
      </section>

      {/* Where I have worked */}
      <section className="clients">
        <h3 className="h3 clients-title">Contributions &amp; Internships</h3>

        <ul className="affiliation-list">
          {affiliations.map((item) => (
            <li key={item.name} className="affiliation-item">
              <img
                className="affiliation-logo"
                src={item.image}
                alt={item.name}
                loading="lazy"
              />
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
