//  REFACTOR WITH: https://www.dannymoerkerke.com/blog/native-form-validation-of-web-components/

class InputBase extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.internals = this.attachInternals();
    this.render();
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector('input');
    ['type', 'name', 'value', 'placeholder', 'disabled'].forEach((attr) => {
      const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);

      if (attrValue !== null && attrValue !== undefined) {
        this.input[attr] = attrValue;
      }
    });

    if (this.hasAttribute('disabled')) {
      this.input.disabled = true;
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/input.css" />
      <label class="input">
        <slot></slot>
        <input class="input__text" />
      </label>`;
  }

  get value() {
    return this.input.value;
  }

  set value(value) {
    this.input.value = value;
    this.internals.setFormValue(value);
  }

  get name() {
    return this.getAttribute('name');
  }

  get type() {
    return this.localName;
  }
}

customElements.define('input--base', InputBase);
