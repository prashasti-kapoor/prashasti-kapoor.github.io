// src/components/sections/ProjectsSection.jsx
import React from 'react';
import Section from './Section.jsx';
import { projects } from '../../data/siteContent.js';

export default function ProjectsSection() {
  return (
    <Section id="projects" >
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((p, idx) => {
          const repo = p.gitRepo || p.gitrepo; // support both keys
          return (
            <article
              key={idx}
              className="rounded-2xl bg-white/5 backdrop-blur border border-white/10 overflow-hidden"
            >
              {/* Project image */}
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-44 md:h-52 object-cover"
                  loading="lazy"
                />
              )}

              <div className="p-5">
                {/* Title + subtitle */}
                <h3 className="text-xl font-semibold mb-1">{p.title}</h3>
                {p.subtitle && (
                  <div className={`text-sm font-semibold mb-3 ${p.color ?? ''}`}>
                    {p.subtitle}
                  </div>
                )}

                {/* Description */}
                {p.description && (
                  <p className="text-gray-300 mb-4">{p.description}</p>
                )}

                {/* Tags */}
                {Array.isArray(p.tags) && p.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {p.tags.map((t, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-full text-xs border border-white/10 bg-white/5"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}

                {/* Repo link */}
                {repo && (
                  <a
                    href={repo}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium bg-gradient-to-r from-teal-200 via-cyan-700 to-cyan-500 text-white shadow hover:opacity-90 transition"
                    aria-label={`Open repository for ${p.title}`}
                  >
                    View Repo
                  </a>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
