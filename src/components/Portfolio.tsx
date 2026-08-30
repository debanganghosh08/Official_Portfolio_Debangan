import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { Icon } from './Icon';
import ShinyText from './ShinyText';
import { crossFade, springMove, springRotate, springSheet } from '../lib/motion';

interface Project {
  title: string;
  category: string;
  image: string;
  description: string;
  /** Only set where the deployment is genuinely live and reachable. */
  link?: string;
}

/**
 * Pruned to the work that stands up to a stranger reading it. The tutorial
 * notebooks, forked repos and course-lab experiments were cut: a short
 * portfolio of strong work reads better than a long mixed one.
 */
const projectsData: Project[] = [
  {
    title: 'Movie Review Sentiment Benchmarking',
    category: 'Machine Learning',
    image: '/assets/images/project-1.jpg',
    description:
      'I built a local NLP pipeline to classify IMDb movie reviews as positive or negative. The difficult part was setting up a clean, modular evaluation framework to compare classical models against heavy neural networks, including error analysis on vocabulary overlap. It showed that TF-IDF with Logistic Regression and SVM matched a DistilBERT transformer (~0.90 test accuracy versus ~0.91) while being far faster and easier to interpret.',
  },
  {
    title: 'Symptom Triage Service',
    category: 'AI Engineering',
    image: '/assets/images/project-2.png',
    description:
      'An asynchronous API service that reads patient symptom descriptions and evaluates their clinical urgency. To protect it from slow LLM responses and API rate limits, I built a regular-expression keyword parser and a three-tier Redis cache that resolves simple queries locally, dropping warm-run latency to about 1ms. Covered by 42 automated unit and integration tests.',
  },
  {
    title: 'SynEthica',
    category: 'AI Engineering',
    image: '/assets/images/project-3.jpg',
    description:
      'An agentic data generator that creates realistic synthetic versions of sensitive customer databases. The challenge was protecting privacy while keeping the output demographically fair, which I handled by wiring IBM AIF360 fairness metrics into a cyclic LangGraph workflow that measures bias on each generated dataset and loops back to correct it before delivery.',
  },
  {
    title: 'Logical Reasoning Agent',
    category: 'Machine Learning',
    image: '/assets/images/project-4.png',
    description:
      'An agentic system for multi-step maths and logic problems, submitted to the Saptang Labs Machine Learning Challenge. I fine-tuned Meta-Llama-3-8B-Instruct with LoRA adapters on a single Colab GPU so it writes out its reasoning step by step, then built a Thought-Action-Observation loop that lets it call a local calculator to check its own arithmetic.',
  },
  {
    title: 'Long-Form Document Auditor',
    category: 'Machine Learning',
    image: '/assets/images/project-5.png',
    description:
      'Built with a team during the KDSH Hackathon at IIT Kharagpur: a system that audits 100k-word novels for plot and character consistency. Rather than chunking or summarising, we wrote a continuous synaptic model in PyTorch that reads the text sequentially to track character constraints, then judges whether a given backstory contradicts the novel.',
  },
  {
    title: 'PathShala AI',
    category: 'Full-Stack',
    image: '/assets/images/project-6.png',
    description:
      'A career guidance app that generates structured, step-by-step learning roadmaps from a person’s background and goals, aimed at youth mentoring in India. Built with Next.js 14 and MongoDB Atlas, with Gemini on Vertex AI prompted to return clean structured JSON the frontend can render directly.',
    link: 'https://path-shala-ai.vercel.app/',
  },
  {
    title: 'Potato Vision AI',
    category: 'Computer Vision',
    image: '/assets/images/project-7.png',
    description:
      'A tool that lets farmers upload a photo of a potato leaf and find out whether it has early blight, late blight, or is healthy. I trained the CNN in TensorFlow and deployed it on serverless GCP Cloud Functions behind a React frontend, so there is no server to keep running between requests.',
    link: 'https://potato-vision-ai-detect.vercel.app/',
  },
  {
    title: 'E-commerce Support Resolution Agent',
    category: 'AI Engineering',
    image: '/assets/images/project-8.jpg',
    description:
      'A four-agent CrewAI pipeline that reads support tickets, retrieves the relevant brand policy from ChromaDB, drafts a reply and then checks that reply against the rules before it goes out. Includes a 20-case test set and a full-minute reset that backs off cleanly when the Groq API rate-limits it.',
  },
  {
    title: 'Air Draw Number Detection',
    category: 'Computer Vision',
    image: '/assets/images/project-9.png',
    description:
      'Lets you draw a digit in the air with your index finger over a webcam, recognises it, and reads the number aloud. I trained the CNN on MNIST myself and used MediaPipe hand landmarks to turn fingertip movement into a canvas the model can actually read.',
  },
];

