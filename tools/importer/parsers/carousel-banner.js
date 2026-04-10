/* eslint-disable */
/* global WebImporter */
/**
 * Parser for carousel-banner. Base: carousel.
 * Source: https://www.cognizant.com/us/en
 * Model fields: media_image (+ imageAlt collapsed), content_text
 * Container block: each swiper-slide = one row with 2 cols [image | text]
 */
export default function parse(element, { document }) {
  // Get all non-duplicate slides (skip swiper-slide-duplicate)
  const slides = element.querySelectorAll('.swiper-slide:not(.swiper-slide-duplicate)');
  const cells = [];

  slides.forEach((slide) => {
    const imgEl = slide.querySelector('.slide-image img, img');
    const heading = slide.querySelector('.slide-heading, h1, h2');
    const description = slide.querySelector('.slide-description, p');
    const cta = slide.querySelector('.link-like-button, a.button, a[class*="cta"]');

    // Col 1: image with field hint
    const imgCell = document.createDocumentFragment();
    if (imgEl) {
      imgCell.appendChild(document.createComment(' field:media_image '));
      const pic = imgEl.closest('picture') || imgEl;
      imgCell.appendChild(pic.cloneNode(true));
    }

    // Col 2: text content with field hint
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:content_text '));
    if (heading) textCell.appendChild(heading.cloneNode(true));
    if (description) textCell.appendChild(description.cloneNode(true));
    if (cta) textCell.appendChild(cta.cloneNode(true));

    cells.push([imgCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-banner', cells });
  element.replaceWith(block);
}
