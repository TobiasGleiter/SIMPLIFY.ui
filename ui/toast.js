class ToastProvider extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.maxToasts = 3;
  }

  connectedCallback() {
    this.render();
  }

  show(message, type = 'info') {
    const toastContainer = this.shadowRoot.querySelector('.toast-container');

    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerHTML = message;

    toastContainer.appendChild(toast);

    if (toastContainer.children.length > this.maxToasts) {
      toastContainer.firstElementChild.remove();
    }

    setTimeout(() => {
      toast.remove();
    }, 3000);
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/toast.css" />

        <div class="toast-container"></div>
      `;
  }
}

customElements.define('toast-provider', ToastProvider);
