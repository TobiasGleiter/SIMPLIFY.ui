class DividerBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/divider.css" />
        <hr class="divider">
    `;
  }
}

customElements.define('divider--base', DividerBase);
