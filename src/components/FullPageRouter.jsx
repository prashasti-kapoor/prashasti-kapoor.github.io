// src/components/FullPageRouter.jsx
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

import AboutSection from './sections/AboutSection.jsx';
import ExperienceSection from './sections/ExperienceSection.jsx';
import SkillsSection from './sections/SkillsSection.jsx';
import ProjectsSection from './sections/ProjectsSection.jsx';
import EducationSection from './sections/EducationSection.jsx';

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
];

export default function FullPageRouter() {
  const [activeId, setActiveId] = useState('about');
  const lockUntilRef = useRef(0); // when > Date.now(), ignore auto updates (during smooth scroll)

  useEffect(() => {
    const sections = NAV_ITEMS
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean);

    const getHeaderH = () => (document.querySelector('header')?.offsetHeight ?? 80);

    let ticking = false;

    const updateActive = () => {
      // Respect lock during animated scrolls after a click
      if (Date.now() < lockUntilRef.current) return;

      const headerH = getHeaderH();
      const viewportHeight = window.innerHeight;
      let newActiveId = activeId;
      let maxVisibleHeight = 0;

      // Find the section that occupies the most space in the viewport
      for (const section of sections) {
        const rect = section.getBoundingClientRect();

        // Calculate the visible height of the section within the content area (below the header)
        const visibleTop = Math.max(rect.top, headerH);
        const visibleBottom = Math.min(rect.bottom, viewportHeight);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > maxVisibleHeight) {
          maxVisibleHeight = visibleHeight;
          newActiveId = section.id;
        }
      }

      setActiveId(newActiveId);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(() => {
          updateActive();
          ticking = false;
        });
      }
    };

    // initialize and bind
    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActive);
    window.addEventListener('hashchange', updateActive);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateActive);
      window.removeEventListener('hashchange', updateActive);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;

    const headerH = (document.querySelector('header')?.offsetHeight ?? 80);
    // Offset ensures there's a small gap between the header and the section content
    const y = window.scrollY + el.getBoundingClientRect().top - headerH - 24;

    // Lock auto updates during the smooth scroll so highlight doesn't flicker/flip
    lockUntilRef.current = Date.now() + 900;
    setActiveId(id); // instant visual feedback
    window.scrollTo({ top: y, behavior: 'smooth' });

    // release lock a bit after the scroll completes
    setTimeout(() => {
      lockUntilRef.current = 0;
    }, 950);

    // keep the hash in sync
    history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      {/* Pill navbar */}
      <header className="fixed top-4 left-0 w-full z-20">
        <nav className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="rounded-full border border-white/10 bg-white/5 backdrop-blur px-1 py-1 shadow-lg">
            <ul className="flex items-center gap-1">
              {NAV_ITEMS.map((item) => {
                const isActive = activeId === item.id;
                return (
                  <li key={item.id} className="relative">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => handleNavClick(e, item.id)}
                      className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 ${
                        isActive ? 'text-white' : 'text-gray-300 hover:text-white'
                      }`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500 to-fuchsia-500 shadow"
                          transition={{ type: 'spring', stiffness: 500, damping: 40, mass: 0.6 }}
                        />
                      )}
                      <span className="relative z-10">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </header>

      {/* Sections */}
      <main>
        <AboutSection />
        <ExperienceSection />
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
      </main>
    </>
  );
}