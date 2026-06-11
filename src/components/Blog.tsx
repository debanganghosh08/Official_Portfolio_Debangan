import React from 'react';
import ShinyText from './ShinyText';

interface BlogPost {
  title: string;
  category: string;
  date: string;
  dateValue: string;
  image: string;
  text: string;
  link?: string;
}

const blogPosts: BlogPost[] = [
  {
    title: 'Advanced EDA and Feature Engineering in Python',
    category: 'Data Science',
    date: 'May 28, 2026',
    dateValue: '2026-05-28',
    image: '/assets/images/blog-1.jpg',
    text: 'A deep dive into utilizing Pandas and Polars for high-speed data manipulation, focusing on extracting actionable business insights and handling complex missing data structures.',
    link: 'https://kaggle.com/debanganghosh',
  },
  {
    title: 'Differential Privacy in Generative AI Training',
    category: 'Machine Learning',
    date: 'April 15, 2026',
    dateValue: '2026-04-15',
    image: '/assets/images/blog-2.jpg',
    text: 'Exploring modern techniques to prevent sensitive data leakage in LLMs and deep learning models using JAX and PyTorch.',
    link: 'https://github.com/debanganghosh08',
  },
];

export const Blog: React.FC = () => {
  return (
    <article className="blog active" data-page="kaggle">
      <header>
        <h2 className="h2 article-title">
          <ShinyText text="Kaggle & Insights" speed={3} />
        </h2>
      </header>

      <section className="blog-posts">
        <ul className="blog-posts-list">
          {blogPosts.map((post, index) => (
            <li key={index} className="blog-post-item">
              <a href={post.link || '#'} target="_blank" rel="noopener noreferrer">
                <figure className="blog-banner-box">
                  <img src={post.image} alt={post.title} loading="lazy" />
                </figure>
                <div className="blog-content">
                  <div className="blog-meta">
                    <p className="blog-category">{post.category}</p>
                    <span className="dot"></span>
                    <time dateTime={post.dateValue}>{post.date}</time>
                  </div>
                  <h3 className="h3 blog-item-title">{post.title}</h3>
                  <p className="blog-text">{post.text}</p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </article>
  );
};
