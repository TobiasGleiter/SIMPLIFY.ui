class Dropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.appendDropdownItemStyle();
    this.toggleDropdown();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/dropdown.css" />

        <div class="dropdown">
            <button class="dropdown__trigger-button" tabindex="0" aria-pressed="false" class="button">
              <slot name="trigger"></slot>
            </button>
            <div class="dropdown__menu">
                <slot name="content"></slot>
            </div>
        </div>
        `;
  }

  toggleDropdown() {
    const button = this.shadowRoot.querySelector('button');
    const dropdown = this.shadowRoot.querySelector('.dropdown');
    button.addEventListener('click', () => {
      dropdown.classList.toggle('active');
    });
  }

  appendDropdownItemStyle() {
    const slot = this.querySelectorAll('[slot="dropdown-item"]');
    slot.forEach((item) => {
      item.classList.add('dropdown__menu-item');
    });
  }
}

customElements.define('dropdown--base', Dropdown);
