/* 
MIT License
Copyright (c) 2024 Tobias Gleiter 
*/

class LinkBase extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    this.link = this.querySelector('a');
    ['href', 'target', 'name'].forEach((attr) => {
      const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);

      if (attrValue !== null && attrValue !== undefined) {
        this.link[attr] = attrValue;
      }
    });
  }

  render() {
    this.innerHTML = `
        <link rel="stylesheet" href="ui/link.css" />
  
        <a class="link">${this.innerHTML}<a/>
      `;
  }
}

customElements.define('link-base', LinkBase);
