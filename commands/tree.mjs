import fs from "fs";
import path from "path";

/**
 * Display the directory structure as a tree.
 * @param {string} dirPath - The path of the directory to display as a tree.
 */
export function tree(dirPath) {
  // Check if dirPath is undefined
  if (dirPath === undefined) {
    dirPath = process.cwd();
  }

  // Check if the specified path exists
  let doesExist = fs.existsSync(dirPath);
  if (!doesExist) {
    console.log("Please enter the correct path");
    return;
  }

  // Display the tree structure
  treeHelper(dirPath, "");
}

/**
 * Helper function to display the directory structure as a tree.
 * @param {string} dirPath - The path of the current directory.
 * @param {string} indent - The current indentation string.
 */
function treeHelper(dirPath, indent) {
  let isFile = fs.lstatSync(dirPath).isFile();
  if (isFile) {
    let fileName = path.basename(dirPath);
    console.log(indent + "|--------" + fileName);
  } else {
    let dirName = path.basename(dirPath);
    console.log(indent + "|====" + dirName);
    let children = fs.readdirSync(dirPath);
    for (let i = 0; i < children.length; i++) {
      let childPath = path.join(dirPath, children[i]);
      treeHelper(childPath, indent + "\t");
    }
  }
}
