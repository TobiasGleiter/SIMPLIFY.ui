class TextareaBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const id = this.getAttribute('id');
    const placeholder = this.getAttribute('placeholder') || '';

    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/textarea.css" />
        <label class="textarea">
          <slot></slot>
          <textarea id="${id}" class="textarea__input" placeholder="${placeholder}"></textarea>
        </label>
    `;
  }
}

customElements.define('textarea--base', TextareaBase);
