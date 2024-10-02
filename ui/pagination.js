class PaginationBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/pagination.css" />
        <div class="pagination">
            <button class="pagination__button" aria-label="Go to previous page">
              <svg class="pagination__previous-arrow" xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="9 18 15 12 9 6"></polyline>
              </svg>
              <span>Previous</span>
            </button>
            <div><slot></slot></div>
            <button class="pagination__button" aria-label="Go to next page">
              <span>Next</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"    stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="9 18 15 12 9 6"></polyline>
                </svg>
            </button>
        </div>
    `;
  }
}

class PaginationPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.link = this.shadowRoot.querySelector('a');
    if (this.hasAttribute('current')) {
      this.link.classList.add('pagination__page--current');
    }
  }

  render() {
    const href = this.getAttribute('href');

    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/pagination.css" />
        <a href="${href}" class="pagination__page"><slot></slot></a>
    `;
  }
}

customElements.define('pagination-base', PaginationBase);
customElements.define('pagination-page', PaginationPage);
