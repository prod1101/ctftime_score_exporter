# CTFTime Score Exporter GitHub Action

[![GitHub Super-Linter](https://github.com/actions/typescript-action/actions/workflows/linter.yml/badge.svg)](https://github.com/super-linter/super-linter)
![CI](https://github.com/actions/typescript-action/actions/workflows/ci.yml/badge.svg)
[![Check dist/](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/check-dist.yml)
[![Coverage](./badges/coverage.svg)](./badges/coverage.svg)

[//]:
  #
  '[![CodeQL](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/actions/typescript-action/actions/workflows/codeql-analysis.yml)'

This GitHub Action exports CTFs and placements of a team from the CTFTime API
and saves it to a Markdown file.

## Features

- Export CTFs and placements of a team from the CTFTime API
- Save the data to a Markdown file
- Optionally, color codes placements to reflect placement in the given CTF
- Optionally, generates a summary of all CTFs of a team

## Usage

### Basic Example

This example runs the action and saves the data to `./scores.md`. A PR is
created with the changes.

```yaml
# .github/workflows/fetch-scores.yaml

name: Update Scores

on:
  schedule:
    - cron: '0 0 1 * *'
  workflow_dispatch:

permissions:
  contents: write
  pull-requests: write

jobs:
  generate-scores:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: CTFTime Team Scores Exporter
        uses: prod1101/ctftime_score_exporter@v1
        with:
          team_id: 8323
          outfile_path: ./scores.md

      - name: Create Pull Request
        uses: peter-evans/create-pull-request@v6
        with:
          commit-message: Update ctftime scores
          delete-branch: true
          title: '[Scores] Update CTFTime Scores'
          body: |
            This PR updates the scores using CTFTime as source
          draft: false
```

### Input Parameters

| Argument               | Description                                         | Required | Default            | Supported choices                             |
| ---------------------- | --------------------------------------------------- | -------- | ------------------ | --------------------------------------------- |
| `team_id`              | The ID of the team whose scores are to be exported  | true     | `8323`             |                                               |
| `outfile_path`         | The path to save the scores to                      | true     | `./team-scores.md` |                                               |
| `prefix`               | Text to prepend to the scores                       | false    | `''`               |                                               |
| `suffix`               | Text to append to the scores                        | false    | `''`               |                                               |
| `percentile_colors`    | Colors for the percentiles                          | false    | `false`            | [`true`, `false`]                             |
| `percentile_rankings`  | Display the percentile rankings as a Markdown table | false    | `false`            | [`true`, `top`, `transpose`, `top_transpose`] |
| `percentile_color_100` | Color for the 100th percentile                      | false    | `#e5cc80`          |                                               |
| `percentile_color_99`  | Color for the 99th percentile                       | false    | `#e268a8`          |                                               |
| `percentile_color_95`  | Color for the 95th percentile                       | false    | `#ff8000`          |                                               |
| `percentile_color_75`  | Color for the 75th percentile                       | false    | `#a335ee`          |                                               |
| `percentile_color_50`  | Color for the 50th percentile                       | false    | `#0070ff`          |                                               |
| `percentile_color_25`  | Color for the 25th percentile                       | false    | `#1eff00`          |                                               |

### Output Parameters

| Argument | Description                      |
| -------- | -------------------------------- |
| `scores` | The fetched and generated scores |
