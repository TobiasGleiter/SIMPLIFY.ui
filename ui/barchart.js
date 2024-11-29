/* 
MIT License
Copyright (c) 2024 Tobias Gleiter 
*/

class BarChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.internals = this.attachInternals();
    this._data = [];
    this.render();
  }

  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data;
  }

  render() {
    const data = this._data || [];
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/barchart.css" />
      <svg class="chart" width="420" height="${data.length * 30}" aria-labelledby="title desc" role="img">
        <desc id="desc">${data.map((item) => `${item.value} ${item.label}`).join('; ')}</desc>
        ${data
          .map(
            (item, index) => `
            <g class="bar" transform="translate(0, ${index * 25})">
              <rect width="${item.value * 10}" height="20"></rect>
              <text class="text" x="${item.value * 10 + 5}" y="9.5" dy=".35em">${item.value} ${item.label}</text>
            </g>
            `,
          )
          .join('')}
      </svg>
    `;
  }
}

customElements.define('bar-chart', BarChart);
