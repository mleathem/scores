import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

type Round = Record<string, number>;

@customElement("score-table")
export class ScoreTable extends LitElement {
  @property({ type: Array }) players: string[] = [];
  @property({ type: Array }) rounds: Round[] = [];

  static styles = css`
    table {
      border-collapse: collapse;
      margin-top: 1rem;
    }
    @media (max-width: 500px) {
      table {
        min-width: 100%;
      }
    }
    th,
    td {
      border: 1px solid #999;
      padding: 0.5rem;
      text-align: center;
    }
    thead th {
      background: #ccc;
    }
    tfoot th {
      background: #d4f8d4;
      color: #064b06;
    }
  `;

  private total(player: string) {
    return this.rounds.reduce((sum, r) => sum + (r[player] ?? 0), 0);
  }

  render() {
    return html`
      <table>
        <thead>
          <tr>
            ${this.players.map((p) => html`<th>${p}</th>`)}
          </tr>
        </thead>

        <tbody>
          ${this.rounds.map(
            (round) => html`
              <tr>
                ${this.players.map((p) => html`<td>${round[p] ?? ""}</td>`)}
              </tr>
            `,
          )}
        </tbody>

        <tfoot>
          <tr>
            ${this.players.map((p) => html`<th>${this.total(p)}</th>`)}
          </tr>
        </tfoot>
      </table>
    `;
  }
}
