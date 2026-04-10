/* eslint-disable */
/* global WebImporter */
/**
 * Parser for fragment-sticky. Base: fragment.
 * Source: https://www.cognizant.com/us/en
 * Model fields: reference
 * Simple block: 1 row [reference link]
 * Source DOM: div.fragment-wrapper > div.fragment with link or content
 */
export default function parse(element, { document }) {
  const fragment = element.querySelector('.fragment, [class*="fragment"]') || element;
  const link = fragment.querySelector('a');

  const refCell = document.createDocumentFragment();
  refCell.appendChild(document.createComment(' field:reference '));

  if (link) {
    refCell.appendChild(link.cloneNode(true));
  } else {
    // Use a placeholder path for the fragment reference
    const placeholder = document.createElement('a');
    placeholder.href = '/content/fragments/contact-sticky';
    placeholder.textContent = '/content/fragments/contact-sticky';
    refCell.appendChild(placeholder);
  }

  const cells = [[refCell]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'fragment-sticky', cells });
  element.replaceWith(block);
}
