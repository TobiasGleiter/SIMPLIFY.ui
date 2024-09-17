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
      
      <input class="input" id="${inputId}" type="text" placeholder="${placeholder}" aria-placeholder="${placeholder}" />
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
    const name = this.getAttribute('name');
    const value = this.getAttribute('value');

    this.shadowRoot.innerHTML = `

    <input class="input" type="radio" id="${inputId}" name="${name}" value="${value}" />
    `;
  }
}

customElements.define('input--base', InputBase);
customElements.define('input--radio', InputRadio);
