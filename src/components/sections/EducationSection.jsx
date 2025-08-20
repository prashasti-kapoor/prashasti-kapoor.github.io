// src/components/sections/EducationSection.jsx
import React from 'react';
import Section from './Section.jsx';
import { education } from '../../data/siteContent.js';

export default function EducationSection() {
  return (
    <Section id="education" >
      <ul className="space-y-6">
        {education.map((edu, idx) => {
          const {
            degree,
            school,
            year,
            gpa,       // NEW: GPA shown next to year
            details = [],
            logo,      // institute logo
            photo,     // classmates/group photo (right side on md+)
          } = edu;

          const meta = [year, gpa ? `GPA: ${gpa}` : null].filter(Boolean).join(' • ');

          return (
            <li
              key={idx}
              className="rounded-2xl bg-white/5 backdrop-blur border border-white/10"
            >
              <div
                className={`p-5 md:p-6 ${
                  photo ? 'md:grid md:grid-cols-[1fr,auto] md:items-start md:gap-6' : ''
                }`}
              >
                {/* Left: content */}
                <div className="flex items-start gap-4">
                  {logo && (
                    <img
                      src={logo}
                      alt={`${school} logo`}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-xl object-contain bg-white/10 ring-white/15 shadow"
                      loading="lazy"
                    />
                  )}

                  <div className="flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl font-semibold">{degree}</h3>
                      {meta && <span className="text-sm text-gray-400">{meta}</span>}
                    </div>

                    <div className="text-gray-300">{school}</div>

                    {details.length > 0 && (
                      <>
                        <div className="mt-3 text-sm font-semibold text-gray-300">
                          Relevant Courses
                        </div>
                        <ul className="list-disc list-inside space-y-1 text-gray-200 mt-1">
                          {details.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>

                {/* Right: classmates photo (stacks below on mobile) */}
                {photo && (
                  <div className="mt-4 md:mt-0 md:justify-self-end md:self-start">
                    <img
                      src={photo}
                      alt={`${school} — classmates`}
                      className="block w-56 md:w-64 lg:w-72 h-auto object-contain rounded-xl bg-white/5 p-1 border border-white/10"
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
