/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: cognizant cleanup.
 * Selectors from captured DOM of https://www.cognizant.com/us/en
 */
const H = { before: 'beforeTransform', after: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === H.before) {
    // Remove cookie/consent banners (found in captured DOM: #onetrust-banner-sdk, .onetrust-pc-dark-filter)
    WebImporter.DOMUtils.remove(element, [
      '#onetrust-banner-sdk',
      '#onetrust-pc-sdk',
      '.onetrust-pc-dark-filter',
    ]);

    // Remove skip-to-content links (found: div.skiptomaincontent)
    WebImporter.DOMUtils.remove(element, ['.skiptomaincontent']);
  }

  if (hookName === H.after) {
    // Remove non-authorable site chrome (found in captured DOM)
    WebImporter.DOMUtils.remove(element, [
      'header.header-wrapper',
      'footer.footer-wrapper',
      'iframe',
      'link',
      'noscript',
    ]);

    // Remove data-tracking attributes
    element.querySelectorAll('[data-data-layer-id]').forEach((el) => {
      el.removeAttribute('data-data-layer-id');
    });
    element.querySelectorAll('[data-aos-easing]').forEach((el) => {
      el.removeAttribute('data-aos-easing');
      el.removeAttribute('data-aos-duration');
      el.removeAttribute('data-aos-delay');
    });
  }
}
