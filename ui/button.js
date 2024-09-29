class ButtonBase extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.internals = this.attachInternals(); // Access form internals
    this.render();
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector('button');
    this.input = this.shadowRoot.querySelector('input');
    ['type', 'name', 'disabled'].forEach((attr) => {
      const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);

      if (attrValue !== null && attrValue !== undefined) {
        this.button[attr] = attrValue;
      }
    });

    this.button.addEventListener('click', () => {
      if (this.getAttribute('type') === 'submit') {
        this.internals.form.requestSubmit();
      }
    });

    if (this.hasAttribute('primary')) {
      this.button.classList.add('button--primary');
    }

    if (this.hasAttribute('secondary')) {
      this.button.classList.add('button--secondary');
    }

    if (this.hasAttribute('outline')) {
      this.button.classList.add('button--outline');
    }

    if (this.hasAttribute('ghost')) {
      this.button.classList.add('button--ghost');
    }

    if (this.hasAttribute('link')) {
      this.button.classList.add('button--link');
    }

    if (this.hasAttribute('disabled')) {
      this.button.disabled = true;
    }
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
