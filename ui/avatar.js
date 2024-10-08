/* 
MIT License
Copyright (c) 2024 Tobias Gleiter 
*/

class AvatarBase extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.render();
  }

  render() {
    const src = this.getAttribute('src');

    this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="ui/avatar.css" />

        <div class="avatar">
            <image src="${src}" alt="user avatar" class="avatar__image"/>
        </div>
    `;
  }
}

customElements.define('avatar-base', AvatarBase);
