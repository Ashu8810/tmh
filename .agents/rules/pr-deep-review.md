# Deep Pull Request Code Inspection Rule

## STRICT CONSTRAINTS:
1. **NEVER MERGE ANY PR WITHOUT EXPLICIT USER PERMISSION.**
2. **NEVER POST COMMENTS ON ANY PR WITHOUT EXPLICIT USER PERMISSION.**

## REVIEW WORKFLOW:
When asked to review, inspect, or check Pull Requests (PRs):
1. **Never rely solely on PR titles, descriptions, or status labels.**
2. **Always fetch and deeply inspect the exact full diff** of every file changed using `gh pr diff <number>`.
3. **Audit the diff for**:
   - Syntax errors or malformed JSX tags.
   - File path typos, unintentional whitespace/spaces in directory paths.
   - Missing or broken imports/exports.
   - React hook warnings, unescaped string entities, or state mutation bugs.
   - Unused or empty placeholder files.
4. **Report all deep technical findings directly to the user in chat.** Do NOT take any action (merging, commenting, closing) on GitHub until explicitly instructed by the user.
