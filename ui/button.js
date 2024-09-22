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
        <slot></slot>
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

class ButtonLight extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.internals = this.attachInternals();
  }

  connectedCallback() {
    this.render();
    this.handleFormSubmit();
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

  handleFormSubmit() {
    const button = this.shadowRoot.querySelector('button');

    button.addEventListener('click', (event) => {
      event.preventDefault();

      if (this.internals.form) {
        this.internals.form.requestSubmit();
      }
    });
  }
}

customElements.define('button--base', ButtonBase);
customElements.define('button--primary', ButtonPrimary);
customElements.define('button--secondary', ButtonSecondary);
customElements.define('button--light', ButtonLight);
customElements.define('button--dark', ButtonDark);
