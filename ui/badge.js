class BadgeBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/badge.css" />

        <div class="badge"><slot></slot></div>
    `;
  }
}

class BadgeDark extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
          <link rel="stylesheet" href="ui/badge.css" />
  
          <div class="badge badge--dark"><slot></slot></div>
      `;
  }
}

class BadgeLight extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/badge.css" />

        <div class="badge badge--light"><slot></slot></div>
    `;
  }
}

customElements.define('badge--base', BadgeBase);
customElements.define('badge--dark', BadgeDark);
customElements.define('badge--light', BadgeLight);
