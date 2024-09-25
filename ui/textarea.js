class TextareaBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.internals = this.attachInternals();
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/textarea.css" />
        <label class="textarea">
          <slot></slot>
          <textarea class="textarea__input"></textarea>
        </label>
    `;
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector('textarea');
    ['name', 'value', 'placeholder'].forEach((attr) => {
      const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);

      if (attrValue !== null && attrValue !== undefined) {
        this.input[attr] = attrValue;
      }
    });
  }
}

customElements.define('textarea--base', TextareaBase);
