class BadgeBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.badge = this.shadowRoot.querySelector('div');

    if (this.hasAttribute('secondary')) {
      this.badge.classList.add('badge--secondary');
    }

    if (this.hasAttribute('outline')) {
      this.badge.classList.add('badge--outline');
    }
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/badge.css" />

        <div 
          tabindex="0"
          aria-pressed="false"
          class="badge">
          <slot></slot>
        </div>
    `;
  }
}

customElements.define('badge--base', BadgeBase);
