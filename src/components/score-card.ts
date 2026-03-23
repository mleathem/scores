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
      font-family: sans-serif;
    }
  `;

  // ** Persistence (local-storage)

  private saveGame() {
    localStorage.setItem(
      "scorecard-game",
      JSON.stringify({
        players: this.players,
        rounds: this.rounds,
        playersConfirmed: this.playersConfirmed,
      }),
    );
  }

  private loadSavedGame() {
    const raw = localStorage.getItem("scorecard-game");
    if (!raw) return;

    try {
      const data = JSON.parse(raw) as {
        players: string[];
        rounds: Round[];
        playersConfirmed: boolean;
      };

      const summary = data.players
        .map((p) => `${p}: ${this.totalFrom(data.rounds, p)}`)
        .join("\n");

      if (window.confirm(`Continue last game?\n\n${summary}`)) {
        this.players = data.players;
        this.rounds = data.rounds;
        this.playersConfirmed = data.playersConfirmed;
      }
    } catch {
      console.warn("Could not parse saved game");
    }
  }

  private totalFrom(rounds: Round[], player: string) {
    return rounds.reduce((sum, r) => sum + (r[player] ?? 0), 0);
  }

  // ** Play logic

  private get nextPlayerIndex(): number {
    const lastRound = this.rounds[this.rounds.length - 1];

    if (!lastRound) return 0;

    const filled = Object.keys(lastRound).length;

    if (filled >= this.players.length) return 0;

    return filled;
  }

  private get currentPlayer(): string {
    return this.players[this.nextPlayerIndex];
  }

  // ** Event handlers

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
      // start new round
      this.rounds = [...this.rounds, { [player]: score }];
    } else {
      // fill existing round
      last[player] = score;
      this.rounds = [...this.rounds];
    }

    this.saveGame();
  }

  render() {
    return html`
      ${!this.playersConfirmed
        ? html`
            <player-setup
              @players-submitted=${this.onPlayersSubmitted}
            ></player-setup>
          `
        : html`
            <input-score
              .player=${this.currentPlayer}
              @score-added=${this.onScoreAdded}
            ></input-score>
          `}
      ${this.players.length > 0
        ? html`
            <score-table
              .players=${this.players}
              .rounds=${this.rounds}
            ></score-table>
          `
        : ""}
    `;
  }
}
