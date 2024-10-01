class PopoverBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
    this.togglePopover();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/popover.css" />
        <div class="popover">
            <slot name="trigger"></slot>
            <div class="popover__card">
                <slot name="content"></slot>
            </div>
        </div>
    `;
  }

  togglePopover() {
    const button = this.shadowRoot.querySelector('slot[name="trigger"]');
    const popover = this.shadowRoot.querySelector('.popover');
    button.addEventListener('click', (e) => {
      popover.classList.toggle('active');
      e.stopPropagation();
    });

    window.addEventListener('click', (e) => {
      if (!popover.contains(e.target)) {
        popover.classList.remove('active');
      }
    });

    popover.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        popover.classList.remove('active');
      }
    });
  }
}

customElements.define('popover-base', PopoverBase);
