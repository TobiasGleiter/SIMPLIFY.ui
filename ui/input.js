class InputBase extends HTMLElement {
  static formAssociated = true;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
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
}

customElements.define('input--base', InputBase);
