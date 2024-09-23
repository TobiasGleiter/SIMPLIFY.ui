class LabelBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.addClickHandler();
  }

  render() {
    const labelFor = this.getAttribute('for');
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/label.css" />
      <label class="label"><slot></slot></label>
    `;

    this.labelFor = labelFor;
  }

  addClickHandler() {
    const input = document.getElementById(this.labelFor);
    const labelElement = this.shadowRoot.querySelector('label');

    if (input && labelElement) {
      labelElement.addEventListener('click', () => {
        input.focus();
        input.click();
      });
    }
  }
}

customElements.define('label--base', LabelBase);
