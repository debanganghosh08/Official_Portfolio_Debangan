import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { Sidebar } from './components/Sidebar';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Education } from './components/Education';
import { Portfolio } from './components/Portfolio';
import { Contact } from './components/Contact';
import { Career } from './components/Career';
import { Achievements } from './components/Achievements';
import { GridScan } from './components/GridScan';
import { crossFade, springMove } from './lib/motion';
import type { TabId } from './lib/tabs';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('about');
  const reduceMotion = useReducedMotion();

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'about':
        return <About />;
      case 'career':
        return <Career />;
      case 'education':
        return <Education />;
      case 'projects':
        return <Portfolio />;
      case 'achievements':
        return <Achievements />;
      case 'contact':
        return <Contact />;
      default:
        return <About />;
    }
  };

  return (
    <>
      <div
        style={{
          width: '100vw',
          height: '100vh',
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: -1,
          background: '#070707',
        }}
      >
        {/*
          A full-viewport animated background is the exact pattern reduced
          motion asks us to drop, so the flat ground colour above stands in
          for it. The scan is decorative; nothing is lost by omitting it.
        */}
        {!reduceMotion && (
          <GridScan
            sensitivity={0.55}
            lineThickness={1}
            /* Warm dark for the resting grid: the same lightness as the old
               cool grey, rotated to the theme's hue so the structure never
               reads as a second, competing colour. */
            linesColor="#35301F"
            gridScale={0.1}
            /* The shader composites additively, scaling this colour by the
               scan intensity — the ratio between channels is preserved, so
               whatever hue goes in is the hue that shows at every brightness.
               An amber with red already at full ends up reading orange-red at
               mid intensity, so this is the theme accent itself. */
            scanColor="#FFD470"
            /* Halved from the old purple's 0.4. Gold carries roughly twice the
               perceived luminance of that purple at equal RGB values (green is
               ~70% of luminance, blue ~7%), so matching the old number would
               make the sweep about twice as loud as the one it replaces. */
            scanOpacity={0.2}
            enablePost
            bloomIntensity={0.45}
            /* Chromatic aberration splits the channels spatially, which throws
               cyan fringes onto a palette that has no cool tones in it. Dialled
               down to a trace so edges keep their bite without going cold. */
            chromaticAberration={0.0011}
            noiseIntensity={0.01}
          />
        )}
      </div>
      <main>
        <Sidebar />
        <div className="main-content">
          <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />
          {/*
            Keyed on the tab, so switching remounts and the incoming page
            springs in from where it is rather than cutting. There is
            deliberately no exit animation: waiting for the outgoing page to
            finish would put latency directly on the input path, and latency is
            what kills the feeling of directness.
          */}
          <motion.div
            key={activeTab}
            className="page-transition"
            initial={{ opacity: 0, y: reduceMotion ? 0 : 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={reduceMotion ? crossFade : springMove}
          >
            {renderActiveComponent()}
          </motion.div>
        </div>
      </main>
    </>
  );
}

export default App;
