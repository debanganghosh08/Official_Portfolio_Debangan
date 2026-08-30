import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Icon } from './Icon';
import ShinyText from './ShinyText';
import { Collapse } from './Collapse';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { crossFade, springRotate } from '../lib/motion';

export const Sidebar: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const reduceMotion = useReducedMotion();

  /**
   * Above 1250px the contacts are always on show and the toggle is hidden, so
   * the collapse has to stand down rather than fight the stylesheet.
   */
  const isDesktop = useMediaQuery('(min-width: 1250px)');
  const isOpen = isDesktop || isActive;

  const toggleSidebar = () => {
    setIsActive((open) => !open);
  };

  return (
    <aside className={`sidebar ${isActive ? 'active' : ''}`} data-sidebar>
      <div className="sidebar-info">
        <figure className="avatar-box">
          <img src="/assets/images/my_img.png" alt="Debangan Ghosh" width="130" style={{ borderRadius: '20px' }} />
        </figure>

        <div className="info-content">
          <h1 className="name" title="Debangan Ghosh">
            <ShinyText text="Debangan Ghosh" speed={3} />
          </h1>
          <p className="title">AI Engineer & Software Developer</p>
        </div>

        <button
          className="info_more-btn"
          data-sidebar-btn
          onClick={toggleSidebar}
          aria-expanded={isOpen}
          aria-controls="sidebar-contacts"
        >
          <span>{isActive ? 'Hide Contacts' : 'Show Contacts'}</span>
          <motion.span
            style={{ display: 'block' }}
            animate={{ rotate: isActive ? 180 : 0 }}
            transition={reduceMotion ? crossFade : springRotate}
          >
            <Icon name="chevron-down" />
          </motion.span>
        </button>
      </div>

      <Collapse open={isOpen} className="sidebar-info_more">
        <div id="sidebar-contacts">
        <div className="separator"></div>

        <ul className="contacts-list">
          <li className="contact-item">
            <div className="icon-box">
              <Icon name="mail-outline" />
            </div>
            <div className="contact-info">
              <p className="contact-title">Email</p>
              <a href="mailto:debanganghoshcse@gmail.com" className="contact-link">
                debanganghoshcse@gmail.com
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <Icon name="phone-portrait-outline" />
            </div>
            <div className="contact-info">
              <p className="contact-title">Phone</p>
              <a className="contact-link">
                +91 9993268547
              </a>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <Icon name="calendar-outline" />
            </div>
            <div className="contact-info">
              <p className="contact-title">Birthday</p>
              <time dateTime="2004-08-08">May 8, 2004</time>
            </div>
          </li>

          <li className="contact-item">
            <div className="icon-box">
              <Icon name="location-outline" />
            </div>
            <div className="contact-info">
              <p className="contact-title">Location</p>
              <address>Bengaluru, Karnataka, India</address>
            </div>
          </li>
        </ul>

        <div className="separator"></div>

        <ul className="social-list">
          <li className="social-item">
            <a href="https://github.com/debanganghosh08" target="_blank" rel="noopener noreferrer" className="social-link" title="GitHub">
              <Icon name="logo-github" />
            </a>
          </li>
          <li className="social-item">
            <a href="https://linkedin.com/in/debanganghosh" target="_blank" rel="noopener noreferrer" className="social-link" title="LinkedIn">
              <Icon name="logo-linkedin" />
            </a>
          </li>
          <li className="social-item">
            <a href="https://kaggle.com/debanganghosh" target="_blank" rel="noopener noreferrer" className="social-link" title="Kaggle">
              <Icon name="logo-kaggle" />
            </a>
          </li>
          <li className="social-item">
            <a href="https://leetcode.com/debanganghosh" target="_blank" rel="noopener noreferrer" className="social-link" title="LeetCode">
              <Icon name="logo-leetcode" />
            </a>
          </li>
        </ul>
        </div>
      </Collapse>
    </aside>
  );
};
