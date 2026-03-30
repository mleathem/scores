import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("how-to")
export class HowTo extends LitElement {
  @property({ type: Boolean, attribute: "open-state" })
  openDetailByDefault = false;

  static styles = css`
    :host {
      font-family: monospace, Consolas, "Courier New", Courier, monospace;
      color: #666;
    }

    p {
      padding: 0;
      margin: 0 0 0.5rem 0;
      line-height: 1.4;
    }

    details {
      max-width: 100%;
      width: 390px;
      font-size: 0.9rem;
      text-align: left;
      margin-top: 1rem;
      margin-bottom: 1rem;
    }
    summary {
      font-weight: bold;
      cursor: pointer;
      margin: 0;
      padding: 0;
      margin-bottom: 0.2rem;
      color: #333;
    }

    /* ** Custom arrow ** */
    summary::-webkit-details-marker {
      display: none;
    }
    summary {
      list-style: none;
      cursor: pointer;
      display: flex;
      align-items: center;
    }

    summary::before {
      content: "";
      width: 0.55rem;
      height: 0.55rem;
      border-right: 2px solid currentColor;
      border-bottom: 2px solid currentColor;
      transform-origin: center center;
      transition: transform 0.25s ease;
      margin-right: 0.5rem;
      margin-top: -0.2rem;
    }

    details:not([open]) > summary::before {
      transform: rotate(45deg);
    }
    details[open] > summary::before {
      transform: rotate(-45deg);
    }

    /* ** Main Intro expand ** */
    details#how-to > div {
      margin-top: 0.5rem;
      padding-left: 0.5rem;
    }
    details#how-to > summary {
      font-size: 1.3rem;
    }
    details#how-to > summary::before {
      border: 0;
      content: none;
    }
    details#how-to[open] > summary::after {
      content: "- how to:";
      margin-left: 0.5rem;
    }
    details#how-to:not([open]) > summary::after {
      content: "... +";
      margin-left: 0.5rem;
    }
  `;

  render() {
    return html`
      ${this.openState}

      <details id="how-to" ?open=${this.openDetailByDefault}>
        <summary>Instructions</summary>

        <div>
          <details ?open=${this.openDetailByDefault}>
            <summary>Setup: Enter Names</summary>
            <div>
              <p>Enter the names of the players separated by commas.</p>
            </div>
          </details>

          <details>
            <summary>Setup: Return to a game</summary>
            <div>
              <p>
                The game will automatically save your progress. This is stored
                only in your <i>local-storage</i> of you browser. So as long as
                you use the same browser, your can continue the game at a later
                time.
              </p>
            </div>
          </details>

          <details>
            <summary>Game: Add Scores</summary>
            <div>
              <p>
                Using the 'Score' input field, enter the score for active
                player.<br />
                Press 'Add' to save the score and move to the next player.
              </p>
              <p>
                Once the player's score has been added, the active player will
                be change to the next player in succession.
              </p>
            </div>
          </details>

          <details>
            <summary>Game: Edit scores</summary>
            <div>
              <p>
                You can edit any individual score by clicking and holding for a
                moment on it.<br />
                This will open a prompt where you can change the score for that
                go. (The edit prompt shows the full keyboard input, but only a
                number is accepted)
              </p>

              <p>
                <strong>Note:</strong> The edit is recorded after the score
                table.
              </p>
            </div>
          </details>

          <details>
            <summary>Bugs: Negative Scores</summary>
            <div>
              <p>
                The Score input may look different on different devices. (This
                is the default browser behaviour).
              </p>

              <p>
                <strong>On Android:</strong> There is no way to enter a negative
                score - because there is no minus (-) available...<br />
                ... as a workaround you can enter the score and then EDIT it to
                be negative - The edit prompt shows the full keyboard input, but
                only a number (INCLUDING NEGATIVE) is accepted.
              </p>
            </div>
          </details>
        </div>
      </details>
    `;
  }
}
