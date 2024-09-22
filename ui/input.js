class InputBase extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.internals = this.attachInternals();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector('input');

    this.input.addEventListener('change', (e) => {
      const clone = new e.constructor(e.type, e);
      this.dispatchEvent(clone);
      this.value = this.input.value;
    });
  }

  render() {
    const inputId = this.getAttribute('id') || '';
    const placeholder = this.getAttribute('placeholder') || '';
    const type = this.getAttribute('type') || 'text';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/input.css" />
      
      <label class="input">
        <slot></slot>
        <input class="input__text" id="${inputId}" type="${type}" placeholder="${placeholder}" aria-placeholder="${placeholder}" />
      </label
      `;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = value;
    this.internals.setFormValue(value);
    this.input.value = value;
  }

  get form() {
    return this.internals.form;
  }

  get name() {
    return this.getAttribute('name');
  }

  get type() {
    return this.localName;
  }
}

customElements.define('input--base', InputBase);
