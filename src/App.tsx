import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Resume } from './components/Resume';
import { Portfolio } from './components/Portfolio';
import { Blog } from './components/Blog';
import { Contact } from './components/Contact';

function App() {
  const [activeTab, setActiveTab] = useState('about');

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'about':
        return <About />;
      case 'resume':
        return <Resume />;
      case 'portfolio':
        return <Portfolio />;
      case 'kaggle':
        return <Blog />;
      case 'contact':
        return <Contact />;
      default:
        return <About />;
    }
  };

  return (
    <main>
      <Sidebar />
      <div className="main-content">
        <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
        {renderActiveComponent()}
      </div>
    </main>
  );
}

export default App;
