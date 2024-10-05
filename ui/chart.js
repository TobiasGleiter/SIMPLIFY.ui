/* 
MIT License
Copyright (c) 2024 Tobias Gleiter 
*/

class BarChart extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();

    this.barWidth = 50;
    this.barSpacing = 0;
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/chart.css" />
        <canvas class="chart"></canvas>
    `;
  }

  drawBar(ctx, upperLeftCornerX, upperLeftCornerY, width, height) {
    ctx.fillStyle = '#333333';
    ctx.fillRect(upperLeftCornerX, upperLeftCornerY, width, height);
  }

  connectedCallback() {
    const canvas = this.shadowRoot.querySelector('canvas');
    const ctx = canvas.getContext('2d');

    const data = [5, 5, 4, 5, 5, 5, 5];

    // Function to draw the graph
    ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas

    for (let i = 0; i < data.length; i++) {
      const barHeight = data[i];

      // Set the color
      //   ctx.fillStyle = '#333333';

      // Draw the bar
      //ctx.fillRect();
      this.drawBar(ctx, i * (this.barWidth + this.barSpacing), canvas.height - barHeight, this.barWidth, barHeight);

      // Add text
      ctx.fillStyle = 'black';
      ctx.fillText(barHeight, i * (this.barWidth + this.barSpacing) + 5, canvas.height - barHeight - 5);
    }
  }
}

customElements.define('bar-chart', BarChart);
