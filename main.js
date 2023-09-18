#!/usr/bin/env node
import { help } from "./commands/help.mjs"; // Import the displayHelp function from help.js
import { organize } from "./commands/organize.mjs"; // Import the organize function from organize.js
import { tree } from "./commands/tree.mjs"; // Import the tree function from tree.js

// Variable creation and initialization
const inputArr = process.argv.slice(2);
const command = inputArr[0];

switch (command) {
  case "help":
    help();
    break;
  case "organize":
    organize(inputArr[1]);
    break;
  case "tree":
    tree(inputArr[1]);
    break;
  default:
    console.log("🙏 Please Enter  valid Commands");
}
