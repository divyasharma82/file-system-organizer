/**
 * Display a list of available commands and their usage.
 */
export function help() {
  console.log(`List of available commands:
  - To organize files in a directory, use: organize <dirPath>
  - To display the directory structure as a tree, use: tree <dirPath>
  `);
}
