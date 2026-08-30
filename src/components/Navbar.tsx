import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { springMove } from '../lib/motion';
import { TABS, type TabId } from '../lib/tabs';

interface NavbarProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const reduceMotion = useReducedMotion();

  const handleSelect = (tabId: TabId) => {
    setActiveTab(tabId);
    // A hard jump to the top gives no sense of where the page went.
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;

          return (
            <li key={tab.id} className="navbar-item">
              <button
                className={`navbar-link ${isActive ? 'active' : ''}`}
                onClick={() => handleSelect(tab.id)}
                aria-current={isActive ? 'page' : undefined}
                title={tab.title}
              >
                {/*
                  One indicator shared across every tab, so it travels from the
                  old tab to the new one instead of blinking out here and in
                  there. The movement is what tells you the two are the same
                  thing in a new place.
                */}
                {isActive &&
                  (reduceMotion ? (
                    <span className="navbar-indicator" />
                  ) : (
                    <motion.span
                      layoutId="navbar-indicator"
                      className="navbar-indicator"
                      transition={springMove}
                    />
                  ))}
                <span className="navbar-label">{tab.label}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
