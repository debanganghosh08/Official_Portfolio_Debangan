import React from 'react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const tabs = ['About', 'Resume', 'Portfolio', 'Kaggle', 'Contact'];

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        {tabs.map((tab) => {
          const tabId = tab.toLowerCase();
          return (
            <li key={tab} className="navbar-item">
              <button
                className={`navbar-link ${activeTab === tabId ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab(tabId);
                  window.scrollTo(0, 0);
                }}
              >
                {tab}
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};
