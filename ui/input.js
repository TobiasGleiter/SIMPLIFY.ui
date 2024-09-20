class InputBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const inputId = this.getAttribute('id') || '';
    const placeholder = this.getAttribute('placeholder') || '';

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/input.css" />
      
      <input class="input__text" id="${inputId}" type="text" placeholder="${placeholder}" aria-placeholder="${placeholder}" />
      `;
  }
}

class InputRadio extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const inputId = this.getAttribute('id');
    const value = this.getAttribute('value');

    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="ui/input.css" />
    <label class="container">
      One
      <input type="radio" id="${inputId}" value="${value}" />
      <span class="checkmark"></span>
    </label>
    `;
  }
}

customElements.define('input--base', InputBase);
customElements.define('input--radio', InputRadio);
