/* eslint-disable */
/* global WebImporter */
/**
 * Parser for hero-promo. Base: hero.
 * Source: https://www.cognizant.com/us/en
 * Model fields: image (+ imageAlt collapsed), text
 * Simple block: 2 rows [image] [text]
 * Source DOM: div.teaser-wrapper > div.teaser with .cmp-teaser-image and .teaser-content
 */
export default function parse(element, { document }) {
  const teaser = element.querySelector('.teaser, .cmp-teaser') || element;

  // Row 1: background image
  const imgEl = teaser.querySelector('.cmp-teaser-image img, img');
  const imgCell = document.createDocumentFragment();
  if (imgEl) {
    imgCell.appendChild(document.createComment(' field:image '));
    const pic = imgEl.closest('picture') || imgEl;
    imgCell.appendChild(pic.cloneNode(true));
  }

  // Row 2: text content (heading, description, CTA)
  const textCell = document.createDocumentFragment();
  textCell.appendChild(document.createComment(' field:text '));
  const heading = teaser.querySelector('.teaser-content h1, .teaser-content h2, .teaser-content h3, .teaser-content h4, .teaser-content h5, .teaser-content a[class*="title"], h5, h3, h2');
  const description = teaser.querySelector('.teaser-content p, .teaser-description, p');
  const cta = teaser.querySelector('.teaser-content a.link-like-button, .teaser-content a.button, a.link-like-button');

  if (heading) textCell.appendChild(heading.cloneNode(true));
  if (description) textCell.appendChild(description.cloneNode(true));
  if (cta) textCell.appendChild(cta.cloneNode(true));

  const cells = [[imgCell], [textCell]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-promo', cells });
  element.replaceWith(block);
}
