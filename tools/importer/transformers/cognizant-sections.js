/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: cognizant sections.
 * Adds section breaks and section-metadata from template sections.
 * Runs in afterTransform only.
 */
const H = { after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.after) {
    const sections = payload && payload.template && payload.template.sections;
    if (!sections || sections.length < 2) return;

    const document = element.ownerDocument;

    // Process sections in reverse order to avoid DOM position shifts
    const reversedSections = [...sections].reverse();

    reversedSections.forEach((section) => {
      // Try selector (string or array)
      let sectionEl = null;
      const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
      for (const sel of selectors) {
        sectionEl = element.querySelector(sel);
        if (sectionEl) break;
      }

      if (!sectionEl) return;

      // Add section-metadata block if section has a style
      if (section.style) {
        const sectionMetadata = WebImporter.Blocks.createBlock(document, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.append(sectionMetadata);
      }

      // Add <hr> before section (section break) unless it's the first section
      const isFirst = sections.indexOf(section) === 0;
      if (!isFirst && sectionEl.previousElementSibling) {
        const hr = document.createElement('hr');
        sectionEl.before(hr);
      }
    });
  }
}
