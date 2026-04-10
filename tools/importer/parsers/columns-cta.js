/* eslint-disable */
/* global WebImporter */
/**
 * Parser for columns-cta. Base: columns.
 * Source: https://www.cognizant.com/us/en
 * Columns blocks do NOT require field hint comments (per hinting.md)
 * 1 row, 2 cols: [image | heading + CTA]
 * Source DOM: div.teaser-wrapper > div.teaser with image and teaser-content
 */
export default function parse(element, { document }) {
  const teaser = element.querySelector('.teaser, .cmp-teaser') || element;

  // Col 1: image
  const imgEl = teaser.querySelector('.cmp-teaser-image img, img');
  const imgCell = document.createDocumentFragment();
  if (imgEl) {
    const pic = imgEl.closest('picture') || imgEl;
    imgCell.appendChild(pic.cloneNode(true));
  }

  // Col 2: heading + CTA
  const textCell = document.createDocumentFragment();
  const heading = teaser.querySelector('.teaser-content h5, .teaser-content h4, .teaser-content h3, h5, h4, h3');
  const cta = teaser.querySelector('.teaser-content a.link-like-button, a.link-like-button, .teaser-content a');

  if (heading) textCell.appendChild(heading.cloneNode(true));
  if (cta) textCell.appendChild(cta.cloneNode(true));

  const cells = [[imgCell, textCell]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-cta', cells });
  element.replaceWith(block);
}
