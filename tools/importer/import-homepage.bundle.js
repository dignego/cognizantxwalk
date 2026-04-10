var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/carousel-banner.js
  function parse(element, { document }) {
    const slides = element.querySelectorAll(".swiper-slide:not(.swiper-slide-duplicate)");
    const cells = [];
    slides.forEach((slide) => {
      const imgEl = slide.querySelector(".slide-image img, img");
      const heading = slide.querySelector(".slide-heading, h1, h2");
      const description = slide.querySelector(".slide-description, p");
      const cta = slide.querySelector('.link-like-button, a.button, a[class*="cta"]');
      const imgCell = document.createDocumentFragment();
      if (imgEl) {
        imgCell.appendChild(document.createComment(" field:media_image "));
        const pic = imgEl.closest("picture") || imgEl;
        imgCell.appendChild(pic.cloneNode(true));
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:content_text "));
      if (heading) textCell.appendChild(heading.cloneNode(true));
      if (description) textCell.appendChild(description.cloneNode(true));
      if (cta) textCell.appendChild(cta.cloneNode(true));
      cells.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "carousel-banner", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-promo.js
  function parse2(element, { document }) {
    const teaser = element.querySelector(".teaser, .cmp-teaser") || element;
    const imgEl = teaser.querySelector(".cmp-teaser-image img, img");
    const imgCell = document.createDocumentFragment();
    if (imgEl) {
      imgCell.appendChild(document.createComment(" field:image "));
      const pic = imgEl.closest("picture") || imgEl;
      imgCell.appendChild(pic.cloneNode(true));
    }
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(" field:text "));
    const heading = teaser.querySelector('.teaser-content h1, .teaser-content h2, .teaser-content h3, .teaser-content h4, .teaser-content h5, .teaser-content a[class*="title"], h5, h3, h2');
    const description = teaser.querySelector(".teaser-content p, .teaser-description, p");
    const cta = teaser.querySelector(".teaser-content a.link-like-button, .teaser-content a.button, a.link-like-button");
    if (heading) textCell.appendChild(heading.cloneNode(true));
    if (description) textCell.appendChild(description.cloneNode(true));
    if (cta) textCell.appendChild(cta.cloneNode(true));
    const cells = [[imgCell], [textCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-case-study.js
  function parse3(element, { document }) {
    const cards = element.querySelectorAll(".rollover-teaser.block, .rollover-teaser");
    const cells = [];
    cards.forEach((card) => {
      const imgEl = card.querySelector(".cmp-teaser-image img, img");
      const imgCell = document.createDocumentFragment();
      if (imgEl) {
        imgCell.appendChild(document.createComment(" field:image "));
        const pic = imgEl.closest("picture") || imgEl;
        imgCell.appendChild(pic.cloneNode(true));
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      const label = card.querySelector('.cmp-teaser-pretitle, p.tiny, [class*="pretitle"]');
      const title = card.querySelector(".cmp-teaser-content h5, .cmp-teaser-content h4, h5, h4");
      const cta = card.querySelector(".cmp-teaser-content a, a.link-like-button, a");
      if (label) textCell.appendChild(label.cloneNode(true));
      if (title) textCell.appendChild(title.cloneNode(true));
      if (cta && cta !== title) textCell.appendChild(cta.cloneNode(true));
      cells.push([imgCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-case-study", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-news.js
  function parse4(element, { document }) {
    const articles = element.querySelectorAll('.cmp-teaser, article, [class*="news-item"]');
    const cells = [];
    if (articles.length > 0) {
      articles.forEach((article) => {
        const imgEl = article.querySelector("img");
        const imgCell = document.createDocumentFragment();
        if (imgEl) {
          imgCell.appendChild(document.createComment(" field:image "));
          const pic = imgEl.closest("picture") || imgEl;
          imgCell.appendChild(pic.cloneNode(true));
        }
        const textCell = document.createDocumentFragment();
        textCell.appendChild(document.createComment(" field:text "));
        const date = article.querySelector('.cmp-teaser__pretitle, [class*="date"], [class*="pretitle"]');
        const title = article.querySelector(".cmp-teaser__title, h4, h5");
        const desc = article.querySelector('.cmp-teaser__description, [class*="description"]');
        const link = article.querySelector('a[class*="link"], a.link-like-button');
        if (date) textCell.appendChild(date.cloneNode(true));
        if (title) textCell.appendChild(title.cloneNode(true));
        if (desc) textCell.appendChild(desc.cloneNode(true));
        if (link) textCell.appendChild(link.cloneNode(true));
        cells.push([imgCell, textCell]);
      });
    } else {
      const links = element.querySelectorAll("a");
      links.forEach((link) => {
        const textCell = document.createDocumentFragment();
        textCell.appendChild(document.createComment(" field:text "));
        textCell.appendChild(link.cloneNode(true));
        cells.push([document.createDocumentFragment(), textCell]);
      });
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-news", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-cta.js
  function parse5(element, { document }) {
    const teaser = element.querySelector(".teaser, .cmp-teaser") || element;
    const imgEl = teaser.querySelector(".cmp-teaser-image img, img");
    const imgCell = document.createDocumentFragment();
    if (imgEl) {
      const pic = imgEl.closest("picture") || imgEl;
      imgCell.appendChild(pic.cloneNode(true));
    }
    const textCell = document.createDocumentFragment();
    const heading = teaser.querySelector(".teaser-content h5, .teaser-content h4, .teaser-content h3, h5, h4, h3");
    const cta = teaser.querySelector(".teaser-content a.link-like-button, a.link-like-button, .teaser-content a");
    if (heading) textCell.appendChild(heading.cloneNode(true));
    if (cta) textCell.appendChild(cta.cloneNode(true));
    const cells = [[imgCell, textCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-cta", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/fragment-sticky.js
  function parse6(element, { document }) {
    const fragment = element.querySelector('.fragment, [class*="fragment"]') || element;
    const link = fragment.querySelector("a");
    const refCell = document.createDocumentFragment();
    refCell.appendChild(document.createComment(" field:reference "));
    if (link) {
      refCell.appendChild(link.cloneNode(true));
    } else {
      const placeholder = document.createElement("a");
      placeholder.href = "/content/fragments/contact-sticky";
      placeholder.textContent = "/content/fragments/contact-sticky";
      refCell.appendChild(placeholder);
    }
    const cells = [[refCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "fragment-sticky", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/form.js
  function parse7(element, { document }) {
    const formEl = element.querySelector('form, .form.block, [class*="form"]') || element;
    const formAction = formEl.getAttribute("action") || "";
    const formPath = formAction || "/content/forms/contact";
    const refCell = document.createDocumentFragment();
    const link = document.createElement("a");
    link.href = formPath;
    link.textContent = formPath;
    refCell.appendChild(link);
    const cells = [[refCell]];
    const block = WebImporter.Blocks.createBlock(document, { name: "form", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/cognizant-cleanup.js
  var H = { before: "beforeTransform", after: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === H.before) {
      WebImporter.DOMUtils.remove(element, [
        "#onetrust-banner-sdk",
        "#onetrust-pc-sdk",
        ".onetrust-pc-dark-filter"
      ]);
      WebImporter.DOMUtils.remove(element, [".skiptomaincontent"]);
    }
    if (hookName === H.after) {
      WebImporter.DOMUtils.remove(element, [
        "header.header-wrapper",
        "footer.footer-wrapper",
        "iframe",
        "link",
        "noscript"
      ]);
      element.querySelectorAll("[data-data-layer-id]").forEach((el) => {
        el.removeAttribute("data-data-layer-id");
      });
      element.querySelectorAll("[data-aos-easing]").forEach((el) => {
        el.removeAttribute("data-aos-easing");
        el.removeAttribute("data-aos-duration");
        el.removeAttribute("data-aos-delay");
      });
    }
  }

  // tools/importer/transformers/cognizant-sections.js
  var H2 = { after: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === H2.after) {
      const sections = payload && payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const document = element.ownerDocument;
      const reversedSections = [...sections].reverse();
      reversedSections.forEach((section) => {
        let sectionEl = null;
        const selectors = Array.isArray(section.selector) ? section.selector : [section.selector];
        for (const sel of selectors) {
          sectionEl = element.querySelector(sel);
          if (sectionEl) break;
        }
        if (!sectionEl) return;
        if (section.style) {
          const sectionMetadata = WebImporter.Blocks.createBlock(document, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.append(sectionMetadata);
        }
        const isFirst = sections.indexOf(section) === 0;
        if (!isFirst && sectionEl.previousElementSibling) {
          const hr = document.createElement("hr");
          sectionEl.before(hr);
        }
      });
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "carousel-banner": parse,
    "hero-promo": parse2,
    "cards-case-study": parse3,
    "cards-news": parse4,
    "columns-cta": parse5,
    "fragment-sticky": parse6,
    "form": parse7
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Cognizant US homepage with hero carousel, promotional teasers, case studies, news, and contact form",
    urls: [
      "https://www.cognizant.com/us/en"
    ],
    blocks: [
      {
        name: "carousel-banner",
        instances: ["div.section.banner-carousel-container div.banner-carousel-wrapper"]
      },
      {
        name: "hero-promo",
        instances: [
          "div.section.rm-vertical-padding.background-fixed.mh-500 div.teaser-wrapper",
          "div.section.rm-vertical-padding.background-fixed:not(.mh-500) div.teaser-wrapper"
        ]
      },
      {
        name: "cards-case-study",
        instances: ["div.section.rollover-teaser-container div.rollover-teaser-wrapper"]
      },
      {
        name: "cards-news",
        instances: ["div.section.news-container div.news-wrapper"]
      },
      {
        name: "columns-cta",
        instances: ["div.section.background-primary div.teaser-wrapper"]
      },
      {
        name: "fragment-sticky",
        instances: [
          "div.section.fragment-container:first-of-type div.fragment-wrapper",
          "div.section.fragment-container.form-container"
        ]
      },
      {
        name: "form",
        instances: ["div.section.form-container.p-0 div.form-wrapper"]
      }
    ],
    sections: [
      {
        id: "section-2",
        name: "Hero Carousel",
        selector: "div.section.banner-carousel-container",
        style: null,
        blocks: ["carousel-banner"],
        defaultContent: []
      },
      {
        id: "section-4",
        name: "Company Tagline",
        selector: "div.section.background-white.text-container",
        style: null,
        blocks: [],
        defaultContent: ["div.section.background-white.text-container h4"]
      },
      {
        id: "section-5",
        name: "Expert Voices Teaser",
        selector: "div.section.rm-vertical-padding.background-fixed.bg-content-bottom.mh-500",
        style: null,
        blocks: ["hero-promo"],
        defaultContent: []
      },
      {
        id: "section-6",
        name: "Case Studies",
        selector: "div.section.background-transparent.text-container.rollover-teaser-container",
        style: null,
        blocks: ["cards-case-study"],
        defaultContent: [
          "div.section.rollover-teaser-container div.text.block h3",
          "div.section.rollover-teaser-container div.text.block p"
        ]
      },
      {
        id: "section-7",
        name: "AI-Empowered Customers Teaser",
        selector: "div.section.rm-vertical-padding.background-fixed.bg-content-bottom.position-relative.teaser-container:not(.mh-500)",
        style: null,
        blocks: ["hero-promo"],
        defaultContent: []
      },
      {
        id: "section-8",
        name: "Sticky Contact Fragment",
        selector: "div.section.fragment-container:first-of-type",
        style: null,
        blocks: ["fragment-sticky"],
        defaultContent: []
      },
      {
        id: "section-9",
        name: "Contact Form",
        selector: "div.section.form-container.p-0",
        style: null,
        blocks: ["form"],
        defaultContent: [
          "div.section.form-container.p-0 h3",
          "div.section.form-container.p-0 > p"
        ]
      },
      {
        id: "section-10",
        name: "News",
        selector: "div.section.rm-bottom-padding.news-container",
        style: null,
        blocks: ["cards-news"],
        defaultContent: ["div.section.news-container h3"]
      },
      {
        id: "section-11",
        name: "Career CTA",
        selector: "div.section.background-primary.rm-vertical-padding",
        style: "dark",
        blocks: ["columns-cta"],
        defaultContent: []
      },
      {
        id: "section-13",
        name: "Footer Form Fragment",
        selector: "div.section.fragment-container.form-container",
        style: null,
        blocks: ["fragment-sticky"],
        defaultContent: []
      }
    ]
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, html, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
