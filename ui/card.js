/* 
MIT License
Copyright (c) 2024 Tobias Gleiter 
*/

class CardBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="ui/card.css" />

    <div class="card">
      <div class="card__header">
        <h1><slot name="header"></slot></h1>
        <p><slot name="description" class="card__description"></slot></p>
      </div>
      <div class="card__content">
        <slot name="content"></slot>
      </div>
      <div class="card__footer">
        <slot name="footer"></slot>
      </div>
    </div>
    `;
  }
}

customElements.define('card-base', CardBase);
