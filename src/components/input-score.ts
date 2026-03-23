import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

@customElement("input-score")
export class ScoreEntry extends LitElement {
  @property({ type: Array }) players: string[] = [];

  @state() private selected = "";
  @state() private score: number | "" = "";

  static styles = css`
    select,
    input {
      padding: 0.3rem;
      margin-right: 0.5rem;
    }
    button {
      padding: 0.3rem 0.6rem;
    }
  `;

  firstUpdated() {
    if (this.players.length > 0) {
      this.selected = this.players[0];
    }
  }

  private submit() {
    if (this.score === "" || Number.isNaN(Number(this.score))) {
      alert("Score must be a number");
      return;
    }

    this.dispatchEvent(
      new CustomEvent("score-added", {
        detail: {
          player: this.selected,
          score: Number(this.score),
        },
        bubbles: true,
        composed: true,
      }),
    );

    this.score = "";
  }

  render() {
    return html`
      <label>Add score:</label>

      <select @change=${(e: any) => (this.selected = e.target.value)}>
        ${this.players.map((p) => html`<option value=${p}>${p}</option>`)}
      </select>

      <input
        type="number"
        .value=${this.score}
        @input=${(e: any) => (this.score = Number(e.target.value))}
        placeholder="Score"
      />

      <button @click=${this.submit}>Add</button>
    `;
  }
}
