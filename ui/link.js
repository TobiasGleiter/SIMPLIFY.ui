class LinkBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.link = this.shadowRoot.querySelector('a');
    ['href', 'target', 'name'].forEach((attr) => {
      const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);

      if (attrValue !== null && attrValue !== undefined) {
        this.link[attr] = attrValue;
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/link.css" />
  
        <a class="link"><slot></slot><a/>
      `;
  }
}

customElements.define('link-base', LinkBase);
