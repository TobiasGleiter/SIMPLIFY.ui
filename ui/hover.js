/* 
MIT License
Copyright (c) 2024 Tobias Gleiter 
*/

class Hover extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.toggleHover();
  }

  render() {
    this.shadowRoot.innerHTML = `
    <link rel="stylesheet" href="ui/hover.css" />
    <div class="hover">
        <slot name="trigger"></slot>
        <div class="hover__card">
            <slot name="content"></slot>
        </div>
    </div>
    `;
  }

  toggleHover() {
    const hover = this.shadowRoot.querySelector('.hover');
    const trigger = this.shadowRoot.querySelector('slot[name="trigger"]');

    trigger.addEventListener('mouseenter', () => {
      setTimeout(() => {
        hover.classList.toggle('active');
      }, 1000);
    });

    trigger.addEventListener('mouseleave', () => {
      setTimeout(() => {
        hover.classList.remove('active');
      }, 1000);
    });
  }
}

customElements.define('hover-base', Hover);
