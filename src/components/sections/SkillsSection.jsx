// src/components/sections/SkillsSection.jsx
import React from 'react';
import Section from './Section.jsx';
import { skills } from '../../data/siteContent.js';

export default function SkillsSection() {
  return (
    <Section id="skills">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((group, idx) => (
          <div
            key={idx}
            className="rounded-2xl bg-white/5 backdrop-blur p-5 border border-white/10"
          >
            <div className="flex items-center gap-3 mb-3">
              {group.icon && (
                <img
                  src={group.icon}
                  alt={`${group.title} icon`}
                  className="w-8 h-8 object-contain rounded-md bg-white/5 p-1"
                  loading="lazy"
                />
              )}
              <h3 className="text-lg font-semibold">{group.title}</h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {group.items.map((item, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full border border-white/10 bg-white/5 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
