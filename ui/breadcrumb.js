/* 
MIT License
Copyright (c) 2024 Tobias Gleiter 
*/

class BreadcrumbBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/breadcrumb.css" />
        <div class="breadcrumb"></div>
      `;

    this.processBreadcrumbs();
  }

  processBreadcrumbs() {
    const slot = document.createElement('slot');
    const breadcrumbContainer = this.shadowRoot.querySelector('.breadcrumb');
    breadcrumbContainer.appendChild(slot);

    const assignedNodes = slot.assignedElements();

    if (assignedNodes.length > 4) {
      breadcrumbContainer.innerHTML = '';
      breadcrumbContainer.appendChild(assignedNodes[0].cloneNode(true));
      this.addSeparator(breadcrumbContainer);

      const ellipsis = document.createElement('span');
      ellipsis.textContent = '...';
      breadcrumbContainer.appendChild(ellipsis);
      this.addSeparator(breadcrumbContainer);

      breadcrumbContainer.appendChild(assignedNodes[assignedNodes.length - 2].cloneNode(true));
      this.addSeparator(breadcrumbContainer);
      breadcrumbContainer.appendChild(assignedNodes[assignedNodes.length - 1].cloneNode(true));
    } else {
      breadcrumbContainer.innerHTML = '';
      assignedNodes.forEach((node, index) => {
        breadcrumbContainer.appendChild(node.cloneNode(true));
        if (index < assignedNodes.length - 1) {
          this.addSeparator(breadcrumbContainer);
        }
      });
    }
  }

  addSeparator(container) {
    const separator = document.createElement('span');
    separator.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    `;
    separator.style.display = 'flex';
    separator.style.alignItems = 'center';
    separator.style.cursor = 'default';
    container.appendChild(separator);
  }
}

class BreadcrumLinkBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const href = this.getAttribute('href');

    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/breadcrumb.css" />
        <a href="${href}" class="breadcrumb__link"><slot></slot></a>
    `;
  }
}

customElements.define('breadcrumb-base', BreadcrumbBase);
customElements.define('breadcrumb-link', BreadcrumLinkBase);
