class ButtonBase extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.internals = this.attachInternals(); // Access form internals
    this.render();
  }

  connectedCallback() {
    this.shadowRoot.querySelector('button').addEventListener('click', () => {
      if (this.getAttribute('type') === 'submit') {
        this.internals.form.requestSubmit();
      }
    });
  }

  render() {
    const type = this.getAttribute('type') || 'button';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/button.css" />
      
      <button
        tabindex="0"
        aria-pressed="false"
        class="button"
        type="${type}"
      >
        <slot></slot>
      </button>
    `;
  }
}

class ButtonPrimary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
        <slot></slot>
      </button>
    `;
  }
}

class ButtonSecondary extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
        <slot></slot>
      </button>
    `;
  }
}

class ButtonDark extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
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
        <slot></slot>
      </button>
    `;
  }
}

class ButtonLight extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/button.css" />
      
      <button
        tabindex="0"
        aria-pressed="false"
        class="button button--light"
      >
        <slot></slot>
      </button>
    `;
  }
}

customElements.define('button--base', ButtonBase);
customElements.define('button--primary', ButtonPrimary);
customElements.define('button--secondary', ButtonSecondary);
customElements.define('button--light', ButtonLight);
customElements.define('button--dark', ButtonDark);
