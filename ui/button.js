/* 
MIT License
Copyright (c) 2024 Tobias Gleiter 
*/

// TODO: Try to make it more simple and reducing Shadow DOM if possible

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

    if (this.hasAttribute('secondary')) {
      this.button.classList.add('button--secondary');
    }

    if (this.hasAttribute('outline')) {
      this.button.classList.add('button--outline');
    }

    if (this.hasAttribute('ghost')) {
      this.button.classList.add('button--ghost');
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

customElements.define('button-base', ButtonBase);
