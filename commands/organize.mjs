import fs from "fs";
import path from "path";
import { types } from "../data.js";

/**
 * Organize files in a directory based on their types.
 * @param {string} dirPath - The path of the directory to organize.
 */

export function organize(dirPath) {
  let destPath;

  // 1. Create a directory for organized files
  if (dirPath === undefined) {
    destPath = process.cwd();
  } else {
    let doesExist = fs.existsSync(dirPath);

    if (doesExist) {
      destPath = path.join(dirPath, "organized_File");

      if (!fs.existsSync(destPath)) {
        fs.mkdirSync(destPath);
      }
    } else {
      console.log("Please enter a correct path");
      return;
    }
  }
  organizeHelper(dirPath, destPath);
}

/**
 * Identify the category of a file based on its extension.
 * @param {string} name - The name of the file.
 * @returns {string} The category of the file.
 */
function getCategory(name) {
  let fileExtension = path.extname(name).slice(1);

  for (let type in types) {
    let currentType = types[type];
    if (currentType.includes(fileExtension)) {
      return type;
    }
  }

  // If no matching types found, return "others"
  return "others";
}

/**
 * Helper function to organize files in the destination directory.
 * @param {string} src - Source directory path.
 * @param {string} dest - Destination directory path.
 */
function organizeHelper(src, dest) {
  let childrenNames = fs.readdirSync(src);
  for (let i = 0; i < childrenNames.length; i++) {
    let childAddress = path.join(src, childrenNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    if (isFile) {
      let category = getCategory(childrenNames[i]);
      console.log(`${childrenNames[i]} belongs to ${category}`);

      // 4. Copy and paste the file from source to destination and also categorize
      sendFile(childAddress, dest, category);
    }
  }
}

/**
 * Copy a file from source to destination and categorize it.
 * @param {string} srcFilePath - Source file path.
 * @param {string} dest - Destination directory path.
 * @param {string} category - Category of the file.
 */
function sendFile(srcFilePath, dest, category) {
  let categoryPath = path.join(dest, category);
  if (!fs.existsSync(categoryPath)) {
    fs.mkdirSync(categoryPath, { recursive: true });
  }
  let fileName = path.basename(srcFilePath);
  let destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(srcFilePath, destFilePath);
  fs.unlinkSync(srcFilePath); // This code is used to cut the original file
}
