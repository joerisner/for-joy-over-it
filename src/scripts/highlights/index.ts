import { getRandomHighlight } from '@scripts/highlights/highlights-api-helper';

// #region Selectors
const article = document.querySelector('article') as HTMLElement;
const randomHighlightButton = document.getElementById('random-highlight-btn') as HTMLButtonElement;
// #endregion Selectors

// #region Components
const createQuotationComponent = (text: string) => {
  const blockquote = document.createElement('blockquote');
  blockquote.textContent = text;
  blockquote.className = 'quotation';
  return blockquote;
};

const createCitationComponent = (author: string, source: string) => {
  const figcaption = document.createElement('figcaption');
  const p = document.createElement('p');
  const cite = document.createElement('cite');

  p.textContent = author;
  cite.textContent = source;
  figcaption.append(p, cite);
  return figcaption;
};
// #endregion Components

// #region Event Listener Callbacks
const insertRandomHighlight = async () => {
  const { author, body, source } = await getRandomHighlight();
  const figure = document.createElement('figure');

  while (article.firstChild) {
    article.firstChild.remove();
  }

  article.appendChild(figure);

  const quotation = createQuotationComponent(body);
  const citation = createCitationComponent(author, source);
  figure.append(quotation, citation);
};
// #endregion Event Listener Callbacks

// #region Event Listeners
// Insert a random highlight on initial page load
window.addEventListener('load', insertRandomHighlight);

// Insert a random highlight when clicking 'Enlighten me, Boon'
randomHighlightButton.addEventListener('click', insertRandomHighlight);
// #endregion Event Listeners
