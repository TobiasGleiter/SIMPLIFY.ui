class LabelBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const labelFor = this.getAttribute('for') || '';

    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="ui/label.css" />

    <label for="${labelFor}" class="label"><slot></slot></label>
    `;
  }
}

customElements.define('label--base', LabelBase);
