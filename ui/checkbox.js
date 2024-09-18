class CheckboxBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const checked = this.getAttribute('checked');

    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="ui/checkbox.css" />

    <label class="checkbox">
        <input type="checkbox" ${checked}>
        <span class="checkmark"></span>
        <slot></slot>
    </label>
    `;
  }
}

customElements.define('checkbox--base', CheckboxBase);
