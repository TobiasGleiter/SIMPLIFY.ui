class PopoverBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.togglePopover();
    this.addMouseListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/popover.css" />

        <div class="popover">
            <button class="popover__trigger-button" tabindex="0" aria-pressed="false" class="button">
              <slot name="trigger"></slot>
            </button>
            <div class="popover__card">
                <slot name="content"></slot>
            </div>
        </div>
    `;
  }

  togglePopover() {
    const button = this.shadowRoot.querySelector('button');
    const popover = this.shadowRoot.querySelector('.popover');
    button.addEventListener('click', (e) => {
      popover.classList.toggle('active');
      e.stopPropagation();
    });
  }

  addMouseListeners() {
    const popover = this.shadowRoot.querySelector('.popover');

    window.addEventListener('click', (e) => {
      if (!popover.contains(e.target)) {
        popover.classList.remove('active');
      }
    });

    popover.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

customElements.define('popover--base', PopoverBase);
