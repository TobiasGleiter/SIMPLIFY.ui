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
    this._options = {
      width: 420,
      barHeight: 30,
      labelPosition: 'end', // 'start', 'end', or 'inside'
      xAxisLabel: '',
      yAxisLabel: '',
    };
    this.render();
  }

  set data(value) {
    this._data = value;
    this.render();
  }

  get data() {
    return this._data;
  }

  setOptions(options) {
    this._options = { ...this._options, ...options };
    this.render();
  }

  render() {
    const data = this._data || [];
    const { width, barHeight, labelPosition, xAxisLabel, yAxisLabel } = this._options;

    // Calculate total height based on data length
    const height = data.length * barHeight + 60;

    // Find max value for scaling
    const maxValue = Math.max(...data.map((item) => item.value));

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/barchart.css" />

      <div class="chart-container">
        <svg 
          class="chart" 
          width="${width}" 
          height="${height}" 
          aria-labelledby="title desc" 
          role="img"
        >
            <text 
              x="${width / 2}" 
              y="${height - 15}" 
              class="axis-label"
            >
              ${xAxisLabel}
            </text>
            <text 
              x="15" 
              y="${height / 2}" 
              transform="rotate(-90 15,${height / 2})" 
              class="axis-label"
            >
              ${yAxisLabel}
            </text>
          <desc id="desc">
            ${data.map((item) => `${item.value} ${item.label}`).join('; ')}
          </desc>

          ${data
            .map((item, index) => {
              const barY = index * barHeight + 30;
              const barWidth = (item.value / maxValue) * (width - 100);

              let labelX, labelAnchor;
              switch (labelPosition) {
                case 'start':
                  labelX = 5;
                  labelAnchor = 'start';
                  break;
                case 'inside':
                  labelX = barWidth / 2;
                  labelAnchor = 'middle';
                  break;
                case 'end':
                default:
                  labelX = barWidth + 5;
                  labelAnchor = 'start';
              }

              return `
              <g class="bar" transform="translate(50, ${barY})">
                <rect 
                  width="${barWidth}" 
                  height="${barHeight - 5}" 
                  rx="3" 
                  ry="3"
                ></rect>
                <text 
                  x="${labelX}" 
                  y="${barHeight / 2}" 
                  dy=".15em" 
                  class="bar-label"
                  text-anchor="${labelAnchor}"
                >
                  ${item.value} ${item.label}
                </text>
              </g>
            `;
            })
            .join('')}
        </svg>
      </div>
    `;
  }
}

// Define the custom element
customElements.define('bar-chart', BarChart);
