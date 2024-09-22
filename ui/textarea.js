class TextareaBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    const id = this.getAttribute('id');
    const placeholder = this.getAttribute('placeholder') || '';

    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/textarea.css" />

        <textarea id="${id}" class="textarea" placeholder="${placeholder}" autocorrect="false" spellcheck="false"></textarea>
    `;
  }
}

customElements.define('textarea--base', TextareaBase);
