import { LitElement, html, css } from "lit";
import { customElement, state } from "lit/decorators.js";
import "./player-setup.js";
import "./input-score.js";
import "./score-table.js";

type Round = Record<string, number>;

@customElement("score-card")
export class ScoreCard extends LitElement {
  @state() players: string[] = [];
  @state() rounds: Round[] = [];
  @state() playersConfirmed = false;

  constructor() {
    super();
    this.loadSavedGame();
  }

  static styles = css`
    :host {
      display: block;
      padding: 1rem;
    }
  `;

  // ** Persistant states
  saveGame() {
    localStorage.setItem(
      "scorecard-game",
      JSON.stringify({
        players: this.players,
        rounds: this.rounds,
        playersConfirmed: this.playersConfirmed,
      }),
    );
  }

  loadSavedGame() {
    const raw = localStorage.getItem("scorecard-game");
    if (!raw) return;

    try {
      const data = JSON.parse(raw);

      const summary = data.players
        .map((p: string) => `${p}: ${this.totalFrom(data.rounds, p)}`)
        .join("\n");

      if (window.confirm(`Continue last game?\n\n${summary}`)) {
        this.players = data.players;
        this.rounds = data.rounds;
        this.playersConfirmed = data.playersConfirmed;
      }
    } catch {}
  }

  totalFrom(rounds: Round[], player: string) {
    return rounds.reduce((sum, r) => sum + (r[player] ?? 0), 0);
  }

  private onPlayersSubmitted(e: any) {
    this.players = e.detail.players;
    this.playersConfirmed = true;
    this.rounds = [];
    this.saveGame();
  }

  private onScoreAdded(e: any) {
    const { player, score } = e.detail;

    const last = this.rounds[this.rounds.length - 1];

    if (!last || Object.keys(last).length === this.players.length) {
      this.rounds = [...this.rounds, { [player]: score }];
    } else {
      last[player] = score;
      this.rounds = [...this.rounds];
    }

    this.saveGame();
  }

  render() {
    return html`
      ${!this.playersConfirmed
        ? html`<player-setup
            @players-submitted=${this.onPlayersSubmitted}
          ></player-setup>`
        : html`<input-score
            .players=${this.players}
            @score-added=${this.onScoreAdded}
          ></input-score>`}
      ${this.players.length > 0
        ? html`<score-table
            .players=${this.players}
            .rounds=${this.rounds}
          ></score-table>`
        : ""}
    `;
  }
}