const categories = ['All', 'AI Engineering', 'Machine Learning', 'Computer Vision', 'Full-Stack'];

export const Portfolio: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [dropdownActive, setDropdownActive] = useState(false);
  const reduceMotion = useReducedMotion();
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category.toLowerCase());
    setDropdownActive(false);
  };

  /**
   * Every screen has to answer "how do I get out of here". An open menu that
   * only closes by picking something from it is a trap, so Escape and a click
   * anywhere outside both dismiss it.
   */
  useEffect(() => {
    if (!dropdownActive) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropdownActive(false);
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!selectBoxRef.current?.contains(e.target as Node)) {
        setDropdownActive(false);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('pointerdown', onPointerDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('pointerdown', onPointerDown);
    };
  }, [dropdownActive]);

  const filteredProjects = projectsData.filter((project) => {
    if (selectedCategory === 'all') return true;
    return project.category.toLowerCase() === selectedCategory;
  });

  return (
    <article className="portfolio active" data-page="projects">
      <header>
        <h2 className="h2 article-title">
          <ShinyText text="Projects" speed={3} />
        </h2>
      </header>

      <section className="projects">
        {/* Desktop Filter List */}
        <ul className="filter-list">
          {categories.map((cat) => (
            <li key={cat} className="filter-item">
              <button
                className={selectedCategory === cat.toLowerCase() ? 'active' : ''}
                onClick={() => handleCategoryChange(cat)}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Filter Dropdown */}
        <div className="filter-select-box" ref={selectBoxRef}>
          <button
            className={`filter-select ${dropdownActive ? 'active' : ''}`}
            onClick={() => setDropdownActive(!dropdownActive)}
            aria-expanded={dropdownActive}
            aria-haspopup="listbox"
          >
            <div className="select-value">
              {categories.find((cat) => cat.toLowerCase() === selectedCategory) || 'Select category'}
            </div>
            <motion.div
              className="select-icon"
              animate={{ rotate: dropdownActive ? 180 : 0 }}
              transition={reduceMotion ? crossFade : springRotate}
            >
              <Icon name="chevron-down" />
            </motion.div>
          </button>

          {/*
            The panel grows out of the button that opened it rather than
            appearing from nowhere, so the relationship between the two stays
            legible. It leaves along the same path it arrived by.
          */}
          <AnimatePresence>
            {dropdownActive && (
              <motion.ul
                className="select-list"
                role="listbox"
                initial={{ opacity: 0, scaleY: 0.86, y: -6 }}
                animate={{ opacity: 1, scaleY: 1, y: 0 }}
                exit={{ opacity: 0, scaleY: 0.86, y: -6 }}
                transition={reduceMotion ? crossFade : springSheet}
              >
                {categories.map((cat) => (
                  <li key={cat} className="select-item">
                    <button
                      role="option"
                      aria-selected={cat.toLowerCase() === selectedCategory}
                      onClick={() => handleCategoryChange(cat)}
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Projects Grid */}
        <ul className="project-list">
          {filteredProjects.map((project, index) => (
            /*
              Keyed on the title so re-filtering animates the cards that
              actually changed, rather than re-running every card because the
              array index shifted underneath them. The stagger is small and
              capped: it should read as one group settling, not as a queue.
            */
            <motion.li
              key={project.title}
              className="project-item active"
              style={{ cursor: 'default' }}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 12, scale: reduceMotion ? 1 : 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                ...(reduceMotion ? crossFade : springMove),
                delay: reduceMotion ? 0 : Math.min(index, 4) * 0.05,
              }}
            >
              <div>
                <figure className="project-img">
                  <div className="project-item-icon-box" style={{ opacity: 0, transition: 'var(--transition-1)' }}>
                    <Icon name="eye-outline" />
                  </div>
                  <img src={project.image} alt={project.title} loading="lazy" />
                </figure>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>
                {/* Something a reader can check in under a minute beats any
                    amount of description, so the live ones say so. */}
                {project.link && (
                  <a
                    className="project-link"
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>View live</span>
                    <Icon name="open-outline" />
                  </a>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </article>
  );
};
