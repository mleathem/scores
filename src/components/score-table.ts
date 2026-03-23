import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

type Round = Record<string, number>;

@customElement("score-table")
export class ScoreTable extends LitElement {
  @property({ type: Array }) players: string[] = [];
  @property({ type: Array }) rounds: Round[] = [];
  @property({ type: String }) currentPlayer = "";

  static styles = css`
    table {
      border-collapse: collapse;
      margin-top: 1rem;
      min-width: 490px;
    }
    @media (max-width: 500px) {
      table {
        min-width: calc(100% - 0.8rem);
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
      position: relative;
    }
    tfoot th {
      background: #d4f8d4;
      color: #064b06;
    }

    /* COUNT ROUNDS */
    tbody {
      counter-reset: round;
    }

    tbody tr {
      counter-increment: round;
      position: relative;
    }

    tbody tr td:last-of-type::after {
      content: "#" counter(round);
      position: absolute;
      left: calc(100% + 0.2rem);
      top: 50%;
      transform: translateY(-50%);
      font-family: monospace;
      font-size: 0.6rem;
      color: #666;
      white-space: nowrap;
    }

    /* Player feedback */
    th.active {
      background-color: #666;
      color: white;
    }
    .pill {
      display: inline-block;
      margin-left: 0.4rem;
      padding: 0.2rem 0.4rem;
      background: rgba(76, 175, 80, 0.9);
      color: white;
      border-radius: 4px;
      font-size: 0.75rem;
      font-weight: bold;
      position: absolute;
      top: -9px;
      right: 5px;
      letter-spacing: 1px;
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
            ${this.players.map(
              (p) => html`
                <th class=${p === this.currentPlayer ? "active" : ""}>
                  ${p}
                  ${this.total(p) > 0
                    ? html`<span class="pill">${this.total(p)}</span>`
                    : ""}
                </th>
              `,
            )}
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
