class DialogBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  showModal() {
    this.shadowRoot.querySelector('dialog').showModal();
  }

  close() {
    this.shadowRoot.querySelector('dialog').close();
  }

  render() {
    const id = this.getAttribute('id');

    this.shadowRoot.innerHTML = `
      <link rel="stylesheet" href="ui/dialog.css" />
      <dialog>
        <div class="dialog">
          <div class="dialog__header">
              <h1><slot name="header"></slot></h1>
              <p><slot name="description"></slot></p>
              <button class="dialog__close" aria-label="Close" onclick="${id}.close()" tabindex="0" aria-pressed="false">&times;</button>
          </div>
          <div class="dialog__content">
            <slot name="content"></slot>
          </div>
          <div class="dialog__footer">
            <slot name="footer"></slot>
          </div>
        </div>
      </dialog>
    `;
  }
}

customElements.define('dialog--base', DialogBase);
