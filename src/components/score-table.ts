import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import "./how-to.js";

type Round = Record<string, number>;

const EditUserHoldTime = 1000;

@customElement("score-table")
export class ScoreTable extends LitElement {
  @property({ type: Array }) players: string[] = [];
  @property({ type: Array }) rounds: Round[] = [];
  @property({ type: String }) currentPlayer = "";

  @state() private log: string[] = [];

  // track which cells were updated: `${roundIndex}-${player}`
  private updatedCells = new Set<string>();

  // long‑press timer
  private holdTimer: number | null = null;

  static styles = css`
    table {
      border-collapse: collapse;
      min-width: 490px;
      margin-top: 1rem;
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

    td {
      user-select: none;
    }

    td.updated span {
      color: red;
    }
    td.updated span::after {
      content: " *";
    }

    aside {
      color: red;
      margin-top: 2rem;
      font-size: 0.85rem;
    }
    aside ul {
      padding-left: 1rem;
    }
    aside small {
      font-size:;
    }
  `;

  private total(player: string) {
    return this.rounds.reduce((sum, r) => sum + (r[player] ?? 0), 0);
  }

  // ** long‑press to edit score
  startHold = (roundIndex: number, player: string) => {
    this.cancelHold(); // safety

    this.holdTimer = window.setTimeout(() => {
      this.editScore(roundIndex, player);
    }, EditUserHoldTime);
  };
  cancelHold = () => {
    if (this.holdTimer !== null) {
      clearTimeout(this.holdTimer);
      this.holdTimer = null;
    }
  };

  private editScore(roundIndex: number, player: string) {
    const round = this.rounds[roundIndex];
    const oldScore = round[player] ?? 0;

    const newScore = prompt(
      `Edit score \n${player} in Round #${roundIndex + 1}`,
      String(oldScore),
    );

    // ** user pressed Cancel → do nothing
    if (newScore === null) return;

    // ** convert to number
    const parsed = Number(newScore);

    // ** if invalid - alert and fail
    if (Number.isNaN(parsed)) {
      alert("Value was not a number – did not change!");
      return;
    }

    const newRounds = [...this.rounds];
    newRounds[roundIndex] = {
      ...newRounds[roundIndex],
      [player]: parsed,
    };
    this.rounds = newRounds;

    const key = `${roundIndex}-${player}`;
    this.updatedCells.add(key);

    this.addLogEntry(roundIndex, player, oldScore, parsed);

    // ** dispatch so parent can save to localStorage
    this.dispatchEvent(
      new CustomEvent("score-edited", {
        detail: {
          player,
          roundIndex,
          oldScore,
          newScore: parsed,
        },
        bubbles: true,
        composed: true,
      }),
    );
  }

  private addLogEntry(
    roundIndex: number,
    player: string,
    oldScore: number,
    newScore: number,
  ) {
    this.log = [
      ...this.log,
      `${player} score in #${roundIndex + 1} was changed! "${oldScore}" ⟾ "${newScore}"`,
    ];
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
            (round, roundIndex) => html`
              <tr>
                ${this.players.map((p) => {
                  const key = `${roundIndex}-${p}`;
                  const cls = this.updatedCells.has(key) ? "updated" : "";
                  return html`
                    <td
                      @mousedown=${() => this.startHold(roundIndex, p)}
                      @mouseup=${this.cancelHold}
                      @mouseleave=${this.cancelHold}
                      @touchstart=${() => this.startHold(roundIndex, p)}
                      @touchend=${this.cancelHold}
                      @touchcancel=${this.cancelHold}
                      class=${cls}
                    >
                      <span>${round[p] ?? ""}</span>
                    </td>
                  `;
                })}
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

      ${this.log.length > 0
        ? html`
            <!-- EDIT log for accountability  -->
            <aside>
              <strong>* Edits:</strong>
              <ul>
                ${this.log.map((entry) => html`<li>${entry}</li>`)}
              </ul>
              <small>
                edit logs are not persistant, but the score is of course updated
              </small>
            </aside>
          `
        : null}

      <aside>
        <how-to></how-to>
      </aside>
    `;
  }
}
