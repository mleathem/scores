import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

// TODO: make sure each player name is unique, and not ''

@customElement("player-setup")
export class PlayerSetup extends LitElement {
  @state() private value = "";

  static styles = css`
    input {
      padding: 0.3rem;
      max-width: 250px;
    }
    button {
      apearance: none;
      border: 0;
      padding: 0.3rem 0.6rem;
      background: orange;
      color: white;
    }
  `;

  private submit() {
    const players = this.value
      .split(",")
      .map((p) => p.trim())
      .filter((p) => p.length > 0);

    this.dispatchEvent(
      new CustomEvent("players-submitted", {
        detail: { players },
        bubbles: true,
        composed: true,
      }),
    );
  }

  render() {
    return html`
      <label>Players Names (comma separated):</label><br />
      <input
        type="text"
        .value=${this.value}
        placeholder="Player 1, Bob, CD"
        @input=${(e: any) => (this.value = e.target.value)}
      />
      <button @click=${this.submit}>Start Game</button>
    `;
  }
}
