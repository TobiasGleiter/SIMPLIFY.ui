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
            <slot name="trigger"></slot>
            <div class="dropdown__menu">
                <slot name="content"></slot>
            </div>
        </div>
        `;
  }

  toggleDropdown() {
    const button = this.shadowRoot.querySelector('slot[name="trigger"]');
    const dropdown = this.shadowRoot.querySelector('.dropdown');

    button.addEventListener('click', () => {
      dropdown.classList.toggle('active');
    });

    dropdown.addEventListener('click', (e) => {
      e.stopPropagation();
    });

    window.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) {
        dropdown.classList.remove('active');
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key == 'Escape') {
        dropdown.classList.remove('active');
      }
    });
  }
}

{
  /* <button 
class="button dropdown__trigger-button" 
tabindex="0" 
aria-expanded="false" 
aria-haspopup="true"
> */
}

class DropdownLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
    this.attachEvents();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/dropdown.css" />
      <a class="dropdown__link" role="button" tabindex="0"><slot></slot></a>
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
