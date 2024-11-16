import { getRandomHighlight, getHighlightsWithQuery } from '@scripts/highlights/highlights-api-helper';
import { isEmpty } from '@utils/string';

// #region Selectors
const article = document.querySelector('article') as HTMLElement;
const dialog = document.querySelector('dialog') as HTMLDialogElement;
const randomHighlightButton = document.getElementById('random-highlight-btn') as HTMLButtonElement;
const searchButton = document.getElementById('search-btn') as HTMLButtonElement;
const searchModal = document.querySelector('dialog') as HTMLDialogElement;
const closeModalButton = document.getElementById('close-modal-btn') as HTMLButtonElement;
const dialogConfirmButton = document.querySelector('[type=submit]') as HTMLButtonElement;
const authorSelect = document.getElementById('authors') as HTMLSelectElement;
const sourceSelect = document.getElementById('sources') as HTMLSelectElement;
const tagSelect = document.getElementById('tags') as HTMLSelectElement;
const form = document.querySelector('form') as HTMLFormElement;
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

const disableUnselectedSearchParams = () => {
  const unselected = document.querySelectorAll(
    'select:has( option[value=""]:checked )'
  ) as NodeListOf<HTMLSelectElement>;

  unselected.forEach(searchField => searchField.setAttribute('disabled', 'true'));
};

const enableDialogSearchParams = () => {
  document.querySelectorAll('select').forEach(searchField => searchField.removeAttribute('disabled'));
};

const setDialogValue = (event: Event) => {
  event.preventDefault();

  const isNoneSelected = document.querySelectorAll('select[disabled]').length === 0;

  if (isNoneSelected) {
    dialog.close();
  } else {
    const activeSelect = document.querySelector('select:not([disabled])') as HTMLSelectElement;
    const dialogValue = `${activeSelect.name}=${activeSelect.value}`;

    dialog.close(dialogValue);
  }
};

const insertFilteredHighlights = async () => {
  // If a tag is included in the return value, the list should include the citation component.
  // If a source or author is in the return value, show a pill button with the return value (ex: Source: Finally Alive) and an `X` button
  // to clear the filter. Clearing should insertRandomHighlight.
  form.reset();

  if (!isEmpty(dialog.returnValue)) {
    const highlights = await getHighlightsWithQuery(dialog.returnValue);

    while (article.firstChild) {
      article.firstChild.remove();
    }

    highlights.forEach(highlight => {
      const { author, body, source } = highlight;
      const figure = document.createElement('figure');

      const quotation = createQuotationComponent(body);
      const citation = createCitationComponent(author, source);
      article.appendChild(figure);
      figure.append(quotation);
    });
  }
};
// #endregion Event Listener Callbacks

// #region Event Listeners
// Insert a random highlight on initial page load
window.addEventListener('load', insertRandomHighlight);

// Insert a random highlight when clicking 'Enlighten me, Boon'
randomHighlightButton.addEventListener('click', insertRandomHighlight);

// Show the Search dialog
searchButton.addEventListener('click', () => searchModal.showModal());

// Close the Search dialog by clicking the `X` button
closeModalButton.addEventListener('click', () => dialog.close());

// Limit Search dialog search fields to a single parameter
authorSelect.addEventListener('change', disableUnselectedSearchParams);
sourceSelect.addEventListener('change', disableUnselectedSearchParams);
tagSelect.addEventListener('change', disableUnselectedSearchParams);

// Enable all Search dialog search fields when the form is reset
form.addEventListener('reset', enableDialogSearchParams);

// Set the value of the dialog's `Confirm` button to the currently selected option
dialogConfirmButton.addEventListener('click', setDialogValue);

// Always reset the form whenever the dialog is closed
dialog.addEventListener('close', insertFilteredHighlights);
// #endregion Event Listeners
