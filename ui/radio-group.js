class RadioGroup extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const template = document.createElement('template');
    template.innerHTML = `
        <link rel="stylesheet" href="ui/radio-group.css" />
        <div class="radio-group"></div>
      `;
    shadow.appendChild(template.content.cloneNode(true));

    this.radioContainer = shadow.querySelector('.radio-group');
  }

  connectedCallback() {
    this.generateRadioButtons();
  }

  generateRadioButtons() {
    const groupName = this.getAttribute('name') || 'default-group';
    const slot = this.querySelectorAll('[slot="radio-group"]');

    slot.forEach((item) => {
      const value = item.getAttribute('value');
      const radioButton = document.createElement('input');
      const label = document.createElement('label');

      radioButton.type = 'radio';
      radioButton.name = groupName;
      radioButton.value = value;
      radioButton.id = value;
      radioButton.classList.add('sr-only');

      label.setAttribute('for', value);
      label.textContent = item.textContent.trim();
      label.classList.add('radio-group__label');

      this.radioContainer.appendChild(radioButton);
      this.radioContainer.appendChild(label);
    });

    this.innerHTML = '';
  }
}

customElements.define('radio-group', RadioGroup);
