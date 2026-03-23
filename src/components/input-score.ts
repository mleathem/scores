import { LitElement, html, css } from "lit";
import { customElement, property, state, query } from "lit/decorators.js";

@customElement("input-score")
export class InputScore extends LitElement {
  @property({ type: String }) player = "";
  @state() private score: number | "" = "";

  @query("input") private scoreInput!: HTMLInputElement;

  static styles = css`
    .wrapper div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }
    .player {
      font-weight: bold;
      color: #333;
      font-size: 2rem;
      margin-bottom: 0.2rem;
    }
    input {
      width: 100px;
      padding: 0.3rem;
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
      border: orange solid 1px;
      padding: 0.3rem 0.6rem;
      background: orange;
      color: white;
    }
    button:focus,
    button:hover {
      color: black;
      background: darkorange;
      border: darkorange solid 1px;
    }
  `;

  // retain focus - so user can simply enter score for next player
  updated() {
    this.scoreInput?.focus();
  }

  private submit() {
    if (this.score === "" || Number.isNaN(Number(this.score))) {
      alert("Score must be a number");
      return;
    }

    this.dispatchEvent(
      new CustomEvent("score-added", {
        detail: {
          player: this.player,
          score: Number(this.score),
        },
        bubbles: true,
        composed: true,
      }),
    );

    this.score = "";
  }

  private handleKey(e: KeyboardEvent) {
    if (e.key === "Enter") {
      this.submit();
    }
  }

  render() {
    return html`
      <div class="wrapper">
        <div><span class="player">${this.player}</span> to play</div>

        <input
          type="number"
          .value=${this.score}
          @input=${(e: any) => (this.score = Number(e.target.value))}
          @keydown=${this.handleKey}
          placeholder="Score"
        />

        <button @click=${this.submit}>Add</button>
      </div>
    `;
  }
}
