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
            <button secondary>Previous</button>
            <div><slot></slot></div>
            <button>Next</button>
        </div>
    `;
  }
}

customElements.define('pagination-base', PaginationBase);
