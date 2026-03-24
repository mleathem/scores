# Score

Simple little web app to keep Scores - can be used for any game that has simple scoring
Uses web-components.
Add usernames - input their scores. Dynamic running totals.
Local-storage used for return use.

# Technology

Vite,
TypeScript,
Lit

# TODO:

## Edit scrore :

on Long click (define X seconds) on a score the user can edit that.
pragmatic:

- prompt ask user for new score: number value
- new score is updated, and recaclulate the totals: should not affect the go order.
- Accountability: store as a footnote "Edits: round#, userName, OldValue"

## SCORE INPUT:

- not sure about entering score '0' - perhaps we want a way to add a MARKER\* (eg. in scrabble: user swapped letters, or got a bonus)

## OTHER

- user can correct(edit) a score by clicking it. BUT! we MUCH add an asterisk and a class - add a log at the bottom of page to show edits :)
