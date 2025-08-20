// src/components/sections/ExperienceSection.jsx
import React from 'react';
import Section from './Section.jsx';
import { experience } from '../../data/siteContent.js';

export default function ExperienceSection() {
  return (
    <Section id="experience" title="Work Experience" width="default">
      <ul className="space-y-12">
        {experience.map((job, idx) => {
          const { title, company, location, duration, points, projects, logo } = job;

          return (
            <li
              key={idx}
              className="rounded-2xl bg-white/5 backdrop-blur p-6 border border-white/10"
            >
              <div className="flex items-start gap-4">
                {logo && (
                  <img
                    src={logo}
                    alt={`${company} logo`}
                    className="w-14 h-14 rounded-md object-contain bg-white/10 p-1"
                    loading="lazy"
                  />
                )}
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
                    <div>
                      <h3 className="text-xl font-semibold text-white">{title}</h3>
                      <p className="text-md text-gray-300">{company}</p>
                    </div>
                    <span className="text-sm text-gray-400">
                      {[location, duration].filter(Boolean).join(' • ')}
                    </span>
                  </div>

                  {points && points.length > 0 && (
                    <ul className="list-disc list-inside space-y-2 text-gray-300 mt-3">
                      {points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  )}

                  {/* Render Projects Associated with the Job */}
                  {projects && projects.length > 0 && (
                    <div className="mt-6">
                      <h4 className="text-lg font-semibold text-gray-200 border-b border-white/10 pb-2 mb-4">
                        Key Projects
                      </h4>
                      <div className="space-y-4">
                        {projects.map((project, pIdx) => (
                          <div key={pIdx} className="bg-black/20 p-4 rounded-lg">
                            <h5 className="font-bold text-white">{project.title}</h5>
                            <p className="text-sm text-gray-400 mb-2">{project.subtitle}</p>
                            <p className="text-gray-300 text-sm mb-3">{project.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {project.tags.map((tag, tIdx) => (
                                <span
                                  key={tIdx}
                                  className={`text-xs font-medium px-2.5 py-1 rounded-full bg-gray-800 border border-gray-600 ${project.color || 'text-cyan-400'}`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
