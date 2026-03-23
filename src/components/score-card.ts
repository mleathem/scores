import { LitElement, html, css } from "lit";

class Test extends LitElement {
  static styles = css`
    p {
      color: red;
    }
  `;

  render() {
    return html`<p>Hello world</p>`;
  }
}

customElements.define("score-card", Test);
