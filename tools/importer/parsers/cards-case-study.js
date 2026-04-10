/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-case-study. Base: cards.
 * Source: https://www.cognizant.com/us/en
 * Model fields: image (+ imageAlt collapsed), text
 * Container block: each rollover-teaser = one row with 2 cols [image | text]
 * Source DOM: div.rollover-teaser-wrapper contains multiple div.rollover-teaser.block
 */
export default function parse(element, { document }) {
  const cards = element.querySelectorAll('.rollover-teaser.block, .rollover-teaser');
  const cells = [];

  cards.forEach((card) => {
    // Col 1: card image
    const imgEl = card.querySelector('.cmp-teaser-image img, img');
    const imgCell = document.createDocumentFragment();
    if (imgEl) {
      imgCell.appendChild(document.createComment(' field:image '));
      const pic = imgEl.closest('picture') || imgEl;
      imgCell.appendChild(pic.cloneNode(true));
    }

    // Col 2: card text (label, title, CTA)
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));

    const label = card.querySelector('.cmp-teaser-pretitle, p.tiny, [class*="pretitle"]');
    const title = card.querySelector('.cmp-teaser-content h5, .cmp-teaser-content h4, h5, h4');
    const cta = card.querySelector('.cmp-teaser-content a, a.link-like-button, a');

    if (label) textCell.appendChild(label.cloneNode(true));
    if (title) textCell.appendChild(title.cloneNode(true));
    if (cta && cta !== title) textCell.appendChild(cta.cloneNode(true));

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-case-study', cells });
  element.replaceWith(block);
}
