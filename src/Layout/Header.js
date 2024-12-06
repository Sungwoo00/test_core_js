import { LitElement, html, css } from 'lit';
import resetCSS from './restCSS';

class Header extends LitElement {
  static get styles() {
    return [
      resetCSS,
      css`
        header {
          display: flex;
          justify-content: space-between;
          background-color: white;
          color: black;
          padding: 1rem;

          .logo {
            display: flex;
            align-items: center;
            gap: 0.3rem;
          }

          nav {
            display: flex;
            align-items: center;

            ul {
              display: flex;
              gap: 1rem;
            }
          }
        }
      `,
    ];
  }
  render() {
    return html`
      <header>
        <h1 class="logo">
          <a href="/"><img src="" alt=""/>
          <span>Cart</span>
        </h1>
        <nav>
          <ul>
            <li><a href="/">About</a>
            <li><a href="/">Product</a>
            <li><a href="/">Contact</a>
            <li><a href="/">Login</a>
          </ul>
        </nav>
      </header>
    `;
  }
}
customElements.define('c-header', Header);
