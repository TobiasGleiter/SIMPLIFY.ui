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
    const size = parseInt(this.getAttribute('size') || '700');
    const barHeight = 30;
    const barItems = Array.from(this.children).filter((child) => child.tagName === 'BAR-ITEM');

    // Find max value
    const maxValue = Math.max(...barItems.map((item) => parseFloat(item.getAttribute('value') || '0')));

    // Render with normalized width
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .bar-label {
          font-size: var(--text-small);
          fill: var(--foreground);
        }
      </style>
      <div class="chart-container">
      <svg
        xmlns="http://www.w3.org/2000/svg" 
        width="${size}" 
        height="${barItems.length * barHeight + 20}"
      >
        ${barItems
          .map((item, index) => {
            const value = parseFloat(item.getAttribute('value') || '0');
            const label = item.textContent.trim();
            const normalizedWidth = (value / maxValue) * (size - 100);
            const yPosition = index * barHeight + 20;
            const animationSpeedinMs = 200;

            return `
            <g class="bar-group" data-index="${index}">
              <rect
                class="bar"
                x="50"
                y="${yPosition}"
                width="0"
                height="20"
                rx="5"
                ry="5"
                fill="var(--primary)"
              >
                <animate
                  attributeName="width"
                  from="0"
                  to="${normalizedWidth}"
                  dur="${animationSpeedinMs}ms"
                  fill="freeze"
                  begin="${index * 0.01}s"
                />
              </rect>
              <text 
                x="${50 + normalizedWidth + 10}"
                y="${yPosition + 15}" 
                class="bar-label"
              >
                ${label} (${value})
              </text>
            </g>
          `;
          })
          .join('')}
      </svg>
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
