//  REFACTOR WITH: https://www.dannymoerkerke.com/blog/native-form-validation-of-web-components/

class InputBase extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const inputId = this.getAttribute('id') ? `id="${this.getAttribute('id')}"` : '';
    const type = this.getAttribute('type') || 'text';
    const placeholder = this.getAttribute('placeholder') ? `placeholder="${this.getAttribute('placeholder')}"` : '';

    const required = this.hasAttribute('required') ? 'required' : '';
    const minLength = this.getAttribute('minlength') ? `minlength="${this.getAttribute('minlength')}"` : '';
    const maxLength = this.getAttribute('maxlength') ? `maxlength="${this.getAttribute('maxlength')}"` : '';
    const pattern = this.getAttribute('pattern') ? `pattern="${this.getAttribute('pattern')}"` : '';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/input.css" />
      <label class="input">
        <slot></slot>
        <input class="input__text" id="${inputId}" type="${type}" ${placeholder} ${required} ${minLength} ${maxLength} ${pattern} />
        <span class="error-message">Invalid input</span>
      </label>`;
  }

  validate() {
    const input = this.shadowRoot.querySelector('input');
    return input.checkValidity();
  }
}

customElements.define('input--base', InputBase);
