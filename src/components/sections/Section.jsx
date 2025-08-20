// src/components/sections/Section.jsx
import React from 'react';

/**
 * Flexible section with optional title and centering.
 * Props:
 *  - id (string)
 *  - title? (string)
 *  - center? (bool)   -> horizontal center (text-center)
 *  - vcenter? (bool)  -> vertical center (flex + items-center)
 *  - width? ('narrow'|'default'|'wide') -> max width
 *  - className? (string)
 *  - contentClassName? (string)
 */
export default function Section({
  id,
  title,
  children,
  center = false,
  vcenter = false,
  width = 'default',
  className = '',
  contentClassName = '',
}) {
  const hasTitle = Boolean(title);
  const topPad = hasTitle ? 'pt-28' : 'pt-0'; // no extra space when no title
  const vCenterCls = vcenter ? 'flex items-center' : '';

  const widths = {
    narrow: 'max-w-3xl',
    default: 'max-w-5xl',
    wide: 'max-w-7xl',
  };

  return (
    <section
      id={id}
      className={`scroll-mt-24 ${topPad} pb-24 min-h-screen ${vCenterCls} ${className}`}
      aria-labelledby={hasTitle ? `${id}-title` : undefined}
    >
      <div
        className={`${widths[width]} w-full mx-auto px-4 sm:px-6 lg:px-8 ${
          center ? 'text-center' : ''
        } ${contentClassName}`}
      >
        {hasTitle && (
          <h2 id={`${id}-title`} className="text-3xl sm:text-4xl font-semibold tracking-tight mb-6">
            {title}
          </h2>
        )}
        {children}
      </div>
    </section>
  );
}
