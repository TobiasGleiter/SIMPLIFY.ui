class BarItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['value', 'color'];
  }

  connectedCallback() {
    const parent = this.closest('bar-chart');
    if (parent) {
      parent.calculateNormalizedValues();
    }
  }

  attributeChangedCallback() {
    const parent = this.closest('bar-chart');
    if (parent) {
      parent.calculateNormalizedValues();
    }
  }
}

class BarChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.calculateNormalizedValues();
  }

  calculateNormalizedValues() {
    const size = parseInt(this.getAttribute('size') || '400');
    const barItems = Array.from(this.children).filter((child) => child.tagName === 'BAR-ITEM');

    const maxValue = Math.max(...barItems.map((item) => parseFloat(item.getAttribute('value') || '0')));

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/barchart.css" />

      <div class="chart-container">
        ${barItems
          .map((item) => {
            const value = parseFloat(item.getAttribute('value') || '0');
            const label = item.textContent.trim();
            const normalizedWidth = (value / maxValue) * (size - 100);

            return `
            <div class="bar-container" style="max-width: ${size}px;">
              <div
                class="bar"
                style="width: ${normalizedWidth}px;"
                title="${label}: ${value}"
              ></div>
              <span class="bar-label">${label} (${value})</span>
            </div>
          `;
          })
          .join('')}
      </div>
    `;
  }

  static get observedAttributes() {
    return ['size'];
  }

  attributeChangedCallback(name) {
    if (name === 'size') {
      this.calculateNormalizedValues();
    }
  }
}

customElements.define('bar-item', BarItem);
customElements.define('bar-chart', BarChart);
