class Dropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  connectedCallback() {
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

    window.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });

    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });
  }
}

class DropdownLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/dropdown.css" />
      <a class="dropdown__link"><slot></slot></a>
    `;
  }

  connectedCallback() {
    this.input = this.shadowRoot.querySelector('a');
    ['href'].forEach((attr) => {
      const attrValue = attr === 'required' ? this.hasAttribute(attr) : this.getAttribute(attr);

      if (attrValue !== null && attrValue !== undefined) {
        this.input[attr] = attrValue;
      }
    });
  }
}

class DropdownItem extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/dropdown.css" />
      <span class="dropdown__item"><slot></slot></span>
    `;
  }
}

customElements.define('dropdown--base', Dropdown);
customElements.define('dropdown__link--base', DropdownLink);
customElements.define('dropdown__item--base', DropdownItem);
