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
  /** Public source, where the repository is actually public. */
  repo?: string;
  /** Measured facts about the project, never adjectives. Kept to four or five. */
  highlights?: string[];
  /** A single line of honest status or process, shown under the description. */
  note?: string;
  /** The one project a visitor should read first. At most one card. */
  featured?: boolean;
}

/**
 * Pruned to the work that stands up to a stranger reading it. The tutorial
 * notebooks, forked repos and course-lab experiments were cut: a short
 * portfolio of strong work reads better than a long mixed one.
 *
 * Newest first. The three agentic systems at the top were built September to
 * October 2026; their counts (tests, commands, adapters) are measured, not
 * rounded up.
 */
const projectsData: Project[] = [
  {
    title: 'LORD',
    category: 'Agentic Systems',
    image: '/assets/images/project-lord.svg',
    featured: true,
    description:
      'An open-source, model-agnostic harness that makes whichever AI coding model is in your IDE behave like a careful senior engineer: investigate before editing, reuse before creating, keep diffs small, trace root causes and verify before claiming done. The core is standard-library Python with no model API or key, exposed as 24 commands and shipped as a Google Antigravity plugin with rules, skills, specialist agents and enforcement hooks. I designed and directed it in gated phases and ran the live evaluations myself with Gemini 3.1 Pro, moving an eight-scenario acceptance series from 1 pass, 6 partial and 1 fail to 4 pass, 4 partial and 0 fail between baselines.',
    highlights: ['24 commands', '255 tests', 'No model API or key', 'Antigravity plugin', 'v0.2.0rc1'],
    note: 'Open source under MIT. Every capability in the release report is labelled proven, heuristic or unproven.',
    repo: 'https://github.com/debanganghosh08/LORD_CLAUDE',
  },
  {
    title: 'Debangan OS',
    category: 'Agentic Systems',
    image: '/assets/images/project-debangan-os.svg',
    description:
      'A provider-independent personal digital twin. It turns my work logs, projects, goals and past decisions into provenance-tracked memory and a knowledge graph, with a critical advisor on top whose recommendations are mechanically checked against the evidence it was actually given. It labels what it knows versus what it guesses, disagrees when the evidence says I am wrong, never makes a decision for me, and enforces privacy tiers in code rather than by convention. The model is a swappable component: Anthropic, OpenAI, Gemini or a local model all see exactly the same context. Python standard library only, with no database or AI SDK.',
    highlights: ['8 phases', '640 offline tests', '4 vendor adapters', '22-dimension evaluation', '50+ decision records'],
    note: 'Specified, reviewed and acceptance-tested by me; implemented with an AI coding agent under those constraints. Not yet run against a live commercial model.',
  },
  {
    title: 'ResumeAIOS',
    category: 'Agentic Systems',
    image: '/assets/images/project-resumeaios.svg',
    description:
      'An agent-operated job-search system built while working two engineering jobs. A sanitized career knowledge base is the source of truth and each resume is a projection of it onto one job: every bullet carries a pointer back to the knowledge base, a ten-rule validator blocks unverified numbers, senior-sounding verbs and confidential patterns, and the result is an ATS-safe PDF rendered through headless Chrome. A discovery layer polls 22 public job-board and ATS sources, deduplicates, scores entry-level eligibility and visa sponsorship, and writes a morning brief. It never applies on my behalf; two human gates stay in the loop.',
    highlights: ['22 source adapters', '289 offline tests', '693 postings on first run', 'Never auto-submits'],
    note: 'Directed an overnight agentic build with Claude Code and parallel subagents, then hardened it by hand over the following days.',
  },
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

const categories = ['All', 'Agentic Systems', 'AI Engineering', 'Machine Learning', 'Computer Vision', 'Full-Stack'];

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
                  {/* One card may carry the flag. It sits on the image so the
                      grid keeps its rhythm instead of one card growing a header. */}
                  {project.featured && <span className="project-badge">Flagship</span>}
                  <div className="project-item-icon-box" style={{ opacity: 0, transition: 'var(--transition-1)' }}>
                    <Icon name="eye-outline" />
                  </div>
                  <img src={project.image} alt={project.title} loading="lazy" />
                </figure>
                <h3 className="project-title">{project.title}</h3>
                <p className="project-category">{project.category}</p>
                <p className="project-description">{project.description}</p>
                {/* Counts a reader could verify in the repository, as tags
                    rather than prose so they scan in a second. */}
                {project.highlights && (
                  <ul className="project-highlights" aria-label="Project highlights">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
                {project.note && <p className="project-note">{project.note}</p>}
                {/* Something a reader can check in under a minute beats any
                    amount of description, so the live ones say so. */}
                {(project.link || project.repo) && (
                  <div className="project-links">
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
                    {project.repo && (
                      <a
                        className="project-link"
                        href={project.repo}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>View on GitHub</span>
                        <Icon name="logo-github" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </article>
  );
};
