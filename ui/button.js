/* BUTTONS */
class ButtonBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/button.css" />
      
      <button
        tabindex="0"
        aria-pressed="false"
        class="button"
      >
        <slot>Button</slot>
      </button>
    `;
  }
}

class ButtonPrimary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/button.css" />

      <button
        tabindex="0"
        aria-pressed="false"
        class="button button--primary"
      >
        <slot>Button</slot>
      </button>
    `;
  }
}

class ButtonSecondary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/button.css" />

      <button
        tabindex="0"
        aria-pressed="false"
        class="button button--secondary"
      >
        <slot>Button</slot>
      </button>
    `;
  }
}

class ButtonDark extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/button.css" />
      
      <button
        tabindex="0"
        aria-pressed="false"
        class="button button--dark"
      >
        <slot>Button</slot>
      </button>
    `;
  }
}

customElements.define('button--base', ButtonBase);
customElements.define('button--primary', ButtonPrimary);
customElements.define('button--secondary', ButtonSecondary);
customElements.define('button--dark', ButtonDark);
