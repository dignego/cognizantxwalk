/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-news. Base: cards.
 * Source: https://www.cognizant.com/us/en
 * Model fields: image (+ imageAlt collapsed), text
 * Container block: each news article = one row with 2 cols [image | text]
 * Source DOM: div.news-wrapper contains div.news with RSS feed articles
 */
export default function parse(element, { document }) {
  const articles = element.querySelectorAll('.cmp-teaser, article, [class*="news-item"]');
  const cells = [];

  if (articles.length > 0) {
    articles.forEach((article) => {
      const imgEl = article.querySelector('img');
      const imgCell = document.createDocumentFragment();
      if (imgEl) {
        imgCell.appendChild(document.createComment(' field:image '));
        const pic = imgEl.closest('picture') || imgEl;
        imgCell.appendChild(pic.cloneNode(true));
      }

      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(' field:text '));
      const date = article.querySelector('.cmp-teaser__pretitle, [class*="date"], [class*="pretitle"]');
      const title = article.querySelector('.cmp-teaser__title, h4, h5');
      const desc = article.querySelector('.cmp-teaser__description, [class*="description"]');
      const link = article.querySelector('a[class*="link"], a.link-like-button');

      if (date) textCell.appendChild(date.cloneNode(true));
      if (title) textCell.appendChild(title.cloneNode(true));
      if (desc) textCell.appendChild(desc.cloneNode(true));
      if (link) textCell.appendChild(link.cloneNode(true));

      cells.push([imgCell, textCell]);
    });
  } else {
    // Fallback: extract any links and content from the news wrapper
    const links = element.querySelectorAll('a');
    links.forEach((link) => {
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(' field:text '));
      textCell.appendChild(link.cloneNode(true));
      cells.push([document.createDocumentFragment(), textCell]);
    });
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-news', cells });
  element.replaceWith(block);
}
