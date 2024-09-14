class DialogBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  showModal() {
    this.shadowRoot.querySelector('dialog').showModal();
  }

  close() {
    this.shadowRoot.querySelector('dialog').close();
  }

  render() {
    this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="css/base.css" />
            <link rel="stylesheet" href="ui/dialog.css" />

            <dialog class="dialog">
            <div class="dialog__layout">
                <div class="dialog__header">
                    <h2><slot name="header"></slot></h2>
                    <p><slot name="description"></slot></p>
                </div>
                <div class="dialog__content">
                    <slot name="content"></slot>
                </div>
            </div>
            </dialog>
        `;
  }
}

customElements.define('dialog--base', DialogBase);
