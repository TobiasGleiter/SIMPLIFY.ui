class Dropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.toggleDropdown();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/dropdown.css" />
        <div class="dropdown">
            <button class="dropdown__trigger-button"><slot name="trigger"></slot></button>
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
}

customElements.define('dropdown--base', Dropdown);
