import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js"; // , property, state, query from "lit/decorators.js";

@customElement("how-to")
export class HowTo extends LitElement {
  static styles = css`
    details {
      width: 100%;
      max-width: 390px;
      font-size: 0.9rem;
      text-align: left;
      margin: 0.2rem auto;
    }
    details summary {
      font-size: 1.5rem;
      font-weight: bold;
      cursor: pointer;
      margin: 0;
      padding: 0;
    }
    details details summary {
      font-size: 1.1rem;
      margin-bottom: 0.2rem;
    }
    p {
      padding: 0;
      margin: 0 0 0.5rem 0;
      line-height: 1.4;
    }
  `;

  render() {
    return html`
      <details open>
        <summary>Instructions - How to:</summary>

        <details open>
          <summary>Setup: Enter Names</summary>
          <p>Enter the names of the players separated by commas.</p>
        </details>

        <details>
          <summary>Setup: Return to a game</summary>
          <p>
            The game will automatically save your progress. This is stored in
            your browser only (<i>local-storage</i>). So as long as you use the
            same browser, your can aontinue the game at a later time.
          </p>
        </details>

        <details>
          <summary>Game: Add Scores</summary>
          <p>
            Using the 'Score' input field, enter the score for active player.<br />
            Press 'Add' to save the score and move to the next player.
          </p>
          <p>
            Once the player's score has been added, the active player will be
            change to the next player in succession.
          </p>
        </details>

        <details>
          <summary>Game: Edit scores</summary>
          <p>
            You can edit any individual score by clicking and holding for a
            moment on it.<br />
            This will open a prompt where you can change the score for that go.
            (The edit prompt shows the full keyboard input, but only a number is
            accepted)
          </p>

          <p>
            <strong>Note:</strong> The edit is recorded after the score table.
          </p>
        </details>

        <details>
          <summary>Bugs: Negative Scores</summary>
          <p>
            The Score input may look different on different devices. (This is
            the default browser behaviour).
          </p>

          <p>
            <strong>On Android:</strong> There is no way to enter a negative
            score - because there is no minus (-) available...<br />
            ... as a workaround you can enter the score and then EDIT it to be
            negative - The edit prompt shows the full keyboard input, but only a
            number (INCLUDING NEGATIVE) is accepted.
          </p>
        </details>
      </details>
    `;
  }
}
