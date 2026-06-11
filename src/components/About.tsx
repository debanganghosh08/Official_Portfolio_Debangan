import React from 'react';
import BorderGlow from './BorderGlow';
import ShinyText from './ShinyText';

const servicesData = [
  {
    title: 'AI & Agentic Workflows',
    text: 'Designing and integrating Generative AI solutions, including Retrieval-Augmented Generation (RAG) pipelines and multi-agent systems using LangChain and CrewAI.',
    icon: '/assets/images/icon-design.svg',
  },
  {
    title: 'Backend Engineering',
    text: 'Building robust, scalable REST APIs and automating CI/CD deployment pipelines using Python (FastAPI, Flask) and Docker to ensure fast, reliable system performance.',
    icon: '/assets/images/icon-dev.svg',
  },
  {
    title: 'Full-Stack Development',
    text: 'Architecting end-to-end web applications with modern frontend frameworks like React and Next.js, backed by secure relational and NoSQL databases.',
    icon: '/assets/images/icon-app.svg',
  },
  {
    title: 'Data Analytics & ML',
    text: 'Developing comprehensive data processing pipelines, performing exploratory data analysis (EDA), and training predictive models using PyTorch and traditional ML libraries.',
    icon: '/assets/images/icon-photo.svg',
  },
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
          Hello! I am a Computer Science graduate who is deeply passionate about bridging the gap between advanced 
          artificial intelligence and practical, scalable software. I thrive on turning complex problems into elegant, 
          data-driven solutions.
        </p>

        <p>
          My journey has taken me from architecting full-stack web applications to contributing mathematical fixes to 
          world-class open-source repositories. While my background includes hands-on experience building end-to-end ML 
          pipelines and generative AI systems, I remain a curious, highly adaptable learner at heart. I am always eager to 
          collaborate with cross-functional teams, write clean code, and build products that make a real-world impact.
        </p>
      </section>

      {/* Services */}
      <section className="service">
        <h3 className="h3 service-title">What i'm doing</h3>
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

      {/* Contributions & Internships */}
      <section className="clients">
        <h3 className="h3 clients-title">Contributions & Internships</h3>
        <div 
          style={{ 
            display: 'flex', 
            gap: '60px', 
            justifyContent: 'center', 
            alignItems: 'center', 
            flexWrap: 'wrap', 
            padding: '30px 0' 
          }}
        >
          <img 
            src="/assets/images/deepmind.png" 
            alt="Google DeepMind" 
            style={{ 
              maxHeight: '90px', 
              maxWidth: '280px', 
              objectFit: 'contain',
              filter: 'brightness(0) invert(1) opacity(0.8)' // Whitens logo to look clean on dark backgrounds
            }} 
          />
          <img 
            src="/assets/images/playto.png" 
            alt="PlayTo" 
            style={{ 
              maxHeight: '90px', 
              maxWidth: '280px', 
              objectFit: 'contain',
              filter: 'brightness(0) invert(1) opacity(0.8)' // Whitens logo to look clean on dark backgrounds
            }} 
          />
        </div>
      </section>
    </article>
  );
};
