/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import carouselBannerParser from './parsers/carousel-banner.js';
import heroPromoParser from './parsers/hero-promo.js';
import cardsCaseStudyParser from './parsers/cards-case-study.js';
import cardsNewsParser from './parsers/cards-news.js';
import columnsCtaParser from './parsers/columns-cta.js';
import fragmentStickyParser from './parsers/fragment-sticky.js';
import formParser from './parsers/form.js';

// TRANSFORMER IMPORTS
import cognizantCleanupTransformer from './transformers/cognizant-cleanup.js';
import cognizantSectionsTransformer from './transformers/cognizant-sections.js';

// PARSER REGISTRY
const parsers = {
  'carousel-banner': carouselBannerParser,
  'hero-promo': heroPromoParser,
  'cards-case-study': cardsCaseStudyParser,
  'cards-news': cardsNewsParser,
  'columns-cta': columnsCtaParser,
  'fragment-sticky': fragmentStickyParser,
  'form': formParser,
};

// PAGE TEMPLATE CONFIGURATION
const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Cognizant US homepage with hero carousel, promotional teasers, case studies, news, and contact form',
  urls: [
    'https://www.cognizant.com/us/en'
  ],
  blocks: [
    {
      name: 'carousel-banner',
      instances: ['div.section.banner-carousel-container div.banner-carousel-wrapper']
    },
    {
      name: 'hero-promo',
      instances: [
        'div.section.rm-vertical-padding.background-fixed.mh-500 div.teaser-wrapper',
        'div.section.rm-vertical-padding.background-fixed:not(.mh-500) div.teaser-wrapper'
      ]
    },
    {
      name: 'cards-case-study',
      instances: ['div.section.rollover-teaser-container div.rollover-teaser-wrapper']
    },
    {
      name: 'cards-news',
      instances: ['div.section.news-container div.news-wrapper']
    },
    {
      name: 'columns-cta',
      instances: ['div.section.background-primary div.teaser-wrapper']
    },
    {
      name: 'fragment-sticky',
      instances: [
        'div.section.fragment-container:first-of-type div.fragment-wrapper',
        'div.section.fragment-container.form-container'
      ]
    },
    {
      name: 'form',
      instances: ['div.section.form-container.p-0 div.form-wrapper']
    }
  ],
  sections: [
    {
      id: 'section-2',
      name: 'Hero Carousel',
      selector: 'div.section.banner-carousel-container',
      style: null,
      blocks: ['carousel-banner'],
      defaultContent: []
    },
    {
      id: 'section-4',
      name: 'Company Tagline',
      selector: 'div.section.background-white.text-container',
      style: null,
      blocks: [],
      defaultContent: ['div.section.background-white.text-container h4']
    },
    {
      id: 'section-5',
      name: 'Expert Voices Teaser',
      selector: 'div.section.rm-vertical-padding.background-fixed.bg-content-bottom.mh-500',
      style: null,
      blocks: ['hero-promo'],
      defaultContent: []
    },
    {
      id: 'section-6',
      name: 'Case Studies',
      selector: 'div.section.background-transparent.text-container.rollover-teaser-container',
      style: null,
      blocks: ['cards-case-study'],
      defaultContent: [
        'div.section.rollover-teaser-container div.text.block h3',
        'div.section.rollover-teaser-container div.text.block p'
      ]
    },
    {
      id: 'section-7',
      name: 'AI-Empowered Customers Teaser',
      selector: 'div.section.rm-vertical-padding.background-fixed.bg-content-bottom.position-relative.teaser-container:not(.mh-500)',
      style: null,
      blocks: ['hero-promo'],
      defaultContent: []
    },
    {
      id: 'section-8',
      name: 'Sticky Contact Fragment',
      selector: 'div.section.fragment-container:first-of-type',
      style: null,
      blocks: ['fragment-sticky'],
      defaultContent: []
    },
    {
      id: 'section-9',
      name: 'Contact Form',
      selector: 'div.section.form-container.p-0',
      style: null,
      blocks: ['form'],
      defaultContent: [
        'div.section.form-container.p-0 h3',
        'div.section.form-container.p-0 > p'
      ]
    },
    {
      id: 'section-10',
      name: 'News',
      selector: 'div.section.rm-bottom-padding.news-container',
      style: null,
      blocks: ['cards-news'],
      defaultContent: ['div.section.news-container h3']
    },
    {
      id: 'section-11',
      name: 'Career CTA',
      selector: 'div.section.background-primary.rm-vertical-padding',
      style: 'dark',
      blocks: ['columns-cta'],
      defaultContent: []
    },
    {
      id: 'section-13',
      name: 'Footer Form Fragment',
      selector: 'div.section.fragment-container.form-container',
      style: null,
      blocks: ['fragment-sticky'],
      defaultContent: []
    }
  ]
};

// TRANSFORMER REGISTRY
const transformers = [
  cognizantCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [cognizantSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];

  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const { document, url, html, params } = payload;
    const main = document.body;

    // 1. Execute beforeTransform transformers
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. Execute afterTransform transformers (cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '')
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
