class DividerBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/divider.css" />

        <hr class="divider">
    `;
  }
}

class DividerDashed extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
          <link rel="stylesheet" href="ui/divider.css" />
  
          <hr class="divider divider--dashed">
      `;
  }
}

customElements.define('divider--base', DividerBase);

customElements.define('divider--dashed', DividerDashed);
