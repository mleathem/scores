import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";

// TODO: make sure each player name is unique, and not ''

@customElement("player-setup")
export class PlayerSetup extends LitElement {
  @state() private value = "";

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
      padding: 1rem;

      font-size: 1.5rem;
    }
    div {
      margin: 1rem 0;
    }
    label strong {
      font-size: 2rem;
    }
    input {
      display: block;
      width: 100%;
      font-size: 1.5rem;
      padding: 0.3rem;
      max-width: 250px;
      border: 0;
      outline: solid 1px #ccc;
    }
    input:focus {
      background: #e8f0fe;
      outline: solid 2px #007bff;
    }
    button {
      apearance: none;
      cursor: pointer;
      font-size: 1.5rem;
      border: darkorange solid 3px;
      padding: 0.3rem 0.6rem;
      background: orange;
      color: white;
    }
    button:focus,
    button:hover {
      color: black;
      background: darkorange;
      border: darkorange solid 3px;
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
      <div class="player-setup">
        <div>
          <label for="enter-players">
            <strong>Players Names:</strong><br />
            comma separated
          </label>
        </div>
        <div>
          <input
            type="text"
            .value=${this.value}
            placeholder="Player 1, Bob, CD"
            @input=${(e: any) => (this.value = e.target.value)}
          />
        </div>
        <div>
          <button @click=${this.submit}>Start Game</button>
        </div>
      </div>
    `;
  }
}
