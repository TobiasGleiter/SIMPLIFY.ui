class CheckboxBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.addAttributes();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="ui/checkbox.css" />

    <label class="checkbox">
        <input type="checkbox">
        <span class="checkbox__checkmark"></span>
        <slot class="checkbox__text"></slot>
    </label>
    `;
  }

  addAttributes() {
    this.input = this.shadowRoot.querySelector('input[type="checkbox"]');
    ['name', 'value', 'checked', 'disabled'].forEach((attr) => {
      const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);

      if (attrValue !== null && attrValue !== undefined) {
        this.input[attr] = attrValue;
      }
    });

    if (this.hasAttribute('checked')) {
      this.input.checked = true;
    }

    if (this.hasAttribute('disabled')) {
      this.input.disabled = true;
    }
  }
}

customElements.define('checkbox-base', CheckboxBase);
