/*
MIT License
Copyright (c) 2025 Tobias Gleiter
*/
class BadgeBase extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  connectedCallback() {
    this.badge = this.querySelector('div');

    if (!document.querySelector('#badge-styles')) {
      const styleSheet = document.createElement('link');
      styleSheet.id = 'badge-styles';
      styleSheet.rel = 'stylesheet';
      styleSheet.href = 'ui/badge.css';
      document.head.appendChild(styleSheet);
    }

    if (this.hasAttribute('secondary')) {
      this.badge.classList.add('badge--secondary');
    }
    if (this.hasAttribute('outline')) {
      this.badge.classList.add('badge--outline');
    }
  }

  render() {
    this.innerHTML = `
      <div
        tabindex="0"
        aria-pressed="false"
        class="badge">
        ${this.innerHTML}
      </div>
    `;
  }
}

customElements.define('badge-base', BadgeBase);
