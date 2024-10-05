/* 
MIT License
Copyright (c) 2024 Tobias Gleiter 
*/

class AccordionBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    const groupName = this.getAttribute('name');
    const detailsElement = this.shadowRoot.querySelector('details');
    detailsElement.addEventListener('toggle', () => {
      if (detailsElement.open) {
        this.collapseOtherAccordions(groupName);
      }
    });
  }

  collapseOtherAccordions(groupName) {
    const allAccordions = document.querySelectorAll(`accordion-base[name="${groupName}"]`);
    allAccordions.forEach((accordion) => {
      if (accordion !== this) {
        const details = accordion.shadowRoot.querySelector('details');
        if (details.open) {
          details.open = false;
        }
      }
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/accordion.css" />
        <details class="accordion">
          <summary class="accordion__summary"><slot name="summary"></slot></summary>
          <div class="accordion__content"><slot name="content"></slot></div>
        </details>
    `;
  }
}

customElements.define('accordion-base', AccordionBase);
