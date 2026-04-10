/* eslint-disable */
/* global WebImporter */
/**
 * Parser for form. Base: form.
 * Source: https://www.cognizant.com/us/en
 * Form blocks use base name "form" (no variant per forms plugin rule)
 * Simple block: 1 row with form reference path
 * Source DOM: div.form-wrapper > div.form with form fields
 */
export default function parse(element, { document }) {
  const formEl = element.querySelector('form, .form.block, [class*="form"]') || element;

  // Extract form action or create a reference path
  const formAction = formEl.getAttribute('action') || '';
  const formPath = formAction || '/content/forms/contact';

  const refCell = document.createDocumentFragment();
  const link = document.createElement('a');
  link.href = formPath;
  link.textContent = formPath;
  refCell.appendChild(link);

  const cells = [[refCell]];
  const block = WebImporter.Blocks.createBlock(document, { name: 'form', cells });
  element.replaceWith(block);
}
